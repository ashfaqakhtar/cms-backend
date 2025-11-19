import Like from '../model/like.model.js';
import Blog from '../model/Blog.model.js';
import mongoose from 'mongoose';

const toggleLike = async (req, res) => {
    const { blogId } = req.params;
    const userId = req.user ? req.user._id : null;
    const ipAddress = req.ip;

    try {
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog!"
            });
        }

        const existingLike = await Like.findOne({
            blog: blogId,
            $or: [{ ipAddress }, { user: userId }].filter(Boolean)
        });

        if (existingLike) {
            // Delete like
            await Like.findByIdAndDelete(existingLike._id);
            // Decrement likesCount in Blog
            await Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: -1 } });
            return res.status(200).json({
                success: true,
                message: "Unlike successful"
            });
        }

        // Create new like
        const newLike = await Like.create({ blog: blogId, user: userId, ipAddress });
        // Increment likesCount in Blog
        await Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: 1 } });

        return res.status(201).json({
            success: true,
            message: "Blog liked successfully!",
            data: newLike
        });
    } catch (error) {
        console.error("Toggle Like Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error! Cannot like/unlike blog."
        });
    }
};

const getBlogLikes = async (req, res) => {
    const { blogId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid blog! Cannot fetch likes"
            });
        }

        const allLikes = await Like.find({ blog: blogId }).populate("user", "name email");

        return res.status(200).json({
            success: true,
            message: "All likes fetched",
            totalLikes: allLikes.length,
            data: allLikes
        });

    } catch (error) {
        console.error("Get Blog Likes Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error! Cannot fetch likes"
        });
    }
};

export { toggleLike, getBlogLikes };

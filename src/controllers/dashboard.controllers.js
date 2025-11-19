// controllers/dashboard.controller.js
import User from "../model/User.model.js";
import Blog from "../model/Blog.model.js";
import Category from "../model/Category.model.js";
import Comment from "../model/Comment.model.js";
import Like from "../model/like.model.js";
import mongoose from "mongoose";

const getDashboardStats = async (req, res) => {
    try {
        // 1️⃣ Total counts
        const totalUsers = await User.countDocuments();
        const totalBlogs = await Blog.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalComments = await Comment.countDocuments();
        const totalLikes = await Like.countDocuments();

        // 2️⃣ Recent activity
        const recentBlogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title author status createdAt");

        const recentComments = await Comment.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("user", "name email")
            .populate("blog", "title");

        // 3️⃣ Optional: Most liked blogs
        const mostLikedBlogs = await Blog.find()
            .sort({ likes: -1 })
            .limit(5)
            .select("title author likes");

        // 4️⃣ Response
        return res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalBlogs,
                totalCategories,
                totalComments,
                totalLikes,
                recentBlogs,
                recentComments,
                mostLikedBlogs,
            },
        });

    } catch (error) {
        console.error("Dashboard stats error:", error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch dashboard stats",
            error: error.message,
        });
    }
};

export { getDashboardStats };

// import dotenv from "dotenv";
// // import app from "./app.js";
// import connectDB from "./db/dbConnection.js";


// import express, { urlencoded } from "express";
// import cors from 'cors';
// import cookieParser from "cookie-parser";


// // imoprt all routes
// import userRoutes from './routes/user.route.js'
// import blogRoutes from './routes/blog.route.js'
// import commentRoutes from './routes/comment.route.js'
// import categoryRoutes from './routes/category.routes.js'
// import likeRoutes from "./routes/like.route.js"


// dotenv.config({
//   path: "./.env",
// });


// const app = express();

// // Cors 
// app.use(cors({
//   origin: process.env.BASE_URL,
//   methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// //to allow json in the url
// app.use(express.json())

// // to allow space and % symbols in the url
// app.use(express.urlencoded({ extended: true }))

// app.use(cookieParser())



// app.get("/", (req, res) => {
//   res.send("Blog Management Backend Running ✅");
// });


// const PORT = process.env.PORT || 8000;


// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("❌ MongoDB Connection Error:", error.message);
//   });



// // User Routes

// app.use("/api/v1/users", userRoutes);
// app.use("/api/v1/blogs", blogRoutes);
// app.use("/api/v1/comments", commentRoutes);
// app.use("/api/v1/categories", categoryRoutes);
// app.use("/api/v1/likes", likeRoutes);


import dotenv from "dotenv";
import connectDB from "./db/dbConnection.js";
import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

// Import all routes
import userRoutes from './routes/user.route.js'
import blogRoutes from './routes/blog.route.js'
import commentRoutes from './routes/comment.route.js'
import categoryRoutes from './routes/category.routes.js'
import likeRoutes from "./routes/like.route.js"

dotenv.config({
  path: "./.env",
});

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.BASE_URL,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root Route
app.get("/", (req, res) => {
  res.send("Blog Management Backend Running ✅");
});

// Register Routes BEFORE the DB connection/Listen logic
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/likes", likeRoutes);

// Database connection
connectDB()
  .then(() => {
    // Note: Vercel doesn't actually need app.listen, 
    // but keep it so it still works locally!
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
  });

// CRITICAL: Export for Vercel
export default app;
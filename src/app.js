// import express, { urlencoded } from "express";
// import cors from 'cors';
// import cookieParser from "cookie-parser";

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






// export default app;



import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import blogRoutes from "./routes/blog.route.js";
import categoryRoutes from "./routes/category.route.js";
import commentRoutes from "./routes/comment.route.js";
import likeRoutes from "./routes/like.route.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend-domain.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/likes", likeRoutes);

export default app;

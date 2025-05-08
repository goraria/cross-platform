// import 'module-alias/register';

import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from "node:url";

/* ROUTE IMPORTS */
import authRoutes from "@routes/authRoutes";
import productRoutes from "@routes/productRoutes";
import postRoutes from "@routes/postRoutes";
import taskRoutes from "@routes/taskRoutes";
import userRoutes from "@routes/userRoutes";
import managerRoutes from "@routes/managerRoutes";

import { connectDB } from "@config/database";

/* CONFIGURATIONS */
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.NODE_JWT_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true nếu dùng HTTPS
    httpOnly: true, // Ngăn JS phía client truy cập
    maxAge: 1000 * 60 * 60 * 24,
    // sameSite: 'Lax' // Hoặc 'Strict'. 'None' cần secure: true
    // path: '/', // Phạm vi cookie (thường là gốc)
  }
}));
app.use(cors());
app.use(cors({
  origin: [
    process.env.NODE_CLIENT_URL!,
    process.env.NODE_MOBILE_URL!,
  ],
  credentials: true,
}));

/* STATIC FILES */
/* UPLOAD MULTER CONFIG */
// const __filename = fileURLToPath(process.env.url!);
// // const __dirname = path.resolve();
// const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "assets")));

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ): void => {
    cb(null, "assets");
  },
  filename: (
    req,
    file,
    cb
  ): void => {
    // cb(null, req.body.name);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const isProduction = process.env.NODE_ENV === 'production';

// if (isProduction) {
//     mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
// }

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/products", productRoutes)
app.use("/task", taskRoutes)
app.use("/post", postRoutes)
app.use("/users", userRoutes)
app.use("/manage", managerRoutes)

app.get('/', (
  req,
  res
) => {
  res.send('Hello World!');
});

/* MONGOOSE */

// connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Xử lý tắt server an toàn (graceful shutdown) - tùy chọn
process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  // Đóng các kết nối khác (DB, etc.) ở đây nếu cần
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  // Đóng các kết nối khác (DB, etc.) ở đây nếu cần
  process.exit(0);
});
// mongoose.connect(process.env.MONGODB_URI!, {
//
// }).then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on http://localhost:${PORT}`);
//     });
// }).catch((error: any) => {
//     console.log(`Server did not connect: ${error}`);
// });

// mongoose.connect(process.env.MONGODB_URI!, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// }).then(() => {
//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//     });
// }).catch(err => {
//     console.log(err);
// });

/* SERVER */

// const port = process.env.PORT || 5000;
//
// if (!isProduction) {
//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//     });
// }

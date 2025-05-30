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
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { gql } from 'graphql-tag';
import prisma from '@config/prisma';

/* ROUTE IMPORTS */
import authRoutes from "@routes/authRoutes";
import productRoutes from "@routes/productRoutes";
import postRoutes from "@routes/postRoutes";
import taskRoutes from "@routes/taskRoutes";
import userRoutes from "@routes/userRoutes";
import managerRoutes from "@routes/managerRoutes";
import inventoryRoutes from "@routes/inventoryRoutes";

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
  secret: process.env.EXPRESS_JWT_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.EXPRESS_ENV === 'production', // true nếu dùng HTTPS
    httpOnly: true, // Ngăn JS phía client truy cập
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: 'lax',
    // expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // Thời gian hết hạn cookie
    // domain: process.env.EXPRESS_CLIENT_URL!, // Tùy chọn: tên miền cookie
    // secure: true, // Chỉ gửi cookie qua HTTPS
    // sameSite: 'Lax' // Hoặc 'Strict'. 'None' cần secure: true
    // path: '/', // Phạm vi cookie (thường là gốc)
  }
}));
// app.use(cors());
app.use(cors({
  origin: [
    process.env.EXPRESS_CLIENT_URL!,
    process.env.EXPRESS_MOBILE_URL!,
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

const isProduction = process.env.EXPRESS_ENV === 'production';

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
app.use("/inventory", inventoryRoutes);

app.get('/', (
  req,
  res
) => {
  res.send('Hello World!');
});

/* MONGOOSE */

// connectDB();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: [
      process.env.EXPRESS_CLIENT_URL!,
      process.env.EXPRESS_MOBILE_URL!,
    ],
    credentials: true,
  },
});

// Lắng nghe kết nối realtime
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  // Ví dụ: lắng nghe sự kiện client gửi
  socket.on('ping', (data) => {
    socket.emit('pong', { msg: 'pong', data });
  });
  socket.on('get_users', async () => {
    const users = await prisma.users.findMany();
    socket.emit('users', users);
  });
  // Lắng nghe ngắt kết nối
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Cho phép các controller/service khác sử dụng io
export { io };

const port = process.env.EXPRESS_PORT || 8080;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.EXPRESS_ENV}`);
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

// --- GraphQL Schema Demo ---
const typeDefs = `
  type User {
    id: String!
    username: String!
    email: String!
    first_name: String
    last_name: String
    full_name: String
    phone_code: String
    phone_number: String
    avatar_url: String
    cover_url: String
    bio: String
    status: String
    role: String
    created_at: String
    updated_at: String
  }
  type Query {
    hello: String
    users: [User!]!
  }
`;
const resolvers = {
  Query: {
    hello: () => 'Hello from GraphQL!',
    users: async () => {
      return await prisma.users.findMany();
    },
  },
};

async function startApolloServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  app.use('/graphql', expressMiddleware(apolloServer) as any);
}

startApolloServer();

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

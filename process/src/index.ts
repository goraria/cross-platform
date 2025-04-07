import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import mongoose from "mongoose";

import path from "path";
import { fileURLToPath } from "url";
/* ROUTE IMPORTS */


/* CONFIGURATIONS */
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE */

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// @ts-ignore
// mongoose.connect(process.env.MONGODB_URI,
//     { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Server is running on http://localhost:${port}`);
//         });
//     })
//     .catch(err => {
//         console.log(err);
//     });

/* ROUTES */

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

/* SERVER */

// const port = process.env.PORT || 5000;
//
// if (!isProduction) {
//     app.listen(port, () => {
//         console.log(`Server is running on http://localhost:${port}`);
//     });
// }
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
/* ROUTE IMPORTS */


/* CONFIGURATIONS */
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    // mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

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
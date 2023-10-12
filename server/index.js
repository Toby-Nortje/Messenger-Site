import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"; //Hides secret files and passwords from git
import multer from "multer"; //Allows for file storage
import helmet from "helmet"; //Helmet helps you secure your Express apps by setting various HTTP headers
import morgan from "morgan"; //HTTP request logger middleware for node.js
import path from "path";
import { fileURLToPath } from "url";

// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url); //Sets the absolute path of the server file
const __dirname = path.dirname(__filename); //Sets the absolute path of the server directory
dotenv.config(); //Sets up dotenv
const app = express(); //Sets up express
app.use(express.json()); //Parses incoming JSON data into the req.body
app.use(helmet()); //Sets up helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); //allows the web app to access selected resources from a server at a different origin
app.set(morgan("common")); //Sets up morgan and uses preset 'common'
app.use(bodyParser.json({ limit: "30mb", extended: true })); //tells the system that you want json to be used
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); //tells the system you want to use complex algorithm for deep parsing that can deal with nested objects
app.use(cors()); //Sets up CORS (Cross-Origin Resource Policy)
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //Sets the 'assets' location from __dirname/public/assets

// FILE STORAGE

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// ROUTES WITH FILES

//app.post('/auth/register', upload.single('picture'), registerUser);
//app.post('/message/:pageId', upload.single('picture'), createMessage);
//app.patch('/message/:messageId', upload.single('picture'), editMessage);

// ROUTES

//app.use('/auth', authRoutes);

// MONGOOSE SETUP

const PORT = process.env.PORT || 5001;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

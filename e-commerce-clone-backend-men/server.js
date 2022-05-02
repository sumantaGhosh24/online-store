require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

// declare variable
const app = express();
const PORT = process.env.PORT || 8080;

// setup middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: ["http://localhost:3000", "http://localhost:8080"]}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));

// database connection
mongoose.connect(process.env.MONGODB_URL, {autoIndex: false}, (err) => {
  if (err) throw err;
  console.log("Database Connection Successful.");
});

// setup routes
app.use("/api", require("./routes"));

// setup server
app.listen(PORT, () => {
  console.log(`Application Listening on http://localhost:${PORT}`);
});

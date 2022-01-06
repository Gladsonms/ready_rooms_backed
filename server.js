/* ====== create node.js server with express.js framework ====== */
// dependencies
const express = require("express");

const fs = require("fs");

const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//Databse connection

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Databse connected Succesfully");
  })
  .catch((error) => {
    console.log("Database connection error", error);
  });

//Routes
fs.readdirSync("./routes").map((r) => app.use("/", require(`./routes/${r}`)));

//const authRouter = require("./routes/auth");

// PORT
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(morgan("tiny"));

//router middleware
// app.use("/", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

const express = require("express");
const morgan = require("morgan");
require("dotenv").config({ debug: process.env.DEBUG });
const db = require("./config/database");
const mongoose = require("mongoose")
// const IdeaRoutes = require("./base/routes/idea/idea.route");
const UserRoutes = require("./src/user.route");

const app = express();
// const dotenv = require("dotenv");
// const {MONGO_URI} = process.env;
// const buf = Buffer.from("MONGO_URI");
// const opt = { debug: true };
// const config = dotenv.parse(buf, opt);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

const { PORT : localPort } = process.env;
// connect to mongoDB
(async() => {
  try {
       const connectmDB = await mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: false });

      if(connectmDB) {
      console.log(`Connected to DB`);
      }

  } catch (err) {
    console.log(`Failed to connect to DB ${err}`);
  }
})();

// app.use("/api", IdeaRoutes);
app.use("/", UserRoutes);

app.use("*", (req, res) => {
  res.status(404).json({message: "Page Not Found"});
});

// app.use( (req, res, next) => {
//   let error = new Error("Page Not Found");
//   error.status = 404;
//   next(error);
// });
//
// app.use( (req, res, next) => {
//   res.status(error.status || 500).json({
//     message: error.message
//   });
// });

module.exports = {app, localPort};

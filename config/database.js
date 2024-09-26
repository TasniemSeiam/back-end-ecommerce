const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("MongoDB connected");
    })
    // .catch((err) => {
    //   console.error("failed connected to mongoDB, the error:  ", err);
    //   process.exit(1);
    // });
};

module.exports = dbConnection;
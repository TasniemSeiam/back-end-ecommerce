const express = require("express");
const cors = require("cors");
const { dataBase } = require("./config/dbConnection.js");
const userRouter = require("./routes/user.router.js");
const { globalError, notFoundURL } = require("./middleWare/error.js");
const cookieParser = require("cookie-parser");   
const reviewRouter = require('./routes/review.router.js')

const app = express();
const port = 3001;
dataBase;
app.use(express.json());
app.use(cookieParser());


   
app.use(
  cors({
    origin: "http://localhost:5173", // front end URL
    credentials: true, //   This allows cookies to be sent
  })
);     

app.use("/user", userRouter); 
app.use("/review", reviewRouter); 

app.use(notFoundURL);
app.use(globalError);


app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
 
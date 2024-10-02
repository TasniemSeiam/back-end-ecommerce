// import 'dotenv/config';
// import mongoose from "mongoose";
  

// export const dataBase = mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log('dataBase Connected!')).catch((error) => { `error DataBase ${error}` });

require('dotenv/config');
const mongoose = require('mongoose');

const dataBase = mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('dataBase Connected!'))
  .catch((error) => console.error(`error DataBase: ${error}`));

module.exports = { dataBase };
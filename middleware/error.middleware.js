const globalErrorHandler=(error, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
     errorForDev(error, res);
  } else {
    errorForProduction(error, res);
   }
}

const errorForDev = (error, res)=>{
  res.status(error.statusCode || 500).json({
    message: error.message,
    error,
    status: error.status || "error",
    stack: error.stack,
  });
}

const errorForProduction = (error, res) => { 
  res.status(error.statusCode || 500).json({
    message: error.message,
    status: error.status || "error",
  });
}
  
module.exports = globalErrorHandler;
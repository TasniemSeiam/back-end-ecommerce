const { param, validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

<<<<<<< HEAD
module.exports = validationMiddleware;
=======
module.exports = validationMiddleware;
>>>>>>> origin/main

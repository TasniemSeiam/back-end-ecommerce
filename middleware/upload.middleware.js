const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");
<<<<<<< HEAD
const ApiError = require("../util/AppHandleError");
=======
const ApiError = require("../util/apiError");
>>>>>>> origin/main


const multerFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only image files are allowed!",400), false);
  }
};


function uploadMiddleware(folderName) {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const folderPath = `${folderName.trim()}`;
      const fileExtension = path.extname(file.originalname).substring(1);
      const publicId = `${file.fieldname}-${Date.now()}`;

      return {
        folder: folderPath,
        public_id: publicId,
        format: fileExtension, // Optional, cloudinary auto-detects format
      };
    },
  });

  return multer({
    storage: storage,
    fileFilter: multerFileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
    },
  });
}

<<<<<<< HEAD
module.exports = uploadMiddleware;
=======
module.exports = uploadMiddleware;
>>>>>>> origin/main

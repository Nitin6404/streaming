const multer = require('multer');
const path = require('path');

// Allowed image types
const allowedFileTypes = /jpeg|jpg|png|gif|webp/;

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/images');
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const uniqueFilename = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFilename);
  },
});

// File filter (only images allowed)
const fileFilter = (req, file, cb) => {
  if (allowedFileTypes.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

// Single image upload middleware
const uploadSingleImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit (optional)
}).single('image');

module.exports = {
  uploadSingleImage,
};

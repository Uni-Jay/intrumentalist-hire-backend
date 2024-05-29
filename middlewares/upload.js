const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },

  // Restrict file types and size
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
  
    if (allowedTypes.includes(file.mimetype) && file.size <= maxSize) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type or size'), false); // Reject the file
    }
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

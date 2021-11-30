const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    // middleware
    destination: (req, file, next) => {
      next(null, '../public/uploads');
    },
    filename: (req, file, next) => {
      // get file extension from file
      const ext = file.mimetype.split('/')[1];
      next(null, `${file.fieldname}-${Date.now()}.${ext}`);
    }
  })
});

module.exports = upload;

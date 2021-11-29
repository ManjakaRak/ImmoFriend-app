const routers = require('express').Router();
const { getProperties, addProperty, getProperty } = require('../controllers/property');
const { addClient, verifySecretKey } = require('../controllers/client');
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

routers.get('/', getProperties);
routers.get('/property/:id', getProperty);
routers.post('/property/add-client', addClient);
routers.post('/property/verify-secret-key', verifySecretKey);
routers.post('/property/add-property', upload.any(), addProperty);

module.exports = routers;

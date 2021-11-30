const routers = require('express').Router();
const { getProperties, addProperty, getProperty } = require('../controllers/property');
const { addClient, verifySecretKey } = require('../controllers/client');
const upload = require('../utils/multer');

routers.get('/', getProperties);
routers.get('/property/:id', getProperty);
routers.post('/property/add-client', addClient);
routers.post('/property/verify-secret-key', verifySecretKey);
routers.post('/property/add-property', upload.any(), addProperty);

module.exports = routers;

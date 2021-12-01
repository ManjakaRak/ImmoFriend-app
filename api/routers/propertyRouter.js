const routers = require('express').Router();
const { getProperties, addProperty, getProperty, deleteProperty } = require('../controllers/property');
const { addClient, verifySecretKey, clientHaveCustomer } = require('../controllers/client');
const upload = require('../utils/multer');

routers.get('/', getProperties);
routers.get('/property/:id', getProperty);
routers.delete('/property/:id', deleteProperty);
routers.post('/property/add-client', addClient);
routers.post('/property/verify-secret-key', verifySecretKey);
routers.post('/property/add-property', upload.any(), addProperty);
routers.post('/contact', clientHaveCustomer);


module.exports = routers;

const routers = require('express').Router();
const { getProperties, addProperty } = require('../controllers/property');
const { addClient, verifySecretKey } = require('../controllers/client');

routers.get('/', getProperties);
routers.post('/property/add-client', addClient);
routers.post('/property/verify-secret-key', verifySecretKey);
routers.post('/property/add-property', addProperty);

module.exports = routers;
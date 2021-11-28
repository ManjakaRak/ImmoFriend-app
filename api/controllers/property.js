
/**
 * To manipulate a PROPERTY we need to pass on CLIENT first ~
 * 'coz property is embedde in client and haven't direct access on it
 */
const Client = require('../models/Client');


const controller = {
  getProperties: async (_, res) => {
    try {
      const properties = await Client.find({}).select('property');
      res.send(properties);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  // insert new property with his owner
  addProperty: async (req, res) => {
    const { name, price, surface, room, floor, localisation, constructionDate } = req.body;
    const metaDataImg = req.files[0];
    metaDataImg.property = name;
    const propertyObj = {
      name, price, surface, room, floor, localisation, constructionDate, image: JSON.stringify(metaDataImg)
    }
    const clientObj = JSON.parse(req.body.client);

    // save all data on database

    const clientProperty = new Client({
      name: clientObj.name,
      email: clientObj.email,
      tel: clientObj.tel,
      message: clientObj.message,
      property: propertyObj
    });
    try {
      await clientProperty.save();
    } catch (errorOnSave) {
      res.status(400).send(errorOnSave);
    }
  }
}

module.exports = controller;
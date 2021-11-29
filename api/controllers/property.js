/**
 * To manipulate a PROPERTY we need to pass on CLIENT first ~
 * 'coz property is embedded in client and haven't direct access on it
 */
const Client = require('../models/Client');

const controller = {
  /**
   * get one property
   * @param {request} req
   * @param {response} res
   */
  getProperty: async (req, res) => {
    const id = req.params.id;
    try {
      // find property by client way
      const client = await Client.findOne({"property._id": id});
      if (!client) {
        res.status(400).send({'errorMsg': 'Le bien n\'a pas été trouvé'});
      } else {
        res.send(client);
      }
    } catch (error) {
      res.status(400).send({'errorMsg': 'Le bien n\'a pas été trouvé', 'type': 'parse'});
    }
  },
  /**
   * get_all_properties (without filter)
   * @param _
   * @param res
   * @returns {Promise<void>}
   */
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
      name, price, surface, room, floor, localisation, constructionDate, image: metaDataImg.filename
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
      res.send({ save: true });
    } catch (errorOnSave) {
      res.status(400).send(errorOnSave);
    }
  }
}

module.exports = controller;

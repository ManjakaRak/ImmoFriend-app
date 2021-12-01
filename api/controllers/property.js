const fs = require('fs');
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
  getProperties: async (_, res) => { // !SOLD
    try {
      const properties = await Client.find({'property.sold': false}).select('property');
      res.send(properties);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  // insert new property with his owner
  addProperty: async (req, res) => {
    const { name, price, surface, room, floor, localisation, constructionDate, description } = req.body;
    const metaDataImg = req.files[0];
    metaDataImg.property = name;
    const propertyObj = {
      name, price, surface, room, floor, localisation, constructionDate, description, image: metaDataImg.filename
    }

    // last verif before registration
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
      res.status(400).send({errorOnSave});
    }
  },

  // delete property
  deleteProperty: async (req, res) => {
    const propertyId = req.params.id;
    let imageFilename = '';
    let errorOnDelImg = false;
    // find property first to register the imageFile before del obj
    try {
      const item = await Client.findOne({'property._id': propertyId}).select('property.image');
      item ? imageFilename = item.property.image : res.status(400).send({errorMsg: 'Impossible de trouver le bien'});
      try {
        const client = await Client.deleteOne({'property._id': propertyId});
        if (client) {
          // delete  image on disk storage
          await fs.unlink(`../public/uploads/${imageFilename}`, function (error) {
            error ? errorOnDelImg = true : null;
          });
        }
        res.send({propertyDeleted: true, message: 'Property deleted'});
      } catch (e) {
        res.status(400).send({'error': e, 'errorMsg': 'Impossible de trouver le bien'});
      }
    } catch (e) {
      res.status(400).send({errorMsg: 'Impossible de trouver le bien'});
    }
    // delete obj if found
  }
}

module.exports = controller;

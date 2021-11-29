const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [1000, 'Le prix est trop bas']
  },
  surface: {
    type: Number,
    required: true,
    min: [10, 'La surface doit être compris entre 10 et 100'],
    max: [500, 'La surface doit être compris entre 10 et 500']
  },
  room: {
    type: Number,
    required: true,
    min: [1, 'Le nombre de chambre est invalide']
  },
  floor: {
    type: Number,
    required: true,
    min: [0, 'Le nombre d\'etage est invalide']
  },
  constructionDate: {
    type: Date,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  localisation: {
    type: String,
    required: true
  }
});



/**
 * export propertySchema NOT model ~
 * 'coz we need to embed this obj to a parent one {CLIENT} ~
 * one client can have many embeded property ~
 * one propperty can only be embeded by one client /
 */
module.exports = PropertySchema;

// module.exports = mongoose.model('Property', PropertySchema);

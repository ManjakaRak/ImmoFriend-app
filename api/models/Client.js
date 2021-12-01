const mongoose = require('mongoose');
const propertySchema = require('./Property');

/**
 * We need create client first ~
 * then embed property in it
 * we will use EMBEDDED SYSTEM (not the REFERENCE one but we can use it to)
 */


const ClientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  message: {
    type: String,
  },
  // we embed the property here
  property: {
    type: propertySchema,
    required: true
  }
});

// CUSTOM VALIDATION FOR CLIENT

ClientSchema.path('name').validate(v => {
  if (v.length > 100) {
    throw new Error('Le nom est trop long');
  }
  return true;
});

ClientSchema.path('message').validate(v => {
  if (v.length > 100) {
    throw new Error('Votre message est trop long');
  }
  return true;
});

module.exports = mongoose.model('Client', ClientSchema);

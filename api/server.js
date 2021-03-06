const app = require('express')();
const routers = require('./routers/propertyRouter');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const serveStatic = require('serve-static');



// cors
app.use(cors());
// bodyparser
app.use(bodyparser.json(), bodyparser.urlencoded({ extended: true }));
// multer

/**
 * router
 */
// app.use('/', serveStatic('../build'));
app.use('/', routers);

/**
 * SERVER CONFIGURATION
 */

// VAR ENV
app.use(dotenv.config(), () => {error ? console.log(error) : null});


// port
const PORT = process.env.PORT;


/**
 * DATABASE CONFIGURATION
 */
const URL_DB = process.env.URL_DB;
mongoose.connect(URL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => err ? console.log(err) : null);

// run app
app.listen(PORT, () => {
  console.log(`API is running on ${PORT}`);
});

const app = require('express')();
const routers = require('./routers/propertyRouter');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
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

// cors
app.use(cors());
// bodyparser
app.use(bodyparser.json(), bodyparser.urlencoded({ extended: true }));
// multer
app.use(upload.any());

/**
 * router
 */
app.use('/', routers);

/**
 * SERVER CONFIGURATION
 */

// VAR ENV
const dotenv = require('dotenv');
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

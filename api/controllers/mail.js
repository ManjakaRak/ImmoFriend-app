const fs = require('fs')

fs.unlink('./text.txt', function (error) {
  !error ? console.log('file deleted') : console.log(error)
});

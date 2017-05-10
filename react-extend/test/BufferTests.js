const {readFile} = require('fs');
const file = "~/assets/templates/mp.html";
readFile(file, function (err, data) {
  if (err) return callback(err);
  console.log(data.toString('utf8'));
});




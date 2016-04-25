var express = require('express');
var app = express();

app.use('/dist', express.static(__dirname + '/public'));

app.get('/app.js', function (req, res) {
     res.sendfile("./dist/app.js");
   });

  // app.get('/style.css', function (req, res) {
  //    res.sendfile("./public/style.css");
  //  });

app.get('/',
  function (req, res) {
    res.render('index.ejs');
  });

var port = process.env.PORT || 7000;

app.listen(port, function() {
  console.log('Node app is running on port', port);
});

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

app.listen(process.env.PORT || 3000, function() {
  console.log('Node app is running on port', port);
});

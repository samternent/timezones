var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
  console.log('a user connected');
});


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



http.listen(port, function(){
  console.log('listening on *:', port);
});

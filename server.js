var express = require("express");
var app = express();
var http = require('http').Server(app);
app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use('/bootstrap',express.static(__dirname + '/bootstrap'));
app.use(express.static(__dirname + '/views'));
app.use('/public',express.static(__dirname + '/public'));
http.listen(3000);

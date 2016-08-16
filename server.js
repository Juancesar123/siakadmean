var express = require("express");
var app = express();
var http = require('http').Server(app);
var bodyParser=require("body-parser");
var mongojs = require("mongojs");
var db = mongojs("siakad",["dataguru"]);
app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use('/bootstrap',express.static(__dirname + '/bootstrap'));
app.use(express.static(__dirname + '/views'));
app.use('/public',express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.get("/dataguru",function(req,res){
  res.render("dataguru.ejs");
});
app.get("/ambil_dataguru",function(req,res){
  db.dataguru.find(function(err,docs){
    res.json(docs)
  })
});

http.listen(3000);

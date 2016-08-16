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
app.post("/simpan_dataguru",function(req,res){
  db.dataguru.insert(req.body,function(err,docs){
    res.json();
  })
})
app.post("/ubah_dataguru",function(req,res){
  var id = req.body.id;
db.dataguru.findAndModify({query:{_id:mongojs.ObjectId(id)},
update:{$set:req.body},new:true},function(err,doc){
res.json(doc);
});
});
app.post("/hapus_guru",function(req,res){
  var id = req.body.id.hapusguru;
  for(var i = 0;i < id.length;i++){
    db.dataguru.remove( {_id: mongojs.ObjectId(id[i])},1);
  }
  res.json()
});
app.post("/nonaktif_guru",function(req,res){
  var id = req.body.id.hapusguru;
  for(var i = 0;i < id.length;i++){
    db.dataguru.findAndModify({query:{_id:mongojs.ObjectId(id[i])},
    update:{$set:{status:"tidak aktif"}},new:true},function(err,doc){
    });
  };
  res.json();
});
http.listen(3000);

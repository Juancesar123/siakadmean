var express = require("express");
var app = express();
var http = require('http').Server(app);
var bodyParser=require("body-parser");
var mongojs = require("mongojs");
var fs= require("fs");
var md5 = require("MD5");
var db = mongojs("siakad",["dataguru","datamurid","datakelas","user"]);
var multer = require("multer");
app.set('view engine', 'jade');
app.set('view engine', 'ejs');
app.use('/bootstrap',express.static(__dirname + '/bootstrap'));
app.use(express.static(__dirname + '/views'));
app.use('/public',express.static(__dirname + '/public'));
app.use('/gambarmurid',express.static(__dirname + '/gambarmurid'));
app.use('/gambaruser',express.static(__dirname + '/gambaruser'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.get("/",function(req,res){
  res.render("index.jade")
});
app.get("/dataguru",function(req,res){
  res.render("dataguru.jade");
});
app.get("/datamurid",function(req,res){
  res.render("datamurid.jade");
});
app.get("/ambil_dataguru",function(req,res){
  db.dataguru.find(function(err,docs){
    res.json(docs)
  })
});
app.get("/datakelas",function(req,res){
  res.render("datakelas.jade");
});
app.get("/user",function(req,res){
  res.render("user.ejs");
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
  };
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
app.get("/ambil_datamurid",function(req,res){
  db.datamurid.find(function(err,docs){
    res.json(docs);
  });
})
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, './gambarmurid/');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});
var upload = multer({storage: storage}).single('foto');
  app.post("/tambah_murid",function(request,response){
    upload(request, response, function(err) {
    db.datamurid.insert({
      nama:request.body.nama,
      kelas:request.body.kelas,
      alamat:request.body.alamat,
      notlp:request.body.notlp,
      foto:"gambarmurid/"+request.file.originalname,
      tempat:request.body.tempat,
      tanggal:request.body.tanggal,
      status:request.body.status
    },function(err,docs){
    })
  if(err) {
    console.log('Error Occured');
    return;
  }
  console.log(request.file);
  response.end('Your File Uploaded');
  console.log('Photo Uploaded');
});
});
app.post("/ubah_datamurid",function(request,response){
  var storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, './gambarmurid/');
    },
    filename: function (request, file, callback) {
      console.log(file);
      callback(null, file.originalname)
    }
  });
  var upload = multer({storage: storage}).single('foto');
  upload(request, response, function(err) {
    var id = request.body.id;
    console.log(id);
  db.datamurid.findAndModify({query:{_id:mongojs.ObjectId(id)},
  update:{$set:{
    nama:request.body.nama,
    kelas:request.body.kelas,
    alamat:request.body.alamat,
    notlp:request.body.alamat,
    foto:"gambarmurid/"+request.file.originalname,
    tempat:request.body.tempat,
    tanggal:request.body.tanggal,
    status:request.body.status
    }},new:true},function(err,doc){
  });
  if(err) {
    console.log('Error Occured');
    return;
  }
  console.log(request.file);
  response.end('Your File Uploaded');
  console.log('Photo Uploaded');
});
});
app.post("/hapus_murid",function(req,res){
  var id = req.body.id.hapusmurid;
  for(var i = 0;i < id.length;i++){
    fs.unlink(id[i].foto);
    db.datamurid.remove( {_id: mongojs.ObjectId(id[i]._id)},1);
  }
  res.json();
});
app.post("/nonaktif_murid",function(req,res){
  var id = req.body.id.hapusmurid;
  for(var i = 0;i < id.length;i++){
    db.datamurid.findAndModify({query:{_id:mongojs.ObjectId(id[i]._id)},
    update:{$set:{status:"tidak aktif"}},new:true},function(err,doc){
    });
  }
  res.json();
});
app.post("/ubah_datamuridnoimage",function(req,res){
  var id = req.body.id;
db.datamurid.findAndModify({query:{_id:mongojs.ObjectId(id)},
update:{$set:req.body},new:true},function(err,doc){
res.json(doc);
});
});
app.get("/ambil_datakelas",function(req,res){
  db.datakelas.find(function(err,docs){
    res.json(docs);
  });
});
app.post("/tambah_kelas",function(req,res){
  db.datakelas.insert(req.body,function(err,docs){
    res.json()
  });
});
  app.post("/ubah_datakelas",function(req,res){
    var id = req.body.id;
    db.datakelas.findAndModify({query:{_id:mongojs.ObjectId(id)},
    update:{$set:req.body},new:true},function(err,doc){
    res.json(doc);
    });
  });
  app.post("/hapus_kelas",function(req,res){
    var id = req.body.id.hapuskelas;
    for(var i = 0;i < id.length;i++){
      db.datakelas.remove( {_id: mongojs.ObjectId(id[i])},1);
    }
    res.json();
  });
  app.get("/ambil_datauser",function(req,res){
    db.user.find(function(err,docs){
      res.json(docs);
    });
  });
  app.post("/tambah_user",function(request,response){
    var storage = multer.diskStorage({
      destination: function (request, file, callback) {
        callback(null, './gambaruser/');
      },
      filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
      }
    });
    var upload = multer({storage: storage}).single('foto');
    upload(request, response, function(err) {
      var password = md5(request.body.password)
    db.user.insert({
      nama:request.body.nama,
      email:request.body.email,
      password:password,
      level:request.body.level,
      foto:"gambaruser/"+request.file.originalname,
      passwordasli:request.body.password
      },function(err,doc){
    });
    if(err) {
      console.log('Error Occured');
      return;
    }
    console.log(request.file);
    response.json();
    console.log('Photo Uploaded');
    });
  });
  app.post("/ubah_datauser",function(request,response){
    var storage = multer.diskStorage({
      destination: function (request, file, callback) {
        callback(null, './gambaruser/');
      },
      filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
      }
    });
    var upload = multer({storage: storage}).single('foto');
    upload(request, response, function(err) {
      var id = request.body.id;
      var password = md5(request.body.password)
    db.user.findAndModify({query:{_id:mongojs.ObjectId(id)},
    update:{$set:{
      nama:request.body.nama,
      email:request.body.email,
      password:password,
      level:request.body.level,
      foto:"gambaruser/"+request.file.originalname,
      passwordasli:request.body.password
          }},new:true},function(err,doc){
    });
    if(err) {
      console.log('Error Occured');
      return;
    }
    console.log(request.file);
    response.end('Your File Uploaded');
    console.log('Photo Uploaded');
  });
  });
  app.post("/hapus_user",function(req,res){
    var id = req.body.id.hapususer;
    for(var i = 0;i < id.length;i++){
      fs.unlink(id[i].foto);
      db.user.remove( {_id: mongojs.ObjectId(id[i]._id)},1);
    }
    res.json();
  });
  app.post("/ubah_datausernoimage",function(req,res){
    var id = req.body.id;
    db.user.findAndModify({query:{_id:mongojs.ObjectId(id)},
    update:{$set:req.body},new:true},function(err,doc){
    res.json(doc);
  });
http.listen(3000);

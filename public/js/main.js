var mainApp = angular.module("mainApp", ["ngMaterial",'ngRoute','datatables','checklist-model',"ngResource"]);
 mainApp.config(function($routeProvider) {
    $routeProvider
      .when('/dataguru', {
        templateUrl:"dataguru",
			  controller :"dataguru"
	})  .when('/datamurid', {
      templateUrl:"datamurid",
      controller :"datamurid"
}) .when('/datakelas', {
    templateUrl:"datakelas",
    controller :"datakelas"
}).when('/user', {
    templateUrl:"user",
    controller :"user"
}).when('/datamatapelajaran', {
    templateUrl:"datamatpel",
    controller :"datamatpel"
}).when('/jadwalpel', {
    templateUrl:"jadwalpel",
    controller :"jadwalpel"
}).when('/nilai', {
    templateUrl:"nilai",
    controller :"nilai"
}).when('/absensiguru', {
    templateUrl:"absensiguru",
    controller :"absensiguru"
}).when('/absensimurid', {
    templateUrl:"absensimurid",
    controller :"absensimurid"
})
 });
 mainApp.factory('socket', ['$rootScope', function($rootScope) {
   var socket = io.connect();

   return {
     on: function(eventName, callback){
       socket.on(eventName, callback);
     },
     emit: function(eventName, data) {
       socket.emit(eventName, data);
     }
   };
 }]);
mainApp.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;

                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);
         mainApp.service('FotomuridUpload', ['$http', function ($http,$scope) {
         this.uploadFileToUrl = function(nama,alamat,tempat,tanggal,kelas,notlp,status,foto,uploadUrl){
             var fd = new FormData();
             fd.append('nama', nama);
             fd.append('alamat', alamat);
             fd.append('tempat', tempat);
             fd.append('tanggal', tanggal);
             fd.append('kelas',kelas)
             fd.append('notlp', notlp);
             fd.append('status', status);
             fd.append('foto', foto);
             $http.post(uploadUrl, fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
             })
             .success(function(data){
           alert("data sukses diupload");
           $http.get("ambil_datamurid").success(function(data){
         datamurid = data;
           });
             })
             .error(function(){
             alert("data gagal di input");
             });

         }

         }]);
         mainApp.service('FotoUserupload', ['$http', function ($http,$scope) {
         this.uploadFileToUrl = function(nama,email,password,level,foto,uploadUrl){
             var fd = new FormData();
             fd.append('nama', nama);
             fd.append('email', email);
             fd.append('password', password);
             fd.append('level', level);
             fd.append('foto', foto);
             $http.post(uploadUrl, fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
             })
             .success(function(data){
           alert("data sukses diupload");
           $http.get("ambil_datauser").success(function(data){
         datauser = data;
           });
             })
             .error(function(){
             alert("data gagal di input");
             });

         }

         }]);
         mainApp.service('fotouseredit', ['$http', function ($http,$scope) {
         this.uploadFileToUrl = function(id,nama,email,password,level,foto,uploadUrl){
             var fd = new FormData();
             fd.append('id', id);
             fd.append('nama', nama);
             fd.append('email', email);
             fd.append('password', password);
             fd.append('level', level);
             fd.append('foto', foto);
             $http.post(uploadUrl, fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
             })
             .success(function(data){
           alert("data sukses diupload");
           $http.get("ambil_datauser").success(function(data){
         datauser = data;
           });
             })
             .error(function(){
             alert("data gagal di input");
             });

         }

         }]);

         mainApp.service('FotomuridUploadEdit', ['$http', function ($http,$scope) {
         this.uploadFileToUrl = function(id,nama,alamat,tempat,tanggal,kelas,notlp,status,foto,uploadUrl){
             var fd = new FormData();
             fd.append('id', id);
             fd.append('nama', nama);
             fd.append('alamat', alamat);
             fd.append('tempat', tempat);
             fd.append('tanggal', tanggal);
             fd.append('kelas',kelas)
             fd.append('notlp', notlp);
             fd.append('status', status);
             fd.append('foto', foto);
             $http.post(uploadUrl, fd, {
                 transformRequest: angular.identity,
                 headers: {'Content-Type': undefined}
             })
             .success(function(data){
           alert("data sukses diubah");
           $http.get("ambil_datamurid").success(function(data){
         datamurid = data;
           });
             })
             .error(function(){
             alert("data gagal di input");
             });

         }

         }]);
mainApp.controller("dataguru",function($http,$scope,DTOptionsBuilder,DTColumnBuilder){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withDisplayLength(5)
          .withOption('bLengthChange', false)
          .withOption('autoWidth', false)
          .withOption('scrollX', false);
          $scope.getdata = function(){
          $http.get("ambil_dataguru").success(function(data){
            $scope.dataguru= data;
          });
      }
      $scope.getdata();
      $scope.tambah = function(){
        var nama = $scope.nama;
        var alamat = $scope.alamat;
        var tempat = $scope.tempat;
        var tanggal = $scope.tanggal;
        var jabatan= $scope.jabatan;
        var notlp = $scope.notlp;
        var status = "aktif"
        $http.post("simpan_dataguru",{
          nama:nama,
          alamat:alamat,
          tempat:tempat,
          tanggal:tanggal,
          jabatan:jabatan,
          notlp:notlp,
          status:status
        }).success(function(){
          alert("data sukses di simpan");
          $scope.getdata();
        })
      }
      $scope.user={
        hapusguru:[]
      }
      $scope.hapus=function(){
        var id = $scope.user;
        $http.post("hapus_guru",{id:id}).success(function(){
          alert("data guru sudah dihapus");
          $scope.getdata();
        });
      };
      $scope.nonaktif=function(){
        var id = $scope.user;
        $http.post("nonaktif_guru",{id:id}).success(function(){
          $scope.getdata();
        })
      };
      $scope.edit=function(item){
        $scope.nama = item.nama;
        $scope.id = item._id;
        $scope.alamat = item.alamat;
        $scope.tempat = item.tempat;
        $scope.tanggal = item.tanggal;
        $scope.jabatan  = item.jabatan;
        $scope.notlp = item.notlp;
      }
      $scope.actionedit=function(){
        var nama = $scope.nama;
        var alamat = $scope.alamat;
        var id = $scope.id;
        var tempat = $scope.tempat;
        var tanggal = $scope.tanggal;
        var jabatan= $scope.jabatan;
        var notlp = $scope.notlp;
        var status = "aktif"
        $http.post("ubah_dataguru",{
          id:id,
          nama:nama,
          alamat:alamat,
          tempat:tempat,
          tanggal:tanggal,
          jabatan:jabatan,
          notlp:notlp,
          status:status
        }).success(function(){
          alert("data sukses di simpan");
          $scope.getdata();
        })
      }
});
mainApp.controller("datamurid",function(FotomuridUploadEdit,FotomuridUpload,$scope,$http,DTOptionsBuilder,DTColumnBuilder){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withDisplayLength(5)
          .withOption('bLengthChange', false)
          .withOption('autoWidth', false)
          .withOption('scrollX', false);
          $scope.getdata = function(){
          $http.get("ambil_datamurid").success(function(data){
            $scope.datamurid= data;
          });
      }
      $scope.getdata();
      $scope.getkelas=function(){
        $http.get("ambil_datakelas").success(function(data){
          $scope.kelas = data;
        })
      };
      $scope.getkelas();
      $scope.tambah=function(){
        var nama = $scope.nama;
        var alamat = $scope.alamat;
        var tempat = $scope.tempat;
        var tanggal = $scope.tanggal;
        var kelas = $scope.kelasku;
        var foto = $scope.foto;
        var datamurid = $scope.datamurid;
        var notlp = $scope.notlp;
        var status = "aktif";
        var uploadUrl = "tambah_murid";
        FotomuridUpload.uploadFileToUrl(nama,alamat,tempat,tanggal,kelas,notlp,status,foto,uploadUrl);
      }
      $scope.edit=function(item){
        $scope.nama = item.nama;
        $scope.alamat = item.alamat;
        $scope.tempat = item.tempat;
        $scope.tanggal = item.tanggal;
        $scope.kelasku = item.kelas;
        $scope.status = item.status;
        $scope.id = item._id;
      }

      $scope.actionedit=function(){
        var nama = $scope.nama;
        var alamat = $scope.alamat;
        var tempat = $scope.tempat;
        var tanggal = $scope.tanggal;
        var kelas = $scope.kelasku;
        var foto = $scope.foto;
        var datamurid = $scope.datamurid;
        var id = $scope.id;
        var notlp = $scope.notlp;
        var status = "aktif";
        var uploadUrl = "ubah_datamurid";
        if(foto==undefined){
          $http.post("ubah_datamuridnoimage",{
            id:id,
            nama:nama,
            alamat:alamat,
            tempat:tempat,
            tanggal:tanggal,
            kelas:kelas,
            notlp:notlp,
            status:status
          }).success(function(){
            alert("data sukses di ubah");
            $scope.getdata();
          })
        }else{
        FotomuridUploadEdit.uploadFileToUrl(id,nama,alamat,tempat,tanggal,kelas,notlp,status,foto,uploadUrl);
      }
      }
      $scope.user={
        hapusmurid:[]
      };
      $scope.hapus=function(){
        var id =$scope.user;
        $http.post("hapus_murid",{id:id}).success(function(){
          alert("data sukses dihapus");
          $scope.getdata();
        })
      }
      $scope.nonaktif=function(){
        var id = $scope.user;
        $http.post("nonaktif_murid",{id:id}).success(function(){
          $scope.getdata();
        })
      };
})
mainApp.controller("datakelas",function($scope,$http,DTOptionsBuilder,DTColumnBuilder){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withDisplayLength(5)
          .withOption('bLengthChange', false)
          .withOption('autoWidth', false)
          .withOption('scrollX', false);
          $scope.getdata = function(){
          $http.get("ambil_datakelas").success(function(data){
            $scope.datakelas= data;
          });
      }
      $scope.getdata();
      $scope.tambah=function(){
        var kelas = $scope.kelas;
        $http.post("tambah_kelas",{kelas:kelas}).success(function(){
          alert("data sukses di input");
          $scope.getdata();
        });
      };
      $scope.edit=function(item){
        $scope.kelas = item.kelas;
        $scope.id = item._id;
      };
      $scope.actionedit=function(){
        var kelas = $scope.kelas;
        var id = $scope.id;
        $http.post("ubah_datakelas",{kelas:kelas,id:id}).success(function(){
          alert("data sukses di ubah");
          $scope.getdata();
        })
      };
      $scope.user={
        hapuskelas:[]
      };
      $scope.hapus=function(){
        var id = $scope.user;
        $http.post("hapus_kelas",{id:id}).success(function(){
          alert("data sukses di hapus");
          $scope.getdata();
        })
      };
    })
    mainApp.controller("user",function(fotouseredit,FotoUserupload,$http,$scope,DTOptionsBuilder,DTColumnBuilder){
      $scope.dtOptions = DTOptionsBuilder.newOptions()
              .withDisplayLength(5)
              .withOption('bLengthChange', false)
              .withOption('autoWidth', false)
              .withOption('scrollX', false);
              $scope.getdata = function(){
              $http.get("ambil_datauser").success(function(data){
                $scope.datauser= data;
              });
          }
          $scope.getdata();
          $scope.tambah=function(){
            var nama = $scope.nama;
            var email = $scope.email;
            var password = $scope.password;
            var level = $scope.level
            var foto = $scope.foto;
            var datauser = $scope.datauser;
            var uploadUrl = "tambah_user";
              FotoUserupload.uploadFileToUrl(nama,email,password,level,foto,uploadUrl);
          }
          $scope.edit=function(item){
            $scope.nama = item.nama;
            $scope.email = item.email;
            $scope.password = item.password;
            $scope.level = item.level;
            $scope.id = item._id;
          }
          $scope.actionedit=function(){
            var nama = $scope.nama;
            var email = $scope.email;
            var password = $scope.password;
            var level = $scope.level
            var foto = $scope.foto;
            var datauser = $scope.datauser;
            var id = $scope.id;
            var uploadUrl = "ubah_datauser";
            if(foto==undefined){
              $http.post("ubah_datausernoimage",{nama:nama,email:email,password:password,level:level,id:id}).success(function(){
                alert("data sukses diubah");
                $scope.getdata()
              })
            }else{
              fotouseredit.uploadFileToUrl(id,nama,email,password,level,foto,uploadUrl);
            }
          }
          $scope.user={
            hapususer:[]
          }
          $scope.hapus=function(){
            var id = $scope.user;
            $http.post("hapus_user",{id:id}).success(function(){
              alert("data sukses dihapus");
              $scope.getdata();
            });
          };
        })
        mainApp.controller("datamatpel",function($scope,$http,DTOptionsBuilder,DTColumnBuilder){
          $scope.dtOptions = DTOptionsBuilder.newOptions()
                  .withDisplayLength(5)
                  .withOption('bLengthChange', false)
                  .withOption('autoWidth', false)
                  .withOption('scrollX', false);
                  $scope.getdata = function(){
                  $http.get("ambil_matpel").success(function(data){
                    $scope.matapel= data;
                  });
              }
              $scope.getdata();
              $scope.tambah=function(){
                var matpel=$scope.matpel;
                $http.post("tambah_matpel",{matpel:matpel}).success(function(){
                  alert("data sukses di input");
                  $scope.getdata();
                })
              }
              $scope.edit=function(item){
                $scope.matpel = item.matpel;
                $scope.id = item._id
              }
              $scope.actionedit=function(){
                var id = $scope.id ;
                var matpel = $scope.matpel;
                $http.post("ubah_datamatpel",{matpel:matpel,id:id}).success(function(){
                  alert("data sukses di ubah");
                  $scope.getdata();
                })
              }
              $scope.user={
                hapusmatpel:[]
              };
              $scope.hapus=function(){
                var id = $scope.user;
                $http.post("hapus_matpel",{id:id}).success(function(){
                  alert("data sukses dihapus");
                  $scope.getdata();
                })
              }
            })
            mainApp.controller("jadwalpel",function($scope,$http,DTOptionsBuilder,DTColumnBuilder){
              $scope.dtOptions = DTOptionsBuilder.newOptions()
                      .withDisplayLength(5)
                      .withOption('bLengthChange', false)
                      .withOption('autoWidth', false)
                      .withOption('scrollX', false);
                      $scope.getdata = function(){
                      $http.get("ambil_jadwalmatpel").success(function(data){
                        $scope.jadwalmatpel= data;
                      });
                  }
                  $scope.getdata();
                  $scope.getmurid = function(){
                    $http.get("ambil_datamurid").success(function(data){
                      $scope.murid = data
                    })
                  }
                  $scope.getmurid();
                  $scope.getdatakelas = function(){
                    $http.get("ambil_datakelas").success(function(data){
                      $scope.kelas= data;
                    })
                  }
                  $scope.getdatakelas();
                  $scope.getmatpel=function(){
                    $http.get("ambil_matpel").success(function(data){
                      $scope.matpel = data;
                    })
                  }
                  $scope.getmatpel();
                  $scope.tambah = function(){
                    var hari = $scope.hari;
                    var tanggal = $scope.tanggal;
                    var kelas = $scope.kelasku;
                    var nama = $scope.nama;
                    var matpel = $scope.matpelku;
                    $http.post("tambah_jadwalmatpel",{hari:hari,tanggal:tanggal,kelas:kelas,nama:nama,matpel:matpel}).success(function(){
                      alert("data sukses di input");
                      $scope.getdata();
                    })
                  }
                  $scope.edit=function(item){
                    $scope.hari = item.hari;
                    $scope.tanggal = item.tanggal;
                    $scope.kelasku = item.kelas;
                    $scope.nama = item.nama;
                    $scope.id = item._id;
                    $scope.matpelku = item.matpel;
                  }
                  $scope.actionedit=function(){
                    var hari = $scope.hari;
                    var tanggal = $scope.tanggal;
                    var kelas = $scope.kelasku;
                    var nama = $scope.nama;
                    var matpel = $scope.matpelku;
                    var id = $scope.id;
                    $http.post("ubah_jadwalmatpel",{id:id,hari:hari,tanggal:tanggal,kelas:kelas,nama:nama,matpel:matpel}).success(function(){
                      alert("data sukses di ubah");
                      $scope.getdata();
                    })
                  }
                  $scope.user={
                    hapusjadwalmatpel:[]
                  }
                  $scope.hapus = function(){
                    var id = $scope.user;
                    $http.post("hapus_jadwalmatpel",{id:id}).success(function(){
                      alert("data sudah di hapus");
                      $scope.getdata();
                    })
                  }
                });
                mainApp.controller("nilai",function($scope,$http,DTOptionsBuilder,DTColumnBuilder){
                  $scope.dtOptions = DTOptionsBuilder.newOptions()
                          .withDisplayLength(5)
                          .withOption('bLengthChange', false)
                          .withOption('autoWidth', false)
                          .withOption('scrollX', false);
                          $scope.getdata = function(){
                          $http.get("ambil_datanilai").success(function(data){
                            $scope.nilai= data;
                          });
                      }
                      $scope.getdata()
                      $scope.getmurid=function(){
                        $http.get("ambil_datamurid").success(function(data){
                          $scope.murid = data;
                        })
                      }
                      $scope.getmurid();
                      $scope.getkelas=function(){
                      $http.get("ambil_datakelas").success(function(data){
                        $scope.kelas = data;
                      })
                      }
                      $scope.getkelas();
                      $scope.tambah = function(){
                        var nama = $scope.nama;
                        var kelas = $scope.kelasku;
                        var uts = $scope.uts;
                        var uas = $scope.uas;
                        var jumlah = $scope.total;
                        $http.post("tambah_datanilai",{nama:nama,kelas:kelas,uts:uts,uas:uas,jumlahnilai:jumlah}).success(function(){
                          alert("nilai sudah di input");
                          $scope.getdata();
                        })
                      }
                      $scope.edit=function(item){
                        $scope.nama = item.nama;
                        $scope.kelasku = item.kelas;
                        $scope.uts = item.uts;
                        $scope.uas = item. uas;
                        $scope.total = item.jumlahnilai;
                        $scope.id = item._id;
                      }
                      $scope.actionedit=function(){
                        var nama = $scope.nama;
                        var kelas = $scope.kelasku;
                        var uts = $scope.uts;
                        var uas = $scope.uas;
                        var jumlah = $scope.total;
                        var id = $scope.id;
                        $http.post("ubah_datanilai",{id:id,nama:nama,kelas:kelas,uts:uts,uas:uas,jumlahnilai:jumlah}).success(function(){
                          alert("nilai sudah di ubah");
                          $scope.getdata();
                        })
                      }
                      $scope.user = {
                        hapusnilai:[]
                      }
                      $scope.hapus=function(){
                        var id = $scope.user;
                        $http.post("hapus_nilai",{id:id}).success(function(){
                          alert("data sukses di hapus")
                          $scope.getdata();
                        })
                      }
                })
mainApp.controller("absensiguru",function($scope,$http,DTOptionsBuilder,DTColumnBuilder){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withDisplayLength(5)
          .withOption('bLengthChange', false)
          .withOption('autoWidth', false)
          .withOption('scrollX', false);
          $scope.getdata = function(){
          $http.get("ambil_absensiguru").success(function(data){
            $scope.absensiguru= data;
          });
      }
      $scope.getdata();
      $scope.tambah=function(){
        var nama = $scope.nama;
        var keterangan = $scope.ket;
        $http.post("/tambah_absensiguru",{nama:nama,keterangan:keterangan}).success(function(){
          alert("data sukses di input");
          $scope.getdata();
        });
      };
      $scope.edit=function(item){
        $scope.nama = item.nama;
        $scope.ket = item.keterangan;
        $scope.id = item._id;
      }
      $scope.actionedit=function(){
        var nama = $scope.nama;
        var keterangan = $scope.ket;
        var id = $scope.id;
        $http.post("/ubah_absensiguru",{id:id,nama:nama,keterangan:keterangan}).success(function(){
          alert("data sukses di ubah");
          $scope.getdata();
        });
      }
      $scope.user={
        hapusabsensiguru:[]
      }
      $scope.hapus=function(){
        var id = $scope.user;
        $http.post("hapus_absensiguru",{id:id}).success(function(){
          alert("data sukses di happus");
          $scope.getdata();
        })
      }
});

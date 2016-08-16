var mainApp = angular.module("mainApp", ['ngRoute','datatables','checklist-model',"ngResource"]);
 mainApp.config(function($routeProvider) {
    $routeProvider
      .when('/dataguru', {
        templateUrl:"dataguru",
			  controller :"dataguru"
	})  .when('/datamurid', {
      templateUrl:"datamurid",
      controller :"datamurid"
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
        $http.post("simpan_dataguru",{nama:nama,alamat:alamat,tempat:tempat,tanggal:tanggal,jabatan:jabatan,notlp:notlp,status:status}).success(function(){
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
        $http.post("ubah_dataguru",{id:id,nama:nama,alamat:alamat,tempat:tempat,tanggal:tanggal,jabatan:jabatan,notlp:notlp,status:status}).success(function(){
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
        $scope.foto = item.foto;
        $scope.status = item.status;
        $scope.id = item._id;
      }
      $scope.getkelas=function(){
        $http.get("ambil_kelas").success(function(){
          $scope.kelas = data;
        })
      };
      $scope.getkelas();
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
        FotomuridUploadEdit.uploadFileToUrl(id,nama,alamat,tempat,tanggal,kelas,notlp,status,foto,uploadUrl);
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
})

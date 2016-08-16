var mainApp = angular.module("mainApp", ['ngRoute','datatables','checklist-model',"ngResource"]);
 mainApp.config(function($routeProvider) {
    $routeProvider
      .when('/dataguru', {
        templateUrl:"dataguru",
			  controller :"dataguru"
	});
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
})

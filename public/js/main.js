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

mainApp.controller("dataguru",function($http,$scope){
  $scope.dtOptions = DTOptionsBuilder.newOptions()
          .withDisplayLength(5)
          .withOption('bLengthChange', false)
          .withOption('autoWidth', false)
          .withOption('scrollX', false);
          $scope.getdata = function(){
          $http.get("lihat_gedung").success(function(data){
            $scope.gedung= data;
          });
      }
})

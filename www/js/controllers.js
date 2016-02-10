angular.module('starter.controllers', ['ui.bootstrap','ng'])

.controller('RateCtrl', function($scope) {
  
  $scope.stations = [{name: 'Grill', description: 'Burger'},
                      {name: 'Grill2', description: 'Burger'},
                      {name: 'Grill3', description: 'Burger'},
                      {name: 'Grill4', description: 'Burger'},
                      {name: 'Grill5', description: 'Burger'},
                      {name: 'Grill6', description: 'Burger'},
                      {name: 'Grill7', description: 'Burger'},
                      {name: 'Grill8', description: 'Burger'}];

})
.controller('StatsCtrl', function($scope) {
  

})




.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('DashCtrl', function($scope, $http){
  scrollToLoc('firstCard');

  $scope.averageRate = 3.2; //To be calculated on the BackEnd
  $scope.rate = Math.round($scope.averageRate);
  $scope.oneOpenOnly = true;

  //Replace that array, by pooling from server.
  $scope.stations = [{name: 'Grill', description: 'Burger'},
                      {name: 'Grill', description: 'Burger'},
                      {name: 'Grill', description: 'Burger'},
                      {name: 'Grill', description: 'Burger'},
                      {name: 'Grill', description: 'Burger'},
                      {name: 'Grill', description: 'Burger'},
                      {name: 'Grill', description: 'Burger'},
                      {name: 'Grill', description: 'Burger'}];


  function scrollToLoc(hash) {
    location.hash = "#" + hash;
  }        


  $http({
    method: 'GET',
    url: 'http://tux64-14.cs.drexel.edu:8080/weeklymenu'
  }).then(function successCallback(response) {
    console.log(response.data.days[1]);
    //console.log(root.days[0].brk[0].station_name);
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

});

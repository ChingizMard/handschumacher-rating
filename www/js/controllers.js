angular.module('starter.controllers', ['ui.bootstrap','ng'])

.controller('RateCtrl', function($scope, $rootScope) {
  

})
.controller('StatsCtrl', function($scope) {
  

})




// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// })


.controller('DashCtrl', function($scope, $http, $rootScope){
  
  


  $scope.averageRate = 3.2; //To be calculated on the BackEnd
  $scope.rate = Math.round($scope.averageRate);
  $scope.oneOpenOnly = true;
  $scope.stations = new Array();
  //Replace that array, by pooling from server.
  // $scope.stations = [{name: 'Grill', description: 'Burger'},
  //                     {name: 'Grill', description: 'Burger'},
  //                     {name: 'Grill', description: 'Burger'},
  //                     {name: 'Grill', description: 'Burger'},
  //                     {name: 'Grill', description: 'Burger'},
  //                     {name: 'Grill', description: 'Burger'},
  //                     {name: 'Grill', description: 'Burger'},
  //                     {name: 'Grill', description: 'Burger'}];


    


  $http({
    method: 'GET',
    url: 'http://tux64-14.cs.drexel.edu:8080/weeklymenu'
  }).then(function successCallback(response) {
    console.log(response.data);
    var date = new Date();
    var currentHour = date.getHours();
    var daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    var currentDate = daysOfTheWeek[date.getDay()];

    currentDate = 'monday';

    if (currentHour > 0 && currentHour < 12){
    //for(var item in JSONResponse.)

    }else if(currentHour > 12 && currentHour < 16 ){
    //Do lunch

    }else{
      //Do dinner 

      switch(currentDate) {
          case 'monday':
              for (var item in response.data.days[0].monday.din){
                var dishes = response.data.days[0].monday.din[item].items;
                var stationName = response.data.days[0].monday.din[item].station_name;
                $scope.stations.push({name: stationName, description:dishes});
              }
              break;
          case 'tuesday':
              for (var item in response.data.days[1].tuesday.din){
                $scope.stations.push(response.data.days[1].tuesday.din[item].station_name);
              }
              break;
          case 'wednesday':
              for (var item in response.data.days[2].wednesday.din){
                $scope.stations.push(response.data.days[2].wednesday.din[item].station_name);
              }
              break;
          case 'thursday':
             for (var item in response.data.days[3].thursday.din){
                $scope.stations.push(response.data.days[3].thursday.din[item].station_name);
              }
              break;
          case 'friday':
             for (var item in response.data.days[4].friday.din){
                $scope.stations.push(response.data.days[4].friday.din[item].station_name);
              }

              break;    
          default:       
      }

      $rootScope.stations = $scope.stations;

    }
    
  }, function errorCallback(response) {

    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

  //Populating stations by time
  var date = new Date();
  var currentHour = date.getHours();
  var daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  



});

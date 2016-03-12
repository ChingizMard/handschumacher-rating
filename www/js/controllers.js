angular.module('starter.controllers', ['ui.bootstrap', 'ng'])


.controller('RateCtrl', function($scope, $rootScope, $http,  $ionicPopup) {


    $scope.namesAndRates = new Array();
    console.log($rootScope.stations);
    for (station in $rootScope.stations){
        $scope.namesAndRates.push({name: $rootScope.stations[station].name, rating: 0});
    }


    $scope.submitData = function() {
        var date = new Date();
        var currentHour = date.getHours() * 100 + date.getMinutes();

        currentHour = 100;
        
        for (entry in $scope.namesAndRates){
            if (currentHour > 0 && currentHour < 1200){
                //brk
                console.log($scope.namesAndRates[entry].rating);
                var uri = 'http://tux64-14.cs.drexel.edu:9000/rating/brk/' + $scope.namesAndRates[entry].name;
                if ($scope.namesAndRates[entry].rating != 0){
                    $http({
                        method: 'POST',
                        url: uri,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                        },
                        data: {rating: $scope.namesAndRates[entry].rating}
                    }).success(function (response) {
                        console.log(response);
                    });
                }
            }else if(currentHour > 1200 && currentHour < 1600){
                //lun
                var uri = 'http://tux64-14.cs.drexel.edu:9000/rating/lun/' + $scope.namesAndRates[entry].name;
                if ($scope.namesAndRates[entry].rating != 0){ 
                    $http({
                        method: 'POST',
                        url: uri,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                        },
                        data: {rating: $scope.namesAndRates[entry].rating}
                    }).success(function (response) {
                        console.log(response);
                    });
                }
            }else{
                var uri = 'http://tux64-14.cs.drexel.edu:9000/rating/din/' + $scope.namesAndRates[entry].name;
                if ($scope.namesAndRates[entry].rating != 0){
                    $http({
                        method: 'POST',
                        url: uri,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                        },
                        data: {rating: $scope.namesAndRates[entry].rating}
                    }).success(function (response) {
                        console.log(response);
                    });
                }
            }
            
        }
        $ionicPopup.alert({
              title: 'Success',
              content: 'Thank you for your votes!'
        }).then(function(res) {
              
        });

    }

})



.controller('StatsCtrl', function($scope, $http) {
// Options for the bar graph
  $scope.options = {
    chart: {
      type: 'discreteBarChart',
      height: 450,
      margin : {
        top: 20,
        right: 20,
        bottom: 50,
        left: 55
      },
      x: function(d){ return d.label; },
      y: function(d){ return d.value; },
      showValues: true,
      valueFormat: function(d){
        return d3.format(',.4f')(d);
      },
      duration: 500,
      xAxis: {
        axisLabel: 'Station Name'
      },
      yAxis: {
        axisLabel: 'Average Rating',
        axisLabelDistance: -10
      }
    }
  };

  // The data object which has a two-way binding with the view
  $scope.data = [
    {
      key: "Average Rating",
      values: []
    }
  ];

  // Request the current day graph
  $http({
    method: 'GET',
    url: 'http://tux64-14.cs.drexel.edu:9000/day_graph/current'
  })
  .then(function successCallback(response) {
    // Build the data array, then send to D3.
    for (var i in response.data.stations) {
      $scope.data[0].values.push({
        "label": response.data.stations[i].station_name,
        "value": response.data.stations[i].avg_rating
      });
    }
  }, function errorCallback(response) {
    // If there was an error
    console.log(response);
  });

})



.controller('DashCtrl', function($scope, $http, $rootScope, $timeout) {

    $scope.$on('$ionicView.enter', function() {
        // code to run each time view is entered
    


    $scope.averageRate = 0; //To be calculated on the BackEnd
    $scope.averageRateFinal = 0;
    $scope.rate = Math.round($scope.averageRate);
    $scope.oneOpenOnly = true;
    $scope.stations = new Array();
    
    $scope.one = 0;
    $scope.two = 0;
    $scope.three = 0;
    $scope.four = 0;
    $scope.five = 0;
    $scope.totalVotes = 0;



    $http({
        method: 'GET',
        url: 'http://tux64-14.cs.drexel.edu:9000/weeklymenu'
    }).then(function successCallback(response) {
        
        var date = new Date();
        var currentHour = date.getHours() * 100 + date.getMinutes();
        var daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        var currentDate = daysOfTheWeek[date.getDay()];


        //DONOT FORGET TO REMOVE
        //
        //
        //
        //
        //
        //

        currentDate = 'monday';
        currentHour = 100;

        

        if (currentHour > 0 && currentHour < 1200) {
            //for(var item in JSONResponse.)
            //Do breakfast
            
            switch (currentDate) {
                case 'monday':
                    for (var item in response.data.days[0].monday.brk) {
                        var dishes = response.data.days[0].monday.brk[item].items;
                        var stationName = response.data.days[0].monday.brk[item].station_name;

                        // Call the get rating for station
                        // $scope.stationNames.push({
                        //     name: stationName,
                        //     description: dishes
                        // });
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'tuesday':
                    for (var item in response.data.days[1].tuesday.brk) {
                        var dishes = response.data.days[1].tuesday.brk[item].items;
                        var stationName = response.data.days[1].tuesday.brk[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'wednesday':
                    for (var item in response.data.days[2].wednesday.brk) {
                        var dishes = response.data.days[2].wednesday.brk[item].items;
                        var stationName = response.data.days[2].wednesday.brk[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'thursday':
                    for (var item in response.data.days[3].thursday.brk) {
                        var dishes = response.data.days[3].thursday.brk[item].items;
                        var stationName = response.data.days[3].thursday.brk[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'friday':
                    for (var item in response.data.days[4].friday.brk) {
                        var dishes = response.data.days[4].friday.brk[item].items;
                        var stationName = response.data.days[4].friday.brk[item].station_name;
                        populateRating(stationName, dishes);
                    }

                    break;
                default:
            }

            $rootScope.stations = $scope.stations;

        } else if (currentHour > 1200 && currentHour < 1600) {
            //Do lunch
            console.log("Lunch Time");
            switch (currentDate) {
                case 'monday':
                    for (var item in response.data.days[0].monday.lun) {
                        var dishes = response.data.days[0].monday.lun[item].items;
                        var stationName = response.data.days[0].monday.lun[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'tuesday':
                    for (var item in response.data.days[1].tuesday.lun) {
                        var dishes = response.data.days[1].tuesday.lun[item].items;
                        var stationName = response.data.days[1].tuesday.lun[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'wednesday':
                    for (var item in response.data.days[2].wednesday.lun) {
                        var dishes = response.data.days[2].wednesday.lun[item].items;
                        var stationName = response.data.days[2].wednesday.lun[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'thursday':
                    for (var item in response.data.days[3].thursday.lun) {
                        var dishes = response.data.days[3].thursday.lun[item].items;
                        var stationName = response.data.days[3].thursday.lun[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'friday':
                    for (var item in response.data.days[4].friday.lun) {
                        var dishes = response.data.days[4].friday.lun[item].items;
                        var stationName = response.data.days[4].friday.lun[item].station_name;
                        populateRating(stationName, dishes);
                    }

                    break;
                default:
            }

            $rootScope.stations = $scope.stations;

        } else {
            //Do dinner 
            console.log("Dinner Time");
            switch (currentDate) {
                case 'monday':
                    for (var item in response.data.days[0].monday.din) {
                        var dishes = response.data.days[0].monday.din[item].items;
                        var stationName = response.data.days[0].monday.din[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'tuesday':
                    for (var item in response.data.days[1].tuesday.din) {
                        var dishes = response.data.days[1].tuesday.din[item].items;
                        var stationName = response.data.days[1].tuesday.din[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'wednesday':
                    for (var item in response.data.days[2].wednesday.din) {
                        var dishes = response.data.days[2].wednesday.din[item].items;
                        var stationName = response.data.days[2].wednesday.din[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'thursday':
                    for (var item in response.data.days[3].thursday.din) {
                        var dishes = response.data.days[3].thursday.din[item].items;
                        var stationName = response.data.days[3].thursday.din[item].station_name;
                        populateRating(stationName, dishes);
                    }
                    break;
                case 'friday':
                    for (var item in response.data.days[4].friday.din) {
                        var dishes = response.data.days[4].friday.din[item].items;
                        var stationName = response.data.days[4].friday.din[item].station_name;
                        populateRating(stationName, dishes);
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


    var populateRating = function(name, description){
        
        //console.log($scope.stations[data].name);
        var requestString = "";
        var date = new Date();
        var currentHour = date.getHours() * 100 + date.getMinutes();

        //Design of the data storage
        currentHour = 100;


        if (currentHour > 0 && currentHour < 1200){
            requestString = 'http://tux64-14.cs.drexel.edu:9000/rating/' + 'brk/' + name;
            
            $http({
                method: 'GET',
                url: requestString
            }).then(function successCallback(response) {
                
                //Calculate number of votes
                console.log(response.data);
                try{
                    var numberOfVotes = response.data.ratings[1] + 
                                        response.data.ratings[2] + 
                                        response.data.ratings[3] + 
                                        response.data.ratings[4] + 
                                        response.data.ratings[5];
                    

                    /////////


                    $scope.averageRate += response.data.avg_rating;
                    $scope.one += response.data.ratings[1];
                    $scope.two += response.data.ratings[2];
                    $scope.three += response.data.ratings[3];
                    $scope.four += response.data.ratings[4];
                    $scope.five += response.data.ratings[5];
                }catch(err){
                    
                    numberOfVotes = 0;
                    $scope.averageRate = 0;
                    $scope.one = 0;
                    $scope.two = 0;
                    $scope.three = 0;
                    $scope.four = 0;
                    $scope.five = 0;
                }

                if (numberOfVotes != 0){
                    $scope.stations.push({
                        name: name,
                        description: description,
                        ratings : response.data,
                        numberOfOne: response.data.ratings[1] / numberOfVotes * 100,
                        numberOfTwo: response.data.ratings[2] / numberOfVotes * 100,
                        numberOfThree: response.data.ratings[3] / numberOfVotes * 100,
                        numberOfFour: response.data.ratings[4] / numberOfVotes * 100,
                        numberOfFive: response.data.ratings[5] / numberOfVotes * 100,
                    });
                }else{
                    console.log("Here")
                    $scope.stations.push({
                        name: name,
                        description: description,
                        ratings : 0,
                        numberOfOne: 0,
                        numberOfTwo: 0,
                        numberOfThree: 0,
                        numberOfFour: 0,
                        numberOfFive: 0,
                    });
                }
                

            }, function errorCallback(response) {

            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });


        }else if(currentHour > 1200 && currentHour < 1600){
            requestString = 'http://tux64-14.cs.drexel.edu:9000/rating/' + 'lun/' + name;
            $http({
                method: 'GET',
                url: requestString
            }).then(function successCallback(response) {
                
                //Calculate number of votes
                var numberOfVotes = response.data.ratings[1] + 
                                    response.data.ratings[2] + 
                                    response.data.ratings[3] + 
                                    response.data.ratings[4] + 
                                    response.data.ratings[5];

                /////////


                $scope.averageRate += response.data.avg_rating;
                $scope.one += response.data.ratings[1];
                $scope.two += response.data.ratings[2];
                $scope.three += response.data.ratings[3];
                $scope.four += response.data.ratings[4];
                $scope.five += response.data.ratings[5];
                

                $scope.stations.push({
                    name: name,
                    description: description,
                    ratings : response.data,
                    numberOfOne: response.data.ratings[1] / numberOfVotes * 100,
                    numberOfTwo: response.data.ratings[2] / numberOfVotes * 100,
                    numberOfThree: response.data.ratings[3] / numberOfVotes * 100,
                    numberOfFour: response.data.ratings[4] / numberOfVotes * 100,
                    numberOfFive: response.data.ratings[5] / numberOfVotes * 100,
                });
                console.log(response.data);

            }, function errorCallback(response) {

            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
        }else{
            requestString = 'http://tux64-14.cs.drexel.edu:9000/rating/' + 'din/' + name;
            $http({
                method: 'GET',
                url: requestString
            }).then(function successCallback(response) {
                
                //Calculate number of votes
                var numberOfVotes = response.data.ratings[1] + 
                                    response.data.ratings[2] + 
                                    response.data.ratings[3] + 
                                    response.data.ratings[4] + 
                                    response.data.ratings[5];

                /////////


                $scope.averageRate += response.data.avg_rating;
                $scope.one += response.data.ratings[1];
                $scope.two += response.data.ratings[2];
                $scope.three += response.data.ratings[3];
                $scope.four += response.data.ratings[4];
                $scope.five += response.data.ratings[5];
                

                $scope.stations.push({
                    name: name,
                    description: description,
                    ratings : response.data,
                    numberOfOne: response.data.ratings[1] / numberOfVotes * 100,
                    numberOfTwo: response.data.ratings[2] / numberOfVotes * 100,
                    numberOfThree: response.data.ratings[3] / numberOfVotes * 100,
                    numberOfFour: response.data.ratings[4] / numberOfVotes * 100,
                    numberOfFive: response.data.ratings[5] / numberOfVotes * 100,
                });
                console.log(response.data);

            }, function errorCallback(response) {

            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
        }

    }

    $timeout(function(){
        
        
        if ($scope.one == null){$scope.one = 0};
        if ($scope.two == null){$scope.two = 0};
        if ($scope.three == null){$scope.three = 0};
        if ($scope.four == null){$scope.four = 0};
        if ($scope.five == null){$scope.five = 0};
        $scope.totalVotes = $scope.one + $scope.two + $scope.three + $scope.four + $scope.five;
        //console.log($scope.one + $scope.two + $scope.three + $scope.four + $scope.five);
        //console.log($scope.totalVotes);
        
        if($scope.totalVotes != 0){
            $scope.one = $scope.one / $scope.totalVotes * 100;
            $scope.two = $scope.two / $scope.totalVotes * 100;
            $scope.tree = $scope.three / $scope.totalVotes * 100;
            $scope.four = $scope.four / $scope.totalVotes * 100;
            $scope.five = $scope.five / $scope.totalVotes * 100;
        }
        //var temp = 

        
        $scope.averageRate = ($scope.averageRate / $scope.stations.length).toFixed(1);
        $scope.averageRateFinal = $scope.averageRate;

        
        


    }, 300);

});

});
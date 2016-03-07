angular.module('starter.controllers', ['ui.bootstrap', 'ng'])


.controller('RateCtrl', function($scope, $rootScope) {


    })
    .controller('StatsCtrl', function($scope) {


    })



.controller('DashCtrl', function($scope, $http, $rootScope) {




    $scope.averageRate = 3.2; //To be calculated on the BackEnd
    $scope.rate = Math.round($scope.averageRate);
    $scope.oneOpenOnly = true;
    $scope.stations = new Array();


    $http({
        method: 'GET',
        url: 'http://tux64-14.cs.drexel.edu:8080/weeklymenu'
    }).then(function successCallback(response) {
        console.log(response.data);
        var date = new Date();
        var currentHour = date.getHours() * 100 + date.getMinutes();
        var daysOfTheWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        var currentDate = daysOfTheWeek[date.getDay()];

        currentDate = 'monday';
        console.log(currentHour);

        if (currentHour > 0 && currentHour < 1200) {
            //for(var item in JSONResponse.)
            //Do breakfast
            console.log("Breakfast Time");
            switch (currentDate) {
                case 'monday':
                    for (var item in response.data.days[0].monday.brk) {
                        var dishes = response.data.days[0].monday.brk[item].items;
                        var stationName = response.data.days[0].monday.brk[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'tuesday':
                    for (var item in response.data.days[1].tuesday.brk) {
                        var dishes = response.data.days[1].tuesday.brk[item].items;
                        var stationName = response.data.days[1].tuesday.brk[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'wednesday':
                    for (var item in response.data.days[2].wednesday.brk) {
                        var dishes = response.data.days[2].wednesday.brk[item].items;
                        var stationName = response.data.days[2].wednesday.brk[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'thursday':
                    for (var item in response.data.days[3].thursday.brk) {
                        var dishes = response.data.days[3].thursday.brk[item].items;
                        var stationName = response.data.days[3].thursday.brk[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'friday':
                    for (var item in response.data.days[4].friday.brk) {
                        var dishes = response.data.days[4].friday.brk[item].items;
                        var stationName = response.data.days[4].friday.brk[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
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
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'tuesday':
                    for (var item in response.data.days[1].tuesday.lun) {
                        var dishes = response.data.days[1].tuesday.lun[item].items;
                        var stationName = response.data.days[1].tuesday.lun[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'wednesday':
                    for (var item in response.data.days[2].wednesday.lun) {
                        var dishes = response.data.days[2].wednesday.lun[item].items;
                        var stationName = response.data.days[2].wednesday.lun[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'thursday':
                    for (var item in response.data.days[3].thursday.lun) {
                        var dishes = response.data.days[3].thursday.lun[item].items;
                        var stationName = response.data.days[3].thursday.lun[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'friday':
                    for (var item in response.data.days[4].friday.lun) {
                        var dishes = response.data.days[4].friday.lun[item].items;
                        var stationName = response.data.days[4].friday.lun[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
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
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'tuesday':
                    for (var item in response.data.days[1].tuesday.din) {
                        var dishes = response.data.days[1].tuesday.din[item].items;
                        var stationName = response.data.days[1].tuesday.din[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'wednesday':
                    for (var item in response.data.days[2].wednesday.din) {
                        var dishes = response.data.days[2].wednesday.din[item].items;
                        var stationName = response.data.days[2].wednesday.din[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'thursday':
                    for (var item in response.data.days[3].thursday.din) {
                        var dishes = response.data.days[3].thursday.din[item].items;
                        var stationName = response.data.days[3].thursday.din[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
                    }
                    break;
                case 'friday':
                    for (var item in response.data.days[4].friday.din) {
                        var dishes = response.data.days[4].friday.din[item].items;
                        var stationName = response.data.days[4].friday.din[item].station_name;
                        $scope.stations.push({
                            name: stationName,
                            description: dishes
                        });
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




});
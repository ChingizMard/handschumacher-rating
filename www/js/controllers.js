angular.module('starter.controllers', ['ui.bootstrap'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('DashCtrl', function($scope){
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

});

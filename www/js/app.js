angular.module('starter', ['ionic','starter.controller','starter.service','ngCookies'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('dashboard',{
    url:'/dashboard/',
    templateUrl:'templates/dashboard.html',
    controller:'dashboardController'
  })

  .state('apartment',{
    url:'/apartment/:id',
    templateUrl:'templates/apartment/index.html',
    controller:'apartmentController'
  })
  .state('highlight',{
    url:'/apartment/highlight/:id/:cat_id/:level',
    templateUrl:'templates/apartment/highlight.html',
    controller:'highlightController'
  })
  .state('usefull_info',{
    url:'/apartment/usefull_info/:id/:cat_id/:level',
    templateUrl:'templates/apartment/usefull_info.html',
    controller:'usefullinfoController'
  })

  .state('lease_available',{
    url:'/apartment/lease_available/:id/:cat_id/:level',
    templateUrl:'templates/apartment/lease_available.html',
    controller:'leaseAvailableController'
  })

  .state('class_commuities',{
    url:'/class_commuities',
    templateUrl:'templates/class_communities/index.html',
    controller:'classCommunitiesController'
  })

  .state('events_upcoming',{
    url:'/events_upcoming',
    templateUrl:'templates/events_upcoming/index.html',
    controller:'eventsUpcomingController'
  })

  $urlRouterProvider.otherwise('apartment/null');
})
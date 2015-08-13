angular.module('starter.controller',[])

.directive('repeatDone', function() {
	return function(scope, element, attrs) {
		if (scope.$last) { // all are rendered
			scope.$eval(attrs.repeatDone);
		}
	}
})

.controller('dashboardController',function($rootScope, authService){
	authService.login('admin');

	var sidebar = document.getElementById('sidebar');
	var swiper_menu = document.getElementById('swiper-menu');
	$rootScope.site_url = 'http://bj.1000unit.com/';
	//$rootScope.site_url = 'http://localhost/cms_bj/';

	//Open Menu
	$rootScope.openMenu = function(){
		if(sidebar.className == 'null' || sidebar.className == '') {
			move(sidebar)
			.set('left', 0)
			.end();

			move(swiper_menu)
			.set('left','240px')
			.set('width','100%')
			.end();

			sidebar.className = 'open-sidebar';
		} else {
			move(sidebar)
			.set('left', '-240px')
			.end();

			move(swiper_menu)
			.set('left',0)
			.set('width','5px')
			.end();
			sidebar.className = '';
		}
	}

	$rootScope.swipeMenuRight = function(){
		move(sidebar)
		.set('left', 0)
		.end(function(){
			move(swiper_menu)
			.set('left','240px')
			.set('width','100%')
			.end();
		});

		sidebar.className = 'open-sidebar';
	}

	$rootScope.swipeMenuLeft = function(){
		move(sidebar)
		.set('left', '-240px')
		.end();

		move(swiper_menu)
		.set('left',0)
		.set('width','5px')
		.end();

		sidebar.className = '';
	}

	$rootScope.lazyLoadImage = function(){
		$(".lazy").lazyload({
		    effect : "fadeIn",
		});
	}
})

.controller('apartmentController', function($rootScope, $scope,$http,$stateParams){
	$http.get($rootScope.site_url + 'api/apartment/list?id=' + $stateParams.id)
	.success(function(data){
		$scope.data = data;
	})

	$scope.setSwiperSlide = function(){
		var swiper = new Swiper('.swiper-container', {
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        preloadImages: true,
	        lazyLoading: true,
	    });
	    $('.swiper-pagination, .swiper-button-next, .swiper-button-prev').show('slow');
	}
})

.controller('highlightController',function($rootScope, $scope, $http, $stateParams) {
	$http.get($rootScope.site_url + 'api/apartment/category?id=' + $stateParams.id + '&category_id=1&level=' + $stateParams.level)
	.success(function(data){
		$scope.data = data;
	})
})

.controller('usefullinfoController',function($rootScope, $scope, $http, $stateParams) {
	$http.get($rootScope.site_url + 'api/apartment/category?id=' + $stateParams.id + '&category_id=3&level=' + $stateParams.level)
	.success(function(data){
		$scope.data = data;
	})
})

.controller('leaseAvailableController',function($rootScope, $scope, $http, $stateParams) {
	$http.get($rootScope.site_url + 'api/apartment/category?id=' + $stateParams.id + '&category_id=4&level=' + $stateParams.level)
	.success(function(data){
		$scope.data = data;
	})
})

.controller('classCommunitiesController',function($rootScope, $scope, $http, $state, $stateParams, $ionicPopup) {
	$http.get($rootScope.site_url + 'api/class_communities/list')
	.success(function(data){
		if(data.list.length > 0) {
			$scope.data = data;
		} else {
			var alertPopup = $ionicPopup.alert({
				title: 'Balconies Jakarta',
				template: 'No have item on class & communities'
			});
			alertPopup.then(function(res) {
				$state.go('apartment');
			});
		}
	})	
})

.controller('eventsUpcomingController',function($rootScope, $scope, $http, $state, $stateParams, $ionicPopup) {
	$http.get($rootScope.site_url + 'api/events/list')
	.success(function(data){
		if(data.list.length > 0) {
			$scope.data = data;
		} else {
			var alertPopup = $ionicPopup.alert({
				title: 'Balconies Jakarta',
				template: 'No have item on Events Upcoming'
			});
			alertPopup.then(function(res) {
				$state.go('apartment');
			});
		}
	})	
})
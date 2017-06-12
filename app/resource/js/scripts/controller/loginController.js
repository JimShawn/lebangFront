define(['app','cryptojs','httpService','jquery','css!../../../css/lib/bootstrap.css','css!../../../css/lib/animate.css',
  'css!../../../css/lib/custom.css','css!../../../css/lib/font-awesome.css','css!../../../css/lib/nprogress.css'], function(app,CryptoJS,httpService) {
    app.controller('LoginController',
            function($scope, $location,$state,httpService) {
            	
 				$scope.login = function(){
 					var password = $scope.password;
	            	for (var i = 0; i < 273; i++) {
	            		password = CryptoJS.MD5(password+"cheanxin");
	            	};
 					httpService.login($scope.userName,password).then(function(res){
 						console.log(res);
 						$state.go('main');
 					},function(err){
						console.log(res);
 					});
 					// $state.go('main');
 				};
            });
});
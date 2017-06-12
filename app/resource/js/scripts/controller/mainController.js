define(['app','httpService','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','fastclick','nprogress','chart',
	'gauge','bootstrapprogressbar','icheck','skycons',
	'flotpie','flottime','flotstack','flotresize','flotoderBars','flotspline','floecurvedLines',
	'datejs','jqvmapWorld','jqvmapSampleData','mainInitService'], function(app,httpService) {
    app.controller('mainController',['$scope','$window','$location','$state','mainService','httpService',function($scope,$window, $location,$state,mainService,httpService) {
 				$scope.$watch('$viewContentLoaded', function() {  
            			mainService.domOperator();
            			$state.go("main.homepage");
        			});  
                if(!$window.sessionStorage["userInfo"]){
                    return;
                    }
                var user = JSON.parse($window.sessionStorage["userInfo"]);
                if (user) {
                    $scope.nickname = user.data.nickname;
                };
                $scope.logout = function () {
                    httpService.logout().then(function () {
                        $state.go("login");
                    },function (err) {
                    });
                };
                
 				 
            }]
            );
});
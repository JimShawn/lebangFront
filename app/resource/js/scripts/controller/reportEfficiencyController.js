define(['app','httpService','commonUtil','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/lib/dataTables.bootstrap.css','css!../../../css/lib/buttons.bootstrap.css'
	,'css!../../../css/lib/fixedHeader.bootstrap.css','css!../../../css/lib/responsive.bootstrap.css','css!../../../css/lib/scroller.bootstrap.css','footer'], function(app,httpService,commonUtil) {
    app.controller('reportEfficiencyController',['$scope','$location','$state','httpService','commonUtil',function($scope, $location,$state,httpService,commonUtil) {
 				var queryObj = {
 					monthg:12
 				};
 				httpService.getReviewerStatic(queryObj).then(function (res) {
 					console.log(res);
 					var data = res.data;
 					var idString = "";
 					for (var i = 0; i < data.length; i++) {
 						if (i==data.length-1) {
 							idString += data[i].reviewerUserId;
 						}else{
							idString += data[i].reviewerUserId+",";
 						}
 						
 					};
 					httpService.getReviewerStaticByUser(idString).then(function (res1) {
 						$scope.showData = res1.data;
 						for (var i = 0; i < $scope.showData.length; i++) {
 							for (var j = 0; j < data.length; j++) {
 								if (data[j].reviewerUserId == $scope.showData[i].reviewerUserId) {
 									$scope.showData[i].totalData = data[j];
 								}
 							}
 						}
 					},function (err1) {
 						// body...
 					});
 				},function (err) {
 					console.log(err);
 				});
 				


                   

            }

 				 
            ]
            );
});
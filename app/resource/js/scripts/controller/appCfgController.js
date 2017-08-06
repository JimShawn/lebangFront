define(['app','httpService','commonUtil','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/lib/dataTables.bootstrap.css','css!../../../css/lib/buttons.bootstrap.css'
	,'css!../../../css/lib/fixedHeader.bootstrap.css','css!../../../css/lib/responsive.bootstrap.css','css!../../../css/lib/scroller.bootstrap.css','footer'], function(app,httpService,commonUtil) {
    app.controller('appCfgController',['$scope','$location','$state','httpService','commonUtil',function($scope, $location,$state,httpService,commonUtil) {
 				$scope.commonUtil = commonUtil;
 				$scope.changePageSizeFun = function(size){
 						var queryObj = {
	 						page:$scope.data.number,
	 						size:size
 						};
            			$scope.query(queryObj);
 				};
 				$scope.gotoPageFun = function(page){
 					var queryObj = {
 						page:page,
 						size:$scope.data.size
 					}
            			$scope.query(queryObj);
 				};
 				$scope.query = function (queryObj) {
 					httpService.getAppList(queryObj).then(function (res) {
 						console.log(res);
 						$scope.data = res.data;
 					},function (err) {
 						console.log(err);
 					})
 				};
 				$scope.query(null);
 				$scope.showInsertAppDialog = function(item){
 					$scope.selectedItem = item;
 					$('#myModal1').modal('show');
 				};

				$('#myModal1').on('hidden.bs.modal', function () {
				  $scope.appName = "";
				  $scope.callbackUrl = "";
				});
				$('#myModal2').on('hidden.bs.modal', function () {
				  $scope.selectedApp = {};
				})
 				$scope.doInsert = function (argument) {
 					if(!$scope.appName)return;
 					if(!$scope.callbackUrl)return;
 					var appObj = {
 						clientId:$scope.appName,
 						webServerRedirectUri:$scope.callbackUrl
 					};
 					httpService.appCreate(appObj).then(function (res) {
 						console.log(res);
 						$('#myModal1').modal('hide');
 						$scope.query(null);
 					},function (err) {
 						// body...
 					})
 				};
 				$scope.deleteItem = function (item) {
 					// body...
 					httpService.appDelete(item.id).then(function (res) {
 						console.log(res);
 						$scope.query(null);
 					},function (err) {
 						console.log(err);
 					});
 				}
 				$scope.openDetailDialog = function (item) {
 					$scope.selectedApp = angular.copy(item);
 					$('#myModal2').modal('show');
 				};
 				$scope.doUpdate = function () {
 					if(!$scope.selectedApp.appName)return;
 					if(!$scope.selectedApp.callbackUrl)return;
 					var appObj = {
 						clientId:$scope.appName,
 						webServerRedirectUri:$scope.callbackUrl
 					};
 				}

 				 
            }]
            );
});
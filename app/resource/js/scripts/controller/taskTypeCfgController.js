define(['app','httpService','commonUtil','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/lib/dataTables.bootstrap.css','css!../../../css/lib/buttons.bootstrap.css'
	,'css!../../../css/lib/fixedHeader.bootstrap.css','css!../../../css/lib/responsive.bootstrap.css','css!../../../css/lib/scroller.bootstrap.css','footer'], function(app,httpService,commonUtil) {
    app.controller('taskTypeCfgController',['$scope','$location','$state','httpService','commonUtil',function($scope, $location,$state,httpService,commonUtil) {
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
 					httpService.getTaskTypeList(queryObj).then(function (res) {
 						console.log(res);
 						$scope.data = res.data;
 					},function (err) {
 						console.log(err);
 					})
 				};
 				$scope.query(null);
 				$scope.showInsertTaskTypeDialog = function(item){
 					$scope.selectedItem = item;
 					$('#myModal1').modal('show');
 				};
 				$scope.doInsert = function (argument) {
 					var taskTypeObj = {
 						name:$scope.tasktypeName,
 						enabled:1
 					};
 					httpService.taskTypeCreat(taskTypeObj).then(function (res) {
 						console.log(res);
 						$('#myModal1').modal('hide');
 						$scope.query(null);
 					},function (err) {
 						// body...
 					})
 				};
 				$scope.openDetailDialog = function (item) {
 					$scope.selectedTaskType = item;
 					$('#myModal2').modal('show');
 				}

 				 
            }]
            );
});
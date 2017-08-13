define(['app','httpService','commonUtil','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/lib/dataTables.bootstrap.css','css!../../../css/lib/buttons.bootstrap.css'
	,'css!../../../css/lib/fixedHeader.bootstrap.css','css!../../../css/lib/responsive.bootstrap.css','css!../../../css/lib/scroller.bootstrap.css','footer'], function(app,httpService,commonUtil) {
    app.controller('taskAuditLogController',['$scope','$location','$state','httpService','commonUtil',function($scope, $location,$state,httpService,commonUtil) {
 				$scope.commonUtil = commonUtil;
 				$scope.changePageSizeFun = function(size){
 						var queryObj = {
	 						page:$scope.data.number,
	 						size:size,
	 						status:"2,3,4"
 						};
            			$scope.query(queryObj);
 				};
 				$scope.gotoPageFun = function(page){
 					var queryObj = {
 						page:page,
 						size:$scope.data.size,
 						status:"2,3,4"
 					}
            			$scope.query(queryObj);
 				};
 				$scope.query = function (queryObj) {
 					httpService.getUserTaskList(queryObj).then(function (res) {
 						console.log(res);
 						$scope.data = res.data;
 					},function (err) {
 						console.log(err);
 					})
 				};
 				var queryOriObj = {
 					page:0,
 					size:10,
 					status:"2,3,4"
 				};
 				//任务状态数组
 				$scope.statuses = [{id:2,name:'通过'},{id:3,name:'不通过'}];
 				//获取任务类型数组
 				httpService.getTaktypeListAll().then(function (res) {
 					$scope.taskTypes = res.data;
 				},function (err) {
 					$scope.taskTypes = [];
 				});
 				//获取app数组
 				httpService.getAppList({page:0,size:100}).then(function (res) {
 						console.log(res);
 						$scope.apps = res.data.content;
 					},function (err) {
 						console.log(err);
 					})
 				$scope.query(queryOriObj);
 				$scope.openDetailDialog = function (item) {
 					$scope.selectedTask = item;
 					
 					
 					$('#myModal2').modal('show');
 				};
 				$scope.changeCondition = function () {
 					var temObj = {
 						page:$scope.data.page,
 						size:$scope.data.size,
 						taskName:$scope.selectedName || ""
 					};
 					if($scope.selectedStatus)temObj.status= $scope.selectedStatus.id;
 					if($scope.selectedApp)temObj.appName= $scope.selectedApp.clientId;
 					if($scope.selectedTaskType)temObj.taskTypeName= $scope.selectedTaskType.name;
 					
 					$scope.query(temObj);
 				}
 				 
            }]
            );
});
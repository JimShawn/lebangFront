define(['app','httpService','commonUtil','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/lib/dataTables.bootstrap.css','css!../../../css/lib/buttons.bootstrap.css'
	,'css!../../../css/lib/fixedHeader.bootstrap.css','css!../../../css/lib/responsive.bootstrap.css','css!../../../css/lib/scroller.bootstrap.css','footer'], function(app,httpService,commonUtil) {
    app.controller('taskAuditController',['$scope','$location','$state','httpService','commonUtil',function($scope, $location,$state,httpService,commonUtil) {
 				$scope.commonUtil = commonUtil;
 				$scope.changePageSizeFun = function(size){
 						var queryObj = {
	 						page:$scope.data.number,
	 						size:size,
	 						status:1
 						};
            			$scope.query(queryObj);
 				};
 				$scope.gotoPageFun = function(page){
 					var queryObj = {
 						page:page,
 						size:$scope.data.size,
 						status:1
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
 					status:1
 				};
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
 				$scope.pageLeft = function(){
 					$("#myCarousel").carousel('prev');
 				};
 				$scope.pageRight = function(){
 					$("#myCarousel").carousel('next');
 				};
 				$scope.showDialog = function(item,index){
 					$scope.selectedItem = item;
 					$scope.selectedIndex = index;
 					var selectedTempPicArray = $scope.selectedItem.images.split(',');
 					$scope.selectedPicArray = [];
 					for (var i = 0; i < selectedTempPicArray.length; i++) {
 						var temp = {
 							url:selectedTempPicArray[i]
 						};
 						$scope.selectedPicArray.push(temp);
 					}
 					$('#myModal').modal('show');
 					$("#myCarousel").carousel(index);
 				};
 				
 				$scope.showRefuseDialog = function(item){
 					$scope.selectedItem = item;
 					$('#myModal1').modal('show');
 				};
 				$scope.showPassDialog = function(item){
 					$scope.selectedItem = item;
 					$('#myModal3').modal('show');
 				};
 				$scope.doPass = function(item){
 					httpService.operateUserTask(item.id,2,{}).then(function (res) {
 						console.log(res);
 						var queryObj2 = {
	 						page:$scope.data.number,
	 						size:$scope.data.size,
	 						status:1
 						};
 						$scope.query(queryObj2);
 						$('#myModal3').modal('hide');
 					},function (err) {
 						console.log(err);
 						$('#myModal3').modal('hide');
 					})
 				};
 				$scope.doRefuse = function(){
 					var obj = {
 						remark:$scope.refuseReason
 					};
 					httpService.operateUserTask($scope.selectedItem.id,3,obj).then(function (res) {
 						console.log(res);
 						var queryObj2 = {
	 						page:$scope.data.number,
	 						size:$scope.data.size,
	 						status:1
 						};
 						$scope.query(queryObj2);
 						$('#myModal1').modal('hide');
 					},function (err) {
 						console.log(err);
 						$('#myModal1').modal('hide');
 					})
 				};

 				$scope.openDetailDialog = function (item) {
 					$scope.selectedTask = item;
 					$('#myModal2').modal('show');
 				};

 				$scope.changeCondition = function () {
 					var temObj = {
 						page:$scope.data.page,
 						size:$scope.data.size,
 						status:1,
 						taskName:$scope.selectedName || ""
 					};
 					if($scope.selectedApp)temObj.appName= $scope.selectedApp.clientId;
 					if($scope.selectedTaskType)temObj.taskTypeName= $scope.selectedTaskType.name;
 					
 					$scope.query(temObj);
 				}
 				 
            }]
            );
 				
});
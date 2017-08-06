define(['app','httpService','commonUtil','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/lib/dataTables.bootstrap.css','css!../../../css/lib/buttons.bootstrap.css'
	,'css!../../../css/lib/fixedHeader.bootstrap.css','css!../../../css/lib/responsive.bootstrap.css','css!../../../css/lib/scroller.bootstrap.css','footer'], function(app,httpService,commonUtil) {
    app.controller('accountCfgController',['$scope','$location','$state','httpService','commonUtil',function($scope, $location,$state,httpService,commonUtil) {
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
 					httpService.getUserList(queryObj).then(function (res) {
 						console.log(res);
 						$scope.data = res.data;
 					},function (err) {
 						console.log(err);
 					})
 				};
 				var queryInitObj = {
 					status:1
 				};
 				$scope.query(queryInitObj);
 				$scope.showInsertAppDialog = function(item){
 					$scope.username = "";
 					$scope.nickname = "";
 					$scope.accountrole = "ROLE_TASK_REVIEWER";
 					$('#myModal1').modal('show');
 				};
 				$scope.doInsert = function () {
 					if (!$scope.username || $scope.username.length<6 || $scope.username.length>20) {
 						$scope.accountWrong = true;
 						return;
 					};
 					if (!$scope.nickname || $scope.nickname.length<6 || $scope.nickname.length>20) {
 						$scope.nickNameWrong = true;
 						return;
 					};
 					if (!$scope.accountrole) {
 						$scope.accountroleWrong = true;
 						return;
 					};
 					var accountObj = {
 						username:$scope.username,
 						nickname:$scope.nickname,
 						role:$scope.accountrole,
 						status:1
 					};
 					httpService.accountCreate(accountObj).then(function (res) {
 						console.log(res);
 						$('#myModal1').modal('hide');
 						var queryInitObj = {
		 					status:1
		 				};
 						$scope.query(queryInitObj);
 					},function (err) {
 						// body...
 					})
 				};
 				$scope.openDetailDialog = function (item) {
 					$scope.selectedUser = item;
 					$('#myModal2').modal('show');
 				};
 				$scope.forbidden = function (item) {
 					httpService.accountStatusChange(item.id,2).then(function (res) {
                        var queryInitObj = {
                            status:1
                        };
                        $scope.query(queryInitObj);
                    },function (err) {
                        // body...
                    })
 				}

 				 
            }]
            );
    app.filter('statusFilter',function () {
    	return function (text) {
    		if(text == 'ROLE_ADMIN')return '管理员';
    		if(text == 'ROLE_TASK_REVIEWER')return '审批人员';
    		if(text == 'ROLE_REPORT_VIEWER')return '查看报表人员';
    	}
    })
});
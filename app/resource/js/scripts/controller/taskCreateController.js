define(['app','fileuploader','commonProperty','httpService','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/custom1.css','fastclick','nprogress','chart',
	'gauge','bootstrapprogressbar','icheck','skycons','daterangepicker',
	'flotpie','flottime','flotstack','flotresize','flotoderBars','flotspline','floecurvedLines',
	'datejs','jqvmapWorld','jqvmapSampleData','mainInitService','ngThumb'], function(app,fileuploader,commonProperty,httpService) {
    app.controller('taskCreateController',['$scope','$location','$window','$state','mainService','FileUploader','commonProperty','httpService','$stateParams',function($scope, $location,$window,$state,mainService,FileUploader,commonProperty,httpService,$stateParams) {
 				 var selectedItem = $stateParams.item;
 				 $scope.picArrays = [];
 				 if(selectedItem){
 				 		$scope.taskName = selectedItem.name;
 				 		$scope.taskCount = selectedItem.amount;
 				 		$scope.taskPrice = selectedItem.price
 				 		$scope.reviewPeriod = selectedItem.reviewPeriod;
 				 		$scope.deviceTypeMask = selectedItem.deviceTypeMask;
 				 		$scope.eachPersonLimit = selectedItem.eachPersonLimit;
 				 		$scope.recycleDaysLimit = selectedItem.recycleDaysLimit;
 				 		$scope.startTime = selectedItem.beginTime;
 				 		$scope.endTime = selectedItem.endTime;
 				 		
		 				 //获取任务步骤
		 				 httpService.getTaskProcedureById(selectedItem.id).then(function (res) {
		 				 	console.log(res);
		 				 	$scope.picArrays= $scope.picArrays.concat(res.data);
		 				 },function (err) {
		 				 	// body...
		 				 })
 				 }
 				 //获取任务类型
 				 httpService.getTaktypeListAll().then(function (res) {
 				 	$scope.tasktypeData = res.data;
 				 	if (selectedItem) {
 				 		for (var i = 0; i < $scope.tasktypeData.length; i++) {
		 				 		if(selectedItem.taskTypeId == $scope.tasktypeData[i].id){
									$scope.taskType = $scope.tasktypeData[i];
		 				 		}
		 				 	}
 				 	}
 				 },function (err) {
 				 	// body...
 				 });
 				 $scope.removePic = function (index) {
 				 	
 				 	$scope.picArrays.splice(index,1);
 				 }
 				 $scope.commit = function(){
 				 	if ($scope.picArrays.length==0) {
 				 		alert('请选择图片');
 				 		return;
 				 	};
 				 	if (!$scope.taskType) {
 				 		alert('请选择任务类型');
 				 		return;
 				 	};
 				 	var task = {
 				 		name:$scope.taskName,
 				 		taskTypeId:$scope.taskType.id,
 				 		amount:$scope.taskCount,
 				 		price:$scope.taskPrice,
 				 		cost:$scope.taskPrice,
 				 		reviewPeriod:$scope.reviewPeriod,
 				 		deviceTypeMask:$scope.deviceTypeMask,// 新加任务的时候 deviceTypeMask字段默认传127,表示兼容所有设备
 				 		eachPersonLimit:$scope.eachPersonLimit,
 				 		recycleDaysLimit:$scope.recycleDaysLimit,
 				 		beginTime:$scope.startTime,
 				 		endTime:$scope.endTime,
 				 		enabled:1,
 				 		cityLimited:0
 				 	};
 				 	if(selectedItem){//修改
 				 		httpService.taskUpdate(selectedItem.id,task).then(function (res) {
 				 		console.log(res);
 				 		$scope.task = res.data;
 				 		//保存每一个步骤
 				 		var objList = [];
 				 		for (var i = 0; i < $scope.picArrays.length; i++) {
 				 			var passObj = {
 				 				images:$scope.picArrays[i].images,
 				 				description:$scope.picArrays[i].description
 				 			};
 				 			objList.push(passObj);
 				 		}
 				 		httpService.taskProcedureCreate($scope.task.id,objList).then(function (res) {
 				 			console.log(res);
 				 			$state.go("main.tasklist");
 				 		},function (err) {
 				 			console.og(err);
 				 		})
 				 		
				        
 				 		
 				 	},function (err) {
 				 		console.log(err);
 				 	})
 				 	}else{//新增
 				 		httpService.taskCreate(task).then(function (res) {
 				 		console.log(res);
 				 		$scope.task = res.data;
 				 		//保存每一个步骤
 				 		var objList = [];
 				 		for (var i = 0; i < $scope.picArrays.length; i++) {
 				 			var passObj = {
 				 				images:$scope.picArrays[i].images,
 				 				description:$scope.picArrays[i].description
 				 			};
 				 			objList.push(passObj);
 				 		}
 				 		httpService.taskProcedureCreate($scope.task.id,objList).then(function (res) {
 				 			console.log(res);
 				 			$state.go("main.tasklist");
 				 		},function (err) {
 				 			console.og(err);
 				 		})
 				 		
				        
 				 		
 				 	},function (err) {
 				 		console.log(err);
 				 	})
 				 	}
 				 	
 				 };
 				 var timeObj ={
		              timePicker: true,
		              timePickerIncrement: 60,
		               timePicker12Hour : false, //是否使用12小时制来显示时间
		              locale: {
		              	applyLabel : '确定',
                       cancelLabel : '取消',
                       fromLabel : '起始时间',
                       toLabel : '结束时间',
		                format: 'YYYY-MM-DD HH:mm'
		              }
		            };
		         if(selectedItem){
		         	timeObj.startDate = new Date(selectedItem.beginTime*1000);
		         	timeObj.endDate = new Date(selectedItem.endTime*1000);
		         }
 				 $('#reservation-time').daterangepicker(timeObj,function(startTime,endTime){
		            	$scope.startTime = startTime.format("X");
		            	$scope.endTime = endTime.format("X");
		            });


 				// var password = CryptoJS.MD5("xiangqi123").toString();
 				// 	var nowDate =  (new Date()).toGMTString();
 				// 	var test = CryptoJS.HmacSHA1(password, 'put&'+'/xiangqitestservice/&'+nowDate);
 				// 	var signature = CryptoJS.enc.Base64.stringify(test).toString();
 				// 	var url = "http://v0.api.upyun.com/xiangqitestservice";
 				// 	var Authorization = 'UPYUN xiangqi:'+signature;
 				var imageUploader = $scope.imageUploader = new FileUploader({
		                url: commonProperty.serverHost + "image/upload?access_token=" + $window.sessionStorage["access_token"],
		                queueLimit: 1, //文件个数
		            });

				imageUploader.onAfterAddingFile = function(fileItem) {
				        imageUploader.uploadAll();
				    };

 				imageUploader.onSuccessItem = function(fileItem, response, status, headers) {
			        imageUploader.clearQueue(); 
			        $scope.picArrays.push({
			        	images:commonProperty.imgHost+response,
			        	description:''
			        });

			    };
			    imageUploader.onErrorItem = function(fileItem, response, status, headers) {
			    };
			    imageUploader.onCompleteAll = function () {
			    }

			    $scope.cancel = function(){
			    	$state.go("main.homepage");
			    }
            }]
            );
});
define(['app','fileuploader','commonProperty','httpService','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/custom1.css','fastclick','nprogress','chart',
	'gauge','bootstrapprogressbar','icheck','skycons','daterangepicker',
	'flotpie','flottime','flotstack','flotresize','flotoderBars','flotspline','floecurvedLines',
	'datejs','jqvmapWorld','jqvmapSampleData','mainInitService','ngThumb'], function(app,fileuploader,commonProperty,httpService) {
    app.controller('taskCreateController',['$scope','$location','$window','$state','mainService','FileUploader','commonProperty','httpService','$stateParams',function($scope, $location,$window,$state,mainService,FileUploader,commonProperty,httpService,$stateParams) {
 				 var selectedItem = $stateParams.item;
 				 $scope.picArrays = [];
 				 $scope.currentIndex = 1;
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
 				 		
 				 		//获取任务类型
		 				 httpService.getTaktypeListAll().then(function (res) {
		 				 	$scope.tasktypeData = res.data;
		 				 	
		 				 	for (var i = 0; i < $scope.tasktypeData.length; i++) {
		 				 		if(selectedItem.taskTypeId == $scope.tasktypeData[i].id){
									$scope.taskType = $scope.tasktypeData[i];
		 				 		}
		 				 	}
		 				 },function (err) {
		 				 	// body...
		 				 });
		 				 //获取任务步骤
		 				 httpService.getTaskProcedureById(selectedItem.id).then(function (res) {
		 				 	console.log(res);
		 				 	$scope.picArrays= $scope.picArrays.concat(res.data);
		 				 	$scope.currentIndex = $scope.picArrays.length;
		 				 },function (err) {
		 				 	// body...
		 				 })
 				 }
 				 //获取任务类型
 				 httpService.getTaktypeListAll().then(function (res) {
 				 	$scope.tasktypeData = res.data;
 				 },function (err) {
 				 	// body...
 				 })
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
 				 		deviceTypeMask:$scope.deviceTypeMask,
 				 		eachPersonLimit:$scope.eachPersonLimit,
 				 		recycleDaysLimit:$scope.recycleDaysLimit,
 				 		beginTime:$scope.startTime,
 				 		endTime:$scope.endTime,
 				 		enabled:1,
 				 		cityLimited:0
 				 	};
 				 	httpService.taskCreate(task).then(function (res) {
 				 		console.log(res);
 				 		$scope.task = res.data;
 				 		//保存每一个步骤
 				 		for (var i = 0; i < $scope.picArrays.length; i++) {
 				 			var passObj = {
 				 				images:$scope.picArrays[i].images,
 				 				description:$scope.picArrays[i].description,
 				 				taskId:$scope.task.id,
 				 				procedureOrder:$scope.picArrays[i].procedureOrder
 				 			}
 				 			httpService.taskProcedureCreate(passObj).then(function (res) {
	 				 		if (passObj.procedureOrder == $scope.picArrays.length) {
									$state.go("main.tasklist");
	 				 		}
	 				 	},function (err) {
	 				 		console.log(err);
	 				 	})
 				 		}
				        
 				 		
 				 	},function (err) {
 				 		console.log(err);
 				 	})
 				 };
 				 $('#reservation-time').daterangepicker({
		              timePicker: true,
		              timePickerIncrement: 30,
		              locale: {
		                format: 'MM/DD/YYYY hh:mm'
		              },
		              startDate:selectedItem?selectedItem.beginTime:new Date(),
		              endDate:selectedItem?selectedItem.endTime:new Date()
		            },function(startTime,endTime){
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
			        	description:'',
			        	procedureOrder:$scope.currentIndex++
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
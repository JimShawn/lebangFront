define(['app','fileuploader','commonProperty','httpService','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/custom1.css','fastclick','nprogress','chart',
	'gauge','bootstrapprogressbar','icheck','skycons','daterangepicker',
	'flotpie','flottime','flotstack','flotresize','flotoderBars','flotspline','floecurvedLines',
	'datejs','jqvmapWorld','jqvmapSampleData','mainInitService','ngThumb'], function(app,fileuploader,commonProperty,httpService) {
    app.controller('taskCreateController',['$scope','$location','$window','$state','mainService','FileUploader','commonProperty','httpService',function($scope, $location,$window,$state,mainService,FileUploader,commonProperty,httpService) {
 				 var selectedItem = $stateParams.item;
 				 if(!selectedItem){
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
		 				 	$scope.taskType = $scope.tasktypeData[selectedItem.taskTypeId]
		 				 },function (err) {
		 				 	// body...
		 				 });
		 				 //获取任务步骤
		 				 httpService.getTaskProcedureById(selectedItem.id).then(function (res) {
		 				 	console.log(res);
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
 				 	if (imageUploader.queue.length==0) {
 				 		return;
 				 	};
 				 	if (!$scope.taskType) {
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
 				 		imageUploader.uploadAll();
 				 		
 				 	},function (err) {
 				 		console.log(err);
 				 	})
 				 };
 				 $('#reservation-time').daterangepicker({
		              timePicker: true,
		              timePickerIncrement: 30,
		              locale: {
		                format: 'MM/DD/YYYY h:mm A'
		              }
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
		                queueLimit: 5, //文件个数
		            });

				imageUploader.onAfterAddingFile = function(fileItem) {
				        $scope.fileItem = fileItem._file;    //添加文件之后，把文件信息赋给scope
				    };

 				imageUploader.onSuccessItem = function(fileItem, response, status, headers) {
			        $scope.uploadStatus = true;   //上传成功则把状态改为true
			        console.log(imageUploader);
			        var index = imageUploader.getIndexOfItem(fileItem);
			        var url = commonProperty.imgHost+response;
			        var dec = imageUploader.queue[index].des;
			        var taskProcedure = {
			        	taskId:$scope.task.id,
			        	procedureOrder:index,
			        	description:dec,
			        	images:url
			        };
			        httpService.taskProcedureCreate(taskProcedure).then(function (res) {
 				 		console.log(index);
 				 	},function (err) {
 				 		console.log(err);
 				 	})

			    };
			    imageUploader.onErrorItem = function(fileItem, response, status, headers) {
			        $scope.uploadStatus = true;   //上传成功则把状态改为true
			    };
			    imageUploader.onCompleteAll = function () {
			    	$state.go("main.tasklist");
			    }

			    $scope.cancel = function(){
			    	$state.go("main.homepage");
			    }
            }]
            );
});
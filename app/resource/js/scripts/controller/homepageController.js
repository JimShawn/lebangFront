define(['app','echarts','httpService','commonUtil','echartsTheme','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','fastclick','nprogress','chart',
	'gauge','bootstrapprogressbar','icheck','skycons',
	'flotpie','flottime','flotstack','flotresize','flotoderBars','flotspline','floecurvedLines',
	'datejs','jqvmapWorld','jqvmapSampleData','homePageInitService'], function(app,echarts,httpService,commonUtil) {
    app.controller('homepageController',['$scope','$location','$state','homePageService','echartsTheme','httpService','commonUtil',function($scope, $location,$state,homePageService,echartsTheme,httpService,commonUtil) {
 				
 				console.log($);
 				$scope.$watch('$viewContentLoaded', function() {  
            			homePageService.domOperator();
            			$state.go("main.homepage");
        			});  

                httpService.getIndexStatic().then(function (res) {
                    console.log(res);
                    var data = res.data;
                    $scope.todayFinished = data.todayAcceptedAmount;
                    $scope.yesterdayFinished = data.yesterdayAcceptedAmount;
                    $scope.unFinished = data.totalAmount - data.totalCompletedAmount;
                    $scope.waitingChecking = data.totalCompletedAmount - data.totalAcceptedAmount - data.totalRejectedAmount;
                },function (err) {
                    // body...
                });
                //获取任务进程图表数据
        var queryInitObj1 = {
          isDistinctTask:true,
          days:30
        };
        httpService.getTaskAppAtatistics(queryInitObj1).then(function (res) {
            console.log(res);
            var chartContent = res.data;
            var taskArray = [];
            var taskNameArray = [];
            var dayArray = [];
            var showDayArray = [];
            
            var allAppDaysValueArray =[];
            for (var i = 0; i < chartContent.length; i++) {
              if (taskArray.indexOf(chartContent[i].taskId)<0) {
                    taskArray.push(chartContent[i].taskId);
                    taskNameArray.push(chartContent[i].taskName);
              };
              if (dayArray.indexOf(chartContent[i].beginTime)<0) {
                    dayArray.push(chartContent[i].beginTime);
              };
              
            };
            for (var i = 0; i < dayArray.length; i++) {
              showDayArray.push(commonUtil.getDateWithDotFromInt(dayArray[i]));
            }

            //获取某个app这些天的值数组oneAppDaysValueArray，
            //如果某一天没有数据，则为0，并将这些数组加入allAppDaysValueArray
            for (var i = 0; i < taskArray.length; i++) {
              var oneAppDaysValueArray = [];//完成数量
              for (var j = 0; j < dayArray.length; j++) {
                      var hasValue = false;
                      for (var k = 0; k < chartContent.length; k++) {
                        if (chartContent[k].beginTime == dayArray[j] && chartContent[k].taskId == taskArray[i]) {
                              oneAppDaysValueArray.push(chartContent[k].receivedAmount);
                              hasValue = true;
                        }
                      };
                      if (!hasValue) {
                            oneAppDaysValueArray.push(0);
                      };

              };
              allAppDaysValueArray.push(oneAppDaysValueArray);
            };
            var chartSeriesArray = [];
            for (var i = 0; i < allAppDaysValueArray.length; i++) {
              
              var serieObj = {
                      name: taskNameArray[i],
                      type: 'bar',
                      data: allAppDaysValueArray[i],
                      markPoint: {
                        data: [{
                          type: 'max',
                          name: '最大值'
                        }, {
                          type: 'min',
                          name: '最小值'
                        }]
                      },
                      markLine: {
                        data: [{
                          type: 'average',
                          name: '平均值'
                        }]
                      }
                    }
              chartSeriesArray.push(serieObj);
            };

        if ($('#mainb').length ){
              
                  var echartBar = echarts.init(document.getElementById('mainb'), echartsTheme);

                  echartBar.setOption({
                    title: {
                      text: '任务完成量',
                      subtext: '最近几日完成量'
                    },
                    tooltip: {
                      trigger: 'axis'
                    },
                    legend: {
                      data: taskNameArray
                    },
                    toolbox: {
                      show: false
                    },
                    calculable: false,
                    xAxis: [{
                      type: 'category',
                      data: showDayArray
                    }],
                    yAxis: [{
                      type: 'value'
                    }],
                    series: chartSeriesArray
                  });
                };


            
          },function (err) {
            console.log(err);
          });

        //获取任务清单进程数据
        var queryTaskListObj = {
            enabled:1
        }
        httpService.getTaskList(queryTaskListObj).then(function (res) {
                        console.log(res);
                        $scope.taskListData = res.data;
                    },function (err) {
                        console.log(err);
                    });

        //获取图表数据
        var queryInitObj1 = {
          isDistinctApp:true,
          days:30
        };
        httpService.getTaskAppAtatistics(queryInitObj1).then(function (res) {
            console.log(res);
            var chartContent = res.data;
            var appArray = [];
            var appNameArray = [];
            var dayArray = [];
            var showDayArray = [];
            
            var allAppDaysNumArray =[];
            for (var i = 0; i < chartContent.length; i++) {
              if (appArray.indexOf(chartContent[i].appId)<0) {
                    appArray.push(chartContent[i].appId);
                    appNameArray.push(chartContent[i].appName);
              };
              if (dayArray.indexOf(chartContent[i].beginTime)<0) {
                    dayArray.push(chartContent[i].beginTime);
              };
              
            };
            for (var i = 0; i < dayArray.length; i++) {
              showDayArray.push(commonUtil.getDateWithDotFromInt(dayArray[i]));
            }

            //获取某个app这些天的值数组oneAppDaysValueArray，
            //如果某一天没有数据，则为0，并将这些数组加入allAppDaysValueArray
            for (var i = 0; i < appArray.length; i++) {
              var oneAppDaysNumArray = [];//完成量/消化值
              for (var j = 0; j < dayArray.length; j++) {
                      var hasValue = false;
                      for (var k = 0; k < chartContent.length; k++) {
                        if (chartContent[k].beginTime == dayArray[j] && chartContent[k].appId == appArray[i]) {
                              oneAppDaysNumArray.push(chartContent[k].acceptedAmount);
                              hasValue = true;
                        }
                      };
                      if (!hasValue) {
                            oneAppDaysNumArray.push(0);
                      };

              };
              allAppDaysNumArray.push(oneAppDaysNumArray);
            };
            var chartSeriesArray1 = [];
                  for (var i = 0; i < allAppDaysNumArray.length; i++) {
                    
                        var serieObj = {
                              name: appNameArray[i],
                              type: 'line',
                              smooth: true,
                              itemStyle: {
                                normal: {
                                  areaStyle: {
                                    type: 'default'
                                  }
                                }
                              },
                              data: allAppDaysNumArray[i]
                            }
                        chartSeriesArray1.push(serieObj);
                  };
                  if ($('#echart_line').length ){ 
              
              var echartLine = echarts.init(document.getElementById('echart_line'), echartsTheme);

              echartLine.setOption({
                title: {
                  text: '渠道消化',
                  subtext: '近几日消化'
                },
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  x: 220,
                  y: 40,
                  data: appNameArray
                },
                toolbox: {
                  show: true,
                  feature: {
                    magicType: {
                      show: true,
                      title: {
                        line: 'Line',
                        bar: 'Bar',
                        stack: 'Stack',
                        tiled: 'Tiled'
                      },
                      type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {
                      show: true,
                      title: "重新加载"
                    },
                    saveAsImage: {
                      show: true,
                      title: "保存图片"
                    }
                  }
                },
                calculable: true,
                xAxis: [{
                  type: 'category',
                  boundaryGap: false,
                  data: showDayArray
                }],
                yAxis: [{
                  type: 'value'
                }],
                series: chartSeriesArray1
              });

            };

            
          },function (err) {
            console.log(err);
          });

        //获取每日流水数据
        var queryDayFlowObj = {
          days:30
        };
        httpService.getTaskAppAtatistics(queryDayFlowObj).then(function (res) {
          var content = res.data;
          var dayArray = [];
          var flowArray = [];
          for (var i = 0; i < content.length; i++) {
            dayArray.push(commonUtil.getDateWithDotFromInt(content[i].beginTime));
            flowArray.push(content[i].totalFlow);
          };

          if ($('#mainb1').length ){
                
                    var echartBar = echarts.init(document.getElementById('mainb1'), echartsTheme);

                    echartBar.setOption({
                      title: {
                        text: '每日流水',
                        subtext: '最近几日流水'
                      },
                      tooltip: {
                        trigger: 'axis'
                      },
                      legend: {
                        data: ['流水值']
                      },
                      toolbox: {
                        show: false
                      },
                      calculable: false,
                      xAxis: [{
                        type: 'category',
                        data: dayArray
                      }],
                      yAxis: [{
                        type: 'value'
                      }],
                      series: [{
                        name: '流水值',
                        type: 'bar',
                        data: flowArray,
                        markPoint: {
                          data: [{
                            type: 'max',
                            name: '最大值'
                          }, {
                            type: 'min',
                            name: '最小值'
                          }]
                        },
                        markLine: {
                          data: [{
                            type: 'average',
                            name: '平均值'
                          }]
                        }
                      }]
                    });
                  };
        },function (err) {
          console.log(err);
        });


            }]
            );
});
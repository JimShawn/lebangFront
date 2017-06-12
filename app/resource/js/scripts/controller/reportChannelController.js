define(['app','echarts','httpService','commonUtil','echartsTheme','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/lib/dataTables.bootstrap.css','css!../../../css/lib/buttons.bootstrap.css'
	,'css!../../../css/lib/fixedHeader.bootstrap.css','css!../../../css/lib/responsive.bootstrap.css','css!../../../css/lib/scroller.bootstrap.css','footer'], function(app,echarts,httpService,commonUtil) {
    app.controller('reportChannelController',['$scope','$location','$state','echartsTheme','httpService','commonUtil',function($scope, $location,$state,echartsTheme,httpService,commonUtil) {
 				$scope.commonUtil = commonUtil;
        $scope.query = function (queryObj) {
          httpService.getTaskAppAtatistics(queryObj).then(function (res) {
            console.log(res);
            $scope.data = res.data;
            for (var i = 0; i < $scope.data.length; i++) {
              if ($scope.data[i].completedAmount !=0) {
                $scope.data[i].passRate = $scope.data[i].acceptedAmount/$scope.data[i].completedAmount;
              }else{
                $scope.data[i].passRate = 0;
              }
              
            }
            $scope.data.sort(function(a,b){
                return b.passRate-a.passRate
              });
          },function (err) {
            console.log(err);
          })
        };
        var queryInitObj = {
          days:0,
          isDistinctApp:true
        }
        $scope.query(queryInitObj);//查询审核通过率
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
            
            var allAppDaysValueArray =[];
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
              var oneAppDaysValueArray = [];//流水
              var oneAppDaysNumArray = [];//完成量/消化值
              for (var j = 0; j < dayArray.length; j++) {
                      var hasValue = false;
                      for (var k = 0; k < chartContent.length; k++) {
                        if (chartContent[k].beginTime == dayArray[j] && chartContent[k].appId == appArray[i]) {
                              oneAppDaysValueArray.push(chartContent[k].totalFlow);
                              oneAppDaysNumArray.push(chartContent[k].acceptedAmount);
                              hasValue = true;
                        }
                      };
                      if (!hasValue) {
                            oneAppDaysValueArray.push(0);
                            oneAppDaysNumArray.push(0);
                      };

              };
              allAppDaysValueArray.push(oneAppDaysValueArray);
              allAppDaysNumArray.push(oneAppDaysNumArray);
            };
            var chartSeriesArray = [];
            for (var i = 0; i < allAppDaysValueArray.length; i++) {
              
              var serieObj = {
                      name: appNameArray[i],
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
                      text: '渠道流水',
                      subtext: '最近几日流水'
                    },
                    tooltip: {
                      trigger: 'axis'
                    },
                    legend: {
                      data: appNameArray
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
          })


                  

                   

            }

 				 
            ]
            );
});
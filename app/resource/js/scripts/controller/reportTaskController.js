define(['app','echarts','httpService','commonUtil','echartsTheme','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/lib/dataTables.bootstrap.css','css!../../../css/lib/buttons.bootstrap.css'
	,'css!../../../css/lib/fixedHeader.bootstrap.css','css!../../../css/lib/responsive.bootstrap.css','css!../../../css/lib/scroller.bootstrap.css','footer'], function(app,echarts,httpService,commonUtil) {
    app.controller('reportTaskController',['$scope','$location','$state','echartsTheme','httpService','commonUtil',function($scope, $location,$state,echartsTheme,httpService,commonUtil) {
 				$scope.commonUtil = commonUtil;
        var queryInitObj = {
            page:0,
            size:100,
            enabled:1
        };
        httpService.getTaskList(queryInitObj).then(function (res) {
            console.log(res);
            $scope.data = res.data;
            $scope.selectTask = res.data.content[0];
            getStaticData($scope.selectTask);
          },function (err) {
            console.log(err);
          });
        $scope.changeTask = function () {
          getStaticData($scope.selectTask);
        };

          function getStaticData(task) {
            var queryStaticObj = {
              id:task.id,
              days:30,
              isDistinctApp:true
            };
            httpService.getTaskAppAtatisticsByTask(queryStaticObj).then(function (res) {
                console.log(res);
                //渠道每日消化走势
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
                    //获取渠道贡献比例及渠道审核通过率(针对单个任务)，调用相同接口，传递相同参数
                    var queryStaticObj2 = {
                        id:task.id,
                        days:0,
                        isDistinctApp:true
                      };
                    httpService.getTaskAppAtatisticsByTask(queryStaticObj2).then(function (res1) {
                      console.log(res1);
                      $scope.data1 = res1.data;
                      var appArray1 = [];
                      var appNameArray1 = [];
                      var appAcceptNumArray = [];
                      for (var i = 0; i < $scope.data1.length; i++) {
                        appArray1.push($scope.data1[i].appId);
                        appNameArray1.push($scope.data1[i].appName);
                        var tempObj = {
                            value:$scope.data1[i].acceptedAmount,
                            name:$scope.data1[i].appName
                        };
                        appAcceptNumArray.push(tempObj);
                      };

                        if ($('#echart_pie').length ){  
              
                          var echartPie = echarts.init(document.getElementById('echart_pie'), echartsTheme);

                          echartPie.setOption({
                            tooltip: {
                              trigger: 'item',
                              formatter: "{a} <br/>{b} : {c} ({d}%)"
                            },
                            legend: {
                              x: 'center',
                              y: 'bottom',
                              data: appNameArray1
                            },
                            toolbox: {
                              show: true,
                              feature: {
                                magicType: {
                                  show: true,
                                  type: ['pie', 'funnel'],
                                  option: {
                                    funnel: {
                                      x: '25%',
                                      width: '50%',
                                      funnelAlign: 'left',
                                      max: 1548
                                    }
                                  }
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
                            series: [{
                              name: 'app',
                              type: 'pie',
                              radius: '55%',
                              center: ['50%', '48%'],
                              data: appAcceptNumArray
                            }]
                          });

                          var dataStyle = {
                            normal: {
                              label: {
                                show: false
                              },
                              labelLine: {
                                show: false
                              }
                            }
                          };

                          var placeHolderStyle = {
                            normal: {
                              color: 'rgba(0,0,0,0)',
                              label: {
                                show: false
                              },
                              labelLine: {
                                show: false
                              }
                            },
                            emphasis: {
                              color: 'rgba(0,0,0,0)'
                            }
                          };

                        }

                    },function (err) {
                      // body...
                    })
            },function (err1) {
                
            });
          }




               //echart Pie
              
            

                   

            }

 				 
            ]
            );
});
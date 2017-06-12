define(['app','echarts','httpService','commonUtil','echartsTheme','jquery','bootstrap',
	'css!../../../css/lib/font-awesome.css','css!../../../css/lib/dataTables.bootstrap.css','css!../../../css/lib/buttons.bootstrap.css'
	,'css!../../../css/lib/fixedHeader.bootstrap.css','css!../../../css/lib/responsive.bootstrap.css','css!../../../css/lib/scroller.bootstrap.css','footer'], function(app,echarts,httpService,commonUtil) {
    app.controller('reportProfitController',['$scope','$location','$state','echartsTheme','httpService','commonUtil',function($scope, $location,$state,echartsTheme,httpService,commonUtil) {
 				
        var queryObj = {
          months:12
        };
        httpService.getMonthlyStatic(queryObj).then(function (res) {
          console.log(res);
          var content = res.data;
          var monthArray = [];
          var flowArray = [];
          for (var i = 0; i < content.length; i++) {
            monthArray.push(commonUtil.getMonth(content[i].beginTime));
            flowArray.push(content[i].totalFlow);
          };

        if ($('#mainb').length ){
              
                  var echartBar = echarts.init(document.getElementById('mainb'), echartsTheme);

                  echartBar.setOption({
                    title: {
                      text: '月底流水',
                      subtext: '每月流水'
                    },
                    tooltip: {
                      trigger: 'axis'
                    },
                    legend: {
                      data: ['流水']
                    },
                    toolbox: {
                      show: false
                    },
                    calculable: false,
                    xAxis: [{
                      type: 'category',
                      data: monthArray
                    }],
                    yAxis: [{
                      type: 'value'
                    }],
                    series: [{
                      name: '流水',
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
          
        });
        //获取图表数据
        var queryInitObj1 = {
          days:30
        };
        httpService.getTaskAppAtatistics(queryInitObj1).then(function (res) {
          var content = res.data;
          var dayArray = [];
          var flowArray = [];
          for (var i = 0; i < content.length; i++) {
            dayArray.push(commonUtil.getDateWithDotFromInt(content[i].beginTime));
            flowArray.push(content[i].totalFlow);
          };

          if ($('#echart_line').length ){ 
              
              var echartLine = echarts.init(document.getElementById('echart_line'), echartsTheme);

              echartLine.setOption({
                title: {
                  text: '每日流水',
                  subtext: '最近几日流水'
                },
                tooltip: {
                  trigger: 'axis'
                },
                legend: {
                  x: 220,
                  y: 40,
                  data: ['流水']
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
                  data: dayArray
                }],
                yAxis: [{
                  type: 'value'
                }],
                series: [{
                  name: '流水',
                  type: 'line',
                  smooth: true,
                  itemStyle: {
                    normal: {
                      areaStyle: {
                        type: 'default'
                      }
                    }
                  },
                  data: flowArray
                }]
              });

            };
                });


                  

                   

            }

 				 
            ]
            );
});
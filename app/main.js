requirejs.config({
  baseUrl: './resource/js/',
  paths: {
    angular: 'lib/angular',
    router: 'lib/angular-ui-router',
    angularAMD: 'lib/angularAMD',
    ngload:'lib/ngload',
    jquery:'lib/jquery',
    bootstrap:'lib/bootstrap',
    fastclick:'lib/fastclick',
    nprogress:'lib/nprogress',
    chart:'lib/Chart',
    gauge:'lib/gauge',
    bootstrapprogressbar:'lib/bootstrap-progressbar',
    icheck:'lib/icheck',
    skycons:'lib/skycons',
    flot:'lib/jquery.flot',
    flotpie:'lib/jquery.flot.pie',
    flottime:'lib/jquery.flot.time',
    flotstack:'lib/jquery.flot.stack',
    flotresize:'lib/jquery.flot.resize',
    flotoderBars:'lib/jquery.flot.orderBars',
    flotspline:'lib/jquery.flot.spline',
    floecurvedLines:'lib/curvedLines',
    datejs:'lib/date',
    jqvmap:'lib/jquery.vmap',
    jqvmapWorld:'lib/jquery.vmap.world',
    jqvmapSampleData:'lib/jquery.vmap.sampledata',
    moment:'lib/moment',
    daterangepicker:'lib/daterangepicker',
    echartsTheme:'scripts/service/echartsTheme',
    echarts:'lib/echarts',
    cryptojs:'lib/crypto-js',
    fileuploader:'lib/angular-file-upload',
    commonProperty:'scripts/common/commonProperty',
    commonUtil:'scripts/common/commonUtil',
    httpService:'scripts/service/httpService',
    mainInitService:'scripts/service/mainInitService',
    homePageInitService:'scripts/service/homePageInitService',
    footer:'scripts/directive/footer',
    ngThumb:'scripts/directive/ng-thumb'
  },
  map: {
        '*': {
            css: 'lib/css'
        }
    },
  shim: {
    jquery: {
            exports: 'jquery'
        },
  	angular : { exports : 'angular'},
  	angularAMD : [ 'angular'],
  	router:['angular'],
    bootstrap:['jquery','css!../css/lib/bootstrap.css','css!../css/lib/bootstrap-theme.css'],
    nprogress:['css!../css/lib/nprogress.css'],
    bootstrapprogressbar:['css!../css/lib/bootstrap-progressbar-3.3.4.css','bootstrap'],
    icheck:['css!../css/lib/green.css'],
    jqvmap:['jquery','css!../css/lib/jqvmap.css'],
    flot:['jquery'],
    flotpie:['flot'],
    flottime:['flot'],
    flotstack:['flot'],
    flotresize:['flot'],
    flotoderBars:['flot'],
    flotspline:['flot'],
    floecurvedLines:['flot'],
    jqvmapWorld:['jqvmap'],
    jqvmapSampleData:['jqvmap'],
    daterangepicker:['jquery','moment','css!../css/lib/daterangepicker.css'],
    mainInitService:['jquery','moment','css!../css/lib/custom.css'],
    footer:['css!../css/custom1.css']

  },
  deps : [ 'app' ]
});
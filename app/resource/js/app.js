define([ 'routes', 'loader', 'angularAMD', 'router','echarts' ], function(config, loader,
        angularAMD) {
    var app = angular.module("webapp", ['ui.router']);
 
    app.config(function($stateProvider, $urlRouterProvider) {
        // 配置路由
        if (config.routes != undefined) {
            angular.forEach(config.routes, function(route, path) {
                $stateProvider.state(path, {
                    templateUrl : route.templateUrl,
                    url : route.url,
                    resolve : loader(route.dependencies),
                    params:route.params
                // allowAnonymous: route.allowAnonymous
                });
            });
        }
        // 默认路由
        if (config.defaultRoute != undefined) {
            $urlRouterProvider.otherwise(config.defaultRoute);
        }
    });
 
    return angularAMD.bootstrap(app);
});
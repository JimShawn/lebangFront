define([], function () {
    return {
        defaultRoute: '/login',
        routes: {
            'login': {
                templateUrl: 'views/login.html',
                url: '/login',
                dependencies: ['scripts/controller/loginController']
            },
            'main':{
                templateUrl: 'views/main.html',
                dependencies: ['scripts/controller/mainController'],
                url: '/main'
            },
            'main.homepage':{
                templateUrl: 'views/home-page.html',
                dependencies: ['scripts/controller/homepageController'],
                url: '/homepage'
            },
            'main.taskcreate':{
                templateUrl: 'views/task-create.html',
                dependencies: ['scripts/controller/taskCreateController'],
                url: '/taskcreate'
            },
            'main.tasklist':{
                templateUrl: 'views/task-list.html',
                dependencies: ['scripts/controller/taskListController'],
                url: '/tasklist'
            },
            'main.taskaudit':{
                templateUrl: 'views/task-audit.html',
                dependencies: ['scripts/controller/taskAuditController'],
                url: '/taskaudit'
            },
            'main.taskauditLog':{
                templateUrl: 'views/task-audit-log.html',
                dependencies: ['scripts/controller/taskAuditLogController'],
                url: '/taskauditLog'
            },
            'main.reportcompressive':{
                templateUrl: 'views/report-compressive.html',
                dependencies: ['scripts/controller/reportCompressiveController'],
                url: '/reportcompressive'
            },
            'main.reportchannel':{
                templateUrl: 'views/report-channel.html',
                dependencies: ['scripts/controller/reportChannelController'],
                url: '/reportchannel'
            },
            'main.reporttask':{
                templateUrl: 'views/report-task.html',
                dependencies: ['scripts/controller/reportTaskController'],
                url: '/reporttask'
            },
            'main.reportprofit':{
                templateUrl: 'views/report-profit.html',
                dependencies: ['scripts/controller/reportProfitController'],
                url: '/reportprofit'
            },
            'main.reportefficiency':{
                templateUrl: 'views/report-efficiency.html',
                dependencies: ['scripts/controller/reportEfficiencyController'],
                url: '/reportefficiency'
            },
            'main.appcfg':{
                templateUrl: 'views/app-cfg.html',
                dependencies: ['scripts/controller/appCfgController'],
                url: '/appcfg'
            },
            'main.accountCfg':{
                templateUrl: 'views/account-cfg.html',
                dependencies: ['scripts/controller/accountCfgController'],
                url: '/accountCfg'
            },
            'main.taskTypeCfg':{
                templateUrl: 'views/tasktype-cfg.html',
                dependencies: ['scripts/controller/taskTypeCfgController'],
                url: '/taskTypeCfg'
            }
            
            
        }
    };
});    
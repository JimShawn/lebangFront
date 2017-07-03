/**
 * Created by 向麒 on 2017/1/5.
 */
'use strict';
define(['app','commonProperty'], function(app,commonProperty){
app.factory('httpService',function ($http, $q, $window, commonProperty) {
    var api = {};
    api.login = function (name,password) {
        var deferd = $q.defer();
        var url = commonProperty.serverHost + "oauth/token?grant_type=password&username="+name+"&password="+password;
        $http.post(url,{},{
            headers : {'Authorization' : 'Basic bGViYW5nX2NsaWVudDpsbnBPZWFVUXJtUWo3cjlhNmY5NGx0akN1enFZN2pFdk8='}
        }).then(function (result) {

            $window.sessionStorage["token_info"] = JSON.stringify(result);
            $window.sessionStorage["access_token"] = result.data.access_token;
            var allMeUrl = commonProperty.serverHost + "users/me?access_token=" + $window.sessionStorage["access_token"];
            $http.get(allMeUrl).then(function (res) {
                $window.sessionStorage["userInfo"] = JSON.stringify(res);
                deferd.resolve(res);
            },function (error) {
                deferd.reject(error);
            });

        },function(error){
            deferd.reject(error);
        });
        return deferd.promise;
    };

    api.logout = function () {
        var deferd = $q.defer();
        var logoutUrl = commonProperty.serverHost + "users/logout?access_token=" + $window.sessionStorage["access_token"];
        $http.delete(logoutUrl).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.taskCreate = function (task) {
        var deferd = $q.defer();
        var url = commonProperty.serverHost + "tasks?access_token=" + $window.sessionStorage["access_token"];
        $http.post(url,task).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.appCreate = function (app) {
        var deferd = $q.defer();
        var url = commonProperty.serverHost + "apps?access_token=" + $window.sessionStorage["access_token"];
        $http.post(url,app).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.taskTypeCreat = function (taskType) {
        var deferd = $q.defer();
        var url = commonProperty.serverHost + "task_types?access_token=" + $window.sessionStorage["access_token"];
        $http.post(url,taskType).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getTaskTypeList = function (queryObj) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "task_types?access_token=" + $window.sessionStorage["access_token"];
        if(queryObj){
            if (queryObj.size) {
               url += "&size="+queryObj.size;
            };
            if (queryObj.page) {
               url += "&page="+queryObj.page;
            };
        };
        
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.accountCreate = function (user) {
        var deferd = $q.defer();
        var url = commonProperty.serverHost + "users?access_token=" + $window.sessionStorage["access_token"];
        $http.post(url,user).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.taskProcedureCreate = function (taskProcedure) {
        var deferd = $q.defer();
        var url = commonProperty.serverHost + "task_procedures?access_token=" + $window.sessionStorage["access_token"];
        $http.post(url,taskProcedure).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getTaskList = function (queryObj) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "tasks?access_token=" + $window.sessionStorage["access_token"];
        if(queryObj){
            if (queryObj.size) {
               url += "&size="+queryObj.size;
            };
            if (queryObj.page) {
               url += "&page="+queryObj.page;
            };
            if (queryObj.beginTime) {
               url += "&beginTime="+queryObj.beginTime;
            };
            if (queryObj.endTime) {
               url += "&endTime="+queryObj.endTime;
            };
            if (queryObj.taskTypeId) {
               url += "&taskTypeId="+queryObj.taskTypeId;
            };
            if (queryObj.enabled) {
               url += "&enabled="+queryObj.enabled;
            };
        };
        
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getAppList = function (queryObj) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "apps?access_token=" + $window.sessionStorage["access_token"];
        if(queryObj){
            if (queryObj.size) {
               url += "&size="+queryObj.size;
            };
            if (queryObj.page) {
               url += "&page="+queryObj.page;
            };
        };
        
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getUserList = function (queryObj) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "users?access_token=" + $window.sessionStorage["access_token"];
        if(queryObj){
            if (queryObj.size) {
               url += "&size="+queryObj.size;
            };
            if (queryObj.page) {
               url += "&page="+queryObj.page;
            };
            if (queryObj.status) {
               url += "&status="+queryObj.status;
            };
        };
        
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getUserTaskList = function (queryObj) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "user_tasks?access_token=" + $window.sessionStorage["access_token"];
        if (queryObj) {
            if (queryObj.size) {
               url += "&size="+queryObj.size;
            };
            if (queryObj.page) {
               url += "&page="+queryObj.page;
            };
            if (queryObj.status) {
                url += "&status="+queryObj.status;
            };
        };
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.operateUserTask = function (id,operator,obj) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost+"user_tasks/"+id +"/status/"+operator+ "?access_token=" 
        + $window.sessionStorage["access_token"];
        
        $http.patch(url,obj).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };

    

    api.getTaskAppAtatistics = function (queryObj) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "statistics/task_app_statistics?access_token=" + $window.sessionStorage["access_token"];
        if(queryObj){
            if (queryObj.days !=null && queryObj.days !=undefined) {
               url += "&days="+queryObj.days;
            };
            if (queryObj.isDistinctTask) {
               url += "&isDistinctTask="+queryObj.isDistinctTask;
            };
            if (queryObj.isDistinctApp) {
               url += "&isDistinctApp="+queryObj.isDistinctApp;
            };
        };
        
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getTaskAppAtatisticsByTask = function (queryObj) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "statistics/task_app_statistics/tasks/"+queryObj.id+"?access_token=" + $window.sessionStorage["access_token"];
        if(queryObj){
            if (queryObj.days !=null && queryObj.days !=undefined) {
               url += "&days="+queryObj.days;
            };
            if (queryObj.isDistinctApp) {
               url += "&isDistinctApp="+queryObj.isDistinctApp;
            };
        };
        
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getMonthlyStatic = function (queryObj) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "statistics/monthly_statistics?access_token=" + $window.sessionStorage["access_token"];
        if(queryObj){
            if (queryObj.months) {
               url += "&months="+queryObj.months;
            };
        };
        
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getReviewerStatic = function (queryObj) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "statistics/reviewer_task_statistics?access_token=" + $window.sessionStorage["access_token"];
        if(queryObj){
            if (queryObj.months) {
               url += "&months="+queryObj.months;
            };
        };
        
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getReviewerStaticByUser = function (ids) {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "statistics/reviewer_task_statistics/reviewer_user_ids/"+ids+"?access_token=" + $window.sessionStorage["access_token"];
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };
    api.getIndexStatic = function () {
        var deferd = $q.defer();
        var url =commonProperty.serverHost + "statistics/index_statistics?access_token=" + $window.sessionStorage["access_token"];
        
        $http.get(url).then(function (result) {
            deferd.resolve(result);
        },function (error) {
            deferd.reject(error);
        });
        return deferd.promise;
    };


    return api;
});
})


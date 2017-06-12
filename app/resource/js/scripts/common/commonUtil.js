'use strict';
define(['app'], function(app){
	app.factory('commonUtil', function(){
		 	var factory = {};
		    factory.getDateFromInt = function(timeInt){
		        var time = new Date(timeInt * 1000);
		        var y = time.getFullYear();
		        var m = time.getMonth()+1;
		        var d = time.getDate();
		        return y+"-"+m+"-"+d;
		    };
		    factory.getDateWithSecondsFromInt = function(timeInt){
		        var time = new Date(timeInt * 1000);
		        var y = time.getFullYear();
		        var m = time.getMonth()+1;
		        var d = time.getDate();
		        var h = time.getHours();
		        var min = time.getMinutes();
		        var sec = time.getSeconds();
		        return y+"-"+m+"-"+d+"  "+h+":"+min+":"+sec;
		    };
		    factory.getDateWithDotFromInt = function(timeInt){
		        var time = new Date(timeInt * 1000);
		        var m = time.getMonth()+1;
		        var d = time.getDate();
		        return m+"."+d;
		    };
		    factory.getMonth = function(timeInt){
		        var time = new Date(timeInt * 1000);
		        var m = time.getMonth()+1;
		        return m
		    };
		    factory.getUserTaskStatusString = function(id){
		    	var statusString = "";
		        switch(id){
		        	case 0:
		        		statusString = "未提交";
		        		break;
		        	case 1:
		        		statusString = "待审核";
		        		break;
		        	case 2:
		        		statusString = "审核通过";
		        		break;
		        	case 3:
		        		statusString = "审核不通过";
		        		break;
		        	case 4:
		        		statusString = "重做";
		        		break;
		        }
		        return statusString;
		    };
		return factory;
	})
})
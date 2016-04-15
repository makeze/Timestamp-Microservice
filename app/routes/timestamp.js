'use strict';
//1450137600
var express = require('express');
var app = express();
var path = process.cwd();
var object = {unix: null, natural: null}; //{ "unix": 1450137600, "natural": "December,15,2015" }
var months = ['January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
];
module.exports = function (app, passport) {
    ///favicon.ico
    app.route('/')
    	.get(function (req,res){
    		res.sendFile(path+'/public/welcome.html');
    });
    app.route('/favicon.ico')
    	.get(function (req,res){
    		res.end('gekkoico');
    	});
    app.route('/:data')
    	.get(function (req,res){
    		var obj=getTime(req.params.data);
    		
    		res.end(JSON.stringify(object));
    	});
};

var getTime = function(val){
	if(!isNaN(val)){
	    var dateTime = new Date(eval(val));
        var cute = dateTime.toISOString();
        var year = cute.split('T')[0].split('-')[0];
        var month = months[cute.split('T')[0].split('-')[1]-1];
        var day = cute.split('T')[0].split('-')[2];
        object.unix=val;
        object.natural=month+","+day+","+year;
	} else {
	    //April,15,2016
	    var year = val.split(',')[2];
	    var month =  val.split(',')[0];
	    var day =  val.split(',')[1];
	    var unix = Date.parse(day+"-"+month+"-"+year);
        if(year==undefined||month==undefined||day==undefined) {object = {unix: null, natural: null}; return;}
	    object.unix=unix;
        object.natural=month+","+day+","+year;
	}
}
//Date.parse("24-Nov-2009 17:57:35")

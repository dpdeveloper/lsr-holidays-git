/*!
 * Filename: main.js
 * Bootstrap code for the JS
*/

define(function(){
	"use strict";
	
	var app = {};
	app.load = function(url){
		var appRequire = require.config({
			
			/* Allow Cross Site Requests */
			config: {
				text: {useXhr: function () { return true; }},
				tpl: {useXhr: function () { return true; }}
			},
			
			urlArgs: "v=14",
			context: 'content',
			baseUrl: url+'/workspace/js',
			
			paths: {
				modernizr: 'libs/modernizr.min',
				backbone: 'libs/backbone',
				underscore: 'libs/underscore',
				jquery: 'libs/jquery.min',
				'jquery-ui': 'libs/jquery-ui.min',
				marionette: 'libs/backbone.marionette.min',
				'backbone-relational': 'libs/backbone-relational',
				moment: 'libs/moment.min'
			},
			 
			shim: {
				'jquery': {
					exports: '$'
				},
				'underscore': {
					exports: '_'
				},
				'backbone': {
					deps: ['underscore', 'jquery'],
					exports: 'Backbone'
				},
				'marionette': {
					deps: ['jquery','underscore', 'backbone'],
					exports: 'Marionette'
				},
				'backbone-relational':{
					deps: ['jquery','underscore','backbone']
				},
		
				'modernizr': {exports: 'Modernizr'},
				'jquery-ui': {deps: ['jquery']},
				'libs/jquery.transit': {deps: ['jquery']},
				'libs/jquery.colorbox-min': {deps: ['jquery']},
				'libs/select2.min': {deps: ['jquery']}
	
			}
		});
	
		appRequire([
			'reqres',
			'modernizr'
		], function(reqres ){
			
			//delegate animations to animate if no css support
			if(!$.support.transition){
				$.fn.transition = $.fn.animate;
			}
			
			//register a reqres callback
			reqres.addHandler('config:get', function(){
				return {
					contentUrl: url
				};
			});
			
			appRequire(['app'], function(App){
				//Init the App
				App.start();
			});
		});
	};
	return app;
});
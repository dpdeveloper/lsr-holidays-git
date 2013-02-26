/*!
 * Filename: main.js
 * Bootstrap code for the JS
*/

require.config({
	urlArgs: "v=14",
	
	paths: {
		modernizr: 'libs/modernizr.min',
		backbone: 'libs/backbone',
		underscore: 'libs/underscore',
		jquery: 'libs/jquery',
		marionette: 'libs/backbone.marionette',
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
		'libs/jquery-ui': {deps: ['jquery']},
		'libs/jquery.transit': {deps: ['jquery']},
		'libs/avgrund': {deps: ['jquery'],exports: 'Avgrund'},
		'libs/reveal': {deps: ['jquery'],exports: 'Reveal'},
		'libs/jquery.colorbox-min': {deps: ['jquery']},
		'libs/select2.min': {deps: ['jquery']},
		'libs/jquery.mousewheel.min': {deps: ['jquery']},
		'libs/jquery.mCustomScrollbar': {
			deps: ['jquery','libs/jquery.mousewheel.min']
		}
	}
});

require([
	'app',
	'vent',
	'modernizr',
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'backbone-relational',
	
	//jquery plugins
	'libs/respond.min',
	'libs/string-helpers',
	'libs/jquery-ui',
	'libs/jquery.transit',
	'libs/jquery.colorbox-min',
	'libs/select2.min'
	
], function(App){
	"use strict";
	
	//delegate animations to animate if no css support
	if(!$.support.transition){
		$.fn.transition = $.fn.animate;
	}
	
	//Init the App
	App.start();
  
});
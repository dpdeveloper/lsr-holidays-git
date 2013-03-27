// Filename: designer.js

require.config({
	baseUrl: "../public_html/workspace/js/",
	//urlArgs: 'cb=' + Math.random(),
	paths: {
		modernizr: 'libs/modernizr.min',
		jquery: 'libs/jquery.min',
		'jquery-ui': 'libs/jquery-ui.min',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		marionette: 'libs/backbone.marionette.min',
		'backbone-relational': 'libs/backbone-relational',
		
		jasmine: '../../../tests/lib/jasmine-1.3.1/jasmine',
		'jasmine-jquery': '../../../tests/lib/jasmine-jquery',
		'jasmine-html': '../../../tests/lib/jasmine-1.3.1/jasmine-html',
		spec: '../../../tests/spec',
		moment: 'libs/moment.min',
		'select2': 'libs/select2.min',
		'the-tooltip': 'libs/the-tooltip.min'
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
		'marionette':{
			deps: ['underscore','jquery','backbone'],
			exports: 'Marionette'
		},
		'backbone-relational':{
			deps: ['jquery','underscore','backbone']
		},
		'jasmine': {
			exports: 'jasmine'
		},
		'jasmine-html': {
			deps: ['jasmine', 'backbone', 'jquery'],
			exports: 'jasmine'
		},
		'jasmine-jquery': {
			deps: ['jasmine','jquery'],
			exports: 'jasmine'
		},

		'modernizr': {exports: 'Modernizr'},
		'jquery-ui': {deps: ['jquery']},
		
		
		'libs/selectivizr-min': {deps:['jquery']},
		'the-tooltip': {deps:['jquery','libs/selectivizr-min']},
		'libs/jquery.transit': {deps: ['jquery']},
		'libs/avgrund': {deps: ['jquery'],exports: 'Avgrund'},
		'libs/reveal': {deps: ['jquery'],exports: 'Reveal'},
		'libs/jquery.colorbox-min': {deps: ['jquery']},
		'select2': {deps: ['jquery']},
		'libs/jquery.mousewheel.min': {deps: ['jquery']},
		'libs/jquery.mCustomScrollbar': {
			deps: ['jquery', 'libs/jquery.mousewheel.min']
		}
	}
});
require([
	'underscore','jquery','backbone','marionette','reqres',
	'libs/respond.min', 'libs/string-helpers'
	], function(_, $, Backbone, Marionette,reqres){
	
	"use strict";
	
	//Add the config handler to reqres
	reqres.addHandler('config:get',function(){
		return {contentUrl: '../public_html/'};
	});
	
	//Set the config mode
	require(['config'], function(config){
		config.multicomMode = 'test';	
		
		require(['app','models/holiday-search'],function( App, HolidaySearch){	
			//load the app		
			App.start({testMode: true});

			//custom code to load the search
			var model = new HolidaySearch();
			model.set({
				tripType: model.TRIP_TYPES.PACKAGE,
				destination: 'las-vegas',
				dateStart: '01/04/2013',
				numNights: 4,
				numRooms: 1,
				adultCsv: '2',
				childCsv: '0',
				infantCsv: '0',
				
				departingFrom: 'LHR',
				directFLights: 'no'	
			});
			App.handleSearchTransition(model);
		});
	});
});
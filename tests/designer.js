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
		
		'libs/jquery.transit': {deps: ['jquery']},
		'libs/avgrund': {deps: ['jquery'],exports: 'Avgrund'},
		'libs/reveal': {deps: ['jquery'],exports: 'Reveal'},
		'libs/jquery.colorbox-min': {deps: ['jquery']},
		'libs/select2.min': {deps: ['jquery']},
		'libs/jquery.mousewheel.min': {deps: ['jquery']},
		'libs/jquery.mCustomScrollbar': {
			deps: ['jquery', 'libs/jquery.mousewheel.min']
		}
	}
});
require([
	'underscore','jquery','backbone','marionette','reqres','libs/respond.min', 'libs/string-helpers'
	], function(_, $, Backbone, Marionette,reqres){
	
	"use strict";
	
	reqres.addHandler('config:get',function(){
		return {
			contentUrl: $('base').attr('href').replace(window.location.protocol + "//" + window.location.hostname,"")
		};
	});
	
	require([
		'app',
		'views/search-ui/search-ui.layout',
		'models/holiday-search'
	],function( App, SearchUILayout, HolidaySearch){	
		
		//CUSTOM CODE
		
		//var region = new Backbone.Marionette.Region({el: '#sandbox'});
		//region.show(home);
		
		App.start();

		var model = new HolidaySearch();
		model.set({
			tripType: model.TRIP_TYPES.PACKAGE,
			destination: 'las-vegas',
			dateStart: '01/04/2013',
			numNights: '4',
			numRooms: '1',
			adultCsv: '2',
			childCsv: '0',
			infantCsv: '0',
			
			departingFrom: 'LHR',
			directFLights: 'no'	
		});
		App.handleSearchTransition(model);
		
	});
});
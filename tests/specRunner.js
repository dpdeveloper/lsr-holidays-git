// Filename: specRunner.js

require.config({
	baseUrl: "../public_html/workspace/js/",
	//urlArgs: 'cb=' + Math.random(),
	paths: {
		jquery: 'libs/jquery.min',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
		marionette: 'libs/backbone.marionette',
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
		'libs/jquery-ui': {deps: ['jquery']},
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
	'underscore',
	'jquery',
	'backbone',
	'marionette',
	'jasmine-html',
	'jasmine-jquery',
	
	'libs/respond.min',
	'libs/string-helpers',
	'libs/jquery-ui',
	'libs/jquery.transit',
	'libs/jquery.colorbox-min',
	'libs/select2.min'
	], function(_, $, Backbone, Marionette, jasmine){
	
	"use strict";
	
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;
	
	var htmlReporter = new jasmine.HtmlReporter();
	
	jasmineEnv.addReporter(htmlReporter);
	
	jasmineEnv.specFilter = function(spec) {
	return htmlReporter.specFilter(spec);
	};
	
	var specs = [
		
		/*
		 * !MODELS
		*/
		'spec/models/multicom/multicom-room.spec',
		'spec/models/multicom/multicom-accommodation.spec',
		'spec/models/flight-filter.spec',
		'spec/models/symphony-hotel.spec',
		'spec/models/holiday-search.spec',
		'spec/models/travellers-info.spec',
		'spec/models/booking.spec',
		
		/*
		 * !COLLECTIONS
		*/
		'spec/collections/multicom-accommodation.spec',
		'spec/collections/multicom-flight.spec',
		'spec/collections/symphony-airline.spec',
		'spec/collections/multicom-flight.spec',
		'spec/collections/symphony-airline.spec',
		'spec/collections/multicom-room.spec',
		'spec/collections/symphony-hotel.spec',
		'spec/collections/travellers-info.spec',
		
		/*
		 * !VIEWS
		*/
		'spec/views/search-ui/search-ui.controller.spec',
		'spec/views/search-ui/search-ui.layout.spec',
		'spec/views/search-ui/header/header.form.view.spec',
		
		'spec/views/search-ui/travellers/travellers.layout.spec',
		'spec/views/search-ui/travellers/travellers.contact.view.spec',
		'spec/views/search-ui/travellers/travellers.summary.view.spec',
		'spec/views/search-ui/travellers/travellers.static.view.spec',
		'spec/views/search-ui/travellers/travellers.tac.view.spec',
		'spec/views/search-ui/travellers/travellers.edit.layout.spec',
		'spec/views/search-ui/travellers/travellers.edit.collection.view.spec',
		'spec/views/search-ui/travellers/travellers.edit.item.view.spec',
		
		/*
		 * CONTROLLERS
		*/

		
	];
	

	
	$(function(){
		require(specs, function(){
			jasmineEnv.execute();
		});
	});
 
});
// Filename: specRunner.js

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
		'select2': 'libs/select2.min'
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
		'select2': {deps: ['jquery']},
		
		'libs/jquery.transit': {deps: ['jquery']},
		'libs/avgrund': {deps: ['jquery'],exports: 'Avgrund'},
		'libs/reveal': {deps: ['jquery'],exports: 'Reveal'},
		'libs/jquery.colorbox-min': {deps: ['jquery']},
		
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
	'reqres'
	], function(_, $, Backbone, Marionette, jasmine, jasminejQuery, reqres){
	
	"use strict";
	
	
	//override
	reqres.addHandler('config:get',function(){
		return {
			contentUrl: '../public_html/'
		};
	});
	
	
	
	var jasmineEnv = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;
	
	var htmlReporter = new jasmine.HtmlReporter();
	
	jasmineEnv.addReporter(htmlReporter);
	
	jasmineEnv.specFilter = function(spec) {
		return htmlReporter.specFilter(spec);
	};
	
	var specs = [
		'config',
		
		/*
		 * !MODELS
		*/
		'spec/models/multicom/multicom-room.spec',
		'spec/models/multicom/multicom-accommodation.spec',
		'spec/models/multicom/multicom-flight.spec',
		'spec/models/flight-filter.spec',
		'spec/models/symphony-hotel.spec',
		'spec/models/holiday-search.spec',
		'spec/models/travellers-info.spec',
		'spec/models/booking.spec',
		'spec/models/multiload.spec',
		
		'spec/models/content/deal.spec',
		'spec/models/content/home-about.spec',
		
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
		
		'spec/collections/content/deal.spec',
		
		/*
		 * ! PAGE VIEWS
		*/
		'spec/views/page/footer.view.spec',
		'spec/views/page/header.view.spec',
		'spec/views/page/search.form.view.spec',
		
		/*
		 * ! HOME VIEWS
		*/
		'spec/views/home/home.layout.spec',
		'spec/views/home/deal.slideshow.item.view.spec',
		'spec/views/home/deal.slideshow.view.spec',
		'spec/views/home/home.aboutus.view.spec',
		
		/*
			!Sidebar
		*/
		'spec/views/search-ui/sidebar/sidebar.summary.view.spec',
		'spec/views/search-ui/sidebar/sidebar.static.view.spec',
		
		/*
		 * ! SEARCH VIEWS
		*/
		'spec/views/search-ui/search-ui.controller.spec',
		'spec/views/search-ui/search-ui.layout.spec',
		'spec/views/search-ui/header/header.form.view.spec',
		
		'spec/views/search-ui/hotels/hotels.browse.item.view.spec',
		'spec/views/search-ui/hotels/hotels.browse.view.spec',
		
		'spec/views/search-ui/hotels/detail/hotels.detail.about.view.spec',
		'spec/views/search-ui/hotels/detail/hotels.detail.flight.view.spec',
		'spec/views/search-ui/hotels/detail/hotels.detail.images.view.spec',

		'spec/views/search-ui/hotels/detail/hotels.detail.rooms.item.view.spec',
		'spec/views/search-ui/hotels/detail/hotels.detail.rooms.view.spec',
		'spec/views/search-ui/hotels/detail/hotels.detail.layout.spec',
		
		
		'spec/views/search-ui/hotels/hotels.layout.spec',
		
		'spec/views/search-ui/travellers/travellers.layout.spec',
		'spec/views/search-ui/travellers/travellers.contact.view.spec',
		'spec/views/search-ui/travellers/travellers.tac.view.spec',
		'spec/views/search-ui/travellers/travellers.edit.layout.spec',
		'spec/views/search-ui/travellers/travellers.edit.collection.view.spec',
		'spec/views/search-ui/travellers/travellers.edit.item.view.spec'
	];
	

	
	$(function(){
		require(specs, function(config){
			config.multicomMode = 'test';
			
			jasmineEnv.execute();
		});
	});
 
});
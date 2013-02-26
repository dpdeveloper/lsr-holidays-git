// Filename: designer.js

require.config({
	baseUrl: "../public_html/workspace/js/",
	//urlArgs: 'cb=' + Math.random(),
	paths: {
		jquery: 'libs/jquery',
		underscore: 'libs/underscore',
		backbone: 'libs/backbone',
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
	'libs/respond.min',
	'libs/string-helpers',
	'libs/jquery-ui',
	'libs/jquery.transit',
	'libs/jquery.colorbox-min',
	'libs/select2.min'
	], function(_, $, Backbone, Marionette){
	
	"use strict";
	
	require([
		'views/search-ui/travellers/travellers.layout',
		'models/booking',
		'models/symphony-hotel',
		'models/multicom/multicom-flight',
		'models/multicom/multicom-room'
	],function(
		View,
		Booking,
		SymphonyHotel,
		MulticomFlight,
		MulticomRoom
	){
		var region = new Backbone.Marionette.Region({el: '#sandbox'});
		
		var model = new Booking();
		model.set({
			selectedHotel: new SymphonyHotel({
				title: 'The Aria',
				destination: 'Las Vegas',
				starRating: '4*'
			}),
			selectedFlight: new MulticomFlight({
				originAirport: 'LHR',
				originAirportName: 'Heathrow',
				destinationAirport: 'JFK',
				destinationAirportName: 'Kennedy',
				outboundCarrier: "Ryanair"
			})
		});
		model.get('selectedRooms').reset([
			new MulticomRoom({
				name: 'deluxe room'
			}),
			new MulticomRoom({
				name: 'standard room'
			})
		]);
		
		var view = new View({model: model});
		
		$(region.el).css({width: 1200});
		
		region.show(view);
	});
});
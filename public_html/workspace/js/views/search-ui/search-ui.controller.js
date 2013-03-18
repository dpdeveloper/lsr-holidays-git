/* @filename views/search-ui/search-ui.controller.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','vent','reqres',
	'models/booking',
	'collections/multicom-accommodation',
	'collections/multicom-flight',
	'collections/symphony-airline',
	'models/multicom/multicom-accommodation',
	'models/multicom/multicom-flight',
	'models/multiload'
	
], function(	$,_,Backbone,vent,reqres,
				Booking,
				MulticomAccommodationCollection,
				MulticomFlightCollection,
				SymphonyAirlineCollection,
				MulticomAccommodation,
				MulticomFlight,
				MultiLoad
				){
	"use strict";
	
	
	var SearchUIController = Backbone.Marionette.Controller.extend(
	/** @lends SearchUIController# */
	{

		_isReady: true,
		_fetchRequestTotal: null,
		_fetchRequestComplete: null,
		_toCallWhenLoaded: null,
		
		_booking: null,
		
		_mcAccommCollection: null,
		_mcFlightCollection: null,

		_airlineCollection: null,
		
		_loader: null,
		
		
		/**
			Constructor
			
			options.testMode can be used to force the collections into test mode
			options.holidaySearch can be used to initiate a load
			
			@class A Controller to co-ordinate all searching UI and activity
			
			@constructs
			@param {Object} [options] Options array
		*/
		initialize: function(options){
			options = options || {};
		
			_.bindAll(this);
			
			//init models
			this._booking = new Booking();
			
			//init collections
			this._mcAccommCollection = new MulticomAccommodationCollection({sortBy: 'classDesc'});
			this._mcFlightCollection = new MulticomFlightCollection();
			this._airlineCollection = new SymphonyAirlineCollection();
			
			// TEST MODE
			if(options.testMode === true){
				this._airlineCollection.setTestMode(true);
			}
			
			//load needed 'init' data
			this._loader = new MultiLoad();
			
			this._loader.l(this._airlineCollection.fetch({success: this._loader.c, error: this._loader.c})); //get the data initially
			
			//bind to collections
			this.listenTo(this._mcFlightCollection,'complete',this.processFlightSearchResults);
			this.listenTo(this._mcAccommCollection,'complete',this.processHotelSearchResults);
			
			//initiator events
			this.listenTo(vent,'search:trip:edit',this.saveSearchEdit,this);
			
			//feedback from selections
			this.listenTo(vent,'search:flight:selected',this.handleFlightSelection);
			this.listenTo(vent,'search:hotel:selected',this.handleHotelSelection);
			
			//shortlisting
			this.listenTo(vent,'search:shortlist',this.onShortlistRequest);
			
			//add response handlers for retrieving data in a decoupled maneer
			reqres.addHandler('search:get:booking', this.getBooking);
			reqres.addHandler('search:get:flight:results', this.getFlightCollection);
			reqres.addHandler('search:get:flight:selected', this.getFlightSelected);
			reqres.addHandler('search:get:hotel:results', this.getHotelCollection);
			reqres.addHandler('search:get:hotel:selected', this.getHotelSelected);
			reqres.addHandler('search:get:airlines', this.getAirlines);
			
			if('holidaySearch' in options && options.holidaySearch !== null){
				this.saveSearchEdit(options.holidaySearch);
			}
		},
		
		getBooking: function(){
			return this._booking;
		},
		
		getFlightCollection: function(){
			return this._mcFlightCollection;
		},
		
		getFlightSelected: function(){
			return this._booking.get('selectedFlight');
		},
		
		getHotelCollection: function(){
			return this._mcAccommCollection;
		},
		
		getHotelSelected: function(){
			return this._booking.get('selectedHotel');
		},
		
		getAirlines: function(){
			return this._airlineCollection;
		},
		
		
		/*
		 *
		 *
		 * !LOADING FUNCTIONS
		 *
		 *
		 *
		*/
				
		/* ================================================ */
		
		/* CALLBACK FUNCTIONS */
		
		/* ================================================ */
		
		/**
			Callback function for when the search is edited
			
			@param {HolidaySearch Model} holidaySearch
		*/
		saveSearchEdit: function(holidaySearch){
			this._booking.getSearch().set(holidaySearch.toJSON());
			this.performSearch();
		},
		
		

		/*
		 *
		 * CALLBACKS
		 *
		 *
		*/
		
		/**
			@param {MulticomFlight Model} flight
		*/
		handleFlightSelection: function(flight){
			
			if(this._booking.get('selectedFlight') === null){
				this._booking.set({selectedFlight: new MulticomFlight()});
			}
			this._booking.get('selectedFlight').set(flight.toJSON());
		},
		
		/**
			@param {MulticomAccommodation Model} hotel
		*/
		handleHotelSelection: function(hotel){
		
			if(this._booking.get('selectedHotel') === null){
				this._booking.set({selectedHotel: new MulticomAccommodation()});
			}
			this._booking.get('selectedHotel').set(hotel.toJSON());
		},
		
		
		/*
		 *
		 * JSON SEARCHING FUNCTIONS
		 *
		 *
		*/
		
		/**
			performSearch
		*/
		performSearch: function(){
			var holSearch= this._booking.getSearch();
			
			this._loader.q(this.processPackageLoaded, false);
			
			this._loader.l([
				this._mcAccommCollection.searchWithHolidaySearch(holSearch),
				this._mcFlightCollection.performSearch(holSearch.getFlightTrip())
			]);
		},
		
		/**
		 * @returns {Boolean}
		*/
		isAccommodationLoading: function(){
			return this._mcAccommCollection.isLoading();
		},
		
		/**
			isFlightsLoading
			@returns {Boolean}
		*/
		isFlightsLoading: function(){
			return this._mcFlightCollection.isLoading();
		},
		
		
		/**
			Callback to process hotel search results
		*/
		processHotelSearchResults: function(){
				
			this.handleHotelSelection(this._mcAccommCollection.at(0));
			
			vent.trigger('search:hotel:loaded', this._mcAccommCollection);
			vent.trigger('search:hotel:selected', this._mcAccommCollection.at(0));
			
			this._loader.c(); //stimulate a loader callback
		},
		
		
		/**
			Callback to process flight results
		*/
		processFlightSearchResults: function(){
			
			
			this.handleFlightSelection(this._mcFlightCollection.at(0));
			
			vent.trigger('search:flight:loaded', this._mcFlightCollection);
			vent.trigger('search:flight:selected', this._mcFlightCollection.at(0));
			
			this._loader.c(); //stimulate a loader callback

		},
		
		/**
			Callback for when both hotels and flights have loaded
			
			Will be called by the multiload
		*/
		processPackageLoaded: function(){
			vent.trigger('search:package:loaded');	
		},
		
		
		/**
			Event Callback for when a shortlist is requested
		*/
		onShortlistRequest: function(){
			//dummy code for now
			setTimeout(function(){
				vent.trigger('search:shortlist:complete');
			},800);
		}
		
	});
	
	return SearchUIController;
});
	
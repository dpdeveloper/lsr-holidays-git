/* @filename views/search-ui/search-ui.controller.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','vent','reqres',
	'models/booking',
	'views/search-ui/search-ui.layout',
	'collections/multicom-accommodation',
	'collections/multicom-flight',
	'collections/symphony-hotel',
	'collections/symphony-airline',
	'models/symphony-hotel',
	'models/multicom/multicom-flight'
	
], function(	$,_,Backbone,vent,reqres,
				Booking,
				SearchUILayout,
				MulticomAccommodationCollection,
				MulticomFlightCollection,
				SymphonyHotelCollection,
				SymphonyAirlineCollection,
				SymphonyHotel,
				MulticomFlight
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
		_hotelCollection: null,

		_airlineCollection: null,
		
		
		/* Not really nice marionette code but we've bundled up a region in here due to the legacy router code */
		_layout: null,
		_region: null,
		
		
		/**
			Constructor
			
			options.testMode can be used to force the collections into test mode
			
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
			this._mcAccommCollection = new MulticomAccommodationCollection();
			this._mcFlightCollection = new MulticomFlightCollection();
			this._hotelCollection = new SymphonyHotelCollection();
			this._airlineCollection = new SymphonyAirlineCollection();
			
			// TEST MODE
			if(options.testMode === true){
				this._airlineCollection.setTestMode(true);
			}
			
			//load needed 'init' data
			this.addLoadingRequest(this._airlineCollection.fetch({success: this.loadingCallback})); //get the data initially
			
			//bind to collections
			this.bindTo(this._mcFlightCollection,'complete',this.processFlightSearchResults,this);
			this.bindTo(this._mcAccommCollection,'complete',this.processHotelSearchResults,this);
			this.bindTo(this._hotelCollection,'complete',this.processHotelSearchResults,this);
			
			//initiator events
			this.bindTo(vent,'search:new',this.saveSearchData,this);
			this.bindTo(vent,'search:new:destination',this.saveSearchDestination,this);
			this.bindTo(vent,'search:trip:edit',this.saveSearchEdit,this);
			
			//feedback from selections
			this.bindTo(vent,'search:flight:selected',this.handleFlightSelection,this);
			this.bindTo(vent,'search:hotel:selected',this.handleHotelSelection,this);
			
			//shortlisting
			this.bindTo(vent,'search:shortlist',this.onShortlistRequest, this);
			
			
			//add response handlers for retrieving data in a decoupled maneer
			reqres.addHandler('search:get:booking', this.getBooking);
			reqres.addHandler('search:get:flight:results', this.getFlightCollection);
			reqres.addHandler('search:get:flight:selected', this.getFlightSelected);
			reqres.addHandler('search:get:hotel:results', this.getHotelCollection);
			reqres.addHandler('search:get:hotel:selected', this.getHotelSelected);
			reqres.addHandler('search:get:airlines', this.getAirlines);
			
			//init our region
			this._region = new Backbone.Marionette.Region({el: options.el});
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
			return this._hotelCollection;
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
		
		/**
		 * addLoadingRequest
		 *
		 * @param {function} - a dummy param to wrap the function call in
		 *
		 * Inits (if needed) and increments the to be loaded count
		 *
		*/
		addLoadingRequest: function(request){
			if(this._fetchRequestTotal === null){
				this._isReady = false;
				this._fetchRequestTotal = 0;
				this._fetchRequestComplete = 0;
			}
			this._fetchRequestTotal++;
		},
		
		/**
		 * loadingCallback
		 *
		 * A function to be used as a 'success' callback for any function in order to perform
		 * the loading logic
		 *
		*/
		loadingCallback: function(){
			this._fetchRequestComplete++;
			
			if(this._fetchRequestTotal <= this._fetchRequestComplete){
				this._isReady = true;
				if(this._toCallWhenLoaded !== null){
					this._toCallWhenLoaded();
					this._toCallWhenLoaded = null;
				}
			}
		},
		
		/**
		 * loadingQueue
		 *
		 * @param {function} fx - A function to call when loaded
		 *
		*/
		loadingQueue: function(fx){
			if(this._isReady === false){
				this._toCallWhenLoaded = fx;
			}
			else{
				fx();
			}
		},
		
		
		/*
		 *
		 *
		 * SHOW / HIDE FUNCTIONS
		 *
		 *
		*/
		
		show: function(){
			this.loadingQueue(this.showInterface);
		},
		
		showInterface: function(){
			this._layout = new SearchUILayout({
				holidaySearch: this._booking.get('holidaySearch'),
				flightsLoading: this.isFlightsLoading(),
				accommodationLoading: this.isAccommodationLoading()
			});
			
			this._region.show(this._layout);
		},
		
		hide: function(){
			this._region.close();
		},
		
		
		/* ================================================ */
		
		/* CALLBACK FUNCTIONS */
		
		/* ================================================ */
		
		/**
			Callback function to initiate a search with full data
			
			@param {holidaySearch model} A holidaySearch object with the search data
		*/
		saveSearchData: function(holidaySearch){
			vent.trigger('search:trip:edit',holidaySearch);
		},
		
		/**
			Callback function to initiate a search with a destination

			@param {string} The destination to search for
		*/
		saveSearchDestination: function(destination){
			this._booking.get('holidaySearch').set({'destination':destination.replace('-',' ')});
			vent.trigger('search:trip:edit',this._booking.get('holidaySearch'));
		},
		
		
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
			@param {SymphonyHotel Model} hotel
		*/
		handleHotelSelection: function(hotel){
		
			if(this._booking.get('selectedHotel') === null){
				this._booking.set({selectedHotel: new SymphonyHotel()});
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
			this._mcAccommCollection.searchWithHolidaySearch(holSearch);
			this._mcFlightCollection.performSearch(holSearch.getFlightTrip());
			this._hotelCollection.fetchDestination(holSearch.get('destination'));
		},
		
		/**
		 * @returns {Boolean}
		*/
		isAccommodationLoading: function(){
			return this._mcAccommCollection.isLoading() || this._hotelCollection.isLoading();
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
			if(!this._mcAccommCollection.isLoading() && !this._hotelCollection.isLoading()){
				
				this._hotelCollection.combineWithMulticomData(this._mcAccommCollection);
				vent.trigger('search:hotel:loaded', this._hotelCollection);
				
				/*
				 * A small amount of logic to trigger a package loading event
				 *
				 * Useful for views that want to know when everything is loaded
				 *
				 * See Also: processFlightSearchResults
				*/
				if(!this._mcFlightCollection.isLoading()){
					vent.trigger('search:package:loaded');
				}
			}
		},
		
		
		/**
			Callback to process flight results
		*/
		processFlightSearchResults: function(){
			vent.trigger('search:flight:selected', this._mcFlightCollection.at(0));
			vent.trigger('search:flight:loaded', this._mcFlightCollection);
			
			/*
			 * A small amount of logic to trigger a package loading event
			 *
			 * Useful for views that want to know when everything is loaded
			 *
			 * See Also: processHotelSearchResults
			*/

			if(!this._mcAccommCollection.isLoading() && !this._hotelCollection.isLoading()){
				vent.trigger('search:package:loaded');
			}
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
	
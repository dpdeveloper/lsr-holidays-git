/* @filename views/search-ui/search-ui.layout
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent', 'reqres',
	
	'tpl!views/search-ui/templates/search-ui.layout.tpl.html',
	'views/search-ui/search-ui.controller',
	'views/search-ui/header/header.layout',
	'views/search-ui/search-ui.pane.layout',
	'views/search-ui/loading/loading.view',
	'views/search-ui/flights/flights.layout',
	'views/search-ui/hotels/hotels.browse.view',
	'views/search-ui/hotels/detail/hotels.detail.layout',
	'views/search-ui/travellers/travellers.layout'
	
], function(	$,_,Backbone,Marionette, vent, reqres,
				SearchUITemplate,
				SearchUIController,
				SearchUIHeaderLayout,
				SearchUIPaneLayout,
				SearchUILoadingView,
				SearchUIFlightsLayout,
				SearchUIHotelsBrowseView,
				SearchUIHotelsDetailLayout,
				SearchUITravellersLayout
	){
	"use strict";
	
	var SearchUILayout = Backbone.Marionette.Layout.extend(
	/** @lends SearchUILayout */
	{
		
		template: SearchUITemplate,
		
		tagName: 'div',
		attributes: {'id': 'search-ui'},
		
		_controller: null,
		
		_headerView: null,
		_loadingView: null,
		_hotelsBrowseView: null,
		_hotelsDetail: null,
		_flightsView: null,
		
		regions: {
			header: '.ui-header',
			loading: '.ui-loading',
			flights: '.ui-flights',
			hotelsBrowse: '.ui-hotels-browse',
			hotelsDetail: '.ui-hotels-detail',
			travellersInfo: '.ui-travellers'
		},
		
		_status: {
			visible: false,
			mode: null,
			hotel: null,
			flight: null
		},
		STATES: {
			VISIBLE: {
				TRUE: 'true',
				FALSE: 'false'
			},
			MODE: {
				PACKAGE: 'package',
				FLIGHT: 'flight',
				HOTEL: 'hotel'
			},
			HOTEL: {
				NULL: null,
				LOADING: 'loading',
				BROWSE: 'browse',
				SELECTED: 'selected'
			},
			FLIGHT: {
				NULL: null,
				LOADING: 'loading',
				BROWSE: 'browse',
				SELECTED: 'selected'
			}
		},
		
		/**
			@param key {String} The status key to change
			@param val {String} The value to set the status to
		*/
		setStatus: function(key,val){
			if(key in this._status){ //if in the object
				if(val.toUpperCase() in this.STATES[key.toUpperCase()]){//if an allowed status
					this._status[key]=val;
					return true;
				}
			}
			return false;
		},

		
		/**
			Constructor. Can Pass:
			
			options.holidaySearch
			options.flightsLoading
			options.accommodationLoading
			options.testMode
			
			@class Layout for Search UI
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			this._status = {
				visible: false,
				mode: null,
				hotel: null,
				flight: null
			};
			
			this._controller = new SearchUIController(options);
			
			if(typeof options.holidaySearch !== 'undefined'){
				this.setModeFromHolidaySearch(options.holidaySearch);
			}
			
			//if events have already occured, 'trigger' them
			if(typeof options.flightsLoading !== 'undefined' && !options.flightsLoading){
				this.setStatus('flight',this.STATES.FLIGHT.SELECTED);
			}
			if(typeof options.accommodationLoading !== 'undefined' && !options.accommodationLoading){
				this.setStatus('hotel',this.STATES.HOTEL.BROWSE);
			}
			
			this.listenTo(vent,'search:hotel:loaded',this.hotelSearchLoad);
			this.listenTo(vent,'search:flight:loaded',this.flightSearchLoad);
			this.listenTo(vent,'search:package:loaded',this.searchComplete);
			
			this.listenTo(vent,'search:flight:edit',this.handleFlightEdit);
			this.listenTo(vent,'search:hotel:selected',this.handleHotelSelected);
			this.listenTo(vent,'search:flight:selected',this.handleFlightSelected);
			this.listenTo(vent,'search:trip:edit', this.setModeFromHolidaySearch);
			this.listenTo(vent, 'search:rooms:updated', this.handleRoomsEdit);
			
			this.listenTo(vent, 'search:shortlist', this.onShortlist);
			this.listenTo(vent, 'search:shortlist:complete', this.onShortlistComplete);
		},
		
		
		/**
			onShow Marionette Callback
		*/
		onShow: function(){
			
			//init the views
			this._headerView = new SearchUIHeaderLayout();
			this._loadingView = new SearchUILoadingView();
			
			//render the views
			this.header.show(this._headerView);
			this.loading.show(this._loadingView);
			
			if(this._status.hotel === this.STATES.HOTEL.BROWSE || this._status.hotel === this.STATES.HOTEL.SELECTED){
				this.hotelSearchLoad();
			}
			if(this._status.flight === this.STATES.FLIGHT.BROWSE || this._status.flight === this.STATES.FLIGHT.SELECTED){
				this.flightSearchLoad();
			}
		},
		
		
		/**
			Sets the mode from a holidaySearch object
			
			@param {HolidaySearch Model} holidaySearch
		*/
		setModeFromHolidaySearch: function(holidaySearch){
			
			switch(holidaySearch.get('tripType')){
				case holidaySearch.TRIP_TYPES.PACKAGE:
					this.setStatus('mode',this.STATES.MODE.PACKAGE);
					this.setStatus('flight',this.STATES.FLIGHT.LOADING);
					this.setStatus('hotel',this.STATES.HOTEL.LOADING);
				break;
				case holidaySearch.TRIP_TYPES.HOTEL:
					this.setStatus('mode',this.STATES.MODE.HOTEL);
					this.setStatus('hotel',this.STATES.HOTEL.LOADING);
				break;
				case holidaySearch.TRIP_TYPES.FLIGHT:
					this.setStatus('mode',this.STATES.MODE.FLIGHT);
					this.setStatus('flight',this.STATES.FLIGHT.LOADING);
				break;
			}
			
			//set the status back to loading
			if(this._status.visible === this.STATES.VISIBLE.TRUE){
				if(this._hotelsBrowseView !== null){
					this._hotelsBrowseView.closeAnimated();
				}
				if(this._hotelsDetail !== null){
					this._hotelsDetail.closeAnimated();
				}
				if(this._flightsView !== null){
					this._flightsView.closeAnimated();
				}
				
				this._loadingView = new SearchUILoadingView();
				this.loading.show(this._loadingView);
			}
			
		},
		
		/**
			Callback for when the flight search has loaded
		*/
		flightSearchLoad: function(){
			this.setStatus('flight',this.STATES.FLIGHT.SELECTED);
		},
		
		/**
			Callback for when the hotel search has loaded
		*/
		hotelSearchLoad: function(){
			this.setStatus('hotel',this.STATES.HOTEL.BROWSE);
		},
		
		
		/**
			Callback for when the entire search has loaded
		*/
		searchComplete: function(){
		
			var booking = reqres.request('search:get:booking');
			var bookingCost = booking.getCostPerPerson();
			var extraCost = bookingCost.flight + bookingCost.extra;
		
			this._hotelsBrowseView = new SearchUIPaneLayout({
				subView: new SearchUIHotelsBrowseView({
					collection: reqres.request('search:get:hotel:results'),
					selectedHotel: booking.get('selectedHotel'),
					extraCost: extraCost,
					numPeople: booking.get('holidaySearch').getTravellers().length
				}),
				showByDefault: true
			});
			
			if(this._loadingView !== null){
				this._loadingView.closeAnimated(); //close loading
			}
			this.hotelsBrowse.show(this._hotelsBrowseView);			
		},
		
		/**
			Callback for when the flight is edited
			@param {MulticomFlight} flight
		*/
		handleFlightEdit: function(flight){
			this._flightsView = new SearchUIPaneLayout({subView: new SearchUIFlightsLayout()});
			this.flights.show(this._flightsView);
			
			//scroll to the correct place
			if($('html,body').is(':visible')){
				$('html,body').animate({
					scrollTop: this.flights.$el.offset().top - 100
				}, 800);
			}
			this.setStatus('flight',this.STATES.FLIGHT.BROWSE);
		},
		
		/**
			Callback for when a flight is selected
		*/
		handleFlightSelected: function(){
			if(this._flightsView !== null){
				this._flightsView.closeAnimated();
			}
			this.setStatus('flight',this.STATES.FLIGHT.SELECTED);
		},
		
		/**
			Callback for when a hotel is selected
			@param {MulticomAccommodation} hotel
		*/
		handleHotelSelected: function(hotel){
			
			if(this._hotelsDetail === null || !this._hotelsDetail.isStateVisible()){
				this._hotelsDetail = new SearchUIPaneLayout({subView: new SearchUIHotelsDetailLayout()});
				this.hotelsDetail.show(this._hotelsDetail);
			}
		
			//scroll to the correct place
			/*
			if($('html,body').is(':visible')){
				$('html,body').animate({
					scrollTop: this.hotelsDetail.$el.offset().top - 80
				}, 800);
			}*/
			
			this.setStatus('hotel',this.STATES.HOTEL.SELECTED);
		},
		
		handleRoomsEdit:function(hotel){
			
			if(this._hotelsDetail === null || !this._hotelsDetail.isStateVisible()){
				this._hotelsDetail = new SearchUIRoomSelectorView();
				this.hotelsDetail.show(this._hotelsDetail);
			}
			this.setStatus('hotel',this.STATES.HOTEL.SELECTED);
		},
		
		/**
			Event Callback for when the shortlisting process is triggered
			The current views are hidden and the loading view is opened
		*/
		onShortlist: function(){
			//Backbone.history.navigate('/search/travellers');
		
			this._loadingView = new SearchUILoadingView();
			this.loading.show(this._loadingView);
			this._hotelsDetail.closeAnimated();
			this._hotelsBrowseView.closeAnimated();
		},
		
		onShortlistComplete: function(){
			this._loadingView.closeAnimated();
			this._travellersView = new SearchUIPaneLayout({subView: new SearchUITravellersLayout({
				model: reqres.request('search:get:booking')
			})});
			this.travellersInfo.show(this._travellersView);
		}
		

	});
	
	return SearchUILayout;
});
	
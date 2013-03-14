/* @filename views/search-ui/header/header.status.view.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/header.status.view.tpl.html'
	
], function($,_,Backbone,Marionette,vent,
			SearchUIHeaderStatusTemplate
			){
	"use strict";
	
	var SearchUIHeaderStatusView = Backbone.Marionette.ItemView.extend(
	/** @lends SearchUIHeaderStatusView */
	{
		template: SearchUIHeaderStatusTemplate,
		
		tagName: 'div',
		attributes: {'class': 'search-ui-status'},
		
		_data: {
			middleMessage: null
		},
		
		lang: {
			middleMessage: {
				loadingBoth: 'Loading Flights &amp; Hotels...',
				loadingFlights: 'Loading Flights...',
				loadingHotels: 'Loading Hotels...',
				loadingComplete: '100 Results Loaded'
			}
		},
		
		/**
			Constructor
			
			@class View to display search header status
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			
			/* Options accepts
			 *
			 * { status: {
			 *		flightLoaded: (true | false),
			 *		hotelLoaded: (true | false)
			 * }
			 *
			*/
			
			options = options || {};
			this._data.middleMessage = this.lang.middleMessage.loadingBoth;
			
			this.listenTo(vent,'search:flight:loaded',function(){
				this.processEvent('search:flight:loaded');
			});
			
			this.listenTo(vent,'search:hotel:loaded',function(){
				this.processEvent('search:hotel:loaded');
			});
			
			if(typeof options.status !== 'undefined'){
				this.setStatus(options.status.hotelLoaded,options.status.flightsLoaded);
			}
		},
		
		serializeData: function(){
			return this._data;
		},
		
		/**
			Sets the correct status depending on whether the flights / hotels are loaded
			
			Supports search types where it is flight only or vice verca
			if there are no hotels loading then hotelLoaded = null (flightLoaded = null) for flights
			
			@param {Boolean | null} hotelLoaded
			@param {Boolean | null} flightLoaded
		*/
		setStatus: function(hotelLoaded,flightLoaded){
			if(	hotelLoaded === true && flightLoaded === true ||
				hotelLoaded === true && flightLoaded === null ||
				hotelLoaded === null && flightLoaded === true
				){
				this._data.middleMessage = this.lang.middleMessage.loadingComplete;
			}
			else if(hotelLoaded === false && flightLoaded === false){
				this._data.middleMessage = this.lang.middleMessage.loadingBoth;
			}
			else if(hotelLoaded === false){
				this._data.middleMessage = this.lang.middleMessage.loadingHotels;
			}
			else if(flightLoaded === false){
				this._data.middleMessage = this.lang.middleMessage.loadingFlights;
			}
		},
		
		/**
			@param {String} message
		*/
		processEvent: function(message){
			
			var m = this.lang.middleMessage; //shortcut
			var d = this._data.middleMessage;
		
			switch(message){
				case 'search:flight:loaded':
					if(d === m.loadingBoth){d = m.loadingHotels;}
					else if(d === m.loadingFlights){d = m.loadingComplete;}
				break;
				case 'search:hotel:loaded':
					if(d === m.loadingBoth){d = m.loadingFlights;}
					else if(d === m.loadingHotels){d = m.loadingComplete;}
				break;
			}
			
			this._data.middleMessage = d;
			this.render();
		}
		
	});
	
	return SearchUIHeaderStatusView;
});
	
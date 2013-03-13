/* collections/multicom/multicom-accommodation
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','config',
	'models/multicom/multicom-accommodation'
	
], function($,_,Backbone,Marionette,config,MulticomAccommodation){
	
	"use strict";
	
	var MulticomAccommodationCollection= Backbone.Collection.extend(
	/** @lends MulticomAccommodationCollection# */
	{
		model: MulticomAccommodation,
		
		_testMode: false,
		_status: -1,
		_error: null,
		
		STATES: {
			NULL: -1,
			INIT: 0,
			LOADING: 1,
			COMPLETE: 2,
			ERROR: 3
		},
		
		_searchMode: null,
		MODES: {
			HOTEL: 'runHotelSearch',
			DESTINATION: 'runDestinationSearch'
		},
		
		_apiVersion: 3,
		
		_apiParams: [
			'hotelName',
			'destination',
			'dateStart',
			'numNights',
			'numRooms',
			'adultCsv',
			'childCsv',
			'infantCsv',
			'childAges'
		],
		
		/**
			Constructor
			
			Sets the correct state & mode
			
			@class Collection to search, fetch and manipulate multicom accommodation results
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize : function(options) {
			options = options || {};
			
			_.bindAll();
			this._status = this.STATES.INIT;
			
			//if test mode
			if(config.multicomMode ==='test'){
				this._testMode = true;
			}
			
			//init the mode
			this._searchMode = this.MODES.HOTEL;
		},
		
		/**
		 * isLoading
		 *
		 * Returns true if the multicom request is still loading
		 *
		*/
		isLoading: function(){
			if(this._status === this.STATES.LOADING){
				return true;
			}
			return false;
		},
		
		/**
		 * setMode
		 * @mode: the mode to set the model to
		 *
		 * Checks that the mode sent is in the allowed modes and sets it up
		*/
		setMode: function(mode){
			if($.inArray(mode,this.MODES)){
				this._searchMode = mode;
			}
		},
		
		/**
		 * setTestMode
		 *
		 * @param {Boolean} mode
		*/
		setTestMode: function(mode){
			this._testMode = mode;
		},
		
		
		/**
		 * getError
		 *
		*/
		getError: function(){
			return this._error;
		},
		
		
		/**
		 * getSearchUrl
		 *
		 * @param data {Object}
		 *
		 * Function to build the aboslute API link
		 * If multicom is in test mode then it will return the test link (static JSON)
		*/
		getSearchUrl: function(data){
			if(this._testMode){
				var testUrl = "json-test/hotels-las-vegas.json";
				return config.contentRoot+testUrl;
			}
			else{
				return config.root+"json/multicom-api/?"+this.buildSearchQueryUrl(data);
			}
		},
		
		/* BuildSearchQueryUrl
		 *
		 * @param {Object} Object Hash of Params
		 *
		 * @return {String} A query string to query the api with
		*/
		buildSearchQueryUrl: function(data){
			var str="";
			var self = this;
			
			_.each(data,function(val,key){
				
				if($.inArray(key,self._apiParams) !== -1){

					if(	typeof val === "string"){
						val = val.replace(/ /g,"+");
					}
					
					str=str+key+"=";
					str=str+ encodeURI(val)+"&";
				}
			});
			//add the api version and request type
			str = str+"v="+this._apiVersion+"&action="+self._searchMode;
			return str;
		},
		
		/**
		 * performSearch
		 *
		 * @param data {Object}
		 * @param forceUrl {String} Can be used to force the search url
		 *
		 * Performs a search and
		 *
		*/
		performSearch: function(data, forceUrl){
			
			var self = this;
			
			if(typeof(forceUrl) !== 'undefined'){
				this.url=forceUrl;
			}
			else{
				this.url = this.getSearchUrl(data);
				
				self._status = this.STATES.LOADING;
				
				if(this._testMode){
					console.log('MulticomAccommodationCollection is currently in test mode');
					console.log('Loaded Data: '+this.url);
				}
			}
			
			this.fetch({
				success: function(collection,xhr,options){
					if(xhr.result === 'success'){
						self.trigger('complete');
						self._status = self.STATES.COMPLETE;
					}
					else{
						self._error=xhr.error;
						self.trigger('error');
						self._status = self.STATES.ERROR;
					}
				},
				error: function(collection,xhr,options){
					self.trigger('error');
					self._status = self.STATES.ERROR;
				}

			});
		},
		
		/**
		 *
		 * searchWithHolidaySearch
		 *
		 * @param {HolidaySearch Model} holidaySearch
		 *
		*/
		searchWithHolidaySearch: function(holidaySearch){
			this.performSearch(holidaySearch.toJSON());
		},
		
		/**
		 * parse
		 *
		 * @param response {Object}
		 *
		 * Converts the API JSON to an array for the collection
		*/
		parse: function(response){
			return response.data;
		}
		
	});
	
	return MulticomAccommodationCollection;
});
	
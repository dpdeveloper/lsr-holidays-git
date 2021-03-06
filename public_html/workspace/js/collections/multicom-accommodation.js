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
			HOTEL: 'searchAccommodation',
			DESTINATION: 'searchAccommodation'
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
		
		sortStrategies: {
			classAsc: function(model){
				if(typeof model.get('classCode') !== 'undefined'){
					return parseInt(model.get('classCode').charAt(0),10);
				}
				else{
					return 0;
				}
			},
			classDesc: function(model){
				if(typeof model.get('classCode') !== 'undefined'){
					return - parseInt(model.get('classCode').charAt(0),10);	
				}
				else{
					return 0;
				}
			},
			noSort: null
		},
		
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
			
			//set the sort mode
			if('sortBy' in options && typeof options.sortBy === "string"){
				switch(options.sortBy){
					case 'classDesc':
						this.comparator = this.sortStrategies.classDesc;
						break;
					case 'classAsc':
						this.comparator = this.sortStrategies.classAsc;
						break;
					case 'noSort':
						if(typeof this.comparator !== 'undefined'){
							delete this.comparator;
						}
						break;
					default:
						this.comparator = this.sortStrategies.classDesc;
						break;
				}
			}
			else{
				this.comparator = this.sortStrategies.classDesc;
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
				var testUrl = "json-test/multicom-v3/hotels-las-vegas.json";
				return config.contentRoot+testUrl;
			}
			else{
				return config.root+"extensions/multicom_plugin/api.php?"+this.buildSearchQueryUrl(data);
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
			str = str+"v="+this._apiVersion;
			str = str+"&action="+self._searchMode;
			return str;
		},
		
		/**

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
			searchWithHolidaySearch
			
			@param {HolidaySearch Model} holidaySearch
		*/
		searchWithHolidaySearch: function(holidaySearch){
			this.performSearch(holidaySearch.toJSON());
		},
		
		/**
			Converts the API JSON to an array for the collection
			
			@param response {Object}
		*/
		parse: function(response){
			if(response.result === 'success'){
				var res = response.data.AccommodationSearchResponse.Accommodations.AccommodationSegment;
				
				if($.isArray(res)){
					return res;
				}
				else{
					return [res];
				}
			}
			return [];
		},
		
		
		/**
			Filters the collection using the filter object
			
			@param {Filter} filter
		*/
		filterHotels: function(filter){
			
			if(filter === null){
				return this.models;
			}
			else{
				
				var filtered = this.models;
				
				//filter only the featured
				if(filter.get('filterFeaturedOnly') === true){
					filtered = _.filter(filtered,function(item){
						return item.get('symData') && item.get('mcData');
					});
				}
				
				//filter by star Rating
				if(filter.get('filterStarRatings') !== ''){
					
					var starRatings = filter.get('filterStarRatings').split(',');
					
					if(starRatings.length > 0){
						filtered = _.filter(filtered,function(item){
							if($.inArray(item.get('starRating').toString(),starRatings)>-1){
								return true;
							}
							return false;
						});
					}
							
				}
				
				//filter by Accom Name
				if(filter.get('filterHotelName') !== ''){
					filtered = _.filter(filtered,function(item){
						if(item.get('title').toLowercase().indexOf(filter.get('filterHotelName').toLowerCase()) >=0){
							return true;
						}
						return false;
					});
				}
				return filtered;
			}
		}
		
	});
	
	return MulticomAccommodationCollection;
});
	
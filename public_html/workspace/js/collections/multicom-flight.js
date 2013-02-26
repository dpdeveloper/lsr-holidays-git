/* collections/multicom-flight
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','config',
	'models/multicom/multicom-flight'
	
], function($,_,Backbone,Marionette,config,MulticomFlight){
	
	"use strict";
	
	/**
		@module Collection: MulticomFlightCollection
		@exports: MulticomFlightCollection
	*/
	
	var MulticomFlightCollection= Backbone.Collection.extend({
		model: MulticomFlight,
		
		_root: config.root,
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
		
		_apiVersion: 3,
		
		_apiParams: [
			'oneWay',
			'directFlights',
			'numAdults',
			'numChildren',
			'numInfants',
			'dateStart',
			'departureAirport',
			'destinationAirport',
			'destinationResortId',
			'destinationCountry',
			'flightClass',
			'numNights',
			'setSupplier'
		],
		
		/**
		 * initialize
		 *
		 * Setup the correct state & mode
		 *
		*/
		initialize : function() {
			_.bindAll();
			this._status = this.STATES.INIT;
			
			if (this._root === "/"){
				this._root = "";
			}
			
			//if test mode
			if(config.multicomMode === 'test'){
				this._testMode = true;
			}
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
				var testUrl = "/json-test/flights-search.json";
				return this._root+testUrl;
			}
			else{
				return this._root+"json/multicom-api/?"+this.buildSearchQueryUrl(data);
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
			str = str+"v="+this._apiVersion+"&action=runFlightSearch";
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
					console.log('MulticomFlightCollection is currently in test mode');
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
			this.performSearch(holidaySearch.getFlightTrip());
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
		},
		
		
		/**
		 * filterByOutboundFlight
		 *
		 * @param {MulticomFlight} outFlight
		 *
		 * Filters the collection to the flights that have the same outbound flight as contained in outFlight
		 *
		 *
		*/
		filterByOutboundFlight: function(outFlight){
			return this.filter(function(item){
				if(	item.get('outboundFlightNum') === outFlight.get('outboundFlightNum') &&
					item.get('arrivalDate') === outFlight.get('arrivalDate') &&
					item.get('arrivalTime') === outFlight.get('arrivalTime')){
						return true;
					}
				else{
					return false;
				}
					
			});
		},
		
		/**
		 * filterByReturnFlight
		 *
		 * @param {MulticomFlight} retFlight
		 *
		 * @return: {Array} of models
		 *
		 * Filters the collection to the flights that have the same return flight as contained in retFlight
		 *
		*/
		filterByReturnFlight: function(retFlight){
			return this.filter(function(item){
				if(	item.get('returnFlightNum') === retFlight.get('returnFlightNum') &&
					item.get('returnHomeDate') === retFlight.get('returnHomeDate') &&
					item.get('returnHomeTime') === retFlight.get('returnHomeTime')){
						return true;
					}
				else{
					return false;
				}
					
			});
		},
		
		/**
		 * filterByFlightFilter
		 *
		 * @param {FlightFilter} filter
		 * @return {Array} of models
		 *
		 * Filters the collection by the given filter
		 *
		*/
		filterByFlightFilter: function(filter){
			return this.filter(function(item){
				
				var outboundCarrier = filter.getProperty('outboundAirline'),
					outboundNoStops = filter.getProperty('outboundNoStops'),
					returnCarrier = filter.getProperty('returnAirline'),
					returnNoStops = filter.getProperty('returnNoStops');
					
				var match = true;

				//outbound
				if(outboundCarrier !== null &&  _.indexOf(outboundCarrier,item.get('outboundCarrier')) === -1){match=false;}
				if(outboundNoStops !== null &&  _.indexOf(outboundNoStops,item.get('outboundNumStops'))=== -1){match=false;}
				if(!filter.isDepartureTimeFiltered('outboundDepartureTimes',item.get('departureTime'))){match=false;}
				
				//return
				if(returnCarrier !== null &&  _.indexOf(returnCarrier,item.get('returnCarrier')) === -1){match=false;}
				if(returnNoStops !== null &&  _.indexOf(returnNoStops,item.get('returnNumStops')) === -1){match=false;}
				if(!filter.isDepartureTimeFiltered('returnDepartureTimes',item.get('returnHomeDepartTime'))){match=false;}

				
				return match;
				
			});
		},
		
		
		/**
		 * getUniqueArrayFromParameters
		 *
		 * @param {Array} parameter(s) ['outboundCarrier','outboundCarrierName'] etc
		 *
		 * @return [{name: 'British Airways', code: 'BA'} ... ]
		 *
		 * Returns an of the unique sets of parameters taken from the models
		 * If multiple parameters are passed, then multiple parameters will be returned, each with a value
		*/
		getUniqueArrayFromParameters: function(parameters){
		
			var self = this;
			var uniqueArray = [];
			
			this.each(function(item,index,list){
				var keep = false;
				
				var valuesToFilter = {};
				_.each(parameters, function(param){
					valuesToFilter[param]=item.get(param);
				});
				
				//see if anyother models match
				var matchingModels = self.filter(function(potentialMatch){
					var p = true;
					_.each(valuesToFilter, function(valueToFilterItem, valueToFilterIndex){
						if(potentialMatch.get(valueToFilterIndex) !== valueToFilterItem){p=false;}
					});
					return p;
				});
				
				if(matchingModels.length > 1){
					if(self.indexOf(item) === self.indexOf(matchingModels[0])){
						keep = true;
					}
					else{
						keep = false;
					}
				}
				else{
					keep = true;
				}
				
				if(keep){
					uniqueArray.push(valuesToFilter);
				}
				
			});
			return uniqueArray;
		}
		
		
	});
	
	return MulticomFlightCollection;
});
	
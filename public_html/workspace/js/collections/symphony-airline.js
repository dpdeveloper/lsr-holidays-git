
/* collections/symphony-airline.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','config',
	'models/symphony-airline'
	
], function($,_,Backbone,config,SymphonyAirline){
	"use strict";
	
	var SymphonyAirlineCollection = Backbone.Collection.extend(
	/** @lends SymphonyAirlineCollection */
	{
		
		/**
			Constructor
			
			@class Collection manipulate Multicom Rooms
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
		},
	
		model: SymphonyAirline,
		url: config.root+'json/airlines',
		
		setTestMode: function(testMode){
			if(testMode){
				this.url = config.root+'json-test/airlines.json';
			}
			else{
				this.url = config.root+'json/airlines';
			}
			
		},
		
		parse: function(response){
			return response.airlines;
		},
		
		/**
		 * getAirlineFromCode
		 *
		 * @param airline code
		 *
		 * @return {Object} JSONed object
		 *
		 * Searches for the given airline code and returns the JSONified model
		 *
		*/
		getAirlineFromCode: function(code){
			var found = null;
			found = this.find(function(item){
				if(code === item.get('code')){return true;}
			});
			
			if(typeof found !== 'undefined' && found !== null){
				return found.toJSON();
			}
			else{
				return null;
			}
		}

		
	});
	
	return SymphonyAirlineCollection;
});
	
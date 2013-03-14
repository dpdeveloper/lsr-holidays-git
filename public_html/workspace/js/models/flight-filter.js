/* models/flight-filter.js
 *
 * David Anderson 2012
 *
*/

define([
	'underscore','jquery','backbone'
], function(_,$,Backbone){
	'use strict';

	var FlightFilter = Backbone.Model.extend(
	/** @lends FlightFilter */
	{
		defaults: {
			outboundAirline: null,
			outboundNoStops: null,
			outboundDepartureTimes: null,
			
			returnAirline: null,
			returnNoStops: null,
			returnDepartureTimes: null
		},
		
		TIMES:{
			MORNING: 'm',
			AFTERNOON: 'a',
			EVENING: 'e'
		},
		
		
		/**
		 * setProperty
		 *
		 * @param {String} attrib
		 * @param {String | Array} val
		 *
		 * Set the given property to an array or a string
		 * The result is stored as a CSV either way
		*/
		setProperty: function(attrib,val){
			if(val === null){
				return this.set(attrib,null);
			}
			else if(typeof val === 'string'){
				return this.set(attrib, val);
			}
			else{
				return this.set(attrib,val.join(','));
			}
		},
		
		/**
		 * getProperty
		 *
		 * @param attrib
		 *
		 * Returns the asked for attribute as an array
		*/
		getProperty: function(attrib){
			var val = this.get(attrib);
			if(val === null){ return null; }
			if(val.indexOf(',') === -1){
				return [val];
			}
			else{
				return val.split(',');
			}
		},
		
		/**
		 * toJSONExpanded
		 *
		 * Converts to JSON but converts all CSV values to arrays
		*/
		toJSONExpanded: function(){
			var obj = {};
			var self = this;
			for(var key in this.attributes){
				obj[key] = self.getProperty(key);
			}
			return obj;
		},
		
		/**
		 * isDepartureTimeFiltered
		 *
		 * @param {String} parameter - 'outBoundDepartureTimes' or 'returnDepartureTimes'
		 * @param {String} departureTime
		 *
		 * @return {Boolean} true if the filter isn't set or if the departure time falls within the window
		 *
		*/
		isDepartureTimeFiltered: function(parameter,departureTime){
			var f = this.getProperty(parameter);
			if(f === null){ return true; }
			
			var times = [];
		
			//if all set then return true
			if(_.indexOf(f,this.TIMES.MORNING) !== -1){
				times.push({start: 0, end: 1200});
			}
			if(_.indexOf(f,this.TIMES.AFTERNOON) !== -1){
				times.push({start: 1200, end: 1800});
			}
			if(_.indexOf(f,this.TIMES.EVENING) !== -1){
				times.push({start: 1800, end: 2400});
			}

			departureTime = parseInt(departureTime,10);
			if(isNaN(departureTime)){return true;}
			
			//do the filtering
			var match = false;
			
			_.each(times, function(el,i){
				if(el.start <= departureTime && departureTime <= el.end){
					match=true;
				}
			});
			
			
			return match;
		}		
	});
	
	return FlightFilter;
});
	
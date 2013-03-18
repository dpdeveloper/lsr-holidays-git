/* models/holiday-search.js
 *
 * THIS IS COPIED AND RENAMED FROM HOLIDAY-BOOKING/TRIP - trip remains for compatibility purposes.
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational','moment'
], function($,_,Backbone, BackboneRelational, moment){
	
	"use strict";
	
	/**
		@module Models
		@exports HolidaySearch
	*/

	var HolidaySearch = Backbone.RelationalModel.extend(
	/** 
		@lends HolidaySearch
		
		@property {TRIP_TYPE} tripType
		@property {string} destination
		@property {string} hotelName
		@property {string - DD/MM/YY} dateStart
		@property {Integer} numNights
		@property {Integer} numRooms
		@property {string} adultCsv
		@property {string} infantCsv
		@property {string} childCsv
		@property {string} childAges
		
		@property {string} departingFrom
		@property {string} flightClass
		@property {string} oneWay
		@property {string} directFlights
		@property {string} thirdPartyInsurance
		@property {string} thurdPartyInsuranceName
	*/
	{
		defaults: {
			
			//type
			tripType: null,
			
			//basics
			destination: 'las vegas',
			hotelName: '',
			dateStart: null,
			numNights: 5,
			
			
			//rooms
			numRooms: 1,
			adultCsv: "2",
			infantCsv: "",
			childCsv: "",
			childAges: "",
			
			//flights
			departingFrom: "LHR",
			flightClass: 'economy',
			oneWay: 'no',
			directFlights: 'no',
			
			//party info
			thirdPartyInsurance: null,
			thirdPartyInsuranceName: null
		},
		
		TRIP_TYPES: {
			HOTEL: 'hotel',
			FLIGHT: 'flight',
			PACKAGE: 'package'
		},
		
		initialize: function(){
			_.bindAll(this);
			
			//set the initial date
			var d = new Date();
			d.setDate(d.getDate()+7);
			var day = d.getDate();
			var month = d.getMonth() + 1; //Months are zero based
			var year = d.getFullYear().toString().substr(2,4);
			
			this.set({dateStart: day+"/"+month+"/"+year});
			
			this.set({tripType: this.TRIP_TYPES.PACKAGE});
		},
		
		setType: function(type){
			if($.inArray(type, _.toArray(this.TRIP_TYPES)) !== -1){
				this.set('tripType',type);
			}
		},
		
		/**
			@returns {Array} An array of the room occupancies
		*/
		getRoomOccupancy: function(){
			var data = [];
			
			var adult = this.get('adultCsv');
			var infant = this.get('infantCsv');
			var child  = this.get('childCsv');
			
			adult = adult.split(',');
			infant = infant.split(',');
			child = child.split(',');
			
			for(var i=0; i< this.get('numRooms'); i++){
				data[i] = [];
			
				if(i < adult.length){
					data[i].adults = adult[i];
				}
				if(i < child.length){
					data[i].children = child[i];
				}
				if(i < infant.length){
					data[i].infants = infant[i];
				}
			}
			return data;
		},
		
		
		/**
			Set the Room Occupancy from an array
			
			@param {Array} occupancy Array of room occupancies in the format
		*/
		setOccupancy: function(occupancy){
			if(occupancy === null || occupancy.length === 0){return;}
			
			var adult = '', children = '', infant = '';
			
			_.each(occupancy,function(elem, index, list){
				if(!('adults' in elem)){elem.adults=0;}
				if(!('children' in elem)){elem.children=0;}
				if(!('infants' in elem)){elem.infants=0;}
				
				adult = adult + elem.adults.toString();
				children = children + elem.children.toString();
				infant = infant + elem.infants.toString();
				
				if(index < list.length - 1){
					adult = adult + ',';
					children = children + ',';
					infant = infant + ',';
				}
				
			});
			
			this.set({
				numRooms: occupancy.length,
				adultCsv: adult,
				childCsv: children,
				infantCsv: infant
			});
		},
		
		
		/**
			Get an array of travellers in the format
			{type: "adult|child|infant" room: 0}
			
			@return {array}
		*/
		getTravellers: function(){
			var occ = this.getRoomOccupancy();
			
			var data = [];
			
			_.each(occ, function(el,index){
				var i =0;
				for(i=0;i<parseInt(el.adults, 10);i++){
					data.push({room: index,type: 'adult'});
				}
				for(i=0;i<parseInt(el.children, 10);i++){
					data.push({room: index,type: 'child'});
				}
				for(i=0;i<parseInt(el.infants, 10);i++){
					data.push({room: index,type: 'infant'});
				}
			});
			return data;
		},
			
		/**
			@returns {Object} A JSON object of the holidaySearch for Multicom flight searching
			@TODO Should probably be refactored into the MulticomFlightCollectionObject
		*/
		getFlightTrip: function(){
			
			var adults=this._countCsv(this.get('adultCsv')),
				children=this._countCsv(this.get('childCsv')),
				infants=this._countCsv(this.get('infantCsv'));
			
			return {
				oneWay: 'no',
				directFlights: 'no',
				numAdults: adults.toString(),
				numChildren: children.toString(),
				numInfants: infants.toString(),
				dateStart: this.get('dateStart'),
				departureAirport: this.get('departingFrom'),
				flightClass: this.get('flightClass'),
				numNights: this.get('numNights'),
				destinationAirport: this._getAirportFromDestination(this.get('destination'))
			};
		},
		
		/**
			Returns the total number of adults, children and infants
			@returns {Object}
		*/
		getOccupancyTotals: function(){
			return {
				adults: this._countCsv(this.get('adultCsv')),
				children: this._countCsv(this.get('childCsv')),
				infants: this._countCsv(this.get('infantCsv'))
			};
		},
		
		
		/**
			Sets the start date and number of nights from two dates
			
			@param {String} start dd/mm/yyy
			@param {String} end dd/mm/yyyy
		*/
		setDatesFromStartFinish: function(start,end){
			var format="DD/MM/YYYY";
			
			var s = moment(start,format);
			var e = moment(end,format);
		
			var nights = (e.diff(s, 'days')).toString();
			
			this.set({
				dateStart: start,
				numNights: nights	
			});
		},
		
		/**
			@param {String} destination
			@returns {String} An aiport from the destination
		*/
		_getAirportFromDestination: function(destination){
			
			var destinationAirports= {
				'las vegas': 'LAS',
				'miami': 'MIA',
				'new york': 'JFK',
				'los angeles': 'LAX',
				'dubai': 'DXB'
			};
		
			if(typeof destinationAirports[destination] === 'undefined'){
				return null;
			}
			else{
				return destinationAirports[destination];
			}
		},
		
		
		/**
			@param {String} csv CSV to be counted
		*/
		_countCsv: function(csv){
			if(typeof csv === 'undefined' || csv.length === 0 || csv === ','){ return 0;}
			
			var ret=0;
			_.each(csv.split(','), function(el){
				ret = ret + parseInt(el, 10);
			});
			return ret;
		}
	});
	
	return HolidaySearch;
});
	
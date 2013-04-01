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
	

	var HolidaySearch = Backbone.RelationalModel.extend(
	/** 
		@class HolidaySearch
		
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
			destination: '',
			hotelName: '',
			dateStart: '',
			numNights: 7,
			
			
			//rooms
			numRooms: 1,
			adultCsv: "2",
			infantCsv: "0",
			childCsv: "0",
			childAges: "",
			
			//flights
			departingFrom: "",
			flightClass: 'economy',
			oneWay: 'no',
			directFlights: 'no',
			
			//party info
			thirdPartyInsurance: false,
			thirdPartyInsuranceName: ''
		},
		
		TRIP_TYPES: {
			HOTEL: 'hotel',
			FLIGHT: 'flight',
			PACKAGE: 'package'
		},
		
		initialize: function(options){
			options = options || {};
			
			// a few dynamic defaults
			if(!options.tripType){
				this.set({tripType: this.TRIP_TYPES.PACKAGE});	
			}
			
			_.bindAll(this);
		},
		
		
		/* -------------------------------- UTILITY FUNCTIONS -------------------------------- */
		
		
		
		
		
		
		/* -------------------------------- SET FUNCTIONS -------------------------------- */
		
		setType: function(type){
			if($.inArray(type, _.toArray(this.TRIP_TYPES)) !== -1){
				this.set('tripType',type);
			}
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
			@param {String} startDate
		*/
		setStartDate: function(startDate){
			var format = "DD/MM/YYYY";
			
			var newStart = moment(startDate,format);
			var curStart = moment(this.get('dateStart'),format);
			var curEnd = moment(this.getEndDate(),format);
			
			if(newStart.isValid()){
				
				if(curStart !== null && curStart.isValid()){
					
					if(newStart.isBefore(curEnd)){
						this.set({
							dateStart: startDate,
							numNights: curEnd.diff(newStart,'days')
						});
					}
					else{
						this.set({dateStart: startDate});
					}
					
				}
				else{
					this.set({dateStart: startDate});
				}

				return true;
			}
			
			return false;
		},
		
		
		/**
			
			@param {Boolean} numNightsConstant keep the number of nights constant or not
			
		*/
		setStartDateFromEndDate: function(endDate, numNightsConstant){
			numNightsConstant = numNightsConstant || false;
			
			var format="DD/MM/YYYY";
		
			if(moment(endDate, format).isValid()){
				
				if(	numNightsConstant ||
					moment(endDate,format).isBefore(moment(this.get('dateStart'),format)) ||
					moment(endDate,format).isSame(moment(this.get('dateStart'),format))
				){
					
					var start = moment(endDate,format).subtract('days',this.get('numNights'));
					this.set({dateStart: moment(start).format(format)});
				}
				else{
					var num = moment(endDate,format).diff(moment(this.get('dateStart'),format),'days');
					this.set({numNights: num});
				}
			}
		},
		
		
		/* -------------------------------- GET FUNCTIONS -------------------------------- */
		
		
		/**
			@return {Array} Array of Child Ages in integer format
		*/
		getChildAges: function(){
			var age = this.get('childAges').split(',');
			
			var arr = [];
			
			_.each(age,function(item){
				arr.push(parseInt(item,10));
			});
			
			return arr;
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
			Adds a room to the search
			
			@param {Object} roomOcc
		*/
		addRoom: function(roomOcc){
			var c = this.getRoomOccupancy();
			c.push(roomOcc);
			this.setOccupancy(c);
		},
		
		/**
			Calculates the end Date
		*/
		getEndDate: function(){
			var format="DD/MM/YYYY";
			
			var n = this.get('numNights');
			
			if(typeof this.get('numNights') !== 'number'){
				n = parseInt(n,10);
			}
			
			var s =moment(this.get('dateStart'),format);
			if(s !== null && s.isValid()){
				s.add('days',n);
				return s.format(format);
			}
			
			return '';
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
	
/* models/booking.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational',
	
	'models/holiday-search',
	
	'models/multicom/multicom-flight',
	'models/multicom/multicom-accommodation',
	'models/multicom/multicom-room',
	'models/multicom/multicom-shortlist',
	'models/travellers-info',
	'collections/multicom-room',
	'collections/travellers-info'
	
	
], function($,_,Backbone, BackboneRelational,
			HolidaySearch,
			MulticomFlight,
			MulticomAccommodation,
			MulticomRoom,
			MulticomShortlist,
			TravellersInfo,
			MulticomRoomCollection,
			TravellersInfoCollection
			
			){
	"use strict";
	
	/**
		@module Models
		@exports Booking
	*/
	
	var Booking = Backbone.RelationalModel.extend(
	/**
		@lends Booking
		
		@property status
		@property entryId
		@property createdDate
		@property bookedDate
		@property itinerary
		@property itineraryCost
	*/
	{
		
		relations: [
			{
				type: 'HasOne',
				key: 'holidaySearch',
				relatedModel: HolidaySearch
			},
			{
				type: 'HasOne',
				key: 'selectedHotel',
				relatedModel: MulticomAccommodation
			},
			{
				type: 'HasOne',
				key: 'selectedFlight',
				relatedModel: MulticomFlight
			},
			{
				type: 'HasMany',
				key: 'selectedRooms',
				relatedModel: MulticomRoom,
				collectionType: MulticomRoomCollection
			},
			{
				type: 'HasMany',
				key: 'travellersInfo',
				relatedModel: TravellersInfo,
				collectionType: TravellersInfoCollection
			},
			{
				type: 'HasOne',
				key: 'shortlistRequest',
				relatedModel: MulticomShortlist
			}
		],
		
		defaults: {
			status: null,
			entryId: null,
			createdDate: null,
			bookedDate: null,
			itinerary: null,
			itineraryCost: null,
			extraCost: 0
		},
		
		STATES: {
			SEARCH: 'search',
			BASKET: 'basket',
			BOOK: 'book',
			PAID: 'paid',
			COMPLETE: 'complete'
		},
		
		ATOL_FEE: 2.5,
		
		/**
		
			Constructor
			
			@class Booking Object
			@constructs
			@param {Object} [options] Options Hash
			
		*/
		initialize: function(options){
			//set the date to today
			var d = new Date();
			var self = this;
			
			this.set({
				status: this.STATES.SEARCH,
				createdDate: ('0'+d.getDay()).slice(-2) + '/' + ('0'+(d.getMonth() +1)).slice(-2) + '/' + d.getYear(),
				holidaySearch: new HolidaySearch(),
				shortlistRequest: new MulticomShortlist() 
			});
			
			//shortlist binding
			this.listenTo(this.get('shortlistRequest'),'complete',function(){
				self.trigger('shortlist:complete');
			});
			this.listenTo(this.get('shortlistRequest'),'error',function(){
				self.trigger('shortlist:error');
			});
		},
		
		/**
			@param state {string} from this.STATES
		*/
		_setStatus: function(state){
			
			//check if in the object
			var found = _.find(_.values(this.STATES), function(item){
				return item === state;
			});
			
			if(typeof found !== 'undefined'){
				this.set('status',state);
				return true;
			}
			return false;
		},
		
		/**
			Ensures that the travellersInfo collection corresponds to the holidaySearch
		*/
		_validateTravellersInfo: function(){
			var occ = this.get('holidaySearch').getTravellers();
			var curLength = this.get('travellersInfo').length;
			
			//if zero
			if(curLength === 0 && occ.length > 0){
				for(var i=0; i<occ.length; i++){
					this.get('travellersInfo').add(new TravellersInfo({
						travellerNo: i+1,
						isLeadTraveller: i === 0 ? true : false,
						travellerType: occ[i].type
					}));
				}
			}
				
		},
		
		/**
			Returns the holidaySeaerch
		*/
		getSearch: function(){
			return this.get('holidaySearch');
		},
		
		
		makeShortlistRequest: function(){
			
			this.get('shortlistRequest').makeShortlistRequest(this);
		},
		 
		
		/**
			Sets the Selected Hotel and then builds a room package from the selection
		
			@param {SymphonyHotel} hotel
		*/
		setSelectedHotel: function(hotel){
			/*
				NB The hotel is copied into the booking, not just set
				It is a copy of the model, not the origional so will have a different CID
			*/
			
			if(this.get('selectedHotel') === null){
				this.set({selectedHotel: new MulticomAccommodation(hotel.toJSON())});
			}
			else{
				this.get('selectedHotel').set(hotel.toJSON());
			}
			this.get('selectedRooms').reset();
			this.get('selectedRooms').buildPackageFromAccommodation(hotel,this.get('holidaySearch'));
		},
		
		/**
			
			@param {MulticomFlight} flight
			
		*/
		setSelectedFlight: function(flight){
			/*
				NB The flight is copied into the booking, not just set
				It is a copy of the model, not the origional so will have a different CID
			*/
			if(this.get('selectedFlight') === null){
				this.set({selectedFlight: new MulticomFlight(flight.toJSON())});
			}
			else{
				this.get('selectedFlight').set(flight.toJSON());
			}
			
			//set the extra costing for the flight
			var travellers = this.get('holidaySearch').getTravellers().length;
			
			this.set({extraCost: travellers * this.ATOL_FEE});
			
		},
		
		/**
		
			@returns {rooms, flight, extra, total}
			
		*/
		getCost: function(){
			var cost = {
				rooms: this.get('selectedRooms').calculateCost(),
				flight: 0,
				extra: this.get('extraCost')
			} ;
			
			var f = this.get('selectedFlight');
			if(typeof f !== 'undefined' && f !== null){
				cost.flight = parseFloat(f.get('priceTotal'));
			}
			
			cost.total = cost.rooms + cost.flight + cost.extra;
		
			return cost;
		},
		
		getCostPerPerson: function(){
			var cost = this.getCost();
			var travellers = this.get('holidaySearch').getTravellers().length;
			
			$.each(cost, function(key,val){
				var i = val / travellers;
				cost[key]= parseFloat(i.toFixed(2));
			});
			return cost;
		},
		
		
		/**
			Converts a booking model to a JSON summary in the format:
			{
				date (DD/MM/YY),
				nights,
				hotel: {
					name,
					destination,
					stars
				},
				flights: {
					originAirport
					destinationAirport
					carrier
				}
				rooms: [
					{
						name
					}
				]
			}
			
			@returns {Object}
		*/
		getSummary: function(){
		
			var hotel = {}, flight={}, rooms=[];
			
			if(this.get('selectedHotel') !== null){
				hotel = {
					accommodationName: this.get('selectedHotel').get('accommodationName'),
					rating: this.get('selectedHotel').get('rating'),
					resortName: this.get('holidaySearch').get('resortName')
				};
			}
			
			if(this.get('selectedFlight') !== null){
				var f = this.get('selectedFlight');
				flight = {
					originAirport: f.get('originAirport'),
					originAirportName: f.get('originAirportName'),
					destinationAirport: f.get('destinationAirport'),
					destinationAirportName:  f.get('destinationAirportName'),
					carrier:  f.get('outboundCarrier')
				};
			}
			
			if(this.get('selectedRooms').length > 0){
				this.get('selectedRooms').each(function(elem, index){
					rooms.push({
						name: elem.get('name')
					});
				});
			}
		
			return {
				date: this.get('holidaySearch').get('dateStart'),
				nights: this.get('holidaySearch').get('numNights'),
				hotel: hotel,
				flight: flight,
				rooms: rooms,
				holidaySearch: this.get('holidaySearch').toJSON()
			};
		}
		
	});
	
	return Booking;
});
	
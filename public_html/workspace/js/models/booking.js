/* models/booking.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational',
	
	'models/holiday-search',
	
	'models/multicom/multicom-flight',
	'models/symphony-hotel',
	'models/multicom/multicom-room',
	'models/travellers-info',
	'collections/multicom-room',
	'collections/travellers-info'
	
	
], function($,_,Backbone, BackboneRelational,
			HolidaySearch,
			MulticomFlight,
			SymphonyHotel,
			MulticomRoom,
			TravellersInfo,
			MulticomRoomCollection,
			TravellersInfoCollection
			
			){
	"use strict";
	
	/**
		A Booking model
		
		@module Model: Booking
		@exports Booking
		
		@property status
		@property entryId
		@property createdDate
		@property bookedDate
		@property itinerary
		@property itineraryCost
		
	*/
	
	
	var Booking = Backbone.RelationalModel.extend({
		
		relations: [
			{
				type: 'HasOne',
				key: 'holidaySearch',
				relatedModel: HolidaySearch
			},
			{
				type: 'HasOne',
				key: 'selectedHotel',
				relatedModel: SymphonyHotel
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
			}
		],
		
		defaults: {
			status: null,
			entryId: null,
			createdDate: null,
			bookedDate: null,
			itinerary: null,
			itineraryCost: null
		},
		
		STATES: {
			SEARCH: 'search',
			BASKET: 'basket',
			BOOK: 'book',
			PAID: 'paid',
			COMPLETE: 'complete'
		},
		
		/**
		 * initialize
		 *
		 * @param {Object} options
		 *
		*/
		initialize: function(options){
			//set the date to today
			var d = new Date();
			this.set({
				status: this.STATES.SEARCH,
				createdDate: ('0'+d.getDay()).slice(-2) + '/' + ('0'+(d.getMonth() +1)).slice(-2) + '/' + d.getYear(),
				holidaySearch: new HolidaySearch()
			});
			
			
		},
		
		/**
		 * _setStatus
		 *
		 * @param state {string} from this.STATES
		 *
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
		 * Returns the holidaySeaerch
		*/
		getSearch: function(){
			return this.get('holidaySearch');
		},
		 
		
		/**
		 * @param {SymphonyHotel}
		 *
		*/
		setSelectedHotel: function(hotel){
			this.set('selectedHotel',hotel);
			this.get('selectedRooms').reset();
			this.get('selectedRooms').buildPackageFromAccommodation(hotel.get('multicomHotel'),this.get('holidaySearch'));
		},
		
		/**
		 *
		 * @param {MulticomFlight}
		 *
		*/
		setSelectedFlight: function(flight){
			this.set('selectedFlight',flight);
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
					name: this.get('selectedHotel').get('title'),
					destination: this.get('selectedHotel').get('destination'),
					stars: this.get('selectedHotel').get('starRating')
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
				rooms: rooms
			};
		}
		
	});
	
	return Booking;
});
	
/* models/multicom/multicom-shortlist.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational'
], function($,_,Backbone){
	
	"use strict";

	var MulticomShortlist = Backbone.RelationalModel.extend(
	/** @lends MulticomShortlist */
	{
		defaults: {
			testMode: false,
			itinerary: null,
			itineraryCost: null,
			status: null
		},
		
		STATES: {
			NULL: null,
			LOADING: 'loading',
			SUCCESS: 'success',
			ERROR: 'error'
		},
		
		/**
			@constructor	
		*/
		initialize: function(options){
			options = options || {};
			
			if('testMode' in options && options.testMode === true){
				this.setTestMode(true);
			}
		},
		
		/**
			@param {Boolean} testMode
		*/
		setTestMode: function(testMode){
			this.set({testMode: testMode});
		},
		
		
		/**
			Builds the JSON to send a shortlist request
			
			@param {Booking} booking
		*/
		buildShortlistRequest: function(booking){
			return {
				action: 'buildShortlist',
				travelSegments: [
					this._buildTravel(booking.get('selectedFlight'))
				],
				accommodationSegments: [
					this._buildAccommodation(booking.get('selectedHotel'),booking.get('selectedRooms'))
				],
				partyInfo: this._buildParty(booking.get('holidaySearch'))
			};
		},
		
		
		/**
			@param {HolidaySearch Model} holidaySearch
		*/
		_buildParty: function(holidaySearch){
			
			if(typeof holidaySearch !== 'undefined' && holidaySearch !== null){
			
				var occ = holidaySearch.getOccupancyTotals();
				
				return {
					numberOfAdults: occ.adults,
					numberOfInfants: occ.infants,
					thirdPartyInsurance: holidaySearch.get('thirdPartyInsurance'),
					thirdPartyInsuranceName: holidaySearch.get('thirdPartyInsuranceName'),
					preferredNumberOfRooms: holidaySearch.get('numRooms'),
					defaultMealOkay: true,
					defaultResortTransferOkay: true,
					defaultDonationOkay: true,
					youngPersonAge: holidaySearch.getChildAges()
				};
			}
		},
		
		/**
			Builds the accommodation segment from an accommodation and rooms
			
			@param {MulticomAccommodation} accommodation
			@param {MulticomRoomCollection} roomCollection
		*/
		_buildAccommodation: function(accommodation, roomCollection){
			
			if(accommodation !== null){
			
				var rooms = [];
				
				roomCollection.each(function(item){
					var occ = item.get('occupancy');
					
					var r = {
						code: item.get('code'),
						rateCode: item.get('chosenRoomRate'),
						adults: occ.adults,
						children: occ.children,
						infants: occ.infants
					};
					rooms.push(r);
				});
			
				return {
					itinerary: accommodation.get('itineraryId'),
					rooms: rooms
				};
			}
			return null;
		},
		
		/**
			Builds the travel segment from a flight
			
			@param {MulticomFlight} flight
		*/
		_buildTravel: function(flight){
			if(flight !== null){
				return flight.get('itineraryId');
			}
			return null;
		}
		
		
	});
	
	return MulticomShortlist;
});
	
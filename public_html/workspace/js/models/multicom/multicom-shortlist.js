/* models/multicom/multicom-shortlist.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational','config'
], function($,_,Backbone,BackboneRelational, config){
	
	"use strict";

	var MulticomShortlist = Backbone.RelationalModel.extend(
	/** @lends MulticomShortlist */
	{
		defaults: {
			testMode: false,
			totalCost: null,
			errata: [],
			status: null
		},
		
		STATES: {
			NULL: null,
			LOADING: 'loading',
			SUCCESS: 'success',
			ERROR: 'error'
		},
		
		ERRATA_TEMPLATE: {
			supplier: '',
			info: ''
		},
		
		/**
			@constructor	
		*/
		initialize: function(options){
			options = options || {};
			
			if('testMode' in options && options.testMode === true || config.multicomMode === 'test'){
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
			Determine if the shortlist is loading
			
			@returns Boolean
		*/
		isLoading: function(){
			return (this.get('status') === this.STATES.LOADING);
		},
		
		
		/**
			Make the shortlist request
			
			@param {Booking Model} current booking object
			
			@returns true if request made
		*/
		makeShortlistRequest: function(booking){
			var self = this;			
			this.url = this.getRequestUrl();
			
			this.set({status: self.STATES.LOADING});
			
			this.fetch({
				type: 'POST',
				data: this.buildShortlistRequest(booking),
				
				success: function(collection,xhr,options){
					if(xhr.result === 'success'){
						self.trigger('complete');
						self.set({status: self.STATES.SUCCESS});
					}
					else{
						self._error=xhr.error;
						self.trigger('error');
						self.set({status: self.STATES.ERROR});
					}
				},
				error: function(collection,xhr,options){
					self.trigger('error');
					self.set({status: self.STATES.ERROR});
				}
				
			});
		},
		
		
		/**
			Function to parse API response into model
			
			@param {Object} data
			
		*/
		parse: function(data){
		
			var self = this;
			
			if(data.result !== 'success'){
				return [];
			}
			var shortlist = (((data || {}).data || {}).CurrentShortList || {}).Item;
			
			if(!$.isArray(shortlist)){
				shortlist = [shortlist];
			}
			var response = {
				totalCost: 0,
				errata: []
			};
			
			_.each(shortlist,function(element,index){
				var cost = (((element || {}).Itinerary || {}).ItineraryCost || {});
				cost = parseFloat(cost['@TotalCost'],10);
				
				var info = (((element || {}).Itinerary || {}).ImportantInformation || {}).Errata;
				
				response.totalCost = response.totalCost + cost;
				
				if(typeof info !== 'undefined'){
					if(!$.isArray(info)){
						info = [info];
					}
					_.each(info,function(infoItem,i){
						var item = _.clone(self.ERRATA_TEMPLATE);
						infoItem = infoItem || {};
						item.supplier = infoItem['@SupplierCode'];
						item.info = infoItem['@Text'];
						
						response.errata.push(item);
					});
				}
			});
			
			return response;
		},
		
		
		/**
			Gets the search url
			
			@returns the url to make the shortlist request to
				
		*/
		getRequestUrl: function(){
			if(this.get('testMode')){
				return config.contentRoot+"json-test/multicom-v3/shortlist.json";
			}
			else{
				return config.root + "extensions/multicom_plugin/api.php";	
			}
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
					numAdults: occ.adults,
					numInfants: occ.infants,
					thirdPartyInsurance: holidaySearch.get('thirdPartyInsurance'),
					thirdPartyInsuranceName: holidaySearch.get('thirdPartyInsuranceName'),
					numRooms: holidaySearch.get('numRooms'),
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
	
/* collections/multicom-room
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone',
	'models/multicom/multicom-room'
], function($,_,Backbone,MulticomRoom){
	
	"use strict";

	var MulticomRoomCollection= Backbone.Collection.extend(
	/** @lends MulticomRoomCollection */
	{
		model: MulticomRoom,
		
		
		/**
			Constructor
			
			@class Collection manipulate Multicom Rooms
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};	
		},
		
		/**
		 * buildPackageFromAccommodation
		 *
		 * @param {MulticomAccommodation} accommodation
		 * @param {HolidaySearch} holidaySearch
		 *
		*/
		buildPackageFromAccommodation: function(accommodation, holidaySearch){
			
			var occupancy = holidaySearch.getRoomOccupancy();
			var numRooms = holidaySearch.get('numRooms');
			
			//fx to ensure that the
			var findRoom = function(occ){
				return function(item){
					if(	parseInt(occ.adults,10) >= item.get('minOccupancy') &&
						parseInt(occ.adults,10) <= item.get('maxOccupancy') &&
						parseInt(occ.children,10) <= item.get('maxExtraChildren') &&
						parseInt(occ.infants,10) <= item.get('maxExtraInfants')
					){
						return true;
					}
				};
			};
			
			for(var i=0; i< numRooms; i++){
				
				var foundRoom = accommodation.get('rooms').find(findRoom(occupancy[i]));
				if (typeof foundRoom !== 'undefined'){
					var room = foundRoom.clone();
					var o = occupancy[i]; //set the occupancy
					room.setOccupancy(o.adults,o.children,o.infants);
					this.push(room);
				}
				else{
					console.log('Error building default package for accommodation: '+accommodation.get('accommodationName'));
				}
			}
		},
		
		
		/* buildDefaultTrip
		 *
		 * Takes the data from a trip and accommodation request and builds a package
		 *
		*/
		buildDefaultTrip: function(trip,mcAccomRequest, hotel){
			
			var numRooms = trip.get('numRooms');
			var roomOcc = trip.getRoomOccupancy();
			
			var data = mcAccomRequest.toJSON();
			
			var hotelToBuild = data[0];
			
			if(typeof hotel !== 'undefined' && hotel !== null){
				hotelToBuild = hotel;
			}
			
			for(var i=0; i < numRooms; i++){
				var room = new MulticomRoom();
				
				//get rid of the id param!
				if('id' in hotelToBuild.rooms[0]){
					delete hotelToBuild.rooms[0].id;
				}
				
				room.set(hotelToBuild.rooms[0]);
				
				room.set({occupancy: roomOcc[i]});
				this.add(room);
			}
		},
		
		
		/* calculateCost
		 *
		 * Works out the total cost per night
		 *
		*/
		calculateCost: function(){
			var cost=0;
			this.each(function(val, index){
				cost = cost + parseFloat(val.getChosenRoomRate().cost);
			});
			return Math.round(cost*100)/100;
		},
		
		/* toJSONString()
		 *
		 * Concerts the array into a string that can be easily stored
		 *
		*/
		toJSONString: function(){
			return {'rooms': JSON.stringify(this.toJSON(),null,'\t')};
		}
		
	});
	
	return MulticomRoomCollection;
});
	
/* models/multicom/multicom-room.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational'
], function($,_,Backbone){
	
	"use strict";

	var MulticomRoom = Backbone.RelationalModel.extend({
		defaults: {
			maxOccupancy: null,
			minOccupancy: null,
			maxExtraChildren: 0,
			maxExtraInfants: 0,
			quantityAvailable: null,
			
			name: null,
			code: null,
			roomType: null,
			
			roomRate: {
				startDate: null,
				endDate: null,
				rateId: null,
				amount: null,
				currency: null,
				boardBasis: null,
				suppliersBoardCode: null
			},
			
			accommodationId: null,
			hotelName: null,
			
			occupancy: {
				adults: null,
				children: null,
				infants: null
			},
			
			chosenRoomRate: {}
		},
		
		setOccupancy: function(adults,children,infants){
			this.set({occupancy: {adults: adults, children: children, infants: infants}});
		}
		
	});
	
	return MulticomRoom;
});
	
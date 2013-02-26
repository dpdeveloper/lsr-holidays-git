
/* models/multicom/multicom-flight.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational'
], function($,_,Backbone, BackboneRelational){
	
	"use strict";
	
	var MulticomFlight = Backbone.RelationalModel.extend({

		defaults: {
			
			itineraryId: null,
			id: null,
			
			originAirport: '',
			originAirportName: '',
			destinationAirport: '',
			destinationAirportName: '',
			
			departureDate: '',
			departureTime: '',
			arrivalDate: '',
			arrivalTime: '',
			
			returnHomeDepartDate: '',
			returnHomeDepartTime: '',
			returnHomeDate: '',
			returnHomeTime: '',
			
			outboundCarrier: '',
			outboundAirlineName: '',
			outboundFlightClass: '',
			outboundFlightNumber: '',
			outboundFlightBasePrice: '',
			multiLegOutboundFlight: 'false',
			outboundNumStops: '0',
			outboundCabinClass: '',
			
			returnFlightClass: '',
			returnFlightNumber: '',
			returnFlightBasePrice: '',
			multiLegReturnFlight: 'false',
			returnCarrier: '',
			marketingCarrier: '',
			returnNumStops: '0',
			returnAirlineName: '',
			returnCabinClass: '',
			
			fareType: '',
			
			outboundSubSegments: '',
			returnSubSegments: ''
		},
		
		isNull: function(){
			if(this.get('itineraryId') === null){
				return true;
			}
			return false;
		}
	});
	
	return MulticomFlight;
});
	
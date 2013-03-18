/* models/multicom/multicom-flight.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational'
], function($,_,Backbone, BackboneRelational){
	
	"use strict";
	
	var MulticomFlight = Backbone.RelationalModel.extend(
	/** @lends MulticomFlight */
	{

		defaults: {
			
			itineraryId: null,
			supplier: '',
			numberOfNights: 0,
			oneWay: false,
			bookable: true,
			
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
			
			priceTotal: 0,
			priceOutboundBase: 0,
			priceReturnBase: 0,
			priceCurrency: '',
			
			outboundCarrier: '',
			outboundAirlineName: '',
			outboundFlightClass: '',
			outboundFlightNumber: '',
			outboundMultiLeg: false,
			outboundNumStops: 0,
			outboundSubSegments: [],
			
			
			returnCarrier: '',
			returnAirlineName: '',
			returnFlightClass: '',
			returnFlightNumber: '',
			returnMultiLeg: false,
			returnNumStops: 0,
			returnSubSegments: [],
			
			
			marketingCarrier: '',
			fareClass: ''
		},
		
		isNull: function(){
			if(this.get('itineraryId') === null){
				return true;
			}
			return false;
		},
		
		parse: function(response,options){
			if(typeof response.Flight !== 'undefined'){ 
				var obj = {
				
					itineraryId: response['@ItineraryId'],
					supplier: response['@Supplier'],
					numberOfNights: parseInt(response['@NumberOfNights'],10),
					oneWay: response['@OneWayOnly'] === 'true' ? true : false,
					bookable: response['@BookableByFAB'] === 'true' ? true:false,
					
					originAirport: response.Flight['@OriginAirport'],
					originAirportName: response.Flight['@OriginAirportName'],
					destinationAirport: response.Flight['@DestinationAirport'],
					destinationAirportName: response.Flight['@DestinationAirportName'],
					
					departureDate: response.Flight['@DepartureDate'],
					departureTime: response.Flight['@DepartureTime'],
					arrivalDate: response.Flight['@ArrivalDate'],
					arrivalTime: response.Flight['@ArrivalTime'],
					
					returnHomeDepartDate: response.Flight['@ReturnHomeDepartDate'],
					returnHomeDepartTime: response.Flight['@ReturnHomeDepartTime'],
					returnHomeDate: response.Flight['@ReturnHomeDate'],
					returnHomeTime: response.Flight['@ReturnHomeTime'],
					
					priceTotal: parseFloat(response['@LeadInPricePerPassenger'],10),
					priceOutboundBase: parseFloat(response.Flight['@OutboundFlightBasePrice'],10),
					priceReturnBase: parseFloat(response.Flight['@ReturnFlightBasePrice'],10),
					priceCurrency: response['@Currency'],
					
					outboundCarrier: response.Flight['@OutboundCarrier'],
					outboundAirlineName: response.Flight['@OutboundAirlineName'],
					outboundFlightClass: response.Flight['@OutboundCabinClass'],
					outboundFlightNumber: response.Flight['@OutboundFlightNumber'],
					outboundMultiLeg: response.Flight['@MultiLegOutboundFlight'] === 'true' ? true : false,
					outboundNumStops: 0,
					outboundSubSegments: [],
					
					
					returnCarrier: response.Flight['@ReturnCarrier'],
					returnAirlineName: response.Flight['@ReturnAirlineName'],
					returnFlightClass: response.Flight['@ReturnCabinClass'],
					returnFlightNumber: response.Flight['@ReturnFlightNumber'],
					returnMultiLeg: response.Flight['@MultiLegReturnFlight'] === 'true' ? true : false,
					returnNumStops: 0,
					returnSubSegments: [],
					
					
					marketingCarrier: response.Flight['@MarketingCarrier'],
					fareClass: response.Flight['@FareType']
				};
				
				var processSegment = function(segment){
					return {
						departurePoint: segment['@DeparturePoint'],
						departureDate: segment['@DepartureDate'],
						departureTime: segment['@DepartureTime'],
						arrivalPoint: segment['@ArrivalPoint'],
						arrivalDate: segment['@ArrivalDate'],
						arrivalTime: segment['@ArrivalTime'],
						
						operatingCarrier: segment['@OperatingCarrier'],
						operatedBy: segment['@OperatedBy'],
						flightNumber: segment['@FlightNumber'],
						
						originAirportName: segment['@OriginAirportName'],
						destinationAirportName: segment['@DestinationAirportName']
						
					};
				};
				
				if(obj.outboundMultiLeg === true){
					obj.outboundNumStops = parseInt(response.Flight['@OutboundNumStops'],10);
					obj.outboundSubSegments = [];
					
					if($.isArray(response.Flight.OutboundSubSegments)){
						_.each(response.Flight.OutboundSubSegments, function(item){
							obj.outboundSubSegments.push(processSegment(item));
						});
					}
					else{
						obj.outboundSubSegments.push(processSegment(response.Flight.OutboundSubSegments));
					}
					
				}
				
				if(obj.returnMultiLeg === true){
					obj.returnNumStops = parseInt(response.Flight['@ReturnNumStops'],10);
					obj.returnSubSegments = [];
					
					if($.isArray(response.Flight.HomeboundSubSegments)){
						_.each(response.Flight.HomeboundSubSegments, function(item){
							obj.returnSubSegments.push(processSegment(item));
						});
					}
					else{
						obj.returnSubSegments.push(processSegment(response.Flight.HomeboundSubSegments));
					}
				}
			
				return obj;
			}
			return {};
		}
	});
	
	return MulticomFlight;
});
	
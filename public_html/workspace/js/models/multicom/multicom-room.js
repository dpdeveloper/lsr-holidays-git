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
			name: '',
			code: '',
			
			maxOccupancy: 0,
			minOccupancy: 0,
			maxExtraChildren: 0,
			maxExtraInfants: 0,
			quantityAvailable: 0,
			
			roomRates: [],
			
			occupancy: null,
			chosenRoomRate: ''
		},
		
		ROOM_RATE_TEMPLATE: {
			startDate: '',
			endDate: '',
			rateCode: null,
			cost: 0,
			currency: '',
			boardBasis: ''
		},
		
		/**
			Sets the occupancy from adults/children/infants
			
			@param {Integer} adults
			@param {Integer} children
			@param {Integer} infants
		*/
			
		setOccupancy: function(adults,children,infants){
			//just make sure everything is setup corrrectly
			adults = parseInt(adults,10);
			children = parseInt(children,10);
			infants = parseInt(infants,10);
			
			this.set({occupancy: {adults: adults, children: children, infants: infants}});
		},
		
		getOccupancy: function(){
			var o = this.get('occupancy');
			
			if(o === null){
				return {adults: 0, children: 0, infants: 0};
			}
			return o;
		},
		
		/**
			Gets the chosen room rate
		*/
		getChosenRoomRate: function(){
			var rateId = this.get('chosenRoomRate');
			
			return _.find(this.get('roomRates'),function(item){
				if(item.rateCode === rateId){
					return true;
				}
			});
		},
		
		/**
			Parse a multicom json output into the model
		*/
		parse: function(response,options){
		
			//if a normal object
			if('name' in response && 'code' in response && 'roomRates' in response){
				return response;
			}
		
			//otherwise parse
			var obj = {
				name: response["@Name"],
				code: response["@Code"],
				maxOccupancy: parseInt(response["@MaxOccupancy"],10),
				minOccupancy: parseInt(response["@MinOccupancy"],10),
				maxExtraChildren: typeof(response["@MaxExtraChildren"])!=='undefined' ? parseInt(response["@MaxExtraChildren"],10) : 0,
				maxExtraInfants: typeof(response["@MaxExtraInfants"]) !=='undefined' ? parseInt(response["@MaxExtraInfants"],10): 0,
				quantityAvailable: parseInt(response["@QuantityAvailable"],10)
			};
			
			
			var parseRoomRate = function(room){
				return {
					startDate: room["@StartDate"],
					endDate: room["@EndDate"],
					rateCode: room["@RateId"] ? room["@RateId"] : room["@RateCode"],
					cost: parseFloat(room["@Amount"],10),
					currency: room["@Currency"],
					boardBasis: room["@BoardBasis"]
				};
			};
			
			//room rates
			if('RoomRate' in response){
				
				obj.roomRates = [];
				if($.isArray(response.RoomRate)){
					_.each(response.RoomRate, function(item){
						obj.roomRates.push(parseRoomRate(item));	
					});
				}
				else{
					obj.roomRates.push(parseRoomRate(response.RoomRate));
				}
				
				//set the default room rate
				obj.chosenRoomRate = obj.roomRates[0].rateCode;
			}
				
			//set the default occupancy
			obj.occupancy = {
				adults: obj.maxOccupancy,
				children: obj.maxExtraChildren,
				infants: obj.maxExtraInfants
			};
			return obj;
		}
		
	});
	
	return MulticomRoom;
});
	
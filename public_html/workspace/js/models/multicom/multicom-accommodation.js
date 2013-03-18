/* models/multicom/multicom-accommodation.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational',
	
	'models/multicom/multicom-room',
	'collections/multicom-room'
], function(	$,_,Backbone, BackboneRelational,
				MulticomRoom,
				MulticomRoomCollection
			){
	
	"use strict";
	
	var MulticomAccommodation = Backbone.RelationalModel.extend(
	/** @lends MulticomAccommodation */
	{
		relations: [{
			type: 'HasMany',
			key: 'rooms',
			relatedModel: MulticomRoom,
			collectionType: MulticomRoomCollection,
			parse: true
		}],
		
		defaults: {
			itineraryId: '',
			accommodationId: '',
			accommodationName: '',
			type: '',

			resortName: '',
			resortId: '',
			availableBoardBasis: '',
			boardCode: '',
			classCode: '',
			
			startDate: '',
			endDate: '',
			numNights: '',
			
			currency: '',
			cost: '',
			availability: '',
			bookable: '',
			
			maxChildAge: '',
			infantAge: '',
			supplier: '',
			
			
			address: {address1: '', address2: '', city: '', postcode: '', country: ''},
			
			telephoneNumber: '',
			description: '',
			
			images: []
		},
		
		/*
			Parses a model from a multicom api response
		*/
		parse: function(response, options){
		
			var obj ={
				itineraryId: response['@ItineraryId'],
				accommodationId: response['@AccommodationId'],
				accommodationName: response['@AccommodationName'],
				type: response['@Type'],
	
				resortName: response['@ResortName'],
				resortId: response['@ResortId'],
				boardCode: response['@BoardCode'],
				classCode: response['@ClassCode'],
				
				startDate: response['@StartDate'],
				endDate: response['@EndDate'],
				numNights: response['@NumNights'],
				
				currency: response['@Currency'],
				cost: response['@BasicAdultCost'],
				availability: response['@Availability'],
				bookable: response['@BookableByFAB'],
				
				maxChildAge: response['@MaxChildAge'],
				infantAge: response['@InfantAge'],
				supplier: response['@Supplier']
			};
			
			if('Address' in response){
				var addr = response.Address;
				obj.address = {
					address1: addr['@Address1'],
					address2: addr['@Address2'],
					city: addr['@CityOrTown'],
					postcode: addr['@PostCode'],
					country: addr['@Country']
				};
			}
			
			if('TelephoneNumber' in response){
				obj.telephoneNumber = response.TelephoneNumber['#text'];
			}
			
			//available board basis - array
			if('AvailableBoardBasis' in response){
				if($.isArray(response.AvailableBoardBasis)){
					obj.availableBoardBasis = [];
					_.each(response.AvailableBoardBasis, function(item){
						obj.availableBoardBasis.push(item['#text']);
					});
				}
				else{
					obj.availableBoardBasis = [response.AvailableBoardBasis['#text']];
				}
			}
			if('Description' in response){
				obj.description = response.Description['#text'];
			}
			
			if('AccommodationUnits' in response && 'AccommodationUnit' in response.AccommodationUnits){
				var rooms = response.AccommodationUnits.AccommodationUnit;
				if($.isArray(rooms)){
					obj.rooms = rooms;
				}
				else{
					obj.rooms = [rooms];
				}
			}
			
			if('Image' in response){
				var processImg = function(img){
					return {
						url: img['@URL'],
						thumbnail: img['@ThumbnailURL'],
						caption:  img['@Caption']
					};
				};
				obj.images = [];

				if($.isArray(response.Image)){
					_.each(response.Image, function(item){
						obj.images.push(processImg(item));
					});
				}
				else{
					obj.images.push(processImg(response.Image));
				}
			}
			
			return obj;			
		}
		
		
	});
	
	return MulticomAccommodation;
});
	
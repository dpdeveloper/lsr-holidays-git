
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
	
	var MulticomAccommodation = Backbone.RelationalModel.extend({
		relations: [{
			type: 'HasMany',
			key: 'rooms',
			relatedModel: MulticomRoom,
			collectionType: MulticomRoomCollection
		}],
		
		defaults: {
			itineraryId: null,
			accommodationId: null,
			accommodationName: null,
			normalisedName: null,
			resortName: null,
			resortId: null,
			maxChildAge: null,
			infantAge: null,
			startDate: null,
			endData: null,
			suppliersBoardCode: null,
			boardCode: null,
			classCode: null,
			officialRating: null,
			
			supplier: null,
			
			numNights: null,
			basicAdultCost: null,
			currency: null,
			availability: null,
			supplierLocationId: null,
			type: null,
			contractCode: null,
			bookableByFAB: null,
			
			syndicatorRanking: null,
			availableBoardBasis: null,
			
			address: {address1: null, address2: null, cityOrTown: null, postcode: null, country: null},
			
			telephoneNumber: null,
			description: null,
			rating: null,
			basicCost: null,
			images: []
		}
	});
	
	return MulticomAccommodation;
});
	
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
			collectionType: MulticomRoomCollection
		}],
		
		defaults: {
			itineraryId: '',
			accommodationId: '',
			accommodationName: '',
			normalisedName: '',
			resortName: '',
			resortId: '',
			maxChildAge: '',
			infantAge: '',
			startDate: '',
			endData: '',
			suppliersBoardCode: '',
			boardCode: '',
			classCode: '',
			officialRating: '',
			
			supplier: '',
			
			numNights: '',
			basicAdultCost: '',
			currency: '',
			availability: '',
			supplierLocationId: '',
			type: '',
			contractCode: '',
			bookableByFAB: '',
			
			syndicatorRanking: '',
			availableBoardBasis: '',
			
			address: {address1: '', address2: '', cityOrTown: '', postcode: '', country: ''},
			
			telephoneNumber: '',
			description: '',
			rating: '',
			basicCost: '',
			images: []
		}
	});
	
	return MulticomAccommodation;
});
	
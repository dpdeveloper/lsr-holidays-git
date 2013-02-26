/* collections/travellers-info.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','config',
	'models/travellers-info'
	
], function($,_,Backbone,config,TravellersInfo){
	"use strict";
	
	/**
		@module Collection: TravellersInfo
		@exports TravellersInfoCollection
	*/
	
	var TravellersInfoCollection = Backbone.Collection.extend({
		model: TravellersInfo,
	
		/**
			Get the Lead Traveller.
			Returns null if none found
			
			@returns {TravellersInfo|null}
		*/
		getLeadTraveller: function(){
			var lead = this.find(function(item){
				return item.get('isLeadTraveller') === true;
			});
			if(typeof lead !== 'undefined' && lead !== null){
				return lead;
			}
			else{
				return null;
			}
		}
	
	});
	
	return TravellersInfoCollection;
});
	
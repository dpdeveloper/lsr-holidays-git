/* @filename views/search-ui/travellers/travellers.tac.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/travellers.tac.view.tpl.html',
	'models/booking'
	
], function($,_,Backbone,Marionette,vent,
			Template,
			Booking
			){
	"use strict";
	
	/** @class Travellers TAC View */
	var TravellersTACView = Backbone.Marionette.ItemView.extend(
	/** @lends TravellersTACView# */
	{
		initialize: function(options){
			options = options || {};
		},
		
		model: new Booking(),
		template: Template,
		tagName: 'div',
		attributes: {'class' : 'travellers-tac-view'},
		
		/**
			Serialize data for the view
		*/
		serializeData: function(){
			return this.model.get('shortlistRequest').toJSON();
		}
		
	});
	
	return TravellersTACView;
});
	
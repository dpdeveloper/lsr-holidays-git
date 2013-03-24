/* @filename views/search-ui/hotels/detail/hotels.detail.rooms.item.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.detail.rooms.item.view.tpl.html',
	'models/multicom/multicom-room'
	
], function($,_,Backbone,Marionette,vent,
			Template,
			MulticomRoom
			){
	"use strict";

	var HotelsDetailRoomsItemView = Backbone.Marionette.ItemView.extend(
	/** @lends HotelsDetailRoomsItemView */
	{
		/**
			Constructor
			
			@class View to display an individual Room View
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			this._viewPosition = 1;
			if('viewPosition' in options && options.viewPosition !== null){
				this._viewPosition = options.viewPosition;
			}
		},
		
		events: {
			'click .action-change-room': 'handleChangeRoom'
		},
		
		model: new MulticomRoom(),
		template: Template,
		tagName: 'div',
		attributes: {'class': 'hotels-detail-rooms-item-view'},
		
		
		/**
			Overriden function to pass the position to the template
		*/
		serializeData: function(){
			var rr = this.model.getChosenRoomRate();
			var cost = 0;
			if (typeof rr !== 'undefined' && rr !== null){
				cost = rr.cost;
			}
		
			return _.extend({viewPosition: this._viewPosition, cost: cost}, this.model.toJSON());
		},
		
		/**
			Callback for when the change room button is selected
			
			@param {jQuery Event} ev
		*/
		
		handleChangeRoom: function(ev){
			ev.preventDefault();	
		}
	});
	
	return HotelsDetailRoomsItemView;
});
	
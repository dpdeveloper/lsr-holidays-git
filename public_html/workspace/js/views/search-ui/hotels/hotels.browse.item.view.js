/* @filename views/search-ui/hotels/hotels.browse.item.view
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.browse.item.view.tpl.html',
	'models/multicom/multicom-accommodation',
	'helpers/view-helper'
	
], function($,_,Backbone,Marionette,vent,
			SearchUIHotelBrowseItemTemplate,
			MulticomAccommodation,
			viewHelper
			){
	"use strict";
	
	var SearchUIHotelsBrowseItemView = Backbone.Marionette.ItemView.extend(
	/** @lends SearchUIHotelsBrowseItemView */
	{

		template: SearchUIHotelBrowseItemTemplate,
		model: new MulticomAccommodation(),
		templateHelpers: viewHelper,
		
		tagName: 'div',
		attributes: {
			'class': 'search-ui-hotel-browse-item'
		},
		
		
		/**
			Constructor
			@class View to display an individual hotel item
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(){
			this.listenTo(vent,'search:hotel:selected',this.handleSelectedEvent);	
		},
		
		events: {
			'click .browse-item-inner': 'handleClick'
		},
		
		
		/**
			Adds selected CSS and fires an event
			
			@param {jQuery Event} ev
		*/
		handleClick: function(ev){
			ev.preventDefault();
			vent.trigger('search:hotel:selected',this.model);
			this.$el.addClass('selected');
		},
		
		/**
			Callback for when a hotels:selected event is fired
			Unselects the current element if it isn't the selected item
			
			@param {MulticomAccommodation} selectedModel
		*/
		handleSelectedEvent: function(selectedModel){
			if(selectedModel !== null && selectedModel !== this.model){
				this.$el.removeClass('selected');
			}	
		}
		
	});
	
	return SearchUIHotelsBrowseItemView;
});
	
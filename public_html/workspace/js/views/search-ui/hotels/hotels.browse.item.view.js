/* @filename views/search-ui/hotels/hotels.browse.item.view
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.browse.item.view.tpl.html',
	'models/symphony-hotel',
	'helpers/view-helper',
	
], function($,_,Backbone,Marionette,vent,
			SearchUIHotelBrowseItemTemplate,
			SymphonyHotel,
			viewHelper
			){
	"use strict";
	
	var SearchUIHotelsBrowseItemView = Backbone.Marionette.ItemView.extend({

		template: SearchUIHotelBrowseItemTemplate,
		model: SymphonyHotel,
		templateHelpers: viewHelper,
		
		tagName: 'div',
		attributes: {
			'class': 'search-ui-hotel-browse-item',
		},
		
		initialize: function(){
			this.listenTo(vent,'search:hotel:selected',this.handleSelectedEvent);	
		},
		
		events: {
			'click': 'handleClick',
		},
		
		
		/**
		 * handleClick
		 *
		 * @param {jQuery Event} ev
		 *
		 * Adds selected CSS and fires an event
		*/
		handleClick: function(ev){
			ev.preventDefault();
			vent.trigger('search:hotel:selected',this.model);
			this.$el.addClass('selected');
		},
		
		/**
		 * handleSelectedEvent
		 *
		 * @param {SymphonyHotel} selectedModel
		 *
		 * Callback for when a hotels:selected event is fired
		 * Unselects the current element if it isn't the selected item
		*/
		handleSelectedEvent: function(selectedModel){
			if(selectedModel != null && selectedModel != this.model){
				this.$el.removeClass('selected');
			}	
		},
		
	});
	
	return SearchUIHotelsBrowseItemView;
});
	
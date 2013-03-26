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
		initialize: function(options){
			options = options || {};
			
			this._extraCost = null;
			this._numPeople = 1;
			
			if('extraCost' in options && options.extraCost !== null){
				this._extraCost = options.extraCost;
			}
			
			if('numPeople' in options && options.numPeople !== null){
				this._numPeople = options.numPeople;
			}
			
			this.listenTo(vent,'search:hotel:selected',this.handleSelectedEvent);
			this.listenTo(vent,'search:booking:change',this.handleBookingChange);
		},
		
		events: {
			'click .browse-item-inner': 'handleClick'
		},
		
		/**
			Overridden function to pass extra cost to the UI
		*/
		serializeData: function(){
			var totalCost = parseFloat(this.model.get('cost')) / this._numPeople;
			
			if(this._extraCost !== null){
				totalCost = totalCost + this._extraCost;
			}
		
			return $.extend({totalCost: totalCost.toFixed(2)}, this.model.toJSON());
		},
		
		
		/**
			Sets the item tobe selected
		*/
		setSelected: function(){
			this.$el.addClass('selected');	
		},
		
		
		/**
			Adds selected CSS and fires an event
			
			@param {jQuery Event} ev
		*/
		handleClick: function(ev){
			ev.preventDefault();
			this.setSelected();
			vent.trigger('search:hotel:selected',this.model);
			
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
		},
		
		/**
			Callback for if the booking has changed
			May need to update the prices displayed, aka if a price has changed
		*/
		handleBookingChange: function(booking){
			var c = booking.getCostPerPerson();
			var cost = c.flight + c.extra;
			
			if(this._extraCost !== cost){
				this._extraCost = cost;
				this.render();
			}
			
			this._numPeople = booking.get('holidaySearch').getTravellers().length;
		}
		
	});
	
	return SearchUIHotelsBrowseItemView;
});
	
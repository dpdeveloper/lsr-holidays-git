/* @filename views/search-ui/summary/summary.booking.view
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.detail.booking.view.tpl.html'
	
], function($,_,Backbone,Marionette,vent,
			SearchUIHotelBookingViewTemplate
			){
	"use strict";
	
	var SearchUIHotelDetailSummaryView = Backbone.Marionette.ItemView.extend(
	/** @lends SearchUIHotelDetailSummaryView */
	{
		/**
			Constructor
			
			@class View to show the Booking Summary View
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			this._data.callUsMessage = this._lang.callUsMessage;
		},
	
	
		template: SearchUIHotelBookingViewTemplate,
		
		tagName: 'div',
		attributes: {'class':'search-ui-hotel-detail-booking'},
		
		events: {
			'click .action-next': 'onActionNextClick'
		},
		
		_data: {
			callUsMessage: null
		},
		
		_lang: {
			callUsMessage: '<p>Or call us on <strong>01372 253 229</strong></p>'
		},
		
		
		
		/**
			SerializeData callback
		*/
		serializeData: function(){
			return this._data;
		},
		
		/**
			Event handler for the action button
		*/
		onActionNextClick: function(ev){
			ev.preventDefault();
			vent.trigger('search:shortlist');
		}
	});

	
	return SearchUIHotelDetailSummaryView;
});
	
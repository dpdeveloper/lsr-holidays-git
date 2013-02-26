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
	
	/**
		@module ItemView: SearchUIHotelDetailSummaryView
		@exports SearchUIHotelDetailSummaryView
	*/
	
	var SearchUIHotelDetailSummaryView = Backbone.Marionette.ItemView.extend({
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
			@constructor
		*/
		initialize: function(options){
			this._data.callUsMessage = this._lang.callUsMessage;
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
	
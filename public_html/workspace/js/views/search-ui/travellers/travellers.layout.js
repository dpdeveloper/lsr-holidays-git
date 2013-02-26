/* @filename views/search-ui/travellers/travellers.layout.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/travellers.layout.tpl.html',
	'models/booking',
	'models/travellers-info',
	'models/holiday-search',
	
	'views/search-ui/travellers/travellers.contact.view',
	'views/search-ui/travellers/travellers.summary.view',
	'views/search-ui/travellers/travellers.static.view',
	'views/search-ui/travellers/travellers.edit.layout',
	'views/search-ui/travellers/travellers.tac.view'
	
], function($,_,Backbone,Marionette,vent,
			TravellersLayoutTemplate,
			Booking,
			TravellersInfo,
			HolidaySearch,
			
			TravellersContactView,
			TravellersSummaryView,
			TravellersStaticView,
			TravellersEditLayout,
			TravellersTacView
			){
	"use strict";
	
	var TravellersLayout = Backbone.Marionette.Layout.extend(
	/** @lends TravellersLayout# */
	{
		/** @inner */
		template: TravellersLayoutTemplate,
		
		/** @inner */
		tagName: 'div',
		
		/** @inner */
		attributes: {
			'class': 'search-ui-travellers-layout'
		},
		
		/** @inner */
		model: null,
		
		/** @inner */
		regions: {
			contact: '.layout-contact',
			edit: '.layout-edit',
			tac: '.layout-tac',
			summary: '.layout-summary',
			staticAbout: '.layout-static'
		},
		/** @inner */
		_contactView: null,
		
		/** @inner */
		_summaryView: null,
		
		/** @inner */
		_editView: null,
		
		/** @inner */
		_staticView: null,
		
		/** @inner */
		_tacView: null,
		
		/**
			Constructor
			
			Sets the model if passed
			
			@class View to edit a travellers contact details
			
			@constructs
			@param {Object} [options] Options hash
		*/
		initialize: function(options){
			options = options || {};
			
			if(options.model){
				this.model = options.model;
				this.model._validateTravellersInfo();
				options.model = null;
			}
			else{
				this.model = new Booking();
			}
		},
		
		
		/**
			Callback for when view is shown
		*/
		onShow: function(){
			this._contactView = new TravellersContactView({model: this.model.get('travellersInfo').getLeadTraveller()});
			this._summaryView = new TravellersSummaryView({model: this.model});
			this._staticView = new TravellersStaticView();
			this._tacView = new TravellersTacView({model: this.model});
			this._editView = new TravellersEditLayout({model: this.model});
			
			this.contact.show(this._contactView);
			this.summary.show(this._summaryView);
			this.staticAbout.show(this._staticView);
			this.tac.show(this._tacView);
			this.edit.show(this._editView);
		}
		
	});
	
	return TravellersLayout;
});
	
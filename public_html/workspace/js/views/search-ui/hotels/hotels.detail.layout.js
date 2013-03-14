/* @filename views/search-ui/hotels/hotels.detail.layout
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent', 'reqres',
	'tpl!views/search-ui/templates/hotels.detail.layout.tpl.html',
	'views/search-ui/hotels/hotels.detail.tabs.view',
	'views/search-ui/hotels/hotels.detail.flight.view',
	'views/search-ui/hotels/hotels.detail.booking.view',
	
	'views/search-ui/sidebar/sidebar.summary.view',
	'views/search-ui/sidebar/sidebar.static.view'
	
], function($,_,Backbone,Marionette,vent, reqres,
			SearchUIHotelsDetailLayoutTemplate,
			HotelsDetailTabView,
			FlightView,
			BookingView,
			
			SidebarSummaryView,
			SidebarStaticView
			){
	"use strict";
	
	var SearchUIHotelsDetailLayout = Backbone.Marionette.Layout.extend(
	/** @lends SearchUIHotelsDetailLayout */
	{
		template: SearchUIHotelsDetailLayoutTemplate,
		
		tagName: 'div',
		attributes: {'class': 'search-ui-hotels-detail-layout'},
		
		regions: {
			tabs: '.hotels-detail-layout-tabs',
			summary: '.sidebar-summary',
			booking: '.sidebar-booking',
			staticView: '.sidebar-static'
		},
		
		/**
			Constructor
			
			@class Layout to display hotel details
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){},
		
		/**
			Callback function to render view
			
		*/
		onShow: function(){
			
			this.tabs.show(
				new HotelsDetailTabView({model: reqres.request('search:get:hotel:selected')})
			);
			
			this.summary.show(new SidebarSummaryView({model: reqres.request('search:get:booking')}));
			this.staticView.show(new SidebarStaticView());

		}
		
	});
	
	return SearchUIHotelsDetailLayout;
});
	
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
	'views/search-ui/hotels/hotels.detail.booking.view'
	
], function($,_,Backbone,Marionette,vent, reqres,
			SearchUIHotelsDetailLayoutTemplate,
			HotelsDetailTabView,
			FlightView,
			BookingView
			){
	"use strict";
	
	var SearchUIHotelsDetailLayout = Backbone.Marionette.Layout.extend({
		template: SearchUIHotelsDetailLayoutTemplate,
		
		tagName: 'div',
		attributes: {'class': 'search-ui-hotels-detail-layout'},
		
		_tabView: null,
		_flightView: null,
		_bookingView: null,
		
		regions: {
			tabs: '.hotels-detail-layout-tabs',
			flight: '.sidebar-flights',
			booking: '.sidebar-booking',
		},
		
		initialize: function(options){},
		
		onShow: function(){
			this._tabView = new HotelsDetailTabView({model: reqres.request('search:get:hotel:selected')});
			
			this._flightView = new FlightView({
				isSelected: false,
				airlineCollection: reqres.request('search:get:airlines'),
				model: reqres.request('search:get:flight:selected'),
			});
			
			this._bookingView = new BookingView({
				model: reqres.request('search:get:booking')
			});
			
			this.tabs.show(this._tabView);
			this.flight.show(this._flightView);
			this.booking.show(this._bookingView);

		},
		
	});
	
	return SearchUIHotelsDetailLayout;
});
	
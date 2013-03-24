/* @filename views/search-ui/hotels/detail/hotels.detail.layout
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent', 'reqres',
	'tpl!views/search-ui/templates/hotels.detail.layout.tpl.html',
	
	'views/search-ui/sidebar/sidebar.summary.view',
	'views/search-ui/sidebar/sidebar.static.view',
	
	'views/search-ui/hotels/detail/hotels.detail.about.view',
	'views/search-ui/hotels/detail/hotels.detail.flight.view',
	'views/search-ui/hotels/detail/hotels.detail.rooms.view',
	
	'views/search-ui/hotels/detail/hotels.detail.images.view'
	
	
], function($,_,Backbone,Marionette,vent, reqres,
			SearchUIHotelsDetailLayoutTemplate,
			
			SidebarSummaryView,
			SidebarStaticView,
			
			HotelDetailsAboutView,
			HotelsDetailFlightView,
			HotelsDetailRoomsView,
			HotelsDetailImagesView
			){
	"use strict";
	
	var SearchUIHotelsDetailLayout = Backbone.Marionette.Layout.extend(
	/** @lends SearchUIHotelsDetailLayout */
	{
		template: SearchUIHotelsDetailLayoutTemplate,
		
		tagName: 'div',
		attributes: {'class': 'search-ui-hotels-detail-layout'},
		
		regions: {
			contentAbout: '.main-about',
			contentRooms: '.main-rooms',
			contentFlights: '.main-flights',
			
			contentSidebarImages: '.main-images',
			contentSidebarLocation: '.main-location',
			
			sidebarSummary: '.sidebar-summary',
			sidebarStatic: '.sidebar-static'
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
			
			var booking = reqres.request('search:get:booking');
			
			this.contentAbout.show(new HotelDetailsAboutView({model: booking.get('selectedHotel')}));
			this.contentFlights.show(new HotelsDetailFlightView({
				model: booking.get('selectedFlight'), 
				airlineCollection: reqres.request('search:get:airlines')
			}));
			this.contentRooms.show(new HotelsDetailRoomsView({
				collection: booking.get('selectedRooms')
			}));
			
			this.contentSidebarImages.show(new HotelsDetailImagesView({model: booking.get('selectedHotel')}));
			
			this.sidebarSummary.show(new SidebarSummaryView({model: booking }));
			this.sidebarStatic.show(new SidebarStaticView());

		}
		
	});
	
	return SearchUIHotelsDetailLayout;
});
	
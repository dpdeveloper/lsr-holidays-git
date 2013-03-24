/* @filename views/search-ui/hotels/detail/hotels.detail.rooms.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.detail.rooms.view.tpl.html',
	'views/search-ui/hotels/detail/hotels.detail.rooms.item.view',
	'collections/multicom-room'
	
], function($,_,Backbone,Marionette,vent,
			Template,
			HotelsDetailRoomsItemView,
			MulticomRoomCollection
			){
	"use strict";

	var HotelsDetailRoomsView = Backbone.Marionette.CompositeView.extend(
	/** @lends HotelsDetailRoomsView */
	{
		/**
			Constructor
			
			@class View to display rooms in chosen booking
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			if('collection' in options && options.collection!==null){
				this.collection=options.collection;
			}
			
		},
		
		collection: new MulticomRoomCollection(),
		template: Template,
		tagName: 'div',
		attributes: {'class':'hotels-detail-rooms-view'},
		itemView: HotelsDetailRoomsItemView,
		itemViewContainer: '.rooms-inner',
		
		
		/**
			Override function to pass view position
		*/
		buildItemView: function(item, ItemViewType, itemViewOptions){
				
			var options = _.extend({model: item, viewPosition: this.collection.indexOf(item) + 1}, itemViewOptions);
			var view = new ItemViewType(options);
			return view;
		}
	});
	
	return HotelsDetailRoomsView;
});
	
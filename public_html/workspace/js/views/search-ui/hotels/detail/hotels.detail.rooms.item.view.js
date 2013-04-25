/* @filename views/search-ui/hotels/detail/hotels.detail.rooms.item.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent','reqres',
	'tpl!views/search-ui/templates/hotels.detail.rooms.item.view.tpl.html',
	'tpl!views/search-ui/templates/room.selector.view.tpl.html',//Load with !tpl plugin
	'collections/symphony-hotel',
	'models/multicom/multicom-room',
	'helpers/view-helper',
	'views/search-ui/hotels/detail/room.selector.view'
	
], function($,_,Backbone,Marionette,vent,reqres,
			Template,
			roomSelector,SymphonyHotelCollection,
			MulticomRoom, viewHelper,RoomSelectorView
			){
	"use strict";

	var HotelsDetailRoomsItemView = Backbone.Marionette.ItemView.extend(
	/** @lends HotelsDetailRoomsItemView */
	{
		/**
			Constructor
			
			@class View to display an individual Room View
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			this._viewPosition = 1;
			if('viewPosition' in options && options.viewPosition !== null){
				this._viewPosition = options.viewPosition;
			}
			this.listenTo(vent, 'search:rooms:updated', this.handleRoomsUpgrade);
		},
		
		events: {
			'click .action-change-room': 'handleChangeRoom'
		},
		
		model: new MulticomRoom(),
		template: Template,
		tagName: 'div',
		attributes: {'class': 'hotels-detail-rooms-item-view'},
		templateHelpers: viewHelper,
		
		/**
			Overriden function to pass the position to the template
		*/
		serializeData: function(){
			var rr = this.model.getChosenRoomRate();
			var cost = 0;
			if (typeof rr !== 'undefined' && rr !== null){
				cost = rr.cost;
			}
			
			return _.extend({hotelSelected: this._hotelSelected,viewPosition: this._viewPosition, cost: cost}, this.model.toJSON());
		},
		
		/**
			Callback for when the change room button is selected
			
			@param {jQuery Event} ev
		*/
		handleRoomsUpgrade:function(Rooms){
			  this.model.collection.models[Rooms.RoomPosition-1].attributes=Rooms.Upgraderoom;
			  console.log(Rooms.Upgraderoom);
			  this.render();
		},
		handleChangeRoom: function(ev){
		ev.preventDefault();
		var Position = this.$el.find('h3').html().replace("Room ", "");
		
		var roomdetails = new RoomSelectorView({ model: _.extend({ RoomPosition: Position, SelectedRoom: this.model.collection.models[Position - 1].attributes, "rooms": reqres.request('search:get:hotel:selected').get('rooms').toJSON() }) });
		roomdetails.render();
		},

	});
	
	return HotelsDetailRoomsItemView;
});
	
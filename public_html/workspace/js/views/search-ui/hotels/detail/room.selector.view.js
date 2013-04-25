/* @filename views/search-ui/summary/summary.flight.view.js
*
* David Anderson 2012
*
*/

define([
'jquery', 'underscore', 'backbone', 'marionette', 'vent', 'colorbox', 'moment','reqres',
'tpl!views/search-ui/templates/room.selector.view.tpl.html',//Load with !tpl plugin
'models/multicom/multicom-room',
'helpers/view-helper'

], function ($, _, Backbone, Marionette, vent, jcb, moment,reqres,
roomselectorpopup,
MulticomRoom,
viewHelper
) {
"use strict";

var SearchUIRoomSelectorView = Backbone.Marionette.ItemView.extend(
{

templateHelpers: viewHelper,
template: roomselectorpopup,
model: new MulticomRoom(),
tagName: 'div',
attributes: { 'class': 'room-selector-view' },

initialize: function (options) {
	var maxOccupancy,minOccupancy,maxExtraChildren,maxExtraInfants;
	options = options || {};
},
events: {
	    'click .upgrade': 'handleUpgrade',
		'click .keep_this': 'handleKeepThis'
},

serializeData: function () {
	_.each(this.model.rooms,function(obj,index)
						  { 							 
							  if(obj.maxOccupancy ==this.model.SelectedRoom.maxOccupancy && obj.minOccupancy==this.model.SelectedRoom.minOccupancy && obj.maxExtraChildren==this.model.SelectedRoom.maxExtraChildren &&  obj.maxExtraInfants==this.model.SelectedRoom.maxExtraInfants)
								 {
									 	obj.Upgarde="upgrade";	
								 }
								 else{		
									 obj.Upgarde="notupgrade";			 
								 }
						  },this)
console.log(this.model);
	var returnData = this.model;
	return returnData;
},
onRender: function () {
	jQuery.colorbox({
		html: this.el
		});
},
handleUpgrade: function(ev){
ev.preventDefault();
var id = $(ev.currentTarget).data("id");
	if(this.model.SelectedRoom.maxExtraChildren==this.model.rooms[id].maxExtraChildren && this.model.SelectedRoom.minOccupancy==this.model.rooms[id].minOccupancy && this.model.SelectedRoom.maxOccupancy==this.model.rooms[id].maxOccupancy && this.model.SelectedRoom.maxExtraInfants==this.model.rooms[id].maxExtraInfants ) {
console.log(this.model.SelectedRoom);
console.log(this.model.rooms[id]);
vent.trigger('search:rooms:updated',_.extend({"RoomPosition":this.model.RoomPosition,"Upgraderoom":this.model.rooms[id]}));
}

$.colorbox.close();
},

handleKeepThis: function(ev){
	ev.preventDefault();
	$.colorbox.close();                                        
},     
onClose: function(){
		$.colorbox.close();
}

});

return SearchUIRoomSelectorView;
});
/* @filename views/search-ui/travellers/travellers.tac.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/travellers.tac.view.tpl.html'
	
], function($,_,Backbone,Marionette,vent,
			Template
			){
	"use strict";
	
	/** @class Travellers TAC View */
	var TravellersTACView = Backbone.Marionette.ItemView.extend(
	/** @lends TravellersTACView# */
	{
		template: Template
	});
	
	return TravellersTACView;
});
	
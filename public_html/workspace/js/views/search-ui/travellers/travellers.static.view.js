/* @filename views/search-ui/travellers/travellers.static.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/travellers.static.view.tpl.html'
	
], function($,_,Backbone,Marionette,vent,
			Template
			){
	"use strict";

	/** @class */
	var TravellersStaticView = Backbone.Marionette.ItemView.extend(
	/** @lends TravellersStaticView# */
	{
		template: Template
		
		/**
			@class Static view for travellers Interface
		*/
	});
	
	return TravellersStaticView;
});
	
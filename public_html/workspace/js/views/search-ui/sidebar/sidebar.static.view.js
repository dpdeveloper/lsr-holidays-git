/* @filename views/search-ui/sidebar/sidebar.static.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/sidebar.static.view.tpl.html'
	
], function($,_,Backbone,Marionette,vent,
			Template
			){
	"use strict";

	var SidebarStaticView = Backbone.Marionette.ItemView.extend(
	/** @lends SidebarStaticView# */
	{
		template: Template,
		tagName: 'div',
		attributes: {'class':'sidebar-static-view'},
		
		/**
			@class Static view for sidebar Interface
		*/
		initialize: function(options){
			options = options || {};
		}
	});
	
	return SidebarStaticView;
});
	
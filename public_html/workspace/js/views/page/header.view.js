/* @filename views/page/header.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/page/templates/header.view.tpl.html'
	
], function($,_,Backbone,Marionette,vent,
			Template
			){
	"use strict";

	var HeaderView = Backbone.Marionette.ItemView.extend(
	/** @lends HeaderView */
	{
		/**
			Constructor
			
			@class View to Display Page Header
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){

		},
		
		tagName: 'div',
		attributes: {'class':'page-header-view'},
		template: Template
	});
	
	return HeaderView;
});
	
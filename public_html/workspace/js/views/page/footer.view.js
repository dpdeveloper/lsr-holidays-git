/* @filename views/page/footer.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/page/templates/footer.view.tpl.html'
	
], function($,_,Backbone,Marionette,vent,
			Template
			){
	"use strict";

	var FooterView = Backbone.Marionette.ItemView.extend(
	/** @lends FooterView */
	{
		/**
			Constructor
			
			@class View to display page footer
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){

		},

		template: Template
	});
	
	return FooterView;
});
	
/* @filename views/VIEW_PATH/VIEW_FILE
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/VIEW_PATH/templates/VIEW_FILE.tpl.html'
	
], function($,_,Backbone,Marionette,vent,
			Template
			){
	"use strict";

	var VIEW_NAME = Backbone.Marionette.VIEW_TYPE.extend(
	/** @lends VIEW_NAME */
	{
		/**
			Constructor
			
			@class VIEW_DESCRIPTION
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){

		},

		template: Template
	});
	
	return VIEW_NAME;
});
	
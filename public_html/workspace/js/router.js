/* router.js
 * App Router for LSR Holidays
 *
 * David Anderson 2013
 *
*/

define([
	'jquery',
	'underscore',
	'backbone',
	'marionette'
], function($,_,Backbone,Marionette){
	"use strict";
	
	var Router = Backbone.Marionette.AppRouter.extend(
	/** @lends Router */
	{
		
		/**
			Constructor
			
			@class Application Router
			@constructs
			@param {Object} [options] Options Hash
		
		initialize: function(options){
			return;	
		},*/
		
		appRoutes: {
			'' : 'index',
			'search/': 'search',
			'search/travellers': 'searchTravellers'
		}
		
	});	
	
	return Router;
});

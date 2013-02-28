/* models/content/deals.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational'
], function($,_,Backbone, BackboneRelational){
	
	"use strict";
	
	/**
		@class ContentDeal
		
		@property {String} title
		@property {String} overview
		@property {String} description
		@property {Object} image
		@property {Integer} order
	*/
	var ContentDeal = Backbone.RelationalModel.extend({
		
		defaults: {
			title: '',
			overview: '',
			published: 'Yes',
			description: '',
			image: {},
			order: 0
		}
	});
	
	return ContentDeal;
});
	
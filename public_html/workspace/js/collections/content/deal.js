/* collections/content/deal.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','config',
	'models/content/deal'
	
], function($,_,Backbone,config,ContentDeal){
	"use strict";
	
	var ContentDealCollection = Backbone.Collection.extend(
	/** @lends ContentDealCollection */
	{
		
		/**
			Constructor
			
			@class Collection to manipulate Symphony Content Deals
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
		},
	
		model: ContentDeal,
		url: config.contentRoot+'json/home/deals',
		
		
		/**
			Sets the test mode
			
			@param {Boolean} testMode Put into test mode, test/mode
		*/
		setTestMode: function(testMode){
			if(testMode){
				this.url = config.contentRoot+'json-test/content/deals.jsonp';
			}
			else{
				this.url = config.contentRoot+'json/home/deals';
			}
		},
		
		parse: function(response){
			return response.deals;
		},
		
		sync: function(method,model,options){
			options.dataType = 'jsonp';
			options.jsonpCallback = 'jsonCallback';
			return Backbone.sync(method, model, options);
		}
	});
	
	return ContentDealCollection;
});
	
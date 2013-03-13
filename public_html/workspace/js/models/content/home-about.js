/* models/content/home-about.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational','config'
], function($,_,Backbone, BackboneRelational,config){
	
	"use strict";
	
	/**
		@class ContentHomeAbout
		
		@property {String} header
		@property {String} column1
		@property {String} column2
		@property {String} column3
	*/
	var ContentHomeAbout = Backbone.RelationalModel.extend({
		
		defaults: {
			header: '',
			column1: '',
			column2: '',
			column3: ''
		},
		
		url: function(){
			return config.contentRoot +'json/home/about/';
		},
		
		parse: function(response){
			return response.about;
		},
		
		sync: function(method,model,options){
			options.dataType = 'jsonp';
			options.jsonpCallback = 'jsonCallback';
			return Backbone.sync(method, model, options);
		}
	});
	
	return ContentHomeAbout;
});
	
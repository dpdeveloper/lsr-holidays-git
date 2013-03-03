/* models/multiload.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','config'
], function($,_,Backbone,config){
	"use strict";
	
	var Multiload = Backbone.Model.extend(
	/** @lends Multiload */
	{
		defaults: {
			isReady: true,
			fetchRequestTotal: 0,
			fetchRequestComplete: 0,
			toCallWhenLoaded: null
		},
		
		/**
			Constructor
			
			@class Class to monitor multiple asynchronous operations and callback only when all are completed
			@constructs
			@param {Object} [options] Options Hash
		*/
		
		initialize: function(options){
			options = options || {};
			_.bindAll(this);
		},
		
		
		/**
			Shortcut for addLoadingRequest
			
			@param {function} - a dummy param to wrap the function call in
		*/
		l: function(request){
			this.addLoadingRequest(request);
		},
		
		/**
			Shortcut for loadingCallback
		*/
		c: function(){
			this.loadingCallback();
		},
		
		/**
			Shortcut for loadingQueue
			
			@param {function} fx - A function to call when loaded
		*/
		q: function(fx){
			this.loadingQueue(fx);
		},
		
		
		/**
			Increments the to be loaded count
			
			@param {function} - a dummy param to wrap the function call in
		*/
		addLoadingRequest: function(request){
			this.set({
				fetchRequestTotal: this.get('fetchRequestTotal')+1,
				isReady: false
			});
		},
		
		/**
			A function to be used as a 'success' callback for any function in order to perform
			the loading logic
		*/
		loadingCallback: function(){
			this.set({
				fetchRequestComplete: this.get('fetchRequestComplete')+1
			});
			
			if(this.get('fetchRequestComplete') >= this.get('fetchRequestTotal')){
				this.set('isReady',true);
				
				this.trigger('complete');
				
				if(this.get('toCallWhenLoaded') !== null){
					this.get('toCallWhenLoaded')();
					this.set({toCallWhenLoaded: null});
				}
			}
		},
		
		/**
			Fx to Queue a callback

			@param {function} fx - A function to call when loaded

		*/
		loadingQueue: function(fx){
			if(this.get('isReady') === false){
				this.set({toCallWhenLoaded: fx});
			}
			else{
				fx();
			}
		}

	});
	return Multiload;
});
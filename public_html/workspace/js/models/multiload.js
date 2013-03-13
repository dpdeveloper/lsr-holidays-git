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
			@param {Boolean} [executeNow] = true
		*/
		q: function(fx, executeNow){
			if(typeof executeNow === 'undefined'){
				executeNow = true;
			}
			
			this.loadingQueue(fx,executeNow);
		},
		
		
		/**
			Increments the to be loaded count
			
			@param {function} - a dummy param to wrap the function call in
		*/
		addLoadingRequest: function(request){
		
			var requestAmount = 1;
			
			if($.isArray(request)){
				requestAmount = request.length;
			}
		
			this.set({
				fetchRequestTotal: this.get('fetchRequestTotal')+requestAmount,
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
			Function to Queue a callback
			
			If executeNow is ommited or set to trye then the callback function will be executed immendiately if the queue has been processed.

			@param {function} fx - A function to call when loaded
			@param {Boolean} [executeNow] = true

		*/
		loadingQueue: function(fx, executeNow){
		
			if(typeof executeNow === 'undefined'){
				executeNow = true;
			}
		
			if(this.get('isReady') === false){
				this.set({toCallWhenLoaded: fx});
			}
			else if(executeNow === true){
				fx();
			}
		}

	});
	return Multiload;
});
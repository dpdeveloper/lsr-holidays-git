/* app.js
 * Javascript Application for LSR Holidays
 *
 * David Anderson 2012
 *
*/

define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'router'
], function($,_,Backbone,Marionette,Router){
	"use strict";
	
	/**
		The Backbone Marionette Application Object
		
		@module App
		@exports App
		@version 1.0
	*/
	
	var App = new Marionette.Application();
	
	/*
	App.addRegions({
		main: '#main',
	});*/
	
	
	App.addInitializer(function(options){
		this.router = Router;
		this.router.setupPage();
	});
	
	return App;
});

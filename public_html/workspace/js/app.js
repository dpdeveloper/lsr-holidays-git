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
	'vent',
	'router',
	'views/page/header.view',
	'views/page/footer.view',
	'views/home/home.layout'
], function(
	$,_,Backbone,Marionette,vent,
	AppRouter,
	HeaderView,
	FooterView,
	HomeLayout
	){
	"use strict";
	
	/** @class */
	var App = new Backbone.Marionette.Application(
	{
		index: function(){
			this.main.show(new HomeLayout());
		}
	});
	
	/* Init Page */
	App.addInitializer(function(options){
		App.addRegions({
			header: '#header',
			main: '#main',
			footer: '#footer'
		});
		
		//initialize header and footer
		this.header.show(
			new HeaderView()
		);
		this.footer.show(
			new FooterView()
		);
		
	});
	
	/* Init Router */
	App.addInitializer(function(options){
		this.router = new AppRouter({
			controller: App
		});
		if( ! Backbone.History.started){
			Backbone.history.start();
		}
	});
	
	return App;
});

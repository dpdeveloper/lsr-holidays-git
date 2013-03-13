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
	'vent','config',
	'router',
	'views/page/header.view',
	'views/page/footer.view',
	'views/home/home.layout',
	'views/search-ui/search-ui.layout'
], function(
	$,_,Backbone,Marionette,vent,config,
	AppRouter,
	HeaderView,
	FooterView,
	HomeLayout,
	SearchUILayout
	){
	"use strict";
	
	/** @class */
	var App = new Backbone.Marionette.Application(
	{
		//routes
		
		index: function(){
			this.main.show(new HomeLayout());
		},
		
		search: function(){
			this.main.show(new SearchUILayout());
		},
		
		//transitions
		handleSearchTransition: function(search){
			this.main.show(new SearchUILayout({holidaySearch: search}));
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
	
	/* Event Bindings */
	App.addInitializer(function(options){
		this.bindTo(vent,"page:search",this.handleSearchTransition,this);
	});
	
	/* Init Router */
	App.addInitializer(function(options){
		this.router = new AppRouter({
			controller: App
		});
		if( ! Backbone.History.started){
			Backbone.history.start({pushState: true, root: config.root});
		}
	});
	
	return App;
});

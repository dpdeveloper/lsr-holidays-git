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
			this.main.show(new SearchUILayout({testMode: this.testMode}));
		},
		searchTravellers: function(){
			this.main.show(new SearchUILayout({testMode: this.testMode}));	
		},
		
		//transitions
		handleSearchTransition: function(search){
			this.main.show(new SearchUILayout({holidaySearch: search, testMode: this.testMode}));
		}
		
		
	});
	
	/* Init Page */
	App.addInitializer(function(options){
		options = options || {};
		
		if(options.testMode === true){
			this.testMode=true;
		}
		else{
			this.testMode = false;
		}
	
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
		this.listenTo(vent,"page:search",this.handleSearchTransition);
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

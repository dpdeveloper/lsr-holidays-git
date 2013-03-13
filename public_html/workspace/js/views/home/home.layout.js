/* @filename views/home/home.layout.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/home/templates/home.layout.tpl.html',
	'models/multiload',
	'collections/content/deal',
	'models/content/home-about',
	'views/home/deal.slideshow.view',
	'views/page/search.form.view',
	'views/home/home.aboutus.view'
	
], function($,_,Backbone,Marionette,vent,
			Template,
			MultiLoad,
			ContentDealCollection,
			ContentHomeAbout,
			DealSlideshowView,
			SearchFormView,
			HomeAboutUsView
			){
	"use strict";

	var HomeLayout = Backbone.Marionette.Layout.extend(
	/** @lends HomeLayout */
	{
		/**
			Constructor
			
			@class Layout for the Home Page Interface
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			this.loader = new MultiLoad();
			this.listenTo(this.loader,'complete', this._loadingCallback);
			
			this.data = {
				deals: new ContentDealCollection(),
				homeAbout: new ContentHomeAbout()
			};
			
			this.loader.l([
				this.data.deals.fetch({
					success: this.loader.c, error: this.loader.c
				}),
				this.data.homeAbout.fetch({
					success: this.loader.c, error: this.loader.c
				})
			]);

		},
		
		_loadingCallback: function(){
			this.render();
		},
		
		regions:{
			deals: '.home-layout-deals',
			search: '.home-layout-search',
			about: '.home-layout-about',
			groups: '.home-layout-groups'
		},
		
		tagName: 'div',
		attributes: {'class':'home-layout'},
		template: Template,
		
		onShow: function(){
			var self = this;
			this.loader.q(function(){
				self.deals.show(new DealSlideshowView({
					collection: self.data.deals
				}));
				self.search.show(new SearchFormView());
				self.listenTo(self.search.currentView,"save",self.handleSearchEvent);
				
				self.about.show(new HomeAboutUsView({
					model: self.data.homeAbout
				}));
				
			});
		},
		
		serializeData: function(){
			return {
				isReady: this.loader.get('isReady')
			};
		},
		
		handleSearchEvent: function(holidaySearch){
			Backbone.history.navigate('/search');
			vent.trigger("page:search",holidaySearch);	
		}
	});
	
	return HomeLayout;
});
	
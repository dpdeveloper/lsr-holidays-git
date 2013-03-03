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
	'views/home/deal.slideshow.view'
	
], function($,_,Backbone,Marionette,vent,
			Template,
			MultiLoad,
			ContentDealCollection,
			DealSlideshowView
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
			this.bindTo(this.loader,'complete', this._loadingCallback, this);
			
			
			this.data = {
				deals: new ContentDealCollection()
			};
			
			this.loader.l(this.data.deals.fetch({
				success: this.loader.c, error: this.loader.c
			}));
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
			});
		},
		
		serializeData: function(){
			return {
				isReady: this.loader.get('isReady')
			};
		}
	});
	
	return HomeLayout;
});
	
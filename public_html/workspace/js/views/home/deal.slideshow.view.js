/* @filename views/home/deals.slideshow.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/home/templates/deal.slideshow.view.tpl.html',
	
	'collections/content/deal',
	'views/home/deal.slideshow.item.view'
	
], function($,_,Backbone,Marionette,vent,
			Template,
			ContentDealCollection,
			DealSlideshowItemView
			){
	"use strict";

	var DealSlideShowView = Backbone.Marionette.CompositeView.extend(
	/** @lends DealSlideShowView */
	{
		/**
			Constructor
			
			@class View to display a slideshow of deals
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			if('collection' in options && options.collection !== null){
				this.collection = options.collection;
			}
			else{
				this.collection = new ContentDealCollection();
			}
		},
		
		tagName: 'div',
		attributes: {'class':'deal-slideshow-item-view'},
		
		template: Template,
		itemView: DealSlideshowItemView,
		itemViewContainer: 'slides'
	});
	
	return DealSlideShowView;
});
	
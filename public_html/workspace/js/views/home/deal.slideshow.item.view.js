/* @filename views/home/deal.slideshow.item.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/home/templates/deal.slideshow.item.view.tpl.html'
	
], function($,_,Backbone,Marionette,vent,
			Template
			){
	"use strict";

	var DealSlideshowItemView = Backbone.Marionette.ItemView.extend(
	/** @lends DealSlideshowItemView */
	{
		/**
			Constructor
			
			@class Item View to display a deal
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){

		},
		tagName: 'div',
		attributes: {'class':'deal-slideshow-view'},
		template: Template
	});
	
	return DealSlideshowItemView;
});
	
/* @filename views/home/deal.slideshow.item.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/home/templates/deal.slideshow.item.view.tpl.html',
	'helpers/view-helper',
	'libs/string-helpers'
], function($,_,Backbone,Marionette,vent,
			Template,
			viewHelper
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
			options = options || {};
		},
		
		tagName: 'div',
		attributes: {'class':'deal-slideshow-item-view'},
		template: Template,
		templateHelpers: viewHelper,
		
		/**
			Serialize the Data for the render
		*/
		serializeData: function(){
			if('model' in this && this.model !== null){
			
				var obj = this.model.toJSON();
				obj.backgroundImage = viewHelper.imageUrl(this.model.get('image'),0,0,'full');
				return obj;
			}
		}
	});
	
	return DealSlideshowItemView;
});
	
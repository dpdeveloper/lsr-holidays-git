/* @filename views/home/deals.slideshow.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent','jquery-ui',
	'tpl!views/home/templates/deal.slideshow.view.tpl.html',
	
	'collections/content/deal',
	'views/home/deal.slideshow.item.view'
	
], function($,_,Backbone,Marionette,vent,jqueryUI,
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
		attributes: {'class':'deal-slideshow-view'},
		
		template: Template,
		itemView: DealSlideshowItemView,
		itemViewContainer: '.slides',
		
		events: {
			'click .slide-left': 'handleLeftClick',
			'click .slide-right': 'handleRightClick'
		},
		
		onShow: function(){
			this._position = 0;
			this.children.first().$el.show();
		},
		
		/**
			Transition between slides
			
			@param {Integer} pos The position to change to
		*/
		transition: function(pos){
			if(pos !== this._position && pos >= 0 && pos < this.collection.length){
			
				$(this.children.findByModel(this.collection.at(this._position)).$el).stop().hide('fade',{},1200);
				$(this.children.findByModel(this.collection.at(pos)).$el).stop().show('fade',{},1200);
				this._position = pos;
			}
		},
		
		/**
			Handle Left Click
			
			@param {jQuery Event} ev
		*/
		handleLeftClick: function(ev){
			ev.preventDefault();
			
			var p = this._position - 1;
			if(this._position <= 0){
				p = this.collection.length -1;
			}
			this.transition(p);
		},
		
		/**
			Handle Right Click
			
			@param {jQuery Event} ev
		*/
		handleRightClick: function(ev){
			ev.preventDefault();
			
			var p = this._position + 1;
			if(p >= this.collection.length){
				p = 0;
			}
			this.transition(p);
		}
	});
	
	return DealSlideShowView;
});
	
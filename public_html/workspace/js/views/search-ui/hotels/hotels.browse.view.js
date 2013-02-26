/* @filename views/search-ui/hotels/hotels.browse.view.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.browse.view.tpl.html',
	'views/search-ui/hotels/hotels.browse.item.view',
	'collections/symphony-hotel',
	'libs/jquery.transit'
	
], function($,_,Backbone,Marionette,vent,
			SearchUIHotelBrowseTemplate,
			SearchUIHotelBrowseItemView,
			SymphonyHotelCollection
			){
	"use strict";
	
	var SearchUIHotelsBrowseView = Backbone.Marionette.CompositeView.extend({
		
		template: SearchUIHotelBrowseTemplate,
		itemView: SearchUIHotelBrowseItemView,
		itemViewContainer: '.body-middle-inner',
		
		//completeCollection: new SymphonyHotelCollection(), //unfiltered version
		collection: new SymphonyHotelCollection(),
		
		events: {
			'click .body-left': 'pageLeft',
			'click .body-right': 'pageRight'
		},
		
		_visibe: false,
		
		_size: {
			itemWidth: 240,
			itemMargin: 0,
			itemMinMargin: 1,
			containerWidth: 0,
			containerMargin: 156,
			innerWidth: 0
		},
		_pagination: {
			pageWidth: 5,
			position: 0
		},
		
		ui: {
			inner: '.body-middle-inner',
			outer: '.body-middle'
		},
		
		/**
		 * initialize
		 *
		 *
		*/
		initialize: function(options){
			this.bindTo($(window),'resize',this.resize,this);
			this.bindTo(vent,'search:hotel:loaded',this.setCollection,this);
		},
		
		/**
		 * onRender
		 *
		 *
		*/
		onRender: function(){
			this.resize();
		},
		
		/**
		 * onShow
		 *
		 *
		*/
		onShow: function(){
			this._visible = true;
			this.resize();
		},
		
		/**
		 * resize
		 *
		 *
		*/
		resize: function(){
			
			if(this._visible){
		
				this._size.containerWidth = this.$el.width() - this._size.containerMargin;
				
				//do calculations for paging
				var itemCount = Math.floor(this._size.containerWidth / this._size.itemWidth);
				var rem= this._size.containerWidth % this._size.itemWidth;
				while(rem/(itemCount-1) < this._size.itemMinMargin){
					rem = rem + this._size.itemWidth;
					if(itemCount <= 1) {break;}
					itemCount--;
				}
				this._size.itemMargin = Math.floor(rem/(itemCount-1));
				this._pagination.pageWidth = itemCount;
				
				this._size.innerWidth = (this.collection.length + 1) * (this._size.itemWidth + this._size.itemMargin) - 1;//minus 1 to make safer
				
				this.ui.outer.width(this._size.containerWidth);
				this.ui.inner.width(this._size.innerWidth);
				this.ui.inner.find('.search-ui-hotel-browse-item').css({'margin-right':this._size.itemMargin+"px"});
				
				//adjust the position
				var pos = this._pagination.position;
				var left = -1 * (pos) * (this._size.itemWidth + this._size.itemMargin);
				this.ui.inner.css({x: left});
				this._pagination.position = pos;
				
			}
		},
		
		/**
		 * setCollection
		 *
		 * @param {SymphonyHotelCollection} newCollection
		 *
		*/
		setCollection: function(newCollection){
			if(this._visible){
				this.collection.reset(newCollection.models);
			}
			else{
				this.collection.reset(newCollection.models, {silent: true});
			}
		},
		
		
		/**
		 * pageLeft
		 *
		 *
		*/
		pageLeft: function(){
			if(this._pagination.position === 1){
				return;
			}
			var pos = 1;
			if(this._pagination.position -this._pagination.pageWidth > 1){
				pos = this._pagination.position - this._pagination.pageWidth;
			}
			this.pagePosition(pos);
		},
		
		/**
		 * pageRight
		 *
		 *
		*/
		pageRight: function(){
			var maxPos = this.collection.length - (this._pagination.pageWidth - 1);
			
			if(this._pagination.position === maxPos){
				return;
			}
			var pos = maxPos;
			if(this._pagination.pageWidth + this._pagination.position < maxPos){
				pos = this._pagination.pageWidth + this._pagination.position;
			}
			this.pagePosition(pos);
		},
		
		/**
		 * pagePosition
		 *
		 * @param {Integer} pos
		 *
		*/
		pagePosition: function(pos){
			var left = -1 * (pos -1) * (this._size.itemWidth + this._size.itemMargin);
			this.ui.inner.transit({x: left}, 800);
			this._pagination.position = pos;
		}
		
		
	});
	
	return SearchUIHotelsBrowseView;
});
	
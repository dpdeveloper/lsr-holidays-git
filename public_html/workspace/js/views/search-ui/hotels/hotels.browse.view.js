/* @filename views/search-ui/hotels/hotels.browse.view.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.browse.view.tpl.html',
	'views/search-ui/hotels/hotels.browse.item.view',
	'collections/multicom-accommodation',
	'libs/jquery.transit'
	
], function($,_,Backbone,Marionette,vent,
			SearchUIHotelBrowseTemplate,
			SearchUIHotelBrowseItemView,
			MulticomAccommodationCollection
			){
	"use strict";
	
	var SearchUIHotelsBrowseView = Backbone.Marionette.CompositeView.extend(
	/** @lends SearchUIHotelsBrowseView */
	{
		
		template: SearchUIHotelBrowseTemplate,
		itemView: SearchUIHotelBrowseItemView,
		itemViewContainer: '.body-middle-inner',
		
		collection: new MulticomAccommodationCollection(),
		
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
		
		itemViewOptions: {
			extraCost: 0
		},
		
		/**
			Constructor
			
			@class View to browse hotel objects
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
		
			this.listenTo($(window),'resize',this.resize);
			this.listenTo(vent,'search:hotel:loaded',this.setCollection);
			
			if('selectedHotel' in options && options.selectedHotel !== null){
				this._initialHotel = options.selectedHotel;
			}
			else{
				this._initialHotel = null;
			}
			
			if('extraCost' in options && options.extraCost!== null){
				this.itemViewOptions.extraCost = options.extraCost;
			}
		},
		
		/**
			Render callback
		*/
		onRender: function(){
			this.resize();
		},
		
		/**
			Show Callback
		*/
		onShow: function(){
			this._visible = true;
			this.resize();
			
			// Set the initial view to be selected
			if(this._initialHotel !== null){
				var self = this;
				//find the correct model
				var m = this.collection.find(function(item){
					if(item.get('accommodationCode') === self._initialHotel.get('accommodationCode')){
						return true;
					}
				});
				if(typeof m !== 'undefined'){
					var v = this.children.findByModel(m);
					if(typeof v !== 'undefined' && 'setSelected' in v){
						v.setSelected();	
						this._initialHotel = null;
					}
				}
			}
		},
		
		/**
			Resize the view
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
			Set the Collection

			@param {MulticomAccommodationCollection} newCollection
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
			move the navigation a page to the left
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
			Move the navigation a page to the right
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
			Navigate to a specific position in the collection
			@param {Integer} pos
		*/
		pagePosition: function(pos){
			var left = -1 * (pos -1) * (this._size.itemWidth + this._size.itemMargin);
			this.ui.inner.transit({x: left}, 800);
			this._pagination.position = pos;
		}
		
		
	});
	
	return SearchUIHotelsBrowseView;
});
	
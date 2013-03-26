/* @filename views/search-ui/flights/flights.browse.view.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/flights.browse.view.tpl.html',
	'views/search-ui/flights/flights.browse.item.view',
	'collections/multicom-flight',
	'collections/symphony-airline',
	'models/multicom/multicom-flight',
	'libs/jquery.transit'
	
], function($,_,Backbone,Marionette,vent,
			SearchUIFlightsBrowseTemplate,
			SearchUIFlightsBrowseItemView,
			MCFlightCollection,
			SymphonyAirlineCollection,
			MulticomFlight
			){
	"use strict";
	
	var SearchUIFlightsBrowseView = Backbone.Marionette.CompositeView.extend(
	/** @lends SearchUIFlightsBrowseView */
	{
		
		template: SearchUIFlightsBrowseTemplate,
		itemView: SearchUIFlightsBrowseItemView,
		itemViewContainer: '.body-middle-inner',
		
		completeCollection: null, //unfiltered version
		collection: null,
		
		_airlineCollection: null,
		_selectedFlight: null,
		
		events: {
			'click .body-left': 'pageLeft',
			'click .body-right': 'pageRight'
		},
		
		_visibe: false,
		_size: null,
		_pagination: null,
		_filterRender: null, //used to notify the onRender event that this is a filter so a glow/shake can be applied
		
		ui: {
			inner: '.body-middle-inner',
			outer: '.body-middle',
			left: '.body-left',
			right: '.body-right'
		},
		
		itemViewOptions: {},
		
		/**
			Constructor
			
			@class View to display hotel browse interface
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			
			this.collection = new MCFlightCollection();
			this.completeCollection = new MCFlightCollection();

			this._airlineCollection = new SymphonyAirlineCollection();			
			
			this._filterRender = false;
			this._pagination = { pageWidth: 5, position: 1};
			this._size = {
				itemWidth: 260,
				itemMargin: 0,
				itemMinMargin: 2,
				containerWidth: 0,
				containerMargin: 156,	
				innerWidth: 0
			};
			this._visible = false;
			
			if('selectedFlight' in options && options.selectedFlight !== null){
				this.itemViewOptions.currentFlightPrice = options.selectedFlight.get('priceTotal');
			}
			
			if('collection' in options && options.collection !== null){
				this.collection.reset(options.collection.models, {silent: true});
				this.completeCollection.reset(options.collection.models);
			}
			
			if(options.airlineCollection){
				this._airlineCollection.reset(options.airlineCollection.models,{silent: true});
				this.itemViewOptions.airlineCollection = this._airlineCollection;
			}
			
		
			this.listenTo($(window),'resize',this.resize);
			this.listenTo(vent,'search:flight:filter',this.handleFlightFilter);
		},
		
		onRender: function(){
			this.resize();	
			if(this._filterRender){
				var self = this;
			
				this._filterRender = false;
				this.children.each(function(view, index){
					if(index >= self._pagination.position && index < (self._pagination.position + self._pagination.pageWidth)){
						if(view.getInnerEl){
							view.getInnerEl().effect('shake',{times: 2, direction: 'right', distance: 20},150);
						}
					}
				});
			}
			
		},
		
		onShow: function(){
			this._visible = true;
			this.resize();	
		},
		
		onClose: function(){
			this.completeCollection = null;
			this._airlineCollection = null;
		},
		
		resize: function(){
			
			if(this._visible){
				
				//calc the containerMargin
				this._size.containerMargin = this.ui.left.outerWidth(true) + this.ui.right.outerWidth(true);
		
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
				
				this._size.innerWidth = (this.collection.length + 1) * (this._size.itemWidth + this._size.itemMargin);
				
				this.ui.outer.width(this._size.containerWidth);
				this.ui.inner.width(this._size.innerWidth);
				this.ui.inner.find('.search-ui-flights-browse-item').css({'margin-right':this._size.itemMargin+"px"});
				
				//adjust the position
				var pos = this._pagination.position;
				var left = -1 * (pos-1) * (this._size.itemWidth + this._size.itemMargin);
				this.ui.inner.css({x: left});
				this._pagination.position = pos;
				
				this.trigger('change:pagination',this.getPagination());
				
			}
		},				

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
		
		pagePosition: function(pos){
			var left = -1 * (pos -1) * (this._size.itemWidth + this._size.itemMargin);
			this.ui.inner.transit({x: left}, 800);
			this._pagination.position = pos;
			this.trigger('change:pagination',this.getPagination());
		},
		
		
		handleFlightFilter: function(filter){
			this._pagination.position = 1;
			this._filterRender = true;
			this.collection.reset(
				this.completeCollection.filterByFlightFilter(filter)
			);
			
			this.resize();
			this.trigger('change:pagination',this.getPagination());
		},
		
		/**
		 * getPagination
		 *
		 * @return {Object} {length: 10,position: 0, width: 5, pages: 2, currentPage: 1 }
		 *
		*/
		getPagination: function(){
			return {
				length: this.collection.length,
				position: this._pagination.position,
				width: this._pagination.pageWidth,
				pages: Math.ceil(this.collection.length / this._pagination.pageWidth),
				currentPage: Math.floor(this._pagination.position / this._pagination.pageWidth) +1
			};
		}
		
		
	});
	
	return SearchUIFlightsBrowseView;
});
	
/* @filename views/search-ui/travellers/travellers.edit.layout
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/travellers.edit.layout.tpl.html',
	'models/booking',
	'views/search-ui/travellers/travellers.edit.collection.view',
	'collections/travellers-info'
], function($,_,Backbone,Marionette,vent,
			Template,
			Booking,
			TravellersEditCollectionView,
			TravellersInfoCollection
			){
	"use strict";

	var TravellersEditLayout = Backbone.Marionette.Layout.extend(
	/** @lends TravellersEditLayout# */
	{
		template: Template,
		
		tagName: 'div',
		attributes: {'class': 'search-ui-travellers-edit-layout'},
		
		regions: {
			adult: '.edit-layout-one',
			child: '.edit-layout-two',
			infant: '.edit-layout-three'
		},
		
		_views: {
			adult: null,
			child: null,
			infant: null
		},
		
		/**
			Constructor
			
			@class Edit Layout for the Travellers UI
			
			@constructs
			@param {Object} [options] Options hash
		*/
		initialize: function(options){
			options = options || {};
			
			if('model' in options && options.models !== null){
				this.model = options.model;
			}
			else{
				this.model = new Booking();
			}
		},
		
		/**
			Callback function for when shown
		*/
		onShow: function(){
			var occ = this.model.get('holidaySearch').getOccupancyTotals();
			
			this.model._validateTravellersInfo(); //make sure before we render
			
			if(occ.adults > 0){
				
				this._views.adult = new TravellersEditCollectionView({
					collection: new TravellersInfoCollection(
						this.model.get('travellersInfo').filter(function(item,index){
						if(item.get('travellerType')==='adult'){
							return true;
						}
					})),
					title: 'Adults'
				});
				this.adult.show(this._views.adult);
			}
			
			if(occ.children > 0){
				this._views.child = new TravellersEditCollectionView({
					collection: new TravellersInfoCollection(
						this.model.get('travellersInfo').filter(function(item,index){
							if(item.get('travellerType')==='child'){
								return true;
							}
					})),
					title: 'Children'
				});
				this.child.show(this._views.child);
			}
			if(occ.infants > 0){
				this._view.infant = new TravellersEditCollectionView({
					collection: new TravellersInfoCollection(
						this.model.get('travellersInfo').filter(function(item,index){
							if(item.get('travellerType')==='infant'){
								return true;
							}	
						})
					),
					title: 'Infants'
				});
				this.infant.show(this._views.infant);
			}
				
		}
		
		
		
	});
	
	return TravellersEditLayout;
});
	
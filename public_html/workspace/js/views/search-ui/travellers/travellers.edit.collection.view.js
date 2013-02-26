/* @filename views/search-ui/travellers/travellers.edit.collection.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/travellers.edit.collection.view.tpl.html',
	'views/search-ui/travellers/travellers.edit.item.view',
	'collections/travellers-info'
	
], function($,_,Backbone,Marionette,vent,
			Template,
			TravellersEditItemView,
			TravellersInfoCollection
			){
	"use strict";

	var TravellersEditCollectionView = Backbone.Marionette.CompositeView.extend(
	/** @lends TravellersEditCollectionView# */
	{
		template: Template,
		
		tagName: 'div',
		attributes: {'class': 'search-ui-travellers-edit-collection'},
		
		itemViewContainer: '.collection-inner',
		itemView: TravellersEditItemView,
		
		_lang: {
			title: null
		},
		
		/**
			Constructor
			
			@class A Composite view to allow editing of multiple Travellers
			
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			if('title' in options && options.title !== null){
				this._lang.title = options.title;
			}
			if('collection' in options && options.collection !== null){
				this.collection = options.collection;
			}
			else{
				this.collection = new TravellersInfoCollection();
			}
		}
	});
	
	return TravellersEditCollectionView;
});
	
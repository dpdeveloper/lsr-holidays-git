/* @filename views/search-ui/hotels/detail/hotels.detail.images.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.detail.images.view.tpl.html',
	'models/multicom/multicom-accommodation',
	'helpers/view-helper'
	
], function($,_,Backbone,Marionette,vent,
			Template,
			MulticomAccommodation,
			viewHelper
			){
	"use strict";

	var HotelsDetailImagesView = Backbone.Marionette.ItemView.extend(
	/** @lends HotelsDetailImagesView */
	{

		/**
			Constructor
			
			@class View to display hotel images
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			this.listenTo(vent,'search:hotel:selected',this.handleHotelChange);
			
			if('model' in options && options.model !== null){
				this.model = options.model;
			}
			else{
				this.model = new MulticomAccommodation();	
			}
		},
		
		/**
			Output the images for use
		*/
		serializeData: function(){
			var images = this.model.get('images');
			
			if(!$.isArray(images)){
				images = [];
			}
			return {
				model: this.model.toJSON(),
				images: images	
			};
		},
		
		model: new MulticomAccommodation(),
		template: Template,
		templateHelpers: viewHelper,
		tagName: 'div',
		attributes: {'class':'hotels-detail-images-view'},
		
		/**
			Callback for when the hotel changes
		*/
		handleHotelChange: function(hotel){
			if(this.model.id !== hotel.id){
				this.model = hotel;
			}
			this.render();
		}
		
	});
	
	return HotelsDetailImagesView;
});
	
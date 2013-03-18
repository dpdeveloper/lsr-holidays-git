/* @filename views/search-ui/hotels/detail/hotels.detail.about.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.detail.about.view.tpl.html',
	'models/multicom/multicom-accommodation',
	'helpers/view-helper',
	'libs/jquery.actual.min',
	'libs/jquery.transit'
], function($,_,Backbone,Marionette,vent,
			Template,
			MulticomAccommodation,
			viewHelper,
			jqActual,jqTransit //dummy params to prevent screw ups
			){
	"use strict";

	var HotelsDetailAboutView = Backbone.Marionette.ItemView.extend(
	/** @lends HotelsDetailAboutView */
	{
		/**
			Constructor
			
			@class Display the Overview Information for a hotel
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
		
			this.listenTo(vent,'search:hotel:selected',this.handleHotelSelected);
			
			if('model' in options && options.model !== null){
				this.model = options.model;
			}
			else{
				this.model = new MulticomAccommodation();
			}
		},
		
		model: new MulticomAccommodation(),
		template: Template,
		templateHelpers: viewHelper,
		tagName: 'div',
		attributes: {'class':'hotels-detail-about-view'},
		
		events: {
			'click a.read-more': 'handleReadMore'
		},
		ui: {
			descriptionWrapper: '.description-wrapper',
			descriptionShort: 'p.description.short-text',
			descriptionFull: 'p.description.full-text',
			readMore: '.read-more'
		},
		
		handleHotelSelected: function(hotel){
			if(this.model.id !== hotel.id){
				this.model = hotel;
			}
			this.render();
		},
		
		handleReadMore: function(){
			//calculate the differences in height
			//alert(this.ui.descriptionFull.actual('innerHeight'));
			var h=this.ui.descriptionFull.actual('outerHeight');
			var self = this;
			
			this.ui.descriptionWrapper.css({height: this.ui.descriptionShort.actual('outerHeight')});
			this.ui.descriptionWrapper.transit({height: h, duration: 400});
			self.ui.readMore.parent().hide('blind',{direction: 'vertical'},400);
			this.ui.descriptionShort.hide('fade',{},400, function(){
				self.ui.descriptionFull.show('fade',{},400);
				
			});
		}
		
	});
	
	return HotelsDetailAboutView;
});
	
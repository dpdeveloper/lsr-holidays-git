/* @filename views/search-ui/summary/summary.flight.view.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.detail.flight.view.tpl.html',
	'collections/symphony-airline',
	'models/multicom/multicom-flight',
	'helpers/view-helper'
	
], function($,_,Backbone,Marionette,vent,
			SearchUIHotelsDetailFlightTemplate,
			SymphonyAirlineCollection,
			MulticomFlight,
			viewHelper
			){
	"use strict";
	
	var SearchUIHotelsDetailFlightView = Backbone.Marionette.ItemView.extend({
		template: SearchUIHotelsDetailFlightTemplate,
		model: new MulticomFlight(),
		templateHelpers: viewHelper,
		
		tagName: 'div',
		attributes: {'class': 'search-ui-hotels-detail-flight'},
		
		events: {
			'click .summary-flight-outer': 'handleClick',
			'click .action-edit': 'handleClick',	
		},
		
		_flightSelected: false,
		_isSelected: false,
		
		_airlineCollection: null,
		
		initialize: function(options){
			
			this._airlineCollection = new SymphonyAirlineCollection();
			
			if(options.airlineCollection){
				this._airlineCollection.reset(options.airlineCollection.models,{silent: true});
			}
			if(options.model && options.model!=null){
				this.model.set(options.model.toJSON());
				this._flightSelected = true;
			}
		
			this.listenTo(vent,'search:flight:selected',this.handleFlightSelected);
			this.listenTo(vent,'search:flight:edit', this.handleFlightEdit);
			this.listenTo(vent,'search:hotel:selected',this.handleHotelSelected);
			
		},
		
		onClose: function(){
			this._airlineCollection = null;
		},
		
		handleFlightEdit: function(){
			this._isSelected = true;
			this.render();	
		},
		
		handleHotelSelected: function(){
			this._isSelected = false;
			this.render();
		},
		
		handleFlightSelected: function(flight){
			this.model.set(flight.toJSON());
			this._flightSelected = true;
			this._isSelected = false;
			this.render();
		},
		
		serializeData: function(){
			return $.extend({
					flightSelected: this._flightSelected,
					outboundFlightLogo: this._airlineCollection.getAirlineFromCode(this.model.get('outboundCarrier')),
					returnFlightLogo: this._airlineCollection.getAirlineFromCode(this.model.get('returnCarrier')),
				},
				this.model.toJSON()
				);
		},
		
		onRender: function(){
			if(this._isSelected){
				this.$el.addClass('selected');
			}
			else{
				this.$el.removeClass('selected');
			}	
		},
		
		handleClick: function(ev){
			ev.preventDefault();
			vent.trigger('search:flight:edit');	
		},
	});
	
	return SearchUIHotelsDetailFlightView;
});
	
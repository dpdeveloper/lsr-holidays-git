/* @filename views/search-ui/hotels/hotels.browse.item.view
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/flights.browse.item.view.tpl.html',
	'models/multicom/multicom-flight',
	'helpers/view-helper'
	
], function($,_,Backbone,Marionette,vent,
			SearchUIFlightsBrowseItemTemplate,
			MulticomFlight,
			viewHelper
			){
	"use strict";
	
	var SearchUIFlightsBrowseItemView = Backbone.Marionette.ItemView.extend(
	/** @lends SearchUIFlightsBrowseItemView */
	{

		template: SearchUIFlightsBrowseItemTemplate,
		model: new MulticomFlight(),
		templateHelpers: viewHelper,
		
		tagName: 'div',
		attributes: {
			'class': 'search-ui-flights-browse-item'
		},
		
		events: {
			'click': 'handleClick'
		},
		
		ui:{
			inner: '.flight-item-inner'
		},
		
		getInnerEl: function(){
			if(this.ui.inner){
				return this.ui.inner;
			}
		},
		
		
		_currentFlightPrice: 0,
		_outboundAirlineLogo: null,	
		_returnAirlineLogo: null,	
		
		
		initialize: function(options){
			options = options || {};
		
			//set the current flight price
			if(options.currentFlightPrice){
				this._currentFlightPrice = options.currentFlightPrice;
			}
			
			//get the logos for the flights
			if(options.airlineCollection){
				this._outboundAirlineLogo = options.airlineCollection.getAirlineFromCode(this.model.get('outboundCarrier'));
				this._returnAirlineLogo = options.airlineCollection.getAirlineFromCode(this.model.get('returnCarrier'));
			}
		},
		
		onClose: function(){
			this._outboundAirlineLogo = null;
			this._returnAirlineLogo = null;
			this._currentFlightPrice = null;
		},
		
		serializeData: function(){
			//calculate the + or - increase in price
			var price = this.model.get('priceTotal');
			price = price - this._currentFlightPrice;
			
			if(price > 0){
				price = "+ £"+price.toFixed(2);
			}
			else if(price < 0){
				price = "- £"+ (price.toFixed(2) * -1);
			}
			else{
				price = "+ £0.00";
			}
			
			return $.extend(this.model.toJSON(), {
				priceIncrease: price,
				outboundAirlineLogo: this._outboundAirlineLogo,
				returnAirlineLogo: this._returnAirlineLogo
			});
		},
		
		/**
		 * handleClick
		 *
		 * @param {jQuery Event} ev
		 *
		 * Adds selected CSS and fires an event
		*/
		handleClick: function(ev){
			ev.preventDefault();
			console.log(this.model.toJSON());
			vent.trigger('search:flight:selected',this.model);
		}
		
		
	});
	
	return SearchUIFlightsBrowseItemView;
});
	
/* @filename views/search-ui/flights/flights.filter.view.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/flights.filter.view.tpl.html',
	'models/flight-filter',
	'collections/multicom-flight',
	'helpers/view-helper',
	'libs/select2.min'
	
], function($,_,Backbone,Marionette,vent,
			SearchUIFlightsFilterViewTemplate,
			FlightFilter,
			MCFlightCollection,
			viewHelper
			){
	"use strict";
	
	var SearchUIFlightsFilterView = Backbone.Marionette.ItemView.extend(
	/** @lends SearchUIFlightsFilterView */
	{
		template: SearchUIFlightsFilterViewTemplate,
		templateHelpers: viewHelper,
		model: null,
		_flightCollection: null,
		
		
		tagName: 'div',
		attributes: {'class':'search-ui-flights-filter'},
		
		events: {
			'change select': 'handleFormChange'
		},
		
		/**
			Constructor
			
			@class View to display flights filtering options
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			this.model = new FlightFilter();
			this._flightCollection = new MCFlightCollection();
			
			if(options.collection){
				this._flightCollection = options.collection;
			}
		},
		
		serializeData: function(){
			return{
				model: this.model.toJSONExpanded(),
				outboundAirlines: this._flightCollection.getUniqueArrayFromParameters(['outboundCarrier','outboundAirlineName']),
				outboundNumStops: this._flightCollection.getUniqueArrayFromParameters(['outboundNumStops']),
				returnAirlines: this._flightCollection.getUniqueArrayFromParameters(['returnCarrier','returnAirlineName']),
				returnNumStops: this._flightCollection.getUniqueArrayFromParameters(['returnNumStops'])
			};
		},
		
		onShow: function(){
			var self = this;
			setTimeout(function(){
				$('select',self.$el).select2({width: 'resolve', allowClear: true});	
			},10);	
		},
		
		handleFormChange: function(ev){

			//extract all the data from the form
			this.saveFormElementIntoModel('outboundAirline','#flights-filter-outbound-airline');
			this.saveFormElementIntoModel('outboundNoStops','#flights-filter-return-number-stops');
			this.saveFormElementIntoModel('outboundDepartureTimes','#flights-filter-outbound-departure-times');
			
			this.saveFormElementIntoModel('returnAirline','#flights-filter-return-airline');
			this.saveFormElementIntoModel('returnNoStops','#flights-filter-return-number-stops');
			this.saveFormElementIntoModel('returnDepartureTimes','#flights-filter-return-departure-times');
			
			vent.trigger('search:flight:filter', this.model);
				
		},
		
		saveFormElementIntoModel: function(key,selector){
			var val = this.$el.find(selector).val();
			
			this.model.setProperty(key,val);
		}
		
		
	});
	
	return SearchUIFlightsFilterView;
});
	
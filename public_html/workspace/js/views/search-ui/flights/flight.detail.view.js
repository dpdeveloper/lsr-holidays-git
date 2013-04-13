/* @filename views/search-ui/summary/summary.flight.view.js
*
* David Anderson 2012
*
*/

define([
'jquery', 'underscore', 'backbone', 'marionette', 'vent', 'colorbox', 'moment',
'tpl!views/search-ui/templates/flight.detail.view.tpl.html', //Load with !tpl plugin
'helpers/view-helper'

], function ($, _, Backbone, Marionette, vent, jcb, moment,
popup,
viewHelper
) {
	"use strict";
	
	var SearchUIFlightsDetailView = Backbone.Marionette.ItemView.extend({
	
	
	templateHelpers: viewHelper,
	tagName: 'div',
	attributes: { 'class': 'filter-detail-view' },
	template: popup, // Backbone.Marionette allows the template to be loaded with the 'tpl!' (see above) plugin and assigned as so
	
	
	/**
		Initialize Function
	*/
	initialize: function (options) {
		options = options || {};
	},
	
	/**
		Function to calculate timespans
	*/
	setDatesFromStartFinish: function (start, end) {
		
		var format = "DD/MM/YYYY HH:mm:ss";
		
		var s = moment(start, format);
		var e = moment(end, format);
		
		var nights = (e.diff(s, 'seconds')).toString();
		
		
		var t = parseInt(nights,10);
		var h = Math.floor(t / 3600);
		t %= 3600;
		var m = Math.floor(t / 60);
		s = t % 60;
		
		return (h > 0 ? h + 'h ' : '0h ') + (m > 0 ? m + 'm ' : '0m');
	},
	
	
	/**
		SerializeData
		
		This is a callback called by backbone marionette prior to rendering
		
		Default functionality is to just call this.model.toJSON()
		
		@returns JSON object of parameters for template
		
		@Durga
		
		I've refactored this code for one important reason
			- No data is 'set' into the model due to the fact that the models persist globally so we don't want to be modifying the global model
			- Instead, I use the toJSON function to get a local JSON Object copy of the data and use that store the formatting
			- This data is then returned from the function
		
		Backbone.Marionette has a default render event that does the _.template(...) functionality so we don't have to write that code
		Instead serializeData returns the data ready for this
		We call the colorbox on the .onRender function as this is called by default after the template has been rendered internally.
		
		
	*/
	serializeData: function () {
		
		var returnData = this.model.toJSON();
		
		var fmt = 'DD/MM/YYYY HH:mm:ss';
		var parseFmt = 'YYYY-MM-DDHHmm';
		
		////Outbound Legs Generation
		
		returnData.Outboundtimespan = 
			this.setDatesFromStartFinish(
				moment(returnData.departureDate + returnData.departureTime, parseFmt).format(fmt),
				moment(returnData.arrivalDate + returnData.arrivalTime, parseFmt).format(fmt));
		
		
		if (returnData.outboundNumStops !== 0){
		
		
			_.each(returnData.outboundSubSegments, function (outboundSubSegment, index) {
				if (index > 0) {
					returnData.outboundSubSegments[index - 1].OutBoundStopOver = this.setDatesFromStartFinish(moment(returnData.outboundSubSegments[index - 1].arrivalDate + returnData.outboundSubSegments[index - 1].arrivalTime, parseFmt).format(fmt), moment(outboundSubSegment.departureDate + outboundSubSegment.departureTime, parseFmt).format(fmt));
				}
				
				var outboundSubSegmentstimespan = this.setDatesFromStartFinish(moment(outboundSubSegment.departureDate + outboundSubSegment.departureTime, parseFmt).format(fmt), moment(outboundSubSegment.arrivalDate + outboundSubSegment.arrivalTime, parseFmt).format(fmt));
				
				outboundSubSegment.outboundSubSegmentstimespan = outboundSubSegmentstimespan;
				outboundSubSegment.departureTimeFormat = moment(outboundSubSegment.departureTime, 'HHmm').format('HH:mm');
				outboundSubSegment.arrivalTimeFormat = moment(outboundSubSegment.arrivalTime, 'HHmm').format('HH:mm');
				
			}, this);
		}
		//Inbound Legs Generation
		returnData.Inboundtimespan =
			this.setDatesFromStartFinish(
				moment(this.model.get('returnHomeDepartDate') + this.model.get('returnHomeDepartTime'), parseFmt).format(fmt),
				moment(this.model.get('returnHomeDate') + this.model.get('returnHomeTime'), parseFmt).format(fmt));
				
		if(this.model.get('returnNumStops') !== 0) {
			
			_.each(returnData.returnSubSegments, function (inboundSubSegment, index) {
				if (index > 0) {
					returnData.returnSubSegments[index - 1].InBoundStopOver = this.setDatesFromStartFinish(
						moment(this.model.get('returnSubSegments')[index - 1].arrivalDate + this.model.get('returnSubSegments')[index - 1].arrivalTime, parseFmt).format(fmt),
						moment(inboundSubSegment.departureDate + inboundSubSegment.departureTime, parseFmt).format(fmt));
				}
				var inboundSubSegmentstimespan = this.setDatesFromStartFinish(moment(inboundSubSegment.departureDate + inboundSubSegment.departureTime, parseFmt).format(fmt), moment(inboundSubSegment.arrivalDate + inboundSubSegment.arrivalTime, parseFmt).format(fmt));
				inboundSubSegment.inboundSubSegmentstimespan = inboundSubSegmentstimespan;
				inboundSubSegment.departureTimeFormat = moment(inboundSubSegment.departureTime, 'HHmm').format('HH:mm');
				inboundSubSegment.arrivalTimeFormat = moment(inboundSubSegment.arrivalTime, 'HHmm').format('HH:mm');
				
			}, this);
		}
		
		//Timeformat Generation
		returnData.departureTimeformat = moment(this.model.get('departureTime'), 'HHmm').format('HH:mm');
		returnData.arrivalTimeformat = moment(this.model.get('arrivalTime'), 'HHmm').format('HH:mm');
		returnData.returnHomeDepartTimeformat = moment(this.model.get('returnHomeDepartTime'), 'HHmm').format('HH:mm');
		returnData.returnHomeTimeformat = moment(this.model.get('returnHomeTime'), 'HHmm').format('HH:mm');
		
		
		return returnData;
	},
	

	/**

		The backbone marionette onRender callback
		
	*/
	onRender: function () {
		$.colorbox({html: this.el});
	},
	
	
	/**
		ensure colorbox is closed
	*/
	onClose: function(){
		$.colorbox.close();
	}
	
});

    return SearchUIFlightsDetailView;
});

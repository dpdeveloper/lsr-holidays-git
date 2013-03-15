/* @filename views/search-ui/sidebar/sidebar.summary.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent','moment',
	'tpl!views/search-ui/templates/sidebar.summary.view.tpl.html',
	'models/booking'
	
], function($,_,Backbone,Marionette,vent,moment,
			Template,
			Booking
			){
	"use strict";

	var SidebarSummaryView = Backbone.Marionette.ItemView.extend(
	/** @lends SidebarSummaryView# */
	{
		template: Template,
		
		tagName: 'div',
		attributes: {'class': 'search-ui-sidebar-summary-view'},
		
		/**
			Constructor
			
			@class View to show Summary of Holiday
		
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			if('model' in options && options.model!==null){
				this.model = options.model;
			}
			else{
				this.model = new Booking();
			}
			
			if('displayBooking' in options && options.displayBooking !== true)
			{
				this._displayBooking = false;
			}
			else{
				this._displayBooking = true;
			}
			
			this.listenTo(vent,"search:hotel:selected",this.handleHotelSelected);
			this.listenTo(vent,"search:flight:selected",this.handleFlightSelected);
		},
		
		/**
			Serialize the data for the renderer
			@returns {Object}
		*/
		serializeData: function(){
			
			var data = this.model.getSummary();

			//do some date formatting &rarr;œ
			
			var d = moment(data.date,'DD/MM/YY');
			var n = moment(data.date,'DD/MM/YY').add('days',data.nights);
			
			data.dateString = d.format('DD/MM/YYYY') +" &rarr; " + n.format('DD/MM/YYYY');
			data.displayBooking = this._displayBooking;
			
			data.occupancy = {};
			data.occupancy = this.model.get('holidaySearch').getOccupancyTotals();
			
			return data;
		},
		
		handleHotelSelected: function(hotel){
			this.model.set('selectedHotel',hotel);
			this.render();
		},
		handleFlightSelected: function(flight){
			this.model.set('selectedFlight',flight);
			this.render();
		}
		
	});
	
	return SidebarSummaryView;
});
	
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
		},
		
		/**
			Serialize the data for the renderer
			@returns {Object}
		*/
		serializeData: function(){
			
			var data = this.model.getSummary();

			//do some date formatting
			var d = moment(data.date,'DD/MM/YY').format('Do MMMM YYYY');
			var n = ' for '+data.nights+' Night';
			if(parseInt(n,10)>1){n=n+'s';}
			data.dateString = d + n;
			
			return data;
		}
		
	});
	
	return SidebarSummaryView;
});
	
/* @filename views/search-ui/flights/flights.layout
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent', 'reqres',
	'tpl!views/search-ui/templates/flights.layout.tpl.html',
	'views/search-ui/flights/flights.browse.view',
	'views/search-ui/flights/flights.filter.view'
	
], function($,_,Backbone,Marionette,vent,reqres,
			SearchUIFlightsLayoutTemplate,
			SearchUIFlightsBrowseView,
			SearchUIFlightsFilterView
			){
	"use strict";
	
	var SearchUIFlightsLayout = Backbone.Marionette.Layout.extend({
		template: SearchUIFlightsLayoutTemplate,
		
		regions: {
			browse: '.flights-browse',
			filter: '.flights-filter'
		},
		
		ui: {
			title: '.flights-title'
		},
		
		_filterView: null,
		_browseView: null,
		
		initialize: function(){
			this.listenTo(vent,'search:flight:edit', this.handleFlightsEdit);
		},
		
		onRender: function(){},
		onShow: function(){
			
			var col = reqres.request('search:get:flight:results');

			this._browseView =  new SearchUIFlightsBrowseView({
				collection: col,
				selectedFlight: reqres.request('search:get:flight:selected'),
				airlineCollection: reqres.request('search:get:airlines')
				});
			this.browse.show(this._browseView);
			
			this._filterView = new SearchUIFlightsFilterView({
				collection: col
			});
			this.filter.show(this._filterView);
			
			//bind pagination
			this.listenTo(this._browseView,'change:pagination',this.handleFlightsPagination);
			this.handleFlightsPagination(this._browseView.getPagination());
		},
		
		/**
		 * handleFlightsEdit
		 *
		*/
		handleFlightsEdit: function(object){

		},
		
		onClose: function(){
			if(this._browseView){
				this._browseView.close();
				this._browseView = null;
			}
			if(this._filterView){
				this._filterView.close();
				this._filterView = null;
			}
		},
		
		/**
		 * handleFlightsPagination
		 *
		 * @param data {Object} ie: {length: 10,position: 0, width: 5, pages: 2, currentPage: 1 }
		 *
		 * Updates the pagination message
		 *
		*/
		handleFlightsPagination: function(data){
			
			var str = "showing results "+(data.position)+" to "+(data.position + data.width -1) + " of "+(data.length);
			this.ui.title.find('p').html(str);
		}
		
	});
	
	return SearchUIFlightsLayout;
});
	
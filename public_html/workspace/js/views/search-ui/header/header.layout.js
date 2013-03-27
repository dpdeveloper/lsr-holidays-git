/* @filename views/search-ui/
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent', 'reqres',
	
	'tpl!views/search-ui/templates/header.layout.tpl.html',
	'views/page/search.form.view',
	'views/search-ui/header/header.progress.view',
	'views/search-ui/header/header.status.view'
], function(	$,_,Backbone,Marionette,vent,reqres,
				HeaderLayoutTemplate,
				SearchFormView,
				HeaderProgressView,
				HeaderStatusView
		){
	"use strict";
	
	var SearchHeaderLayout = Backbone.Marionette.Layout.extend(
	/** @lends SearchHeaderLayout */
	{

		template: HeaderLayoutTemplate,
		regions: {
			overlay: '.header-overlay',
			progress: '.header-progress',
			status: '.header-status'
		},
		events: {
			'click .header-bar .edit': 'handleEditClick'	
		},
		
		ui: {
			editSearchBtn: '.header-bar .edit'
		},
		
		/**
			Constructor
			
			@class Layout to display search ui header
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			
		},
		
		onShow: function(){			
			this.progress.show(new HeaderProgressView());
			this.status.show(new HeaderStatusView());
		},
		
		
		/*
			Shows the search edit form
		*/
		handleEditClick: function(ev){
		
			ev.preventDefault();
			
			if(this.ui.editSearchBtn.hasClass('active')){
				//hide
				this.hideOverlay();
			}
			else{
				//show
				this.overlay.show(new SearchFormView({
					holidaySearch: reqres.request('search:get:booking').get('holidaySearch')	
				}));
				this.listenTo(this.overlay.currentView,'save',this.handleSearchEvent); //set up a listener
				this.ui.editSearchBtn.addClass('active');
			}
			
		},
		
		/**
			Hides the search form and updates the nav
		*/
		hideOverlay: function(){
			this.overlay.close();
			this.ui.editSearchBtn.removeClass('active');
		},
		
		/**
			Callback for a search event
			
			@param {HolidaySearch} model
		*/
		handleSearchEvent: function(model){
			this.hideOverlay();
			vent.trigger("search:trip:edit",model);
		}
		
	});
	
	return SearchHeaderLayout;
});
	
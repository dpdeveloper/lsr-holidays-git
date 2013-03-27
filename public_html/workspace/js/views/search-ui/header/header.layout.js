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
				this.overlay.reset();
				this.ui.editSearchBtn.removeClass('active');
			}
			else{
				//show
				this.overlay.show(new SearchFormView({
					holidaySearch: reqres.request('search:get:booking').get('holidaySearch')	
				}));
				this.ui.editSearchBtn.addClass('active');
			}
			
		},
		hideOverlay: function(){
			this.$el.find('.header-overlay').hide();
			this.$el.find('.header-bar .edit').removeClass('active');
		}
		
	});
	
	return SearchHeaderLayout;
});
	
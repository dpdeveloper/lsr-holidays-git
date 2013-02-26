/* @filename views/search-ui/hotels/hotels.detail.tabs.view
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/hotels.detail.tabs.view.tpl.html',
	'models/symphony-hotel',
	'helpers/view-helper',
	
], function($,_,Backbone,Marionette,vent,
			SearchUIHotelsDetailTabsTemplate,
			SymphonyHotel,
			viewHelper
			){
	"use strict";
	
	var SearchUIHotelsDetailTabsView = Backbone.Marionette.ItemView.extend({
		template: SearchUIHotelsDetailTabsTemplate,
		model: new SymphonyHotel(),
		
		tagName: 'div',
		attributes: {'class':'search-ui-hotels-detail-tabs'},
		templateHelpers: viewHelper,
		
		events: {
			'click .hotels-detail-tabs-menu a': 'handleTabClick',
			
			'hover .room-row': 'handleRoomRowHover',
		},
		
		_activeTab: null,
		
		ui: {
			links: '.hotels-detail-tabs-menu a',
			tabs: '.tab',
		},
		
		initialize: function(){
			this.bindTo(vent,'search:hotel:selected', this.handleHotelSelection, this);
		},
		
		handleHotelSelection: function(selectedHotel){
			this.model.set(selectedHotel.toJSON());
			this.render();
		},
		
		onShow: function(){
			if(this._activeTab == null){
				this._activeTab = this.ui.links.first().attr('id');
			}
			this.switchTab(this._activeTab);
		},
		
		onRender: function(){
			if(this._activeTab != null){
				this.switchTab(this._activeTab);
			}
		},
		
		switchTab: function(tab){
			this.ui.links.removeClass('active');
			this.$el.find('#'+tab).addClass('active');
			
			this.ui.tabs.hide();
			this.$el.find('.'+tab).show();
			
			this._activeTab = tab;
		},
		
		handleTabClick: function(ev){
			ev.preventDefault();
			this.switchTab($(ev.currentTarget).attr('id'));	
		},
		
		handleRoomRowHover: function(ev){
			var $t = $(ev.currentTarget);
			
			if($t.hasClass('hover')){
				$t.removeClass('hover');
				$t.find('.col-one span').remove();
			}
			else{
				$t.addClass('hover');	
				$t.find('.col-one').append('<span> Edit</span>');
			}

		}
		
	});
	
	return SearchUIHotelsDetailTabsView;
});
	
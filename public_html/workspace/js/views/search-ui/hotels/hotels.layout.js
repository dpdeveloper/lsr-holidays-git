/* @filename views/search-ui/hotels/hotels.layout.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent','reqres',
	'tpl!views/search-ui/templates/hotels.layout.tpl.html',
	'views/search-ui/search-ui.pane.layout',
	'views/search-ui/hotels/hotels.browse.view',
	'views/search-ui/hotels/detail/hotels.detail.layout'
	
], function(	$,_,Backbone,Marionette,vent, reqres,
				SearchUIHotelsLayoutTemplate,
				SearchUIPaneLayout,
				SearchUIHotelsBrowseView,
				SearchUIHotelsDetailLayout
){
	"use strict";

	var SeachUIHotelsLayout = Backbone.Marionette.Layout.extend(
	/**@lends SearchUIHotelsLayout */
	{
		template: SearchUIHotelsLayoutTemplate,
		
		regions: {
			browse: '.hotels-browse',
			detail: '.hotels-detail'
		},
		
		_browseView: null,
		_detailsPaneView: null,
		
		initialize: function(){
			this.listenTo(vent,'search:hotel:selected',this.handleHotelSelected);
			
		},
		
		onShow: function(){
			
			this._browseView = new SearchUIPaneLayout({
				subView: new SearchUIHotelsBrowseView({collection: reqres.request('search:get:hotel:results')}),
				showByDefault: true
			});
			this._detailsPaneView = new SearchUIPaneLayout({subView: new SearchUIHotelsDetailLayout()});
			
			this.browse.show(this._browseView);
			this.detail.show(this._detailsPaneView);
			
		},
		
		handleHotelSelected: function(){
			if(this._detailsPaneView === null || !this._detailsPaneView.isStateVisible()){
				this._detailsPaneView = new SearchUIPaneLayout({subView: new SearchUIHotelsDetailLayout()});
				this.detail.show(this._detailsPaneView);
			}
		}
		
	});
	
	return SeachUIHotelsLayout;
});
	
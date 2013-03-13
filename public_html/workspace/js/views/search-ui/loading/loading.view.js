/* @filename views/search-ui/loading/loading.view.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/search-ui.loading.view.tpl.html'
	
], function($,_,Backbone,Marionette,vent,
			SearchUILoadingViewTemplate
			){
	"use strict";
				
	var SearchUILoadingView = Backbone.Marionette.ItemView.extend({
		template: SearchUILoadingViewTemplate,
		
		attributes:{
			'class': 'search-ui-loading',
		},
		
		_isClosing: null,
		
		initialize: function(){
			
			this._isClosing = false;
			
			this.listenTo($(window),'resize',this.resize);
			this.listenTo(vent,'search:resize',this.resize);
		},
		
		
		
		onShow: function(){
			this.resize();
			this.$el.hide().show('blind',{direction: 'vertical'},700);
		},
		
		resize: function(){
			if(this.$el.length > 0 && !this._isClosing){
				
				
				var pageHeight = $('body').height() - this.$el.height();
				var windowHeight = $(window).height();
				var minHeight = 180;
				
				var h = minHeight;
				
				if(windowHeight - pageHeight >= minHeight){
					h = windowHeight - pageHeight;
				}
			
				this.$el.height(h);
			}
		},
		
		closeAnimated: function(callback){
			var self = this;
			this._isClosing = true;
		
			this.$el.stop(true).animate({height: '0px'},700, 'swing', function(){
				if(callback){
					callback();
				}
				self.close();
			});
		}
		
	});
	
	return SearchUILoadingView;
});
	
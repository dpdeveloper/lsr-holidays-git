/* @filename views/search-ui/search-ui.pane.view
 *
 * A 'pane' for the search ui.
 * It handles a subview and handles 'animation' and parallax (coming soon) effects 
 *
 * David Anderson 2012
 *
*/

define([
	'libs/jquery-ui','underscore','backbone','marionette','vent',
	
	'tpl!views/search-ui/templates/search-ui.pane.layout.tpl.html',
	
], function($,_,Backbone,Marionette,vent,
			SearchUIPaneTemplate
			){
	"use strict";
	
	var SearchUIPaneLayout = Backbone.Marionette.Layout.extend({
		
		template: SearchUIPaneTemplate,
		tagName: 'div',
		attributes:{
			'class': 'search-ui-pane',
		},
		regions: {
			inner: '.search-ui-pane-inner',
		},
		
		_subView: null,
		
		_state: -1,
		_startingState: 0,
		_animated: true,
		
		STATES: {
			NULL: -1,
			HIDDEN: 0,
			VISIBLE: 1,
			ANIMATING: 2,
		},
		
		initialize: function(options){
			/*
				options.subView (required)
				options.showByDefault (optional - defaults to false)
				options.animated
			*/
			this._state = this.STATES.NULL;
			if(options.subView){
				this._subView = options.subView;
			}
			if(options.showByDefault && options.showByDefault == true){
				this._startingState = this.STATES.VISIBLE;
			}
			else{
				this._startingState = this.STATES.HIDDEN;
			}
			
			if(options.animated == false){
				this._animated = false;
			}
				
		},
		
		getState: function(){
			return this._state;
		},
		
		isStateVisible: function(){
			return this._state == this.STATES.VISIBLE;
		},

		
		onShow: function(){			
			var self = this;
			
			this._state = this.STATES.HIDDEN;
			
			if(this._startingState == this.STATES.VISIBLE || this._animated == false){
				this.inner.show(this._subView);
				this._state = this.STATES.VISIBLE;
				vent.trigger('search:resize');
			}
			else{
				this.$el.show();
				this.inner.show(this._subView);	
				this.$el.hide();
				
				this._state = this.STATES.ANIMATING;
				this.$el.stop(true).show('blind',{},700, function(){
					self._state = self.STATES.VISIBLE;
					vent.trigger('search:resize');
				});		
			}
		},

		
		closeAnimated: function(){
			var self = this;
			
			if(this._state != this.STATES.NULL){
				
				if(this._animated){
					this._state = this.STATES.ANIMATING;
					this.$el.stop(true).hide('blind',{},700, function(){
						
						self._state = self.STATES.HIDDEN;
						vent.trigger('search:resize');
						self.inner.close();
						self.close();
					});	
				}
				else{
					this.$el.hide();
					
					this._state = this.STATES.HIDDEN;
					vent.trigger('search:resize');
					self.inner.close();
					self.close();
					
				}	
			}
			this._state = this.STATES.NULL;		
		},
		
		onClose: function(){
			if(this._subView){this._subView.close();}	
		},

	});
	
	return SearchUIPaneLayout;
});
	
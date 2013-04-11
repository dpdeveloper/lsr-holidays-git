/* @filename views/search-ui/travellers/travellers.tac.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/travellers.tac.view.tpl.html',
	'models/booking'
	
], function($,_,Backbone,Marionette,vent,
			Template,
			Booking
			){
	"use strict";
	
	/** @class Travellers TAC View */
	var TravellersTACView = Backbone.Marionette.ItemView.extend(
	/** @lends TravellersTACView# */
	{
		initialize: function(options){
			options = options || {};
			this._status = this._lang.checkbox;
		},
		
		_status: null,
		
		ui: {
			items: '.tac-item',
			status: 'a.tac-submit, .tac-inner',
			msg: '.tac-msg',
			submit: 'a.tac-submit'
		},
		
		events: {
			'click .tac-item': 'toggleCheckbox',
			'click .tac-item input': 'refreshStatus',
			'click a.tac-submit': 'handleSubmit'
		},
		
		_lang: {
			form: 'Please complete the forms above',
			checkbox: 'Please agree to our terms and conditions',
			go: 'Start your holiday today!'
		},
		
		model: new Booking(),
		template: Template,
		tagName: 'div',
		attributes: {'class' : 'travellers-tac-view'},
		
		/**
			Serialize data for the view
		*/
		serializeData: function(){
			var data = this.model.get('shortlistRequest').toJSON();
			data.status = this._status;
			return data;
		},
		
		/**
		
			onRender callback
			
		*/
		onRender: function(){
			this.refreshStatus();
		},
		
		/**
			Update the message in the UI
		*/
		updateMessage: function(){
			this.ui.msg.text(this._status);
		},
		
		/**
			Handle a click on an item/checkbox and update the checkbox
		*/
		toggleCheckbox: function(ev){
			ev.preventDefault();
			
			var $input = $(ev.currentTarget);
			
			if($input.prop('tagName')!=='input'){
				$input = $input.find('input');
				
				if($input.is(':checked')){
					$input.prop('checked',false);	
				}
				else{
					$input.prop('checked',true);	
				}
			}
			
			this.refreshStatus();
		},
		
		/**
			Review the checkbox statuses and update the ui
		*/
		refreshStatus: function(){
		
			var checkedCount = 0;
		
			this.ui.items.each(function(index,elem){
				if($(elem).find('input').is(':checked')){
					$(elem).addClass('valid').removeClass('invalid');
					checkedCount ++;
				}
				else{
					$(elem).addClass('invalid').removeClass('valid');	
				}
			});
			
			if(checkedCount >= 2){
				this._status = this._lang.go;
				this.ui.status.addClass('valid').removeClass('invalid');
			}
			else{
				this._status = this._lang.checkbox;		
				this.ui.status.addClass('invalid').removeClass('valid');
			}
			this.updateMessage();
		},
		
		/**
			Handle the submit button being clicked
		*/
		handleSubmit: function(ev){
			ev.preventDefault();
			
			if(this._status === this._lang.go){
				vent.trigger('search:travellers:complete');	
			}
		}
		
		
		
	});
	
	return TravellersTACView;
});
	
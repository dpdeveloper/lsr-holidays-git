/* @filename views/search-ui/travellers/travellers.edit.item.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent','jquery-ui','libs/backbone.stickit.min',
	'tpl!views/search-ui/templates/travellers.edit.item.view.tpl.html',
	'models/travellers-info',
	'chosen'
], function($,_,Backbone,Marionette,vent,jqueryUI,stickit,
			Template,
			TravellersInfo,
			chosen
			){
	"use strict";

	var TravellersEditItemView = Backbone.Marionette.ItemView.extend(
	/** @lends TravellersEditItemView# */
	{
		template: Template,
		
		tagName: 'div',
		attributes: {'class': 'search-ui-travellers-edit-item-view'},
		
		
		
		bindings: {
			'select.field-title': {observe: 'title', afterUpdate: 'toggleAllPlaceholdersStyle'},
			'select.field-gender': {observe: 'gender', afterUpdate: 'toggleAllPlaceholdersStyle'},
			'.field-first-name': {observe: 'firstName', afterUpdate: 'toggleAllPlaceholdersStyle'},
			'.field-last-name': {observe: 'surname', afterUpdate: 'toggleAllPlaceholdersStyle'},
			'.field-middle-name': {observe: 'middleName', afterUpdate: 'toggleAllPlaceholdersStyle'},
			'.field-dob': {observe: 'dob', afterUpdate: 'toggleAllPlaceholdersStyle'},
			'.field-nation': {observe: 'nationality', afterUpdate: 'toggleAllPlaceholdersStyle'},
			'.field-passport-no': {observe: 'passengerId', afterUpdate: 'toggleAllPlaceholdersStyle'},
			'.field-passport-issue': {observe: 'idIssue', afterUpdate: 'toggleAllPlaceholdersStyle'},
			'.field-passport-expiry': {observe: 'idExpiry', afterUpdate: 'toggleAllPlaceholdersStyle'}
		},
		
		_lang:{
			'field-first-name': 'First Name',
			'field-last-name': 'Surname',
			'field-middle-name': 'Middle Name',
			'field-dob': 'DOB',
			'field-nation': 'Nationality',
			'field-passport-no': 'Passport No',
			'field-passport-issue': 'Issue',
			'field-passport-expiry': 'Expiry'
		},
		
		ui: {
			bottom: '.body-bottom'
		},
		
		events: {
			'focus input': 'onInputFocus',
			'blur input': 'onInputBlur'
		},
		
		/**
			Constructor
			
			@class View to allow the editing of a traveller object
			
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			if('model' in options && options.model !== null){
				this.model = options.model;
			}
			else{
				this.model = new TravellersInfo();
			}
		},
		
		
		/**
			Render Callback
			
			Populates the fields with either data from the model or placeholders
		*/
		onRender: function(){
			var self = this;
			
			//populate values from the model, if they exist
			/*_.each(this._mappings, function(item, index){
				var data = self.model.get(item);
				if(typeof data !== 'undefined' && data !== ''){
					self.$el.find('.'+index).val(data);
				}
			});*/
			this.stickit();
			
			//populate any unfilled inputs
			this.$el.find('input.field').each(function(index, item){
				$(item).prop({placeholder: self._lang[$(item).attr('name')]});
				if($(item).val().length < 1){
					$(item).val(self._lang[$(item).attr('name')]);
					$(item).addClass('placeholder');
				}
			});
			
			//this.ui.bottom.hide();
		},
		
		/**
			onShow Callback
			Used to initialize date pickers
		*/
		onShow: function(){
			
			var self = this;
			
			this.$el.find('.field-dob').datepicker({
				changeMonth: true,
				changeYear: true,
				constrainInput: false,
				dateFormat: 'dd/mm/yy',
				numberOfMonths: 1,
				yearRange: 'c-120:c',
				onSelect: self.toggleAllPlaceholdersStyle 
			});
			
			this.$el.find('.field-date').datepicker({
				changeMonth: true,
				changeYear: true,
				constrainInput: false,
				dateFormat: 'dd/mm/yy',
				numberOfMonths: 1,
				yearRange: 'c-15:c+15',
				onSelect: self.toggleAllPlaceholdersStyle 
			});
			
			//sort the widths out
			this.$el.find('select').each(function(index, elem){
				$(elem).width($(elem).parent().width());
			});
			
			this.$el.find('select.field-gender').chosen();
			this.$el.find('select.field-title').chosen();
			
			//repeat the onRender code in case any plugins have made a meal of things
			this.onRender();
		},
		
		/**
			
			Used when the DOM is updated by bindings to make sure placeholders are updated accordingly
			
		*/
		toggleAllPlaceholdersStyle: function(){
			$('input').each(function(index,item){
				var $i = $(item);
				var v = $i.val();
				var p = $i.prop('placeholder');
				
				if(v === '' || v === p){
					$i.val(p);
					$i.addClass('placeholder');
				}
				else{
					$i.removeClass('placeholder');
				}
			});
		},
		
		/**
			Shows/hides the placeholder for an input if it is empty or not
			@param {jQuery Object} element The DOM element
			@param {Boolean} focus Indicates that the element is focussed
		*/
		togglePlaceholder: function(element, focus){
			if(focus){
				if($(element).val() === $(element).prop('placeholder')){
					$(element).val('');
				}
				$(element).removeClass('placeholder');
				
			}
			else if($(element).val().length < 1){
				$(element).val(this._lang[$(element).attr('name')]);
				$(element).addClass('placeholder');
			}
		},
		
		/**
			Handler for when an input blurs
			Saves the data into the model
			
			@param {jQuery Event} ev
		*/
		onInputBlur: function(ev){
			this.togglePlaceholder($(ev.currentTarget), false);
		},
		
		/**
			Handler for when an input focus
			Does placeholder replacing if needed
			
			@param {jQuery Event} ev
		*/
		onInputFocus: function(ev){
			this.togglePlaceholder($(ev.currentTarget), true);
		}

	});
	
	return TravellersEditItemView;
});
	
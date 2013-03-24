/* @filename views/search-ui/travellers/travellers.edit.item.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent','jquery-ui',
	'tpl!views/search-ui/templates/travellers.edit.item.view.tpl.html',
	'models/travellers-info',
	'libs/select2.min'
], function($,_,Backbone,Marionette,vent,jqueryUI,
			Template,
			TravellersInfo,
			Select2
			){
	"use strict";

	var TravellersEditItemView = Backbone.Marionette.ItemView.extend(
	/** @lends TravellersEditItemView# */
	{
		template: Template,
		
		tagName: 'div',
		attributes: {'class': 'search-ui-travellers-edit-item-view'},
		
		
		
		_mappings: {
			'field-title': 'title',
			'field-gender': 'gender',
			'field-first-name': 'firstName',
			'field-last-name': 'surname',
			'field-middle-name': 'middleName',
			'field-dob': 'dob',
			'field-nation': 'nationality',
			'field-passport-no': 'passengerId',
			'field-passport-issue': 'idIssue',
			'field-passport-expiry': 'idExpiry'
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
			_.each(this._mappings, function(item, index){
				var data = self.model.get(item);
				if(typeof data !== 'undefined' && data !== ''){
					self.$el.find('.'+index).val(data);
				}
			});
			
			//populate any unfilled inputs
			this.$el.find('input.field').each(function(index, item){
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
		
			this.$el.find('.field-dob').datepicker({
				changeMonth: true,
				changeYear: true,
				constrainInput: false,
				dateFormat: 'dd/mm/yy',
				numberOfMonths: 1,
				yearRange: 'c-120:c'
			});
			
			this.$el.find('.field-date').datepicker({
				changeMonth: true,
				changeYear: true,
				constrainInput: false,
				dateFormat: 'dd/mm/yy',
				numberOfMonths: 1,
				yearRange: 'c-15:c+15'
			});
			
			this.$el.find('select').each(function(index, elem){
				$(elem).width($(elem).parent().width());
			});
			this.$el.find('select.field-gender').select2({
				width: 'element',
				placeholder: 'Gender'
			});
			this.$el.find('select.field-title').select2({
				width: 'element',
				placeholder: 'Title'
			});
			
			//repeat the onRender code in case any plugins have made a meal of things
			this.onRender();
		},
		
		/**
			Saves the Form Data into the model
		*/
		saveModel: function(){
			//the name needs parsing
			this.model.parseName(this.$el.find('.field-name').val());
			
			var self = this;
			
			//use the mappings to save the rest of the data
			_.each(this._mappings,function(elem,index){
				self.model.set(elem,self.$el.find('.'+index).val());
			});
			
			vent.trigger('search:travellers:edit', this);
		},
		
		
		/**
			Shows/hides the placeholder for an input if it is empty or not
			@param {jQuery Object} element The DOM element
			@param {Boolean} focus Indicates that the element is focussed
		*/
		togglePlaceholder: function(element, focus){
			if(focus){
				$(element).removeClass('placeholder');
				$(element).val('');
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
			this.saveModel();
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
	
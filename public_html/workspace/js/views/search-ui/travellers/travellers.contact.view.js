/* @filename views/search-ui/travellers/travellers.contact.view
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/search-ui/templates/travellers.contact.view.tpl.html',
	'models/travellers-info'
	
], function($,_,Backbone,Marionette,vent,
			TravellersContactViewTemplate,
			TravellersInfo
			){
	"use strict";
	
	var TravellersContactView = Backbone.Marionette.ItemView.extend(
	/** @lends TravellersContactView# */
	{
		template: TravellersContactViewTemplate,
		tagName: 'div',
		attributes: {
			'class': 'search-ui-travellers-contact-view'
		},
		
		_lang: {
			'field-name': 'Name',
			'field-email': 'Email',
			'field-phone': 'Phone',
			'field-address-1': 'House / Street',
			'field-address-2': 'Area',
			'field-address-city': 'City',
			'field-address-postcode': 'Postcode',
			'field-address-country': 'Country'
		},
		
		_mappings: {
			'field-email': 'email',
			'field-phone': 'phone',
			'field-address-1': 'address1',
			'field-address-2': 'address2',
			'field-address-city': 'addressCity',
			'field-address-postcode': 'addressPostcode',
			'field-address-country': 'addressCountry'
		},
		
		events: {
			'focus input': 'onInputFocus',
			'blur input': 'onInputBlur'
		},
		
		/**
			Constructor
			
			@class View to edit a travellers contact details
			
			@constructs
			@param {Object} [options] Options hash
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
			
			//build the name from multiple params
			var fName = this.model.get('firstName');
			var sName = this.model.get('surname');
			
			var name = '';
			if(fName !== null){name=fName+' ';}
			if(sName !== null){name=name+sName;}
			name=$.trim(name);
			
			if(name.length > 0){
				self.$el.find('.field-name').val(name);
			}
			
			this.$el.find('input').each(function(index, item){
				if($(item).val().length < 1){
					$(item).val(self._lang[$(item).attr('name')]);
					$(item).addClass('placeholder');
				}
			});
		},
		
		/**
			Saves the Form Data into the model
		*/
		saveModel: function(){
			//the name needs parsing
			this.model.parseName(this.$el.find('.field-name').val());
			
			var self = this;
			var data = {}
			
			//use the mappings to save the rest of the data
			_.each(this._mappings,function(elem,index){
				data[elem] = self.$el.find('.'+index).val();
			});
			
			this.model.set(data);
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
	
	return TravellersContactView;
});
	
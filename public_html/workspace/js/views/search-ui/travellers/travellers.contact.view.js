/* @filename views/search-ui/travellers/travellers.contact.view
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent','libs/backbone.stickit.min',
	'tpl!views/search-ui/templates/travellers.contact.view.tpl.html',
	'models/travellers-info'
	
], function($,_,Backbone,Marionette,vent, stickIt,
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
		
		bindings: {
			'.field-name': {
				observe: ['firstName', 'surname', 'middleName'],
				update: function($el,val,model,options){
					$el.val(model.getFullName());
				},
				afterUpdate: 'toggleAllPlaceholdersStyle'
				
			},
			'.field-email': 'email',
			'.field-phone': 'phone',
			'.field-address-1': 'address1',
			'.field-address-2': 'address2',
			'.field-address-city': 'addressCity',
			'.field-address-postcode': 'addressPostcode',
			'.field-address-country': 'addressCountry'
		},
		
		events: {
			'focus input': 'onInputFocus',
			'blur input': 'onInputBlur',
			
			//deal with one stickit limitation
			'change .field-name': 'saveModel',
			'keyup .field-name': 'saveModel',
			'paste .field-name': 'saveModel',
			'cut .field-name': 'saveModel'
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
			/*
			_.each(this._mappings, function(item, index){
				var data = self.model.get(item);
				if(typeof data !== 'undefined' && data !== ''){
					self.$el.find('.'+index).val(data);
				}
			});*/
			this.stickit();
			
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
				
				$(item).prop({ placeholder: self._lang[$(item).attr('name')]});
				
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
	
	return TravellersContactView;
});
	
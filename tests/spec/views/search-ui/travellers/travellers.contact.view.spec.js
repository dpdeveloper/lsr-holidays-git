describe("Travellers Contact View", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'views/search-ui/travellers/travellers.contact.view'
			], function(Backbone, Marionette, TravellersContactView) {

			that.view = new TravellersContactView();
			
			that.region = new Backbone.Marionette.Region({el: '#sandbox'});
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {
		this.region.close();
		$('#sandbox').html('');
		$('#sandbox').hide();
	});
	
	
	/* Default Spec Code */
	describe('Initializes', function(){
		it('Is Not Null', function(){
			expect(this.view).not.toBeNull();
		});
		
		it('Add to DOM', function(){
			this.region.show(this.view);
			expect(this.view.$el).toBeVisible();
		});
	});
	
	describe('Data Populates', function(){
		it('Fills Placeholders by Default', function(){
			this.region.show(this.view);
			var that = this;
			this.view.$el.find('input').each(function(index, item){
				expect($(item).val()).toEqual(
					that.view._lang[$(item).attr('name')]
				);
			});
		});
		
		it('Fills in data from the model', function(){
			this.view.model.set({
				firstName: 'John',
				surname: 'Smith',
				email: 'jon@smith.com',
				phone: '123',
				address1: '1',
				address2: '2',
				addressCity: 'City',
				addressPostcode: 'ABC123',
				addressCountry: 'UK'
			});
			this.region.show(this.view);
			
			expect($('.field-name').val()).toEqual('John Smith');
			expect($('.field-email').val()).toEqual('jon@smith.com');
			expect($('.field-phone').val()).toEqual('123');
			expect($('.field-address-1').val()).toEqual('1');
			expect($('.field-address-2').val()).toEqual('2');
			expect($('.field-address-city').val()).toEqual('City');
			expect($('.field-address-postcode').val()).toEqual('ABC123');
			expect($('.field-address-country').val()).toEqual('UK');
		});
		
		it('Saves Data into the model', function(){
			this.region.show(this.view);
			
			$('.field-name').val('John Smith');
			$('.field-email').val('a');
			$('.field-phone').val('b');
			$('.field-address-1').val('c');
			$('.field-address-2').val('d');
			$('.field-address-city').val('e');
			$('.field-address-postcode').val('f');
			$('.field-address-country').val('g');
			
			this.view.saveModel();
			
			var m = this.view.model.toJSON();
			
			expect(m.firstName).toEqual('John');
			expect(m.surname).toEqual('Smith');
			expect(m.email).toEqual('a');
			expect(m.phone).toEqual('b');
			expect(m.address1).toEqual('c');
			expect(m.address2).toEqual('d');
			expect(m.addressCity).toEqual('e');
			expect(m.addressPostcode).toEqual('f');
			expect(m.addressCountry).toEqual('g');
		});
	});
	
	describe('Events', function(){
		it('saveModel called on blurring', function(){
			
			this.region.show(this.view);
			spyOn(this.view, 'saveModel');
			spyOn(this.view, 'togglePlaceholder');
			
			this.view.$el.find('input').first().trigger('blur');
			
			expect(this.view.saveModel).toHaveBeenCalled();
			expect(this.view.togglePlaceholder).toHaveBeenCalled();
		});
		it('togglePlaceholder should hide the label on focus', function(){
			this.region.show(this.view);
			
			var $input = this.view.$el.find('.field-name');
			
			$input.trigger('focus');
			expect($input.val()).toEqual('');
			
			$input.trigger('blur');
			expect($input.val()).toEqual(this.view._lang['field-name']);
			
			$input.trigger('focus');
			$input.val('J');
			$input.trigger('blur');
			expect($input.val()).toEqual('J');
			
		});
	});

});

describe("TravellersEditItemView", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette','vent',
			'views/search-ui/travellers/travellers.edit.item.view',
			'models/travellers-info'
			], function(Backbone, Marionette, vent, TravellersEditItemView, TravellersInfo) {

			that.view = new TravellersEditItemView();
			that.TravellersInfo = TravellersInfo;
			that.vent = vent;
			
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
	
	describe('Initializes', function(){
		it('Is Not Null', function(){
			expect(this.view).not.toBeNull();
		});
		it('Adds to DOM', function(){
			this.region.show(this.view);
			expect(this.view.$el).toBeVisible();
		});
	});
	
	
	describe('Data Populates', function(){
		it('Fills Placeholders by Default', function(){
			this.region.show(this.view);
			var that = this;
			this.view.$el.find('input.field').each(function(index, item){
				var n = that.view._lang[$(item).attr('name')];
				expect($(item).val()).toEqual(n);
				
			});
		});
		
		it('Fills in data from the model', function(){
			this.view.model.set({
				title: 'Mr',
				gender: 'male',
				firstName: 'John',
				surname: 'Smith',
				middleName: 'Ken',
				dob: '22/01/1980',
				nationality: 'a',
				passengerId: '123',
				idIssue: '10/10/2010',
				idExpiry: '10/10/2020'
			});
			this.region.show(this.view);
			
			expect($('.field-title').val()).toEqual('Mr');
			expect($('.field-gender').val()).toEqual('male');
			expect($('.field-first-name').val()).toEqual('John');
			expect($('.field-last-name').val()).toEqual('Smith');
			expect($('.field-middle-name').val()).toEqual('Ken');
			expect($('.field-dob').val()).toEqual('22/01/1980');
			expect($('.field-nation').val()).toEqual('a');
			expect($('.field-passport-no').val()).toEqual('123');
			expect($('.field-passport-issue').val()).toEqual('10/10/2010');
			expect($('.field-passport-expiry').val()).toEqual('10/10/2020');
			

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
		it('Event should be fired on save model', function(){
			this.region.show(this.view);
			var fired = false;
			
			this.vent.on('search:travellers:edit', function(val){
				fired = true;
			});
			
			this.view.$el.find('input').first().trigger('blur');
			
			expect(fired).toBeTruthy();
		});
		it('togglePlaceholder should hide the label on focus', function(){
			this.region.show(this.view);
			
			var $input = this.view.$el.find('.field-first-name');
			
			$input.trigger('focus');
			expect($input.val()).toEqual('');
			
			$input.trigger('blur');
			expect($input.val()).toEqual(this.view._lang['field-first-name']);
			
			$input.trigger('focus');
			$input.val('J');
			$input.trigger('blur');
			expect($input.val()).toEqual('J');
			
		});
	});
	
});

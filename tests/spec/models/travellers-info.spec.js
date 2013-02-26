describe("Travellers Info", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'models/travellers-info'
			], function(TravellersInfo) {
			that.model = new TravellersInfo();
			
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {
		$('#sandbox').html('');
		$('#sandbox').hide();
	});
	
	
	/* Default Spec Code */
	describe('Initializes', function(){
		it('Is Not Null', function(){
			expect(this.model).not.toBeNull();
		});
	});
	
	describe('ParseName', function(){
		it('Converts a single name into a first name', function(){
			this.model.parseName('John');
			expect(this.model.get('firstName')).toEqual('John');
		});
		it('Converts a string with a space to first name and surname', function(){
			this.model.parseName('John Smith');
			expect(this.model.get('firstName')).toEqual('John');
			expect(this.model.get('surname')).toEqual('Smith');
			
		});
		it('converts a string with two spaces to a middle name', function(){
			this.model.parseName('John William Smith');
			expect(this.model.get('firstName')).toEqual('John');
			expect(this.model.get('surname')).toEqual('Smith');
			expect(this.model.get('middleName')).toEqual('William');
			expect(this.model.get('middleInitials')).toEqual('W');
			
		});
		it('converts a string with more than two space to a middle names and initals', function(){
			this.model.parseName('John William Edward Smith');
			expect(this.model.get('firstName')).toEqual('John');
			expect(this.model.get('surname')).toEqual('Smith');
			expect(this.model.get('middleName')).toEqual('William Edward');
			expect(this.model.get('middleInitials')).toEqual('W E');
			
		});
	});
	
});

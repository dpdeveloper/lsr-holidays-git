describe("Multicom Room", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'models/multicom/multicom-room'
			], function(MulticomRoom) {
			that.model = new MulticomRoom();
			
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {
		$('#sandbox').html('');
		$('#sandbox').hide();
	});
	
	
	/* Default Spec Code */
	describe('Initializes & Get/Set', function(){
		it('Is a Valid Object', function(){
			expect(this.model).not.toBeNull();
		});
		
		it('Can Set Occupancy', function(){
			
			this.model.setOccupancy(2,0,0);
			
			var o = this.model.get('occupancy');
			
			expect(o.adults).toEqual(2);
			expect(o.children).toEqual(0);
			expect(o.infants).toEqual(0);
		});
	});
	
});
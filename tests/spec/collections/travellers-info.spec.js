describe("TravellersInfoCollection", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'collections/travellers-info',
			'models/travellers-info'
			], function(TravellersInfoCollection, TravellersInfo) {
			that.collection = new TravellersInfoCollection();
			that.TravellersInfo = TravellersInfo;
			
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
			expect(this.collection).not.toBeNull();
		});
	});
	
	describe('GetLeadPassenger', function(){
		it('returns null when no lead passenger', function(){
			expect(this.collection.getLeadTraveller()).toBeNull();
		});
		
		it('returns the lead passenger', function(){
			this.collection.add(new this.TravellersInfo({isLeadTraveller: false, passengerNo: 1}));
			this.collection.add(new this.TravellersInfo({isLeadTraveller: true, passengerNo: 2}));
			
			var m = this.collection.getLeadTraveller();
			expect(m.get('passengerNo')).toEqual(2);
			
		});
		
	});
	
});

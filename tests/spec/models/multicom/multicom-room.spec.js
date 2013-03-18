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
			
			that.sampleData = {"#name":"AccommodationUnit","@Name":"Double Standard","RoomRate":{"@SuppliersBoardCode":"2","@RateCode":"ZeM1fTkyGZdQsNOwOCuL1eBtoS4L78erQSJwMtC6mU6fFpF1ZrowUE/dzdqm7J50kFHOUm+xno0S6d1QY4qU9Hsl+tmIdz90pmusjr4X4oiJ71+cZVCpLbB2ynJHJNDnzg/uqkuQizb3tP6or5lQ4+lz/pVTpMTsBG07dD609RG6BeUTHo/8PaopPnaOYsQUMCqfOt0QfWE=","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130401","@StartDate":"20130329","#text":"","@Amount":"102.84","@BoardBasis":"RO"},"@AUID":"0|2 A","@MaxOccupancy":"2","#text":"","@QuantityAvailable":"1","@Code":"0|2 A","@MinOccupancy":"2"};
			
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
		
		it('Can Parse data from multicom API Format', function(){
			this.model.set(this.model.parse(this.sampleData));
			
			var m = this.model.toJSON();
			
			
			expect(m.name).toEqual("Double Standard");
			expect(m.code).toEqual('0|2 A');
			expect(m.maxOccupancy).toEqual(2);
			expect(m.minOccupancy).toEqual(2);
			expect(m.maxExtraChildren).toEqual(0);
			expect(m.maxExtraInfants).toEqual(0);
			expect(m.quantityAvailable).toEqual(1);
			
			expect(m.chosenRoomRate).toEqual('ZeM1fTkyGZdQsNOwOCuL1eBtoS4L78erQSJwMtC6mU6fFpF1ZrowUE/dzdqm7J50kFHOUm+xno0S6d1QY4qU9Hsl+tmIdz90pmusjr4X4oiJ71+cZVCpLbB2ynJHJNDnzg/uqkuQizb3tP6or5lQ4+lz/pVTpMTsBG07dD609RG6BeUTHo/8PaopPnaOYsQUMCqfOt0QfWE=');
			
			expect(m.occupancy.adults).toEqual(2);
			expect(m.occupancy.children).toEqual(0);
			expect(m.occupancy.infants).toEqual(0);
			
			expect(m.roomRates[0].startDate).toEqual('20130329');
			expect(m.roomRates[0].endDate).toEqual('20130401');
			expect(m.roomRates[0].rateCode).toEqual('ZeM1fTkyGZdQsNOwOCuL1eBtoS4L78erQSJwMtC6mU6fFpF1ZrowUE/dzdqm7J50kFHOUm+xno0S6d1QY4qU9Hsl+tmIdz90pmusjr4X4oiJ71+cZVCpLbB2ynJHJNDnzg/uqkuQizb3tP6or5lQ4+lz/pVTpMTsBG07dD609RG6BeUTHo/8PaopPnaOYsQUMCqfOt0QfWE=');
			expect(m.roomRates[0].cost).toEqual(102.84);
			expect(m.roomRates[0].currency).toEqual('GBP');
			expect(m.roomRates[0].boardBasis).toEqual('RO');
			
			
			
		});
	});
	
});
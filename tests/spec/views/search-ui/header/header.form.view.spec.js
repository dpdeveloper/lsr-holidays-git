describe("Search UI Header Form View", function() {
	"use strict";
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').html('<div id="sandbox-inner"></div>');
		$('#sandbox').show();
		
		require([
			'views/search-ui/header/header.form.view',
			'backbone','marionette'
			], function(SearchUIHeaderFormView,Backbone,Marionette) {
			
			that.region = new Backbone.Marionette.Region({
				el: '#sandbox-inner'
			});
			that.view = new SearchUIHeaderFormView();
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {
		$('#sandbox').hide();
		$('#sandbox').html('');
		this.region.reset();
	});
	
	
	/* Default Spec Code */
	describe('Initialize and Add to DOM', function(){
		it('should initalize the model', function(){
			expect(this.view.model).toBeDefined();
		});
		
		it('should add to DOM on render', function(){
			this.region.show(this.view);
			
			expect($('#search-ui-header-form')).toBeVisible();
		});
		
		it('should remove from dom on close', function(){
			this.region.show(this.view);
			this.view.close();
			expect($('#search-ui-header-form')).not.toExist();
		});
	});
	
	describe('sets the form values from the trip model', function(){
		it('Sets the destination', function(){
			this.view.model.set({'destination':'miami'});
			this.region.show(this.view);
			expect($('#fields-destination').val()).toEqual('miami');
		});
		it('Sets the Arrival date', function(){
			this.view.model.set({'dateStart':'12/06/2013'});
			this.region.show(this.view);
			expect($('#fields-date-start').val()).toEqual('12/06/2013');
		});
		
		it('Sets the Number of Rooms', function(){
			this.view.model.set({'numRooms': 2});
			this.region.show(this.view);
			expect($('#fields-number-of-rooms')).toHaveValue('2');
		});
		
		it('Sets the Number of Nights', function(){
			this.view.model.set({'numNights': 2});
			this.region.show(this.view);
			expect($('#fields-number-of-nights')).toHaveValue('2');
		});
		
		it('Sets the Departure Airport', function(){
			this.view.model.set({'departingFrom': 'CDG'});
			this.region.show(this.view);
			expect($('#fields-departure-airport')).toHaveValue('CDG');
		});
		
		it('Sets the Flight Class', function(){
			this.view.model.set({'flightClass': 'first'});
			this.region.show(this.view);
			expect($('#fields-flight-class')).toHaveValue('first');
		});
		
		it('Sets the correct adults/infants/children', function(){
			
			var	a = '1,1,',
				c = '1,0,',
				i = '0,1,';
			
		
			this.view.model.set({
				'adultCsv': a,
				'childCsv': c,
				'infantCsv': i,
				'numRooms': 2
			});
			this.region.show(this.view);
			var obj = this.view.saveRoomOccupancy();
			
			expect(obj.adultCsv).toEqual(a);
			expect(obj.childCsv).toEqual(c);
			expect(obj.infantCsv).toEqual(i);
			
		});
		
		it('Hides the flights if in hotel mode', function(){
			this.view.model.setType(this.view.model.TRIP_TYPES.HOTEL);
			this.region.show(this.view);
			expect($('.flights-col')).toBeHidden();
		});
		
		
	});
	
});

describe("Search UI Controller", function() {
	
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
	
		require([
			'vent','reqres',
			'views/search-ui/search-ui.controller',
			'models/booking',
			'models/holiday-search',
			'models/multicom/multicom-flight',
			'models/symphony-hotel'
			], function(vent, reqres, SearchUIController, Booking, HolidaySearch, MulticomFlight, SymphonyHotel) {
			
			that.reqres = reqres;
			that.vent = vent;
			//that.App.start();
			that.controller = new SearchUIController({el: "#sandbox", testMode: true});
			that.holidaySearch = new HolidaySearch();
			that.booking = new Booking();
			
			that.MulticomFlight = MulticomFlight;
			that.SymphonyHotel = SymphonyHotel;
			
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {});
	
	
	describe('Setup and Binding', function(){
		it('listens to a search:new event and saves trip data from it', function(){
			
			this.holidaySearch.setType(this.holidaySearch.TRIP_TYPES.PACKAGE);
			this.vent.trigger('search:new',this.holidaySearch);
			
			expect(this.controller._booking.getSearch().get('tripType')).toEqual(this.holidaySearch.TRIP_TYPES.PACKAGE);
		});
	});
	
	describe('Can return data via a reqres object', function(){
		it('Returns a holiday booking from a search:get:booking request', function(){
			this.controller._booking._error = 'test';
			expect(this.reqres.request('search:get:booking')._error).toEqual('test');
		});
		it('Returns the hotel collection from a search:get:hotel:results', function(){
			this.controller._hotelCollection._test = 'test';
			expect(this.reqres.request('search:get:hotel:results')._test).toEqual('test');
		});
		it('Returns the flight collection from a search:get:flight:results', function(){
			this.controller._mcFlightCollection._test = 'test';
			expect(this.reqres.request('search:get:flight:results')._test).toEqual('test');
		});
		
		it('Returns the selected hotel from a search:get:hotel:selected', function(){
			
			this.controller._booking.set({selectedHotel: new this.SymphonyHotel({test: 'test'})});
			
			expect(this.reqres.request('search:get:hotel:selected').get('test')).toEqual('test');
		});
		it('Returns the selected flight from a search:get:flight:selected', function(){
		
			this.controller._booking.set({selectedFlight: new this.MulticomFlight({test: 'test'})});
			
			expect(this.reqres.request('search:get:flight:selected').get('test')).toEqual('test');
		});
	});
	
	/* Default Spec Code */
	/*
	describe('TEST', function(){
		it('SPEC', function(){
			expect(EXPECTATION).toEqual(true);
		});
	});
	*/
	

});

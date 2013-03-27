describe("Holiday Search Model", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'models/holiday-search'
			], function(HolidaySearch) {
			that.model = new HolidaySearch();
			
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
	
	describe('Trip Mode', function(){
		it('should default to package', function(){
			expect(this.model.get('tripType')).toEqual(this.model.TRIP_TYPES.PACKAGE);
		});
		
		it('should allow the mode to be changed', function(){
			this.model.setType(this.model.TRIP_TYPES.FLIGHT);
			expect(this.model.get('tripType')).toEqual(this.model.TRIP_TYPES.FLIGHT);
			
		});
		
		it('should not allow an invalid trip mode to be set', function(){
			this.model.setType("AA");
			expect(this.model.get('tripType')).toEqual(this.model.TRIP_TYPES.PACKAGE);
		});
	});
	
	describe('Get Flight Data', function(){
		it('should contain a oneWay param', function(){
			expect(this.model.getFlightTrip().oneWay).toBeDefined();
		});
		it('should contain a directFlights param', function(){
			expect(this.model.getFlightTrip().directFlights).toBeDefined();
		});
		it('should contain a numAdults param', function(){
			expect(this.model.getFlightTrip().numAdults).toBeDefined();
		});
		it('should contain a numChildren param', function(){
			expect(this.model.getFlightTrip().numChildren).toBeDefined();
		});
		it('should contain a numInfants param', function(){
			expect(this.model.getFlightTrip().numInfants).toBeDefined();
		});
		it('should contain a dateStart param', function(){
			expect(this.model.getFlightTrip().dateStart).toBeDefined();
		});
		it('should contain a departureAirport param', function(){
			expect(this.model.getFlightTrip().departureAirport).toBeDefined();
		});
		it('should contain a flightClass param', function(){
			expect(this.model.getFlightTrip().flightClass).toBeDefined();
		});
		it('should contain a numNights param', function(){
			expect(this.model.getFlightTrip().numNights).toBeDefined();
		});
		it('should contain (destinationAirport or destinationResortId or destinationCountry) param', function(){
			
			var a = typeof this.model.getFlightTrip().destinationAirport ==='undefined'? false: true;
			var b = typeof this.model.getFlightTrip().destinationResortId === 'undefined'? false: true;
			var c = typeof this.model.getFlightTrip().destinationCountry === 'undefined'? false: true;
			expect(a || b || c).toBeTruthy();
		});
		
		it('should calculate number of adults correctly', function(){
			this.model.set({'adultCsv': '1,2,3'});
			expect(this.model.getFlightTrip().numAdults).toEqual('6');
		});
		it('should calculate number of adults correctly if empty', function(){
			this.model.set({'adultCsv': ''});
			expect(this.model.getFlightTrip().numAdults).toEqual('0');
		});
		it('should calculate number of children correctly', function(){
			this.model.set({'childCsv': '2,2,4'});
			expect(this.model.getFlightTrip().numChildren).toEqual('8');
		});
		it('should calculate number of infants correctly', function(){
			this.model.set({'infantCsv': '1,3,2,3'});
			expect(this.model.getFlightTrip().numInfants).toEqual('9');
		});
		
		it('should get the correct occupancy after using setOccupancy function', function(){
			this.model.setOccupancy([
				{adults: 2, children: 0, infants: 2},
				{adults: 1, children: 1, infants:1}
			]);
			var m = this.model.getFlightTrip();
			
			expect(m.numAdults).toEqual('3');
			expect(m.numChildren).toEqual('1');
			expect(m.numInfants).toEqual('3');
			
		});
		
	});
	
	describe('convert a destination (name) to a airport code', function(){
		it('should convert las vegas to LAS', function(){
			this.model.set({'destination':'las vegas'});
			expect(this.model.getFlightTrip().destinationAirport).toEqual('LAS');
		});
		it('should convert new york to JFK', function(){
			this.model.set({'destination':'new york'});
			expect(this.model.getFlightTrip().destinationAirport).toEqual('JFK');
		});
		it('should convert dubai to DXB', function(){
			this.model.set({'destination':'dubai'});
			expect(this.model.getFlightTrip().destinationAirport).toEqual('DXB');
		});
		it('should convert los angeles to LAX', function(){
			this.model.set({'destination':'los angeles'});
			expect(this.model.getFlightTrip().destinationAirport).toEqual('LAX');
		});
		it('should convert miami to MIA', function(){
			this.model.set({'destination':'miami'});
			expect(this.model.getFlightTrip().destinationAirport).toEqual('MIA');
		});
		it('should error for paris', function(){
			this.model.set({'destination':'paris'});
			expect(this.model.getFlightTrip().destinationAirport).toBeNull();
		});
		
	});
	
	describe('set the occupancy', function(){
		it('sets the occupancy correctly', function(){
			this.model.setOccupancy([
				{adults: 1, children: 2, infants: 0},
				{adults: 2, children: 1, infants: 1},
				{adults: 3, children: 0, infants: 0}
			]);
			
			expect(this.model.get('numRooms')).toEqual(3);
			
			var occ = this.model.getRoomOccupancy();
			
			expect(occ[0].adults).toEqual('1');
			expect(occ[1].children).toEqual('1');
			expect(occ[2].infants).toEqual('0');
		});
		
		it('Add room adds a room correctly', function(){
			this.model.setOccupancy([
				{adults: 2, children: 2, infants: 0}
			]);
			this.model.addRoom({adults:3, children: 0, infants: 1});
			
			var occ = this.model.getRoomOccupancy();
			
			expect(occ.length).toEqual(2);
			expect(occ[0].adults).toEqual('2');
			expect(occ[1].adults).toEqual('3');
			expect(occ[1].children).toEqual('0');
			expect(occ[1].infants).toEqual('1');
		});
	});
	
	describe('Get an array of the travellers', function(){
		it('returns an array of travellers and types', function(){
			this.model.setOccupancy([
				{adults: 1, children: 2, infants: 0},
				{adults: 2, children: 1, infants: 1},
				{adults: 3, children: 0, infants: 0}
			]);
			
			var t =this.model.getTravellers();
			
			expect(t.length).toEqual(10);
			
			expect(t[0].type).toEqual('adult');
			expect(t[0].room).toEqual(0);
			expect(t[1].type).toEqual('child');
			expect(t[1].room).toEqual(0);
			expect(t[2].type).toEqual('child');
			expect(t[2].room).toEqual(0);
			
			expect(t[6].type).toEqual('infant');
			expect(t[6].room).toEqual(1);
			
			expect(t[9].type).toEqual('adult');
			expect(t[9].room).toEqual(2);
		});
	});
	
	describe('Date Parsing Functionality', function(){
		it('setDateFromCheckInOut should set the number of nights from two dates', function(){
			this.model.setDatesFromStartFinish('01/01/2012','10/01/2012');
			expect(this.model.get('numNights')).toEqual('9');
			expect(this.model.get('dateStart')).toEqual('01/01/2012');
		});
	});
	
	
});

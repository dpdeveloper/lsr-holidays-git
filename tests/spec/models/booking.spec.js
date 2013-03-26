describe("Booking Model", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'models/booking',
			'models/multicom/multicom-flight',
			'models/multicom/multicom-accommodation',
			'models/multicom/multicom-room',
			'collections/multicom-room'
			], function(Booking, MulticomFlight, MulticomAccommodation, MulticomRoom, MulticomRoomCollection) {
			that.model = new Booking();
			
			that.MulticomFlight = MulticomFlight;
			that.MulticomAccommodation = MulticomAccommodation;
			that.MulticomRoom = MulticomRoom;
			
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {
		$('#sandbox').html('');
		$('#sandbox').hide();
	});
	
	
	/* Default Spec Code */
	describe('Initializes & States', function(){
		it('Is Not Null', function(){
			expect(this.model).not.toBeNull();
		});
		
		it('Child Models are not null', function(){
			var m = this.model;
			
			expect(m.get('selectedHotel')).toBeDefined();
			expect(m.get('selectedFlight')).toBeDefined();
			expect(m.get('holidaySearch')).toBeDefined();
			expect(m.get('selectedRooms')).toBeDefined();
			expect(m.get('travellersInfo')).toBeDefined();
			
			expect(m.get('holidaySearch').get('destination')).toBeDefined();
			
			expect(m.get('selectedRooms').length).toBeDefined();
			expect(m.get('travellersInfo').length).toBeDefined();
			
		});
		
		it('Created Date should be today', function(){
			
			var d = new Date();
			var s = ('0'+d.getDay()).slice(-2) + '/' + ('0'+(d.getMonth() +1)).slice(-2) + '/' + d.getYear();
			expect(this.model.get('createdDate')).toEqual(s);
		});
		
		it('Default status is search', function(){
			expect(this.model.get('status')).toEqual(this.model.STATES.SEARCH);
		});
		
		it('Set status updates the status', function(){
			this.model._setStatus(this.model.STATES.BASKET);
			expect(this.model.get('status')).toEqual(this.model.STATES.BASKET);
		});
		
		it('SetStatus will reject the status if invalid', function(){
			this.model._setStatus("AA");
			expect(this.model.get('status')).toEqual(this.model.STATES.SEARCH);
		});
		
		it('getSearch returns the search object', function(){
		
			this.model.get('holidaySearch').set({destination: 'test'});
			var a = this.model.getSearch();
			
			expect(a.get('destination')).toEqual('test');
		});
		
	});
	
	describe('Validate the TravellersInfo', function(){
		it('Travellers Info should not be null', function(){
			expect(this.model.get('travellersInfo')).not.toBeNull();
			expect(this.model.get('travellersInfo').length).toEqual(0);
		});
		
		it('Should create the correct number of travellers for a search', function(){
			this.model.getSearch().setOccupancy([
				{adults: 3, children: 0, infants: 0},
				{adults: 1, children: 1, infants: 1}
			]);
			this.model._validateTravellersInfo();
			
			expect(this.model.get('travellersInfo').length).toEqual(6);
			expect(this.model.get('travellersInfo').at(0).get('isLeadTraveller')).toBeTruthy();
			expect(this.model.get('travellersInfo').at(1).get('isLeadTraveller')).toBeFalsy();
		});
	});
	
	
	describe('GetSummary', function(){
		it('Produces a summary from an object', function(){
			this.model.get('holidaySearch').set({
				dateStart: '14/08/2013',
				numNights: '5'
			});
			
			this.model.set({
				selectedHotel: new this.MulticomAccommodation({
					accommodationName: 'The Aria',
					rating: '4*'
				}),
				selectedFlight: new this.MulticomFlight({
					originAirport: 'LHR',
					originAirportName: 'Heathrow',
					destinationAirport: 'JFK',
					destinationAirportName: 'Kennedy',
					outboundCarrier: "Ryanair"
				})
			});
			this.model.get('selectedRooms').reset([
				new this.MulticomRoom({
					name: 'deluxe room'
				}),
				new this.MulticomRoom({
					name: 'standard room'
				})
			]);
			
			var v = this.model.getSummary();
			
			expect(v.date).toEqual('14/08/2013');
			expect(v.nights).toEqual('5');
			expect(v.hotel.accommodationName).toEqual('The Aria');
			expect(v.hotel.rating).toEqual('4*');
			expect(v.flight.originAirport).toEqual('LHR');
			expect(v.flight.originAirportName).toEqual('Heathrow');
			expect(v.flight.destinationAirport).toEqual('JFK');
			expect(v.flight.destinationAirportName).toEqual('Kennedy');
			expect(v.rooms[0].name).toEqual('deluxe room');
			expect(v.rooms[1].name).toEqual('standard room');
			
		});
	});
	
	describe('getCost', function(){
	
		it('returns a cost object from the data', function(){
			
			this.model.set({extraCost: 10});
			
			this.model.get('holidaySearch').set({
				dateStart: '14/08/2013',
				numNights: '5'
			});
			this.model.get('holidaySearch').setOccupancy([
				{adults: 2, children: 0, infants: 0},
				{adults: 1, children: 0, infants: 0}
			]);//3 people
			
			//add flight / hotel
			this.model.set({
				selectedHotel: new this.MulticomAccommodation({
					accommodationName: 'aria',
					cost: 100
				}),
				selectedFlight: new this.MulticomFlight({
					priceTotal: 400,
					priceOutboundBase: 200,
					priceReturnBase: 200
				})
			});
			//add rooms
			this.model.get('selectedRooms').add(
				new this.MulticomRoom({
					name: '',
					code: '',
					
					maxOccupancy: 1,
					minOccupancy: 1,
					
					roomRates: [{
						rateCode: 'A',
						cost: 200,
						currency: 'GBP'
					}],
					occupancy: null,
					chosenRoomRate: 'A'
				})
			);
			
			var c = this.model.getCost();
			
			expect(c.rooms).toEqual(200);
			expect(c.flight).toEqual(400);
			expect(c.extra).toEqual(10);
			expect(c.total).toEqual(610);
			
			//check per person cost
			var pp = this.model.getCostPerPerson();
			
			expect(pp.rooms).toEqual(66.67);
			expect(pp.flight).toEqual(133.33);
			expect(pp.extra).toEqual(3.33);
			expect(pp.total).toEqual(203.33);
						

		});
	});
	
});
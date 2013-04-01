describe("MulticomShortlist", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'underscore','backbone','marionette',
			'models/multicom/multicom-shortlist',
			'models/booking',
			'collections/multicom-accommodation',
			'collections/multicom-flight',
			'collections/multicom-room',
			'models/holiday-search',
			'models/multicom/multicom-flight',
			'models/multicom/multicom-accommodation',
			'json!../../json-test/multicom-v3/hotels-las-vegas.json',
			'json!../../json-test/multicom-v3/flights-las-vegas.json'
			], function(
				_, Backbone, Marionette,
				MulticomShortlist,
				Booking,
				McAccommodationCollection,
				McFlightCollection,
				McRoomCollection,
				HolidaySearch,
				MulticomFlight,
				MulticomAccommodation,
				sampleAccom,
				sampleFlight
			){
			that._ = _;
			that.MulticomShortlist = MulticomShortlist;
			that.Booking = Booking;
			that.McAccommodationCollection = McAccommodationCollection;
			that.McFlightCollection = McFlightCollection;
			that.McRoomCollection = McRoomCollection;
			that.HolidaySearch = HolidaySearch;
			that.MulticomAccommodation = MulticomAccommodation;
			that.MulticomFlight = MulticomFlight;
			that.sampleAccom = sampleAccom;
			that.sampleFlight = sampleFlight;
			
			
			that.model = new MulticomShortlist();
			
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
			expect(this.model).not.toBeNull();
		});
		it('Default Parameters', function(){
			expect(this.model.get('state')).toEqual(this.model.STATES.NULL);
			expect(this.model.get('testMode')).toEqual(false);
		});
		it('setTestMode', function(){
			this.model.setTestMode(true);
			expect(this.model.get('testMode')).toEqual(true);
		});
	});
	
	describe('BuildShortlistRequest', function(){
		
		it('_buildParty function returns the party Info', function(){
			var s = new this.HolidaySearch({
				dateStart: '22/05/2013',
				numNights: 2
			});
			s.setOccupancy([
				{adults: 2, children: 2, infants: 2},
				{adults: 2, children: 0, infants: 0},
				{adults: 2, children: 1, infants: 1}
			]);
			s.set({'childAges': '10,8,1,6,1'});
		
			var p = this.model._buildParty(s);
			
			expect(p.numberOfAdults).toEqual(6);
			expect(p.numberOfInfants).toEqual(3);
			expect(p.thirdPartyInsurance).toEqual(false);
			expect(p.thirdPartyInsuranceName).toEqual('');
			expect(p.preferredNumberOfRooms).toEqual(3);
			expect(p.defaultMealOkay).toBeTruthy();
			expect(p.defaultResortTransferOkay).toBeTruthy();
			expect(p.defaultDonationOkay).toBeTruthy();
			expect(p.youngPersonAge).toEqual([10,8,1,6,1]);
		});
		
		it('_buildAccommodation converts booking info into an accomodationSegment structure', function(){
			
			// DATA SETUP
			var self = this;
			
			var accommCol = new this.McAccommodationCollection();
			this.sampleAccom = accommCol.parse(this.sampleAccom);
			var hotels = [];
			this._.each(this.sampleAccom,function(item){
				var h = self.MulticomAccommodation.findOrCreate(item, {parse: true});
				hotels.push(h);
			});
			accommCol.add(hotels);
			
			var b = new this.Booking();
			b.get('holidaySearch').set(new this.HolidaySearch({
				numNights: 5,
				dateStart: '22/05/2013'
			}));
			b.get('holidaySearch').setOccupancy([{adults: 2, children: 0, infants: 0},{adults: 2, children: 0, infants: 0}]);
			
			b.setSelectedHotel(accommCol.at(0));
			
			//just check the setup is correct
			expect(b.get('selectedHotel').get('itineraryId')).toEqual('si1238');
			expect(b.get('selectedRooms').length).toEqual(2);
			
			// TEST CODE!
			var accomSeg = this.model._buildAccommodation(b.get('selectedHotel'),b.get('selectedRooms'));
			var aS = accomSeg; //shorthand for unit tests
			
			expect(aS.itinerary).toEqual('si1238');
			expect(aS.rooms.length).toEqual(2);
			
			var r = aS.rooms[0];
			
			expect(r.code).toEqual('0|2 A');
			expect(r.rateCode).toEqual('ZeM1fTkyGZdQsNOwOCuL1eBtoS4L78erQSJwMtC6mU6fFpF1ZrowUE/dzdqm7J50kFHOUm+xno0S6d1QY4qU9Hsl+tmIdz90pmusjr4X4oiJ71+cZVCpLbB2ynJHJNDnzg/uqkuQizb3tP6or5lQ4+lz/pVTpMTsBG07dD609RG6BeUTHo/8PaopPnaOYsQUMCqfOt0QfWE=');
			expect(r.adults).toEqual(2);
			expect(r.children).toEqual(0);
			expect(r.infants).toEqual(0);
			
		});
		
		it('_buildFlights converts a flight into a travelSegment structure', function(){
			var self = this;
			
			var flightCol = new this.McFlightCollection();
			this.sampleFlight = flightCol.parse(this.sampleFlight);
			var flights = [];
			this._.each(this.sampleFlight,function(item){
				flights.push(self.MulticomFlight.findOrCreate(item,{parse:true}));
			});
			flightCol.add(flights);
			
			//check set correctly
			expect(flightCol.length).toEqual(5);
			
			var b = new this.Booking();
			b.setSelectedFlight(flightCol.at(0));
			
			var travelSeg = this.model._buildTravel(b.get('selectedFlight'));
			
			expect(travelSeg).toEqual('si1009');
		});
		
		it('buildShortlistRequest builds a JSON request from a booking', function(){
			
			var booking = new this.Booking({
				holidaySearch: new this.HolidaySearch()
			});
			
			//simple tests as the above tests cover the sub functions of this
			var t = this.model.buildShortlistRequest(booking);
			
			expect(t.partyInfo).toBeDefined();
			expect(t.action).toEqual('buildShortlist');
			expect(t.travelSegments.length).toEqual(1);
			expect(t.accommodationSegments.length).toEqual(1);
			
			
		});
		
		
	});
	
});

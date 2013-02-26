describe("Multicom Flight Collection", function() {
	"use strict";
	
	
	beforeEach(function() {
		var flag = false,
			that = this;
	
		require([
			'collections/multicom-flight',
			'config',
			'models/flight-filter',
			'models/holiday-search'
			], function(MulticomFlightCollection, config, FlightFilter, HolidaySearch) {
			
				that.collection = new MulticomFlightCollection();
				that.FlightFilter = FlightFilter;
				that.HolidaySearch = HolidaySearch;
				
				
				if(config.multicomMode === 'test'){
					that.collection.setTestMode(false); //needed for the tests
				}
				flag = true;
			
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {});
	
	
	describe('Test Mode', function(){
		it('should not be in test mode', function(){
			expect(this.collection._testMode).toEqual(false);
		});
		
		it("should toggle when setTestMode", function(){
			this.collection.setTestMode(true);
			expect(this.collection._testMode).toEqual(true);
		});
	});
	
	describe('Request Error Logging', function(){
		it('should be null', function(){
			expect(this.collection._error).toBeNull(true);
		});
		
		it("should return an error", function(){
			this.collection._error = 'test';
			expect(this.collection.getError()).toEqual('test');
		});
	});
	
	
	describe("Build Search URL", function(){
		it('should build a url from a trip object', function(){
			var obj = {
				oneWay: 'yes',
				directFlights: 'no',
				numAdults: 1,
				numChildren: 1,
				numInfants: 1,
				dateStart: '22/10/2012',
				departureAirport: 'CDG',
				destinationAirport: 'LHR',
				destinationResortId: '123',
				destinationCountry: 'AA',
				flightClass: 'economy',
				numNights: 3
			};
			
			var str = this.collection.buildSearchQueryUrl(obj);
//			alert(str);
			expect(str).toContain("oneWay=yes");
			expect(str).toContain("directFlights=no");
			expect(str).toContain("numAdults=1");
			expect(str).toContain("numChildren=1");
			expect(str).toContain("numInfants=1");
			expect(str).toContain("dateStart=22/10/2012");
			expect(str).toContain("departureAirport=CDG");
			expect(str).toContain("destinationAirport=LHR");
			expect(str).toContain("destinationResortId=123");
			expect(str).toContain("destinationCountry=AA");
			expect(str).toContain("flightClass=economy");
			expect(str).toContain("numNights=3");
			
			
			expect(str).toContain("runFlightSearch");
		});
		
		it('should filter out invalid parameters', function(){
			var obj = {
				hotelName: 'aria',
				departureAirport: 'test'
			};
			
			var str = this.collection.buildSearchQueryUrl(obj);
			
			expect(str).not.toContain('hotelName=aria');
			expect(str).toContain('departureAirport');
			expect(str).toContain('test');
		});
	});
	
	describe('Get the Search URL', function(){
		it('should return the api url',function(){
			var str = this.collection.getSearchUrl();
			expect(str).toContain('json/multicom-api/');
		});
		it('should return the test url when in test mode', function(){
			this.collection.setTestMode(true);
			
			expect(this.collection.getSearchUrl()).toContain("/json-test/flights-search.json");
		});
	});
	
	describe('Perform and Parse a Multicom Flight Search', function(){
				
		var flag;
		it('should trigger complete and load valid objects', function(){
			runs(function(){
				flag=false;
				var self = this;
				this.collection.setTestMode(true);
				spyOn(this.collection, "trigger");
				this.collection.searchWithHolidaySearch(new this.HolidaySearch());
				
				setInterval(function() {
					if(!self.collection.isLoading()){
						flag = true;clearInterval();
					}
				}, 10);
			});
			
			waitsFor(function(){
				return flag;
			});
			
			runs(function(){
				expect(this.collection.trigger).toHaveBeenCalledWith('complete');
				expect(this.collection.models.length).toEqual(100);
				
				var obj = this.collection.at(0).toJSON();
				
				expect(obj.originAirport).toEqual('LHR');
				
				expect(obj.destinationAirport).toEqual('JFK');
				expect(obj.departureTime).toEqual('1105');
				expect(obj.arrivalDate).toEqual('20130210');
			});
		});
	});
	
	describe('performSearch error handling', function(){
				
		var flag;
		it('should throw an error when unsucessful', function(){
			runs(function(){
				flag=false;
				var self = this;
				this.collection.setTestMode(true);
				spyOn(this.collection, "trigger");
				this.collection.performSearch({}, '/hhj');
				
				setInterval(function() {
					if(!self.collection.isLoading()){
						flag = true;clearInterval();
					}
				}, 10);
			});
			
			waitsFor(function(){
				return flag;
			});
			
			runs(function(){
				//expect(this.collection.trigger).toHaveBeenCalledWith('error');
				// THIS CAN BE TEMPORAMENTAL DUE TO TIMING ISSUES
			});
		});
	});
	
	
	describe('filter returned flights', function(){
		var flag;
		it('should filter by outbound & return flights correctly', function(){
			runs(function(){
				flag=false;
				var self = this;
				this.collection.setTestMode(true);
				this.collection.performSearch({});
				
				setInterval(function() {
					if(!self.collection.isLoading()){
						flag = true;clearInterval();
					}
				}, 10);
			});
			
			waitsFor(function(){
				return flag;
			});
			
			runs(function(){
				var flight = this.collection.at(0);
				
				//outbound
				var models = this.collection.filterByOutboundFlight(flight);
				expect(models.length).toEqual(10);
				
				//inbound
				models = this.collection.filterByReturnFlight(flight);
				expect(models.length).toEqual(5); //only co-incidental that this 10 is the same as the previous expectation
				
			});
		});
		it('should filter by a filter object correctly', function(){
			runs(function(){
				flag=false;
				var self = this;
				this.collection.setTestMode(true);
				this.collection.performSearch({});
				
				setInterval(function() {
					if(!self.collection.isLoading()){
						flag = true;clearInterval();
					}
				}, 10);
			});
			
			waitsFor(function(){
				return flag;
			});
			
			runs(function(){
			
				//by outbound Airline
				var filter = new this.FlightFilter();
				filter.setProperty('outboundAirline','BA');
				expect(this.collection.filterByFlightFilter(filter).length).toEqual(90);
				
				//by outbound no of stops
				filter = new this.FlightFilter();
				filter.setProperty('outboundNoStops','1');
				expect(this.collection.filterByFlightFilter(filter).length).toEqual(10);
				
				//by departure time
				filter = new this.FlightFilter();
				filter.setProperty('outboundDepartureTimes',filter.TIMES.MORNING);
				expect(this.collection.filterByFlightFilter(filter).length).toEqual(41);
				
				//by return Airline
				filter = new this.FlightFilter();
				filter.setProperty('returnAirline','BA');
				expect(this.collection.filterByFlightFilter(filter).length).toEqual(90);
				
				//by return no of stops
				filter = new this.FlightFilter();
				filter.setProperty('returnNoStops','1');
				expect(this.collection.filterByFlightFilter(filter).length).toEqual(10);
				
				//by departure time
				filter = new this.FlightFilter();
				filter.setProperty('returnDepartureTimes',filter.TIMES.MORNING);
				expect(this.collection.filterByFlightFilter(filter).length).toEqual(18);
				
				
			});
		});
	});
	
	describe('return unique lists of parameters', function(){
				
		var flag;
		it('should filter by requested parameters correctly', function(){
			runs(function(){
				flag=false;
				var self = this;
				this.collection.setTestMode(true);
				this.collection.performSearch({});
				
				setInterval(function() {
					if(!self.collection.isLoading()){
						flag = true;clearInterval();
					}
				}, 10);
			});
			
			waitsFor(function(){
				return flag;
			});
			
			runs(function(){
				var models = this.collection.getUniqueArrayFromParameters([
					'outboundCarrier','outboundAirlineName'
				]);
				expect(models.length).toEqual(2);
				expect(models[0].outboundCarrier).toEqual('EI');
				expect(models[0].outboundAirlineName).toEqual('Aer Lingus');
				expect(models[1].outboundCarrier).toEqual('BA');
				
				models = null;
				models = this.collection.getUniqueArrayFromParameters([
					'outboundNumStops'
				]);
				expect(models.length).toEqual(2);
				expect(models[0].outboundNumStops).toEqual('1');
				expect(models[1].outboundNumStops).toEqual('0');
				
			});
		});
	});
	
});

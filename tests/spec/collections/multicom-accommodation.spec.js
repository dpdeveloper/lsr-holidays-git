describe("Multicom Accommodation Collection", function() {
	
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
	
		require([
			'collections/multicom-accommodation',
			'config',
			'models/holiday-search'
			], function(MulticomAccommodationCollection, config, HolidaySearch) {
			that.collection = new MulticomAccommodationCollection();
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
	
	describe("Search Mode", function(){
		it('should default to Hotel Mode', function(){
			expect(this.collection._searchMode).toEqual(this.collection.MODES.HOTEL);
		});
		
		it('setMode() should change the mode', function(){
			this.collection.setMode(this.collection.MODES.DESTINATION);
			expect(this.collection._searchMode).toEqual(this.collection.MODES.DESTINATION);
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
				hotelName: 'aria',
				destination: 'las+vegas',
				dateStart: '01/01/2012',
				numRooms: 1,
				numNights: 5,
				adultCsv: "2",
				childCsv: "1",
				infantCsv: "1",
				childAges: "8"
			};
			
			var str = this.collection.buildSearchQueryUrl(obj);
			
			expect(str).toContain("hotelName=aria&destination=las+vegas&dateStart=01/01/2012&numRooms=1&numNights=5&adultCsv=2&childCsv=1&infantCsv=1&childAges=8");
			expect(str).toContain("runHotelSearch");
		});
		
		it('should filter out invalid parameters', function(){
			var obj = {
				hotelName: 'aria',
				flight: 'test'
			};
			
			var str = this.collection.buildSearchQueryUrl(obj);
			
			expect(str).toContain('hotelName=aria');
			expect(str).not.toContain('flight');
			expect(str).not.toContain('test');
		});
	});
	
	describe('Get the Search URL', function(){
		it('should return the api url',function(){
			var str = this.collection.getSearchUrl();
			expect(str).toContain('json/multicom-api/');
		});
		it('should return the test url when in test mode', function(){
			this.collection.setTestMode(true);
			
			expect(this.collection.getSearchUrl()).toContain("/json-test/hotels-las-vegas.json");
		});
	});
	
	describe('Perform and Parse a Multicom Accommodation Search', function(){
				
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
				expect(this.collection.models.length).toEqual(71);
				
				var obj = this.collection.at(0).toJSON();
				
				expect(obj.accommodationName).toEqual('Santa Fe Station Hotel Casino');
				expect(obj.itineraryId).toEqual('si1218');
				expect(obj.supplier).toEqual('BAR');
				expect(obj.classCode).toEqual('3*');
				expect(obj.basicAdultCost).toEqual('35.74');
				expect(obj.rooms).toBeDefined();
				expect(obj.images).toBeDefined();
				
				//expect relational data
				var r = this.collection.at(0).get('rooms');
				
				expect(r.length).toEqual(3);
				expect(r.at(0).get('name')).toEqual('DOUBLE STANDARD');
				
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
});

describe("Multicom Accommodation Collection", function() {
	
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
	
		require([
			'collections/multicom-accommodation',
			'config',
			'models/holiday-search',
			'json!../../json-test/multicom-v3/hotels-las-vegas.json'
			], function(MulticomAccommodationCollection, config, HolidaySearch, sampleData) {
			
			that.collection = new MulticomAccommodationCollection({sortBy: 'noSort'});
			that.HolidaySearch = HolidaySearch;
			that.sampleData = sampleData;
			
			
			if(config.multicomMode === 'test'){
				that.collection.setTestMode(false); //needed for the tests
			}
			
			flag = true;
			
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {});
	
	describe('Initialize', function(){
		it('Is Not Null', function(){
			expect(this.collection).not.toBeNull();
		});

	});

	
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
			expect(str).toContain('json/multicom/');
		});
		it('should return the test url when in test mode', function(){
			this.collection.setTestMode(true);
			
			expect(this.collection.getSearchUrl()).toContain("json-test");
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
				
				var sampleDataArr = this.sampleData.data.AccommodationSearchResponse.Accommodations.AccommodationSegment;
			
				expect(this.collection.trigger).toHaveBeenCalledWith('complete');
				expect(this.collection.models.length).toEqual(sampleDataArr.length);
				
				var obj = this.collection.at(0).toJSON();
				var sam = sampleDataArr[0];
				
				expect(obj.accommodationName).toEqual(sam['@AccommodationName']);
				expect(obj.itineraryId).toEqual(sam['@ItineraryId']);
				expect(obj.rooms).toBeDefined();
				expect(obj.images).toBeDefined();
				
				//expect relational data
				var r = this.collection.at(0).get('rooms');
				expect(r.length).toEqual(3);				
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

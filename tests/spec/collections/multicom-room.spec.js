describe("MulticomRoomCollection", function() {
	"use strict";
	
	var sampleJSON = [
	{
		"#name" : "AccommodationUnit",
		"#text" : "",
		"@MaxOccupancy" : "2",
		"@MinOccupancy" : "2",
		"@QuantityAvailable" : "1",
		"@Name" : "DOUBLE COURTYARD",
		"@Code" : "1:2:0:0:DBL-U10:CY:GC-B2C",
		"@RoomType" : "DBL-U10:CY",
		"RoomRate" : {
			"#name" : "RoomRate",
			"#text" : "",
			"@StartDate" : "20130329",
			"@EndDate" : "20130401",
			"@RateId" : "3x+mrplYtA7r5vRhKHbkaQ==",
			"@Amount" : "116.68",
			"@Currency" : "GBP",
			"@BoardBasis" : "RO",
			"@SuppliersBoardCode" : "RO-U10"
		}
	},
	{
		"#name" : "AccommodationUnit",
		"#text" : "",
		"@MaxOccupancy" : "2",
		"@MinOccupancy" : "2",
		"@QuantityAvailable" : "1",
		"@Name" : "DOUBLE LUXURY ROOM-TOWER ROOM",
		"@Code" : "1:2:0:0:DBL-U10:LX-TW:GC-B2C",
		"@RoomType" : "DBL-U10:LX-TW",
		"RoomRate" : {
			"#name" : "RoomRate",
			"#text" : "",
			"@StartDate" : "20130329",
			"@EndDate" : "20130401",
			"@RateId" : "3x+mrplYtA7r5vRhKHbkaQ==",
			"@Amount" : "159.51",
			"@Currency" : "GBP",
			"@BoardBasis" : "RO",
			"@SuppliersBoardCode" : "RO-U10"
		}
	}
	];	
	
	var sampleAccommodationJSON = {"@Availability":"available","@Type":"Hotel","@ItineraryId":"si1292","@ResortId":"11284","@ResortName":"North Las Vegas","#text":"","@NormalisedName":"FIESTA RANCHO","@BookableByFAB":"true","Address":{"@Country":"US","@PostCode":"89130","#name":"Address","@CityOrTown":"NORTH LAS VEGAS","@Address1":"2400 NORTH RANCHO DRIVE","#text":"","@Address2":"NORTH LAS VEGAS"},"AccommodationUnits":{"#name":"AccommodationUnits","#text":"","AccommodationUnit":[{"#name":"AccommodationUnit","@Name":"DOUBLE STANDARD","RoomRate":{"@SuppliersBoardCode":"RO-U10","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130401","@StartDate":"20130329","@RateId":"A5TIbjDa16pmC9J9xhHCSQ==","#text":"","@Amount":"111.51","@BoardBasis":"RO"},"@MaxOccupancy":"2","#text":"","@QuantityAvailable":"1","@Code":"1:2:0:0:DBL-U10:ST:GC-B2B","@RoomType":"DBL-U10:ST","@MinOccupancy":"2"},{"#name":"AccommodationUnit","@Name":"DOUBLE STANDARD","RoomRate":{"@SuppliersBoardCode":"RO-U10","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130401","@StartDate":"20130329","@RateId":"A5TIbjDa16pmC9J9xhHCSQ==","#text":"","@Amount":"150.65","@BoardBasis":"RO"},"@MaxOccupancy":"2","#text":"","@QuantityAvailable":"1","@Code":"1:2:0:0:DBL-U10:ST:GC-B2C","@RoomType":"DBL-U10:ST","@MinOccupancy":"2"}]},"@EndDate":"20130401","Image":[{"@URL":"http://www.hotelbeds.com/giata/10/102405/102405a_hb_a_001.jpg","#name":"Image","#text":"","@CaptionText":"General"},{"@URL":"http://www.hotelbeds.com/giata/10/102405/102405a_hb_a_006.jpg","#name":"Image","#text":"","@CaptionText":"General"},{"@URL":"http://www.hotelbeds.com/giata/10/102405/102405a_hb_ba_003.jpg","#name":"Image","#text":"","@CaptionText":"Bar"}],"@Supplier":"BAR","@OfficialRating":"3 STARS","@NumNights":"3","GeoPosition":{"#name":"GeoPosition","#text":"","@Longitude":"-115.1995","@Latitude":"36.2032"},"@AccommodationCode":"102405","@BasicAdultCost":"111.51","@MaxChildAge":"17","@ClassCode":"3*","#name":"AccommodationSegment","TelephoneNumber":{"#name":"TelephoneNumber","#text":"702-631-7000"},"@ContractCode":"GC-B2B;GC-B2C","@AccommodationId":"1544947","Description":{"#name":"Description","#text":"This 5-storey, 100-room hotel tower is set in contemporary décor and has been designed to meet the needs of the individual, family or business traveller. Fully air-conditioned, the hotel features 24-hour reception and check-out service, a cloakroom, lift access, a casino, a café, a bar, a restaurant, conference facilities and on-site parking for those arriving by car (garage/car park)."},"@SupplierLocationId":"LVS|11","@InfantAge":"0","@Currency":"GBP","@BoardCode":"RO","@SuppliersBoardCode":"RO-U10","@StartDate":"20130329","@AccommodationName":"Fiesta Rancho Casino Hotel","@SyndicatorRanking":"100","AvailableBoardBasis":{"#name":"AvailableBoardBasis","#text":"RO"}};
	
	/* multi room search request
	 * http://localhost/~david/lsr-holidays/public_html/json/multicom-api/?action=runDestinationSearch&numRooms=3&numNights=5&destination=las+vegas&dateStart=30/04/2013&adultCsv=3,1,1&childCsv=0,1,0&infantCsv=0,1,0&childAges=6,0,0&v=3
	 * numRooms: 3
	 * room 1) A:3 C:0 I:0
	 * room 2) A:1 C:1 I:1
	 * room 3) A:1 C:0 I:0
	 *
	*/
	var sampleAccommodationMultiroomJSON  = {"@Availability":"available","@Type":"Hotel","@ItineraryId":"si1128","@ResortId":"11284","@ResortName":"North Las Vegas","#text":"","@NormalisedName":"FIESTA RANCHO","@BookableByFAB":"true","Address":{"@Country":"US","@PostCode":"89130","#name":"Address","@CityOrTown":"NORTH LAS VEGAS","@Address1":"2400 NORTH RANCHO DRIVE","#text":"","@Address2":"NORTH LAS VEGAS"},"AccommodationUnits":{"#name":"AccommodationUnits","#text":"","AccommodationUnit":[{"@RoomType":"DBL-U10:ST","#name":"AccommodationUnit","@MaxExtraInfants":"0","@Name":"DOUBLE STANDARD","RoomRate":{"@SuppliersBoardCode":"RO-U10","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130505","@StartDate":"20130430","@RateId":"32SYcQOcBeZKBM0vYWlNzw==","#text":"","@Amount":"121.04","@BoardBasis":"RO"},"@MaxOccupancy":"1","#text":"","@QuantityAvailable":"1","@Code":"1:1:0:0:DBL-U10:ST:GC-B2B","@MaxExtraChildren":"0","@MinOccupancy":"1"},{"@RoomType":"DBL-U10:ST","#name":"AccommodationUnit","@MaxExtraInfants":"0","@Name":"DOUBLE STANDARD","RoomRate":{"@SuppliersBoardCode":"RO-U10","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130505","@StartDate":"20130430","@RateId":"32SYcQOcBeZKBM0vYWlNzw==","#text":"","@Amount":"163.54","@BoardBasis":"RO"},"@MaxOccupancy":"1","#text":"","@QuantityAvailable":"1","@Code":"1:1:0:0:DBL-U10:ST:GC-B2C","@MaxExtraChildren":"0","@MinOccupancy":"1"},{"@RoomType":"DBL-U10:ST","#name":"AccommodationUnit","@MaxExtraInfants":"0","@Name":"DOUBLE STANDARD","RoomRate":{"@SuppliersBoardCode":"RO-U10","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130505","@StartDate":"20130430","@RateId":"bAA4qJ+LSVVsqRTT7ALeAg==","#text":"","@Amount":"192.21","@BoardBasis":"RO"},"@MaxOccupancy":"3","#text":"","@QuantityAvailable":"1","@Code":"1:3:0:0:DBL-U10:ST:GC-B2B","@MaxExtraChildren":"0","@MinOccupancy":"3"},{"@RoomType":"DBL-U10:ST","#name":"AccommodationUnit","@MaxExtraInfants":"2","@Name":"DOUBLE STANDARD","RoomRate":{"@SuppliersBoardCode":"RO-U10","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130505","@StartDate":"20130430","@RateId":"nr4VH503yg6ujOMjz4O9+g==","#text":"","@Amount":"192.21","@BoardBasis":"RO"},"@MaxOccupancy":"1","#text":"","@QuantityAvailable":"2","@Code":"1:1:2:0:DBL-U10:ST:GC-B2B","@MaxExtraChildren":"2","@MinOccupancy":"1"},{"@RoomType":"DBL-U10:ST","#name":"AccommodationUnit","@MaxExtraInfants":"2","@Name":"DOUBLE STANDARD","RoomRate":{"@SuppliersBoardCode":"RO-U10","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130505","@StartDate":"20130430","@RateId":"nr4VH503yg6ujOMjz4O9+g==","#text":"","@Amount":"234.71","@BoardBasis":"RO"},"@MaxOccupancy":"1","#text":"","@QuantityAvailable":"2","@Code":"1:1:2:0:DBL-U10:ST:GC-B2C","@MaxExtraChildren":"2","@MinOccupancy":"1"},{"@RoomType":"DBL-U10:ST","#name":"AccommodationUnit","@MaxExtraInfants":"0","@Name":"DOUBLE STANDARD","RoomRate":{"@SuppliersBoardCode":"RO-U10","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130505","@StartDate":"20130430","@RateId":"bAA4qJ+LSVVsqRTT7ALeAg==","#text":"","@Amount":"234.71","@BoardBasis":"RO"},"@MaxOccupancy":"3","#text":"","@QuantityAvailable":"1","@Code":"1:3:0:0:DBL-U10:ST:GC-B2C","@MaxExtraChildren":"0","@MinOccupancy":"3"}]},"@EndDate":"20130505","Image":[{"@URL":"http://www.hotelbeds.com/giata/10/102405/102405a_hb_a_001.jpg","#name":"Image","#text":"","@CaptionText":"General"},{"@URL":"http://www.hotelbeds.com/giata/10/102405/102405a_hb_a_006.jpg","#name":"Image","#text":"","@CaptionText":"General"},{"@URL":"http://www.hotelbeds.com/giata/10/102405/102405a_hb_ba_003.jpg","#name":"Image","#text":"","@CaptionText":"Bar"}],"@Supplier":"BAR","@OfficialRating":"3 STARS","@NumNights":"5","GeoPosition":{"#name":"GeoPosition","#text":"","@Longitude":"-115.1995","@Latitude":"36.2032"},"@AccommodationCode":"102405","@BasicAdultCost":"121.04","@MaxChildAge":"17","@ClassCode":"3*","#name":"AccommodationSegment","TelephoneNumber":{"#name":"TelephoneNumber","#text":"702-631-7000"},"@ContractCode":"GC-B2B;GC-B2C","@AccommodationId":"1544947","Description":{"#name":"Description","#text":"This 5-storey, 100-room hotel tower is set in contemporary décor and has been designed to meet the needs of the individual, family or business traveller. Fully air-conditioned, the hotel features 24-hour reception and check-out service, a cloakroom, lift access, a casino, a café, a bar, a restaurant, conference facilities and on-site parking for those arriving by car (garage/car park)."},"@SupplierLocationId":"LVS|11","@InfantAge":"0","@Currency":"GBP","@BoardCode":"RO","@SuppliersBoardCode":"RO-U10","@StartDate":"20130430","@AccommodationName":"Fiesta Rancho Casino Hotel","@SyndicatorRanking":"100","AvailableBoardBasis":{"#name":"AvailableBoardBasis","#text":"RO"}};
	 
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'collections/multicom-room',
			'models/multicom/multicom-room',
			'models/holiday-search',
			'models/multicom/multicom-accommodation'
			
			], function(MulticomRoomCollection, MulticomRoom, HolidaySearch, MulticomAccommodation) {
			that.collection = new MulticomRoomCollection();
			that.MulticomRoom = MulticomRoom;
			that.HolidaySearch = HolidaySearch;
			that.MulticomAccommodation = MulticomAccommodation;
			
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {
		$('#sandbox').html('');
		$('#sandbox').hide();
	});
	
	describe('Initialization', function(){
		it('Is a valid Object', function(){
			expect(this.collection).not.toBeNull();
		});
		
		it('Can Load from JSON', function(){
			this.collection.reset(sampleJSON, {parse: true});
			expect(this.collection.length).toEqual(2);
		});
		it('Can calculate the cost of all rooms', function(){
			this.collection.reset(sampleJSON, {parse: true});
			var p = this.collection.calculateCost();
			
			expect(p).toEqual(276.19);
		});
	});
	
	
	describe('Building Default Packages', function(){
		it('Can Build a default package for a hotel for 2 people', function(){
			
			var accommodation = new this.MulticomAccommodation();
			accommodation.set(accommodation.parse(sampleAccommodationJSON));
			var search = new this.HolidaySearch({
				numRooms: 1,
				adultCsv: '2',
				childCsv: '0',
				infantCsv: '0'
			});

			this.collection.buildPackageFromAccommodation(accommodation,search);
			expect(this.collection.length).toEqual(1);
		});
		
		it('Can build a multiroom package for 3 Rooms with mixed children and infants', function(){
			var accommodation = new this.MulticomAccommodation(sampleAccommodationMultiroomJSON, {parse: true});
			var search = new this.HolidaySearch();
			search.set({
				numRooms: 3,
				adultCsv: '3,1,1,',
				childCsv: '0,1,0,',
				infantCsv: '0,1,0,'
			});
			
			this.collection.buildPackageFromAccommodation(accommodation,search);
			
			expect(this.collection.length).toEqual(3);
			
			//check the occupancies
			var one = this.collection.at(0),
				two = this.collection.at(1),
				three = this.collection.at(2);
			
			expect(one.get('occupancy').adults).toEqual(3);
			expect(one.get('occupancy').children).toEqual(0);
			expect(one.get('occupancy').infants).toEqual(0);
			
			expect(two.get('occupancy').adults).toEqual(1);
			expect(two.get('occupancy').children).toEqual(1);
			expect(two.get('occupancy').infants).toEqual(1);
			
			//check that the occupancies are within limits
			this.collection.each(function(item){
				expect(parseInt(item.get('occupancy').adults, 10) <= parseInt(item.get('maxOccupancy'),10)).toBeTruthy();
				expect(parseInt(item.get('occupancy').children, 10) <= parseInt(item.get('maxExtraChildren'),10)).toBeTruthy();
				expect(parseInt(item.get('occupancy').infants, 10) <= parseInt(item.get('maxExtraInfants'),10)).toBeTruthy();
			});
			
			
		});
	});
	
	
});

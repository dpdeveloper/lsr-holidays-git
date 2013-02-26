describe("MulticomRoomCollection", function() {
	"use strict";
	
	var sampleJSON = [{"maxOccupancy":"1","accommodationId":"1527373","hotelName":"Santa Fe Station Hotel Casino","id":"c969941fc98822c41a3e2acd73353f28","code":"1:1:0:0:DBL-U10:ST:GC-B2B","minOccupancy":"1","roomType":"DBL-U10:ST","quantityAvailable":"1","roomRate":{"rateId":"rR9M+CGCfJfzfKAZL8PFRg==","amount":"35.74","endDate":"20130303","startDate":"20130302","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"name":"DOUBLE STANDARD"},{"maxOccupancy":"1","accommodationId":"1527373","hotelName":"Santa Fe Station Hotel Casino","id":"6a408a88a17e58b69a3233dca1ae7cab","code":"1:1:0:0:DBL-U10:ST:16931- DISRO","minOccupancy":"1","roomType":"DBL-U10:ST","quantityAvailable":"1","roomRate":{"rateId":"rR9M+CGCfJfzfKAZL8PFRg==","amount":"38.63","endDate":"20130303","startDate":"20130302","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"name":"DOUBLE STANDARD"},{"maxOccupancy":"1","accommodationId":"1527373","hotelName":"Santa Fe Station Hotel Casino","id":"11cf4b6ec9bd1b7edfc4b9701b7da015","code":"1:1:0:0:DBL-U10:ST:GC-B2C","minOccupancy":"1","roomType":"DBL-U10:ST","quantityAvailable":"1","roomRate":{"rateId":"rR9M+CGCfJfzfKAZL8PFRg==","amount":"48.28","endDate":"20130303","startDate":"20130302","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"name":"DOUBLE STANDARD"}];
	
	var sampleAccommodationJSON = {"telephoneNumber":"7026584900","description":"The hotel is located on more than 15 hectares and offers 200 hotel rooms. The air-conditioned property features a lobby with 24-hour reception and check-out service, cloakroom, lift access, auditorium, casino, bar, disco and restaurant. Furthermore, conference facilities, room and laundry services, a car park and a garage are available.","suppliersBoardCode":"RO-U10","availability":"available","contractCode":"GC-B2B;16931- DISRO;GC-B2C","boardCode":"RO","itineraryId":"si1218","currency":"GBP","availableBoardBasis":"RO","accommodationId":"1527373","normalisedName":"SANTA FE STATION","resortName":"North Las Vegas","accommodationCode":"102404","endDate":"20130303","resortId":"11284","type":"Hotel","bookableByFAB":"true","rooms":[{"maxOccupancy":"1","accommodationId":"1527373","hotelName":"Santa Fe Station Hotel Casino","id":"c969941fc98822c41a3e2acd73353f28","code":"1:1:0:0:DBL-U10:ST:GC-B2B","minOccupancy":"1","roomType":"DBL-U10:ST","quantityAvailable":"1","roomRate":{"rateId":"rR9M+CGCfJfzfKAZL8PFRg==","amount":"35.74","endDate":"20130303","startDate":"20130302","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"name":"DOUBLE STANDARD"},{"maxOccupancy":"1","accommodationId":"1527373","hotelName":"Santa Fe Station Hotel Casino","id":"6a408a88a17e58b69a3233dca1ae7cab","code":"1:1:0:0:DBL-U10:ST:16931- DISRO","minOccupancy":"1","roomType":"DBL-U10:ST","quantityAvailable":"1","roomRate":{"rateId":"rR9M+CGCfJfzfKAZL8PFRg==","amount":"38.63","endDate":"20130303","startDate":"20130302","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"name":"DOUBLE STANDARD"},{"maxOccupancy":"1","accommodationId":"1527373","hotelName":"Santa Fe Station Hotel Casino","id":"11cf4b6ec9bd1b7edfc4b9701b7da015","code":"1:1:0:0:DBL-U10:ST:GC-B2C","minOccupancy":"1","roomType":"DBL-U10:ST","quantityAvailable":"1","roomRate":{"rateId":"rR9M+CGCfJfzfKAZL8PFRg==","amount":"48.28","endDate":"20130303","startDate":"20130302","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"name":"DOUBLE STANDARD"}],"syndicatorRanking":"100","supplier":"BAR","accommodationName":"Santa Fe Station Hotel Casino","classCode":"3*","maxChildAge":"17","startDate":"20130302","numNights":"1","officialRating":"3 STARS","basicAdultCost":"35.74","infantAge":"0","supplierLocationId":"LVS|11","address":{"cityOrTown":"LAS VEGAS","address2":"LAS VEGAS","country":"US","address1":"4949 NORTH RANDRO","postCode":"89130"}};
	
	/* multi room search request
	 * http://localhost/~david/lsr-holidays/public_html/json/multicom-api/?action=runDestinationSearch&numRooms=3&numNights=5&destination=las+vegas&dateStart=30/04/2013&adultCsv=3,1,1&childCsv=0,1,0&infantCsv=0,1,0&childAges=6,0,0&v=3
	 * numRooms: 3
	 * room 1) A:3 C:0 I:0
	 * room 2) A:1 C:1 I:1
	 * room 3) A:1 C:0 I:0
	 *
	*/
	var sampleAccommodationMultiroomJSON  = {"telephoneNumber":"702-631-7000","description":"This 5-storey, 100-room hotel tower is set in contemporary décor and has been designed to meet the needs of the individual, family or business traveller. Fully air-conditioned, the hotel features 24-hour reception and check-out service, a cloakroom, lift access, a casino, a café, a bar, a restaurant, conference facilities and on-site parking for those arriving by car (garage/car park).","suppliersBoardCode":"RO-U10","availability":"available","contractCode":"GC-B2B;16926 - DISRO;GC-B2C","boardCode":"RO","itineraryId":"si1337","currency":"GBP","availableBoardBasis":"RO","accommodationId":"1544947","normalisedName":"FIESTA RANCHO","resortName":"North Las Vegas","accommodationCode":"102405","endDate":"20130505","resortId":"11284","type":"Hotel","bookableByFAB":"true","rooms":[{"maxOccupancy":"1","maxExtraChildren":"0","quantityAvailable":"1","roomType":"DBL-U10:ST","id":"1827beb3213068b734f4f1e865f7f6bf","minOccupancy":"1","code":"1:1:0:0:DBL-U10:ST:GC-B2B","accommodationId":"1544947","maxExtraInfants":"0","roomRate":{"rateId":"32SYcQOcBeZKBM0vYWlNzw==","amount":"106.48","endDate":"20130505","startDate":"20130430","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"hotelName":"Fiesta Rancho Casino Hotel","name":"DOUBLE STANDARD"},{"maxOccupancy":"1","maxExtraChildren":"2","quantityAvailable":"2","roomType":"DBL-U10:ST","id":"cec40b0f86ebbf2d7f5d85b876aa3527","minOccupancy":"1","code":"1:1:2:0:DBL-U10:ST:16926 - DISRO","accommodationId":"1544947","maxExtraInfants":"2","roomRate":{"rateId":"nr4VH503yg6ujOMjz4O9+g==","amount":"115.08","endDate":"20130505","startDate":"20130430","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"hotelName":"Fiesta Rancho Casino Hotel","name":"DOUBLE STANDARD"},{"maxOccupancy":"1","maxExtraChildren":"0","quantityAvailable":"1","roomType":"DBL-U10:ST","id":"cec40b0f86ebbf2d7f5d85b876aa3527","minOccupancy":"1","code":"1:1:0:0:DBL-U10:ST:16926 - DISRO","accommodationId":"1544947","maxExtraInfants":"0","roomRate":{"rateId":"32SYcQOcBeZKBM0vYWlNzw==","amount":"115.08","endDate":"20130505","startDate":"20130430","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"hotelName":"Fiesta Rancho Casino Hotel","name":"DOUBLE STANDARD"},{"maxOccupancy":"1","maxExtraChildren":"0","quantityAvailable":"1","roomType":"DBL-U10:ST","id":"8ecd67f6cb3e24fff0bbce1bba5bcefc","minOccupancy":"1","code":"1:1:0:0:DBL-U10:ST:GC-B2C","accommodationId":"1544947","maxExtraInfants":"0","roomRate":{"rateId":"32SYcQOcBeZKBM0vYWlNzw==","amount":"143.86","endDate":"20130505","startDate":"20130430","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"hotelName":"Fiesta Rancho Casino Hotel","name":"DOUBLE STANDARD"},{"maxOccupancy":"3","maxExtraChildren":"0","quantityAvailable":"1","roomType":"DBL-U10:ST","id":"07df4c4ae5a6320fde03945b74fcd86d","minOccupancy":"3","code":"1:3:0:0:DBL-U10:ST:16926 - DISRO","accommodationId":"1544947","maxExtraInfants":"0","roomRate":{"rateId":"bAA4qJ+LSVVsqRTT7ALeAg==","amount":"168.23","endDate":"20130505","startDate":"20130430","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"hotelName":"Fiesta Rancho Casino Hotel","name":"DOUBLE STANDARD"},{"maxOccupancy":"3","maxExtraChildren":"0","quantityAvailable":"1","roomType":"DBL-U10:ST","id":"69084917485149673effc00d21d621a8","minOccupancy":"3","code":"1:3:0:0:DBL-U10:ST:GC-B2B","accommodationId":"1544947","maxExtraInfants":"0","roomRate":{"rateId":"bAA4qJ+LSVVsqRTT7ALeAg==","amount":"172.92","endDate":"20130505","startDate":"20130430","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"hotelName":"Fiesta Rancho Casino Hotel","name":"DOUBLE STANDARD"},{"maxOccupancy":"1","maxExtraChildren":"2","quantityAvailable":"2","roomType":"DBL-U10:ST","id":"69084917485149673effc00d21d621a8","minOccupancy":"1","code":"1:1:2:0:DBL-U10:ST:GC-B2B","accommodationId":"1544947","maxExtraInfants":"2","roomRate":{"rateId":"nr4VH503yg6ujOMjz4O9+g==","amount":"172.92","endDate":"20130505","startDate":"20130430","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"hotelName":"Fiesta Rancho Casino Hotel","name":"DOUBLE STANDARD"},{"maxOccupancy":"1","maxExtraChildren":"2","quantityAvailable":"2","roomType":"DBL-U10:ST","id":"5d74eab769cac182ac13f60c05184616","minOccupancy":"1","code":"1:1:2:0:DBL-U10:ST:GC-B2C","accommodationId":"1544947","maxExtraInfants":"2","roomRate":{"rateId":"nr4VH503yg6ujOMjz4O9+g==","amount":"210.3","endDate":"20130505","startDate":"20130430","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"hotelName":"Fiesta Rancho Casino Hotel","name":"DOUBLE STANDARD"},{"maxOccupancy":"3","maxExtraChildren":"0","quantityAvailable":"1","roomType":"DBL-U10:ST","id":"5d74eab769cac182ac13f60c05184616","minOccupancy":"3","code":"1:3:0:0:DBL-U10:ST:GC-B2C","accommodationId":"1544947","maxExtraInfants":"0","roomRate":{"rateId":"bAA4qJ+LSVVsqRTT7ALeAg==","amount":"210.3","endDate":"20130505","startDate":"20130430","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"hotelName":"Fiesta Rancho Casino Hotel","name":"DOUBLE STANDARD"}],"syndicatorRanking":"100","supplier":"BAR","accommodationName":"Fiesta Rancho Casino Hotel","classCode":"0*","maxChildAge":"17","startDate":"20130430","numNights":"5","officialRating":"3 STARS","basicAdultCost":"106.48","infantAge":"0","supplierLocationId":"LVS|11","address":{"cityOrTown":"NORTH LAS VEGAS","address2":"NORTH LAS VEGAS","country":"US","address1":"2400 NORTH RANCHO DRIVE","postCode":"89130"}};
	 
	
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
			this.collection.add(sampleJSON);
			expect(this.collection.length).toEqual(3);
		});
		it('Can calculate the cost of all rooms', function(){
			this.collection.add(sampleJSON);
			var p = this.collection.calculateCost();
			
			expect(p).toEqual(122.65);
		});
	});
	
	describe('Building Default Packages', function(){
		it('Can Build a default package for a hotel for 1 person', function(){
			
			var accommodation = new this.MulticomAccommodation(sampleAccommodationJSON);
			var search = new this.HolidaySearch({
				numRooms: 1,
				adultCsv: '1',
				childCsv: '0',
				infantCsv: '0'
			});

			this.collection.buildPackageFromAccommodation(accommodation,search);
			expect(this.collection.length).toEqual(1);
		});
		
		it('Can build a multiroom package for 3 Rooms with mixed children and infants', function(){
			var accommodation = new this.MulticomAccommodation(sampleAccommodationMultiroomJSON);
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
			
			expect(one.get('occupancy').adults).toEqual('3');
			expect(one.get('occupancy').children).toEqual('0');
			expect(one.get('occupancy').infants).toEqual('0');
			
			expect(two.get('occupancy').adults).toEqual('1');
			expect(two.get('occupancy').children).toEqual('1');
			expect(two.get('occupancy').infants).toEqual('1');
			
			//check that the occupancies are within limits
			this.collection.each(function(item){
				expect(parseInt(item.get('occupancy').adults, 10) <= parseInt(item.get('maxOccupancy'),10)).toBeTruthy();
				expect(parseInt(item.get('occupancy').children, 10) <= parseInt(item.get('maxExtraChildren'),10)).toBeTruthy();
				expect(parseInt(item.get('occupancy').infants, 10) <= parseInt(item.get('maxExtraInfants'),10)).toBeTruthy();
			});
			
			
		});
	});
	
	
});

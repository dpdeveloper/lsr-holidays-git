describe("Multicom Accommodation", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
			
		this.sampleData = {"telephoneNumber":"7026584900","description":"The hotel is located on more than 15 hectares and offers 200 hotel rooms. The air-conditioned property features a lobby with 24-hour reception and check-out service, cloakroom, lift access, auditorium, casino, bar, disco and restaurant. Furthermore, conference facilities, room and laundry services, a car park and a garage are available.","suppliersBoardCode":"RO-U10","availability":"available","contractCode":"GC-B2B;16931- DISRO;GC-B2C","boardCode":"RO","itineraryId":"si1218","currency":"GBP","availableBoardBasis":"RO","accommodationId":"1527373","normalisedName":"SANTA FE STATION","resortName":"North Las Vegas","accommodationCode":"102404","endDate":"20130303","resortId":"11284","type":"Hotel","bookableByFAB":"true","rooms":[{"maxOccupancy":"1","accommodationId":"1527373","hotelName":"Santa Fe Station Hotel Casino","id":"c969941fc98822c41a3e2acd73353f28","code":"1:1:0:0:DBL-U10:ST:GC-B2B","minOccupancy":"1","roomType":"DBL-U10:ST","quantityAvailable":"1","roomRate":{"rateId":"rR9M+CGCfJfzfKAZL8PFRg==","amount":"35.74","endDate":"20130303","startDate":"20130302","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"name":"DOUBLE STANDARD"},{"maxOccupancy":"1","accommodationId":"1527373","hotelName":"Santa Fe Station Hotel Casino","id":"6a408a88a17e58b69a3233dca1ae7cab","code":"1:1:0:0:DBL-U10:ST:16931- DISRO","minOccupancy":"1","roomType":"DBL-U10:ST","quantityAvailable":"1","roomRate":{"rateId":"rR9M+CGCfJfzfKAZL8PFRg==","amount":"38.63","endDate":"20130303","startDate":"20130302","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"name":"DOUBLE STANDARD"},{"maxOccupancy":"1","accommodationId":"1527373","hotelName":"Santa Fe Station Hotel Casino","id":"11cf4b6ec9bd1b7edfc4b9701b7da015","code":"1:1:0:0:DBL-U10:ST:GC-B2C","minOccupancy":"1","roomType":"DBL-U10:ST","quantityAvailable":"1","roomRate":{"rateId":"rR9M+CGCfJfzfKAZL8PFRg==","amount":"48.28","endDate":"20130303","startDate":"20130302","suppliersBoardCode":"RO-U10","boardBasis":"RO","currency":"GBP"},"name":"DOUBLE STANDARD"}],"syndicatorRanking":"100","supplier":"BAR","accommodationName":"Santa Fe Station Hotel Casino","classCode":"3*","maxChildAge":"17","startDate":"20130302","numNights":"1","officialRating":"3 STARS","basicAdultCost":"35.74","infantAge":"0","supplierLocationId":"LVS|11","address":{"cityOrTown":"LAS VEGAS","address2":"LAS VEGAS","country":"US","address1":"4949 NORTH RANDRO","postCode":"89130"}};
		
		$('#sandbox').show();
		
		require([
			'models/multicom/multicom-accommodation',
			'models/multicom/multicom-room'
			], function(MulticomAccom, MulticomRoom) {
			that.model = new MulticomAccom();
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
	describe('Initializes', function(){
		it('Is Not Null', function(){
			expect(this.model).not.toBeNull();
		});
		
		it('Initially has no rooms', function(){
			expect(this.model.get('rooms').length).toEqual(0);
		});
		
		it('Can add rooms', function(){
			
			var room = new this.MulticomRoom();
			room.set({name: 'test'});
			
			this.model.get('rooms').add(room);
			
			expect(this.model.get('rooms').length).toEqual(1);
			expect(this.model.get('rooms').at(0).get('name')).toEqual('test');
		});
		
		it('Can Set from JSON', function(){
			this.model.set(this.sampleData);
			expect(this.model.get('accommodationId')).toEqual('1527373');
			expect(this.model.get('rooms').models.length).toEqual(3);
		});
	});
	
});

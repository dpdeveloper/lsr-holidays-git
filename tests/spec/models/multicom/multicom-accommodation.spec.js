describe("Multicom Accommodation Model", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
			
		this.sampleData = {"#text":"","@NumNights":"3","@Type":"Hotel","@SyndicatorRanking":"100","@ItineraryId":"si1238","TelephoneNumber":{"#name":"TelephoneNumber","#text":"702-385-4011"},"@AccommodationName":"Four Queens Hotel","@NormalisedName":"FOUR QUEENS","Image":[{"@ThumbnailURL":"http://gab.ivector.co.uk/CMS/DataObjects/ThirdPartyProperty/Image/ext157/imagethumb_156541_v1.jpg","@URL":"http://gab.ivector.co.uk/CMS/DataObjects/ThirdPartyProperty/Image/ext157/image_156541_v1.jpg","#name":"Image","#text":"","@CaptionText":"image01"},{"@URL":"http://gab.ivector.co.uk/CMS/DataObjects/ThirdPartyProperty/Image/ext157/image_156541_3505949.jpg","#name":"Image","#text":"","@CaptionText":"image02"},{"@URL":"http://gab.ivector.co.uk/CMS/DataObjects/ThirdPartyProperty/Image/ext157/image_156541_3505950.jpg","#name":"Image","#text":"","@CaptionText":"image03"}],"#name":"AccommodationSegment","@Supplier":"GA2","@AccommodationId":"1794988","Address":{"@Country":"US","@PostCode":"89101","#name":"Address","@CityOrTown":"Las Vegas Downtown","@Address3":"United States of America","@Address1":"202 Fremont St,","#text":"","@Address2":"Las Vegas"},"@EndDate":"20130401","AccommodationUnits":{"#name":"AccommodationUnits","#text":"","AccommodationUnit":[{"#name":"AccommodationUnit","@Name":"Double Standard","RoomRate":{"@SuppliersBoardCode":"2","@RateCode":"ZeM1fTkyGZdQsNOwOCuL1eBtoS4L78erQSJwMtC6mU6fFpF1ZrowUE/dzdqm7J50kFHOUm+xno0S6d1QY4qU9Hsl+tmIdz90pmusjr4X4oiJ71+cZVCpLbB2ynJHJNDnzg/uqkuQizb3tP6or5lQ4+lz/pVTpMTsBG07dD609RG6BeUTHo/8PaopPnaOYsQUMCqfOt0QfWE=","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130401","@StartDate":"20130329","#text":"","@Amount":"102.84","@BoardBasis":"RO"},"@AUID":"0|2 A","@MaxOccupancy":"2","#text":"","@QuantityAvailable":"1","@Code":"0|2 A","@MinOccupancy":"2"},{"#name":"AccommodationUnit","@Name":"Double Deluxe","RoomRate":{"@SuppliersBoardCode":"2","@RateCode":"ZeM1fTkyGZdQsNOwOCuL1eBtoS4L78erQSJwMtC6mU6fFpF1ZrowUE/dzdqm7J50kFHOUm+xno0S6d1QY4qU9Hsl+tmIdz90AV0baNvH7ivP1elUJN58RQMpKzK+FOmfX7Xl2kZQM5cS1oM2jHbAEJO+DtAUU9aERIopkeWYyl7D4kcTN0ZsCVLePWAy8kRG","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130401","@StartDate":"20130329","#text":"","@Amount":"118.36","@BoardBasis":"RO"},"@AUID":"0|2 A","@MaxOccupancy":"2","#text":"","@QuantityAvailable":"1","@Code":"0|2 A","@MinOccupancy":"2"},{"#name":"AccommodationUnit","@Name":"Double Suite","RoomRate":{"@SuppliersBoardCode":"2","@RateCode":"ZeM1fTkyGZdQsNOwOCuL1eBtoS4L78erQSJwMtC6mU6fFpF1ZrowUE/dzdqm7J50kFHOUm+xno0S6d1QY4qU9Hsl+tmIdz90bhLQ/ftR+GbOUJSTsEXkgHRE/nTQx7zOfQpd9LlnnG+woTwF8OOFtOWFmJ0ROUYGWI1LTWWkUWbpgUwxscFVzF+K/eFDVU/J","#name":"RoomRate","@Currency":"GBP","@EndDate":"20130401","@StartDate":"20130329","#text":"","@Amount":"219.3","@BoardBasis":"RO"},"@AUID":"0|2 A","@MaxOccupancy":"2","#text":"","@QuantityAvailable":"1","@Code":"0|2 A","@MinOccupancy":"2"}]},"@BasicAdultCost":"102.84","@SuppliersBoardCode":"2","@ClassCode":"3*","@ResortName":"Las Vegas - NV","@SupplierLocationId":"19|8326","@Availability":"available","@BookableByFAB":"true","AvailableBoardBasis":{"#name":"AvailableBoardBasis","#text":"RO"},"Description":{"#name":"Description","#text":"Location: The hotel is located in the heart of Fremont Street in downtown Las Vegas. It is close to Fashion Show Mall and Las Vegas Convention Center. The nearest airport is McCarran International Airport (LAS). Description: This classic glitter gulch landmark hotel offers old-fashioned glamour and low-cost gaming. The spacious guestrooms feature contemporary look and are equipped with all the essential facilities one can think of. It provides top quality family entertainment and round-the-clock excitement. Hotel amenities: 24-hour front desk, air conditioning, ATM(Cash machine), business center, concierge desk, Currency exchange, elevators, laundry/valet service, gift shop, Reception safe, tour/sightseeing desk, wheel chair access, wireless internet connection in public areas. Room amenities: Air conditioning, Coffee/Tea maker, Hairdryer, Internet access, Non-smoking, Safe, Shower, Smoking, Trouser/Pant press, Cable Television, Laundry, Movies, Telephone, Toiletries. Leisure amenities: Gambling. URL: http://www.fourqueens.com. Built: 1966. Renovated: 1999. Number of rooms: 690. Number of floors : 19. Number of handicapped rooms: 18. GPS Latitude: 36.1706970000. GPS Longitude: -115.1440320000. Food and beverage: . Value added: . Note: ."},"@ResortId":"1833","@BoardCode":"RO","@AccommodationCode":"1059915","@MaxChildAge":"12","@Currency":"GBP","@StartDate":"20130329"};
		
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
			this.model.set(this.model.parse(this.sampleData));
			
			
			var j = this.model.toJSON();
			
			expect(j.itineraryId).toEqual("si1238");
			expect(j.accommodationName).toEqual("Four Queens Hotel");
			expect(j.accommodationId).toEqual("1794988");
			expect(j.type).toEqual("Hotel");
			
			expect(j.resortName).toEqual("Las Vegas - NV");
			expect(j.resortId).toEqual("1833");
			expect(j.availableBoardBasis[0]).toEqual("RO");
			expect(j.boardCode).toEqual("RO");
			expect(j.classCode).toEqual("3*");
			
			expect(j.startDate).toEqual("20130329");
			expect(j.endDate).toEqual("20130401");
			expect(j.numNights).toEqual("3");

			expect(j.currency).toEqual("GBP");
			expect(j.availability).toEqual("available");
			expect(j.cost).toEqual("102.84");
			expect(j.bookable).toEqual("true");
			
			expect(j.maxChildAge).toEqual("12");
			expect(j.supplier).toEqual("GA2");
			
			expect(j.address.address1).toEqual("202 Fremont St,");
			expect(j.address.address2).toEqual("Las Vegas");
			expect(j.address.city).toEqual("Las Vegas Downtown");
			expect(j.address.postcode).toEqual("89101");
			expect(j.address.country).toEqual("US");
			
			expect(j.telephoneNumber).toEqual("702-385-4011");
			expect(j.description).toEqual("Location: The hotel is located in the heart of Fremont Street in downtown Las Vegas. It is close to Fashion Show Mall and Las Vegas Convention Center. The nearest airport is McCarran International Airport (LAS). Description: This classic glitter gulch landmark hotel offers old-fashioned glamour and low-cost gaming. The spacious guestrooms feature contemporary look and are equipped with all the essential facilities one can think of. It provides top quality family entertainment and round-the-clock excitement. Hotel amenities: 24-hour front desk, air conditioning, ATM(Cash machine), business center, concierge desk, Currency exchange, elevators, laundry/valet service, gift shop, Reception safe, tour/sightseeing desk, wheel chair access, wireless internet connection in public areas. Room amenities: Air conditioning, Coffee/Tea maker, Hairdryer, Internet access, Non-smoking, Safe, Shower, Smoking, Trouser/Pant press, Cable Television, Laundry, Movies, Telephone, Toiletries. Leisure amenities: Gambling. URL: http://www.fourqueens.com. Built: 1966. Renovated: 1999. Number of rooms: 690. Number of floors : 19. Number of handicapped rooms: 18. GPS Latitude: 36.1706970000. GPS Longitude: -115.1440320000. Food and beverage: . Value added: . Note: .");
			
			
			
			expect(j.images.length).toEqual(3);
			expect(j.rooms.length).toEqual(3);
		});
	});
	
});

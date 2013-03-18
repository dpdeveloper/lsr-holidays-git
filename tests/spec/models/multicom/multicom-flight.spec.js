describe("Multicom Flight Model", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
			
		this.sampleData = {"@LeadInPricePerPassenger":"1023.56","@BookingChannel":"WEB","@PassengerIdMandatory":"false","@PassengerIdRequired":"false","@NationalityMandatory":"false","@Currency":"GBP","@OneWayOnly":"false","Flight":{"@OutboundCabinClass":"economy","@ReturnHomeDepartDate":"20130527","@ReturnFlightBasePrice":"511.78","HomeboundSubSegments":[{"@ArrivalDate":"20130527","@DepartureDate":"20130527","@DeparturePoint":"LAS","@FlightNumber":"AB4511","@OperatingCarrier":"AB","@ArrivalPoint":"JFK","@OriginAirportName":"Las Vegas","@DestinationAirportName":"New York Jfk","#name":"HomeboundSubSegments","@ArrivalTime":"1620","@OperatedBy":"Air Berlin","@DepartureTime":"0815","#text":""},{"@ArrivalDate":"20130528","@DepartureDate":"20130527","@DeparturePoint":"JFK","@FlightNumber":"AB7249","@OperatingCarrier":"AB","@ArrivalPoint":"TXL","@OriginAirportName":"New York Jfk","@DestinationAirportName":"Berlin Tegel","#name":"HomeboundSubSegments","@ArrivalTime":"0725","@OperatedBy":"Air Berlin","@DepartureTime":"1730","#text":""},{"@ArrivalDate":"20130528","@DepartureDate":"20130528","@DeparturePoint":"TXL","@FlightNumber":"AB5003","@OperatingCarrier":"AB","@ArrivalPoint":"LHR","@OriginAirportName":"Berlin Tegel","@DestinationAirportName":"London Heathrow","#name":"HomeboundSubSegments","@ArrivalTime":"1320","@OperatedBy":"Air Berlin","@DepartureTime":"1220","#text":""}],"@ReturnCabinClass":"economy","@MarketingCarrier":"AB","@OutboundAirlineName":"Air Berlin","#text":"","@ReturnHomeDepartTime":"0815","OutboundSubSegments":[{"@ArrivalDate":"20130522","@DepartureDate":"20130522","@DeparturePoint":"LHR","@FlightNumber":"AB5000","@OperatingCarrier":"AB","@ArrivalPoint":"TXL","@OriginAirportName":"London Heathrow","@DestinationAirportName":"Berlin Tegel","#name":"OutboundSubSegments","@ArrivalTime":"1130","@OperatedBy":"Air Berlin","@DepartureTime":"0845","#text":""},{"@ArrivalDate":"20130522","@DepartureDate":"20130522","@DeparturePoint":"TXL","@FlightNumber":"AB7248","@OperatingCarrier":"AB","@ArrivalPoint":"JFK","@OriginAirportName":"Berlin Tegel","@DestinationAirportName":"New York Jfk","#name":"OutboundSubSegments","@ArrivalTime":"1545","@OperatedBy":"Air Berlin","@DepartureTime":"1300","#text":""},{"@ArrivalDate":"20130522","@DepartureDate":"20130522","@DeparturePoint":"JFK","@FlightNumber":"AB4692","@OperatingCarrier":"AB","@ArrivalPoint":"LAS","@OriginAirportName":"New York Jfk","@DestinationAirportName":"Las Vegas","#name":"OutboundSubSegments","@ArrivalTime":"1955","@OperatedBy":"Air Berlin","@DepartureTime":"1700","#text":""}],"@MultiLegReturnFlight":"true","@MultiLegOutboundFlight":"true","@ReturnHomeTime":"1320","@FareType":"NoFrills","@OriginAirport":"LHR","@DestinationAirport":"LAS","@ReturnFlightNumber":"AB4511","@ReturnAirlineName":"Air Berlin","@DestinationAirportName":"Las Vegas","@ReturnCarrier":"AB","#name":"Flight","@OutboundNumStops":"2","@DepartureTime":"0845","@ArrivalTime":"1955","@ReturnNumStops":"2","@OutboundCarrier":"AB","@DepartureDate":"20130522","@OutboundFlightClass":"economy","@ArrivalDate":"20130522","@OutboundFlightNumber":"AB5000","@ReturnHomeDate":"20130528","@ReturnFlightClass":"economy","@OutboundFlightBasePrice":"511.78","@OriginAirportName":"London Heathrow"},"@NumberOfNights":"5","@BookableByFAB":"true","#name":"PackageHoliday","@ItineraryId":"si1005","@Supplier":"AB","@Country":"US","@FlightOnly":"true","@NationalityRequired":"false","#text":""};
		
		$('#sandbox').show();
		
		require([
			'models/multicom/multicom-flight',
			], function(MulticomFlight) {
			
			that.model = new MulticomFlight();
			
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
		
		
		it('Can Set from JSON', function(){
		
			this.model.set(this.model.parse(this.sampleData));
				
			var j = this.model.toJSON();
			
			expect(j.itineraryId).toEqual("si1005");
			expect(j.supplier).toEqual("AB");
			expect(j.numberOfNights).toEqual(5);
			expect(j.oneWay).toEqual(false);
			expect(j.bookable).toEqual(true);
			
			expect(j.originAirport).toEqual("LHR");
			expect(j.originAirportName).toEqual("London Heathrow");
			expect(j.destinationAirport).toEqual("LAS");
			expect(j.destinationAirportName).toEqual("Las Vegas");
			
			expect(j.departureDate).toEqual("20130522");
			expect(j.departureTime).toEqual("0845");
			expect(j.arrivalDate).toEqual("20130522");
			expect(j.arrivalTime).toEqual("1955");
			
			expect(j.returnHomeDepartDate).toEqual("20130527");
			expect(j.returnHomeDepartTime).toEqual("0815");
			expect(j.returnHomeDate).toEqual("20130528");
			expect(j.returnHomeTime).toEqual("1320");
			
			expect(j.priceTotal).toEqual(1023.56);
			expect(j.priceOutboundBase).toEqual(511.78);
			expect(j.priceReturnBase).toEqual(511.78);
			
			expect(j.outboundCarrier).toEqual("AB");
			expect(j.outboundAirlineName).toEqual("Air Berlin");
			expect(j.outboundFlightClass).toEqual("economy");
			expect(j.outboundFlightNumber).toEqual("AB5000");
			
			expect(j.outboundMultiLeg).toEqual(true);
			
			expect(j.returnCarrier).toEqual("AB");
			expect(j.returnAirlineName).toEqual("Air Berlin");
			expect(j.returnFlightClass).toEqual("economy");
			expect(j.returnFlightNumber).toEqual("AB4511");

			expect(j.returnMultiLeg).toEqual(true);
			
			expect(j.marketingCarrier).toEqual('AB');
			expect(j.fareClass).toEqual('NoFrills');
			
			//multileg
			
			expect(j.outboundNumStops).toEqual(2);
			expect(j.returnNumStops).toEqual(2);
			
			expect(j.outboundSubSegments.length).toEqual(3);
			expect(j.returnSubSegments.length).toEqual(3);
			
			var s = j.outboundSubSegments[0];
			expect(s.departurePoint).toEqual('LHR');
			expect(s.departureDate).toEqual('20130522');
			expect(s.departureTime).toEqual('0845');
			expect(s.arrivalPoint).toEqual('TXL');
			expect(s.arrivalDate).toEqual('20130522');
			expect(s.arrivalTime).toEqual('1130');
			
			expect(s.operatingCarrier).toEqual('AB');
			expect(s.operatedBy).toEqual('Air Berlin');
			expect(s.flightNumber).toEqual('AB5000');
			
			expect(s.originAirportName).toEqual('London Heathrow');
			expect(s.destinationAirportName).toEqual('Berlin Tegel');
			
			expect(j.returnSubSegments[0].flightNumber).toEqual('AB4511');
			
		});
	});
	
});

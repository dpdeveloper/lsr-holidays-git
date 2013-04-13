describe("FlightDetailView", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'views/search-ui/flights/flight.detail.view',
			'models/multicom/multicom-flight'
			], function(Backbone, Marionette, FlightDetailView, MulticomFlight) {
			
			that.MulticomFlight = MulticomFlight
			that.sampleFlight = new that.MulticomFlight();
			
			that.sampleFlight.set(
				that.sampleFlight.parse({
				  "#name" : "PackageHoliday",
				  "#text" : "",
				  "@ItineraryId" : "si1009",
				  "@Supplier" : "BAW",
				  "@NumberOfNights" : "5",
				  "@LeadInPricePerPassenger" : "917.57",
				  "@FlightOnly" : "true",
				  "@OneWayOnly" : "false",
				  "@BookableByFAB" : "true",
				  "@Currency" : "GBP",
				  "@BookingChannel" : "XML",
				  "Flight" : {
				    "#name" : "Flight",
				    "#text" : "",
				    "@OriginAirport" : "LHR",
				    "@DestinationAirport" : "LAS",
				    "@DepartureDate" : "20130522",
				    "@DepartureTime" : "1640",
				    "@ReturnHomeDate" : "20130528",
				    "@ReturnHomeTime" : "1500",
				    "@ReturnHomeDepartDate" : "20130527",
				    "@ReturnHomeDepartTime" : "2115",
				    "@ArrivalDate" : "20130522",
				    "@ArrivalTime" : "1910",
				    "@OutboundFlightNumber" : "BA0275",
				    "@ReturnFlightNumber" : "BA0274",
				    "@OutboundFlightBasePrice" : "456.54",
				    "@ReturnFlightBasePrice" : "456.53",
				    "@OutboundCarrier" : "BA",
				    "@ReturnCarrier" : "BA",
				    "@MarketingCarrier" : "BA",
				    "@FareClass" : "economy-economy",
				    "@OutboundAirlineName" : "British Airways",
				    "@ReturnAirlineName" : "British Airways",
				    "@OriginAirportName" : "London Heathrow",
				    "@DestinationAirportName" : "Las Vegas",
				    "@OutboundCabinClass" : "economy",
				    "@ReturnCabinClass" : "economy"
				  }
			}));
			
			that.sampleMultilegFlight = new that.MulticomFlight();
			that.sampleMultilegFlight.set(
				that.sampleMultilegFlight.parse({
				  "#name" : "PackageHoliday",
				  "#text" : "",
				  "@ItineraryId" : "si1006",
				  "@Supplier" : "AB",
				  "@Country" : "US",
				  "@NumberOfNights" : "5",
				  "@LeadInPricePerPassenger" : "1068.66",
				  "@FlightOnly" : "true",
				  "@OneWayOnly" : "false",
				  "@BookableByFAB" : "true",
				  "@Currency" : "GBP",
				  "@BookingChannel" : "WEB",
				  "@PassengerIdRequired" : "false",
				  "@PassengerIdMandatory" : "false",
				  "@NationalityRequired" : "false",
				  "@NationalityMandatory" : "false",
				  "Flight" : {
				    "#name" : "Flight",
				    "#text" : "",
				    "@OriginAirport" : "LHR",
				    "@DestinationAirport" : "LAS",
				    "@DepartureDate" : "20130522",
				    "@DepartureTime" : "0845",
				    "@ReturnHomeDate" : "20130528",
				    "@ReturnHomeTime" : "1525",
				    "@OutboundFlightClass" : "economy",
				    "@ReturnFlightClass" : "economy",
				    "@ReturnHomeDepartDate" : "20130527",
				    "@ReturnHomeDepartTime" : "1005",
				    "@ArrivalDate" : "20130522",
				    "@ArrivalTime" : "1955",
				    "@OutboundFlightNumber" : "AB5000",
				    "@ReturnFlightNumber" : "AB4551",
				    "@OutboundFlightBasePrice" : "534.33",
				    "@ReturnFlightBasePrice" : "534.33",
				    "@MultiLegOutboundFlight" : "true",
				    "@MultiLegReturnFlight" : "true",
				    "@OutboundCarrier" : "AB",
				    "@ReturnCarrier" : "AB",
				    "@MarketingCarrier" : "AB",
				    "@OutboundNumStops" : "2",
				    "@ReturnNumStops" : "2",
				    "@OutboundAirlineName" : "Air Berlin",
				    "@ReturnAirlineName" : "Air Berlin",
				    "@OriginAirportName" : "London Heathrow",
				    "@DestinationAirportName" : "Las Vegas",
				    "@FareType" : "NoFrills",
				    "@OutboundCabinClass" : "economy",
				    "@ReturnCabinClass" : "economy",
				    "OutboundSubSegments" : [
				      {
				        "#name" : "OutboundSubSegments",
				        "#text" : "",
				        "@DeparturePoint" : "LHR",
				        "@DepartureDate" : "20130522",
				        "@DepartureTime" : "0845",
				        "@ArrivalPoint" : "TXL",
				        "@ArrivalDate" : "20130522",
				        "@ArrivalTime" : "1130",
				        "@OperatingCarrier" : "AB",
				        "@OperatedBy" : "Air Berlin",
				        "@FlightNumber" : "AB5000",
				        "@OriginAirportName" : "London Heathrow",
				        "@DestinationAirportName" : "Berlin Tegel"
				      },
				      {
				        "#name" : "OutboundSubSegments",
				        "#text" : "",
				        "@DeparturePoint" : "TXL",
				        "@DepartureDate" : "20130522",
				        "@DepartureTime" : "1300",
				        "@ArrivalPoint" : "JFK",
				        "@ArrivalDate" : "20130522",
				        "@ArrivalTime" : "1545",
				        "@OperatingCarrier" : "AB",
				        "@OperatedBy" : "Air Berlin",
				        "@FlightNumber" : "AB7248",
				        "@OriginAirportName" : "Berlin Tegel",
				        "@DestinationAirportName" : "New York Jfk"
				      },
				      {
				        "#name" : "OutboundSubSegments",
				        "#text" : "",
				        "@DeparturePoint" : "JFK",
				        "@DepartureDate" : "20130522",
				        "@DepartureTime" : "1700",
				        "@ArrivalPoint" : "LAS",
				        "@ArrivalDate" : "20130522",
				        "@ArrivalTime" : "1955",
				        "@OperatingCarrier" : "AB",
				        "@OperatedBy" : "Air Berlin",
				        "@FlightNumber" : "AB4692",
				        "@OriginAirportName" : "New York Jfk",
				        "@DestinationAirportName" : "Las Vegas"
				      }
				    ],
				    "HomeboundSubSegments" : [
				      {
				        "#name" : "HomeboundSubSegments",
				        "#text" : "",
				        "@DeparturePoint" : "LAS",
				        "@DepartureDate" : "20130527",
				        "@DepartureTime" : "1005",
				        "@ArrivalPoint" : "LAX",
				        "@ArrivalDate" : "20130527",
				        "@ArrivalTime" : "1120",
				        "@OperatingCarrier" : "AB",
				        "@OperatedBy" : "Air Berlin",
				        "@FlightNumber" : "AB4551",
				        "@OriginAirportName" : "Las Vegas",
				        "@DestinationAirportName" : "Los Angeles"
				      },
				      {
				        "#name" : "HomeboundSubSegments",
				        "#text" : "",
				        "@DeparturePoint" : "LAX",
				        "@DepartureDate" : "20130527",
				        "@DepartureTime" : "1455",
				        "@ArrivalPoint" : "TXL",
				        "@ArrivalDate" : "20130528",
				        "@ArrivalTime" : "1100",
				        "@OperatingCarrier" : "AB",
				        "@OperatedBy" : "Air Berlin",
				        "@FlightNumber" : "AB7023",
				        "@OriginAirportName" : "Los Angeles",
				        "@DestinationAirportName" : "Berlin Tegel"
				      },
				      {
				        "#name" : "HomeboundSubSegments",
				        "#text" : "",
				        "@DeparturePoint" : "TXL",
				        "@DepartureDate" : "20130528",
				        "@DepartureTime" : "1430",
				        "@ArrivalPoint" : "LHR",
				        "@ArrivalDate" : "20130528",
				        "@ArrivalTime" : "1525",
				        "@OperatingCarrier" : "AB",
				        "@OperatedBy" : "Air Berlin",
				        "@FlightNumber" : "AB5011",
				        "@OriginAirportName" : "Berlin Tegel",
				        "@DestinationAirportName" : "London Heathrow"
				      }
				    ]
				  }
			}));
			
			that.view = new FlightDetailView({model: that.sampleFlight});
			
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
			expect(this.view).not.toBeNull();
		});

		it('SerializeData performs correct time calculations for a single leg flight', function(){
			var d= this.view.serializeData();
			
			expect(d.Inboundtimespan).toEqual("17h 45m ");
			expect(d.Outboundtimespan).toEqual("2h 30m ");
			expect(d.arrivalDate).toEqual("20130522");
			expect(d.arrivalTime).toEqual("1910");
			expect(d.arrivalTimeformat).toEqual("19:10");
			expect(d.departureDate).toEqual("20130522");
			expect(d.departureTime).toEqual("1640");
			expect(d.outboundMultiLeg).toEqual(false);
			expect(d.returnMultiLeg).toEqual(false);
			/*expect(d.).toEqual();
			expect(d.).toEqual();
			expect(d.).toEqual();
			expect(d.).toEqual();
			expect(d.).toEqual();*/
			
		});
		it('SerializeData performs correct time calculations for a multi leg flight', function(){
			this.view.model = this.sampleMultilegFlight
			var d= this.view.serializeData();
			
			expect(d.Inboundtimespan).toEqual("29h 20m ");
			expect(d.Outboundtimespan).toEqual("11h 10m ");
			expect(d.arrivalDate).toEqual("20130522");
			expect(d.arrivalTime).toEqual("1955");
			expect(d.arrivalTimeformat).toEqual("19:55");
			expect(d.departureDate).toEqual("20130522");
			expect(d.departureTime).toEqual("0845");
			expect(d.departureTimeformat).toEqual("08:45");

			expect(d.outboundMultiLeg).toEqual(true);
			expect(d.returnMultiLeg).toEqual(true);
			
			//subsegments
			expect(d.outboundSubSegments.length).toEqual(3);
			var s = d.outboundSubSegments[0];
			expect(s.OutBoundStopOver).toEqual("1h 30m ");
			expect(s.arrivalTimeFormat).toEqual("11:30");
			expect(s.departureTimeFormat).toEqual("08:45");
			expect(s.outboundSubSegmentstimespan).toEqual("2h 45m ");
			
			expect(d.returnSubSegments.length).toEqual(3);
			var o = d.returnSubSegments[0];
			expect(o.InBoundStopOver).toEqual("3h 35m ");
			expect(o.arrivalTimeFormat).toEqual("11:20");
			expect(o.departureTimeFormat).toEqual("10:05");
			expect(o.inboundSubSegmentstimespan).toEqual("1h 15m ");

			expect(o.arrivalDate).toEqual("20130527");
			/*expect(d.).toEqual();
			expect(d.).toEqual();
			expect(d.).toEqual();
			expect(d.).toEqual();
			expect(d.).toEqual();*/
			
		});

		it('Adds to DOM', function(){
			this.region.show(this.view);
			expect(this.view.$el).toBeVisible();
		});
		
	});
});

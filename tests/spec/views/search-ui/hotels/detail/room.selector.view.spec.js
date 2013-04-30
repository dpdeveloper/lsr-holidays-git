describe("RoomSelectorView", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'views/search-ui/hotels/detail/room.selector.view',
			'models/multicom/multicom-room'
			], function(Backbone, Marionette, RoomSelectorView, MulticomRoom) {
					
			that.MulticomRoom = MulticomRoom
			that.sampleRoom = new that.MulticomRoom();
			
			that.sampleRoom.set(
				that.sampleRoom.parse({
				  "@Availability":"available",
				  "#text" : "",
				  "@ItineraryId" : "si1128",
				  "@BookableByFAB" : "true",
				  "@Currency" : "GBP",
				  "AccommodationUnit" : [
				 {
				    "#name" : "AccommodationUnit",
				    "#text" : "",
				    "@Name":"DOUBLE STANDARD",
						"RoomRate" : {
							"#name" : "RoomRate",
							"#text" : "",
							"@StartDate" : "20130329",
							"@EndDate" : "20130401",
							"@RateId" : "A5TIbjDa16pmC9J9xhHCSQ==",
							"@Amount" : "150.65",
							"@Currency" : "GBP",
							"@BoardBasis" : "RO",
							"@SuppliersBoardCode" : "RO-U10"
						},
					"@MaxOccupancy":"2",
					"@MaxExtraInfants":"0",
					"@MaxExtraChildren":"0",
					"@QuantityAvailable":"1",
					"@Code":"1:2:0:0:DBL-U10:ST:GC-B2B",
					"@RoomType":"DBL-U10:ST",
					"@MinOccupancy":"2"
				  },
				 {
					"#name" : "AccommodationUnit",
					"#text" : "",
					"@Name" : "DOUBLE COURTYARD",
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
					},
					"@MaxOccupancy":"2",
					"@MaxExtraInfants":"0",
					"@MaxExtraChildren":"0",
					"@QuantityAvailable":"1",
					"@Code" : "1:2:0:0:DBL-U10:CY:GC-B2C",
					"@RoomType" : "DBL-U10:CY",
					"@MinOccupancy":"2"
				  },
				 {
					"#name" : "AccommodationUnit",
					"#text" : "",
					"@Name" : "DOUBLE LUXURY ROOM-TOWER ROOM",
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
					},
					"@MaxOccupancy":"2",
					"@MaxExtraInfants":"0",
					"@MaxExtraChildren":"0",
					"@QuantityAvailable":"1",
					"@Code" : "1:2:0:0:DBL-U10:LX-TW:GC-B2C",
					"@RoomType" : "DBL-U10:LX-TW",
					"@MinOccupancy":"2"
				  },
				  ]
					
			}));

			that.view = new RoomSelectorView();
			
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
		it('SerializeData checks occupancy capacity for a multi room ', function(){
			var d= this.view.serializeData();
			
			expect(d.MaxOccupancy).toEqual("2");
			expect(d.MinOccupancy).toEqual("2");
			expect(d.MaxExtraInfants).toEqual("0");
			expect(d.MaxExtraChildren).toEqual("0");
			
		});

		it('Adds to DOM', function(){
			this.region.show(this.view);
			expect(this.view.$el).toBeVisible();
		});
	});
});

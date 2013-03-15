describe("SearchUIHotelsDetailLayout", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette','reqres',
			'views/search-ui/hotels/detail/hotels.detail.layout',
			'models/booking',
			'models/multicom/multicom-accommodation',
			'models/multicom/multicom-flight',
			'models/holiday-search'
			], function(
				Backbone, Marionette, reqres, 
				SearchUIHotelsDetailLayout,
				Booking,
				MulticomAccommodation,
				MulticomFlight,
				HolidaySearch
				) {
			that.Booking = Booking;
			that.MulticomAccommodation = MulticomAccommodation;
			that.MulticomFlight = MulticomFlight;
			that.HolidaySearch = HolidaySearch;
			that.reqres = reqres;
			
			that.reqres.addHandler('search:get:booking',function(){
				return new Booking({
						selectedHotel: new MulticomAccommodation({accommodationName: 'test'}),
						selectedFlight: new MulticomFlight({}),
						holidaySearch: new HolidaySearch({})
				});
			});
			
			
			that.layout = new SearchUIHotelsDetailLayout();
			
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
			expect(this.layout).not.toBeNull();
		});
		it('Can Add to DOM', function(){
			this.region.show(this.layout);
			expect(this.layout.$el).toBeVisible();
		});
	});
});

describe("Travellers Layout", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		
		require([
			'backbone','marionette',
			'views/search-ui/travellers/travellers.layout',
			'models/booking'
			], function(Backbone, Marionette, TravellersLayout, Booking) {
			
			that.Booking = Booking;
			that.layout = new TravellersLayout({model: new Booking()});
			
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
		
		it('Can Add to Dom', function(){
			this.region.show(this.layout);
			expect(this.region.$el).toBeVisible();
		});
		
		it('Validates the passed model', function(){
			var m = this.layout.model;
			expect(m.get('travellersInfo').length).toEqual(m.get('holidaySearch').getTravellers().length);
		});
	});
	

});

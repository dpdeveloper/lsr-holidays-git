describe("TravellersEditLayout", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'views/search-ui/travellers/travellers.edit.layout',
			'models/booking'
			], function(Backbone, Marionette, TravellersEditLayout, Booking) {

			that.layout = new TravellersEditLayout();
			that.Booking = Booking;
			
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
		it('Can add to DOM', function(){
			this.region.show(this.layout);
			expect(this.layout.$el).toBeVisible();
		});
	});
	
	describe('Rendering', function(){
		it('Renders the correct number of views', function(){
			var b = new this.Booking();
			b.get('holidaySearch').set({
				numRooms: 2,
				adultCsv: '2,1',
				childCsv: '0,1',
				infantCsv: '0,0'
			});
			b._validateTravellersInfo();
			
			this.layout.model.set(b.toJSON());
			
			this.region.show(this.layout);
			
			expect(this.layout._views.adult.collection.length).toEqual(3);
			expect(this.layout._views.child.collection.length).toEqual(1);
			expect(this.layout._views.infant).toBeNull();

		});
	});
});

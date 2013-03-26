describe("SearchUIHotelsBrowseItemView", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'views/search-ui/hotels/hotels.browse.item.view',
			'models/multicom/multicom-accommodation'
			], function(Backbone, Marionette, SearchUIHotelsBrowseItemView,MulticomAccommodation) {
			that.SearchUIHotelsBrowseItemView = SearchUIHotelsBrowseItemView;
			that.view = new SearchUIHotelsBrowseItemView();
			that.MulticomAccommodation = MulticomAccommodation;
			
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
		it('Can add to DOM', function(){
			this.region.show(this.view);
			expect(this.view.$el).toBeVisible();
		});
	});
	describe('Rendering', function(){
		it('Renders the correct price', function(){
			var m = new this.MulticomAccommodation({
				cost: '99.99'	
			});
			this.view.model = m;
			
			this.region.show(this.view);
			
			expect($('.price').html()).toContain('99.99');
		});
		it('Renders the correct price when a fixed price is added', function(){
			var m = new this.MulticomAccommodation({
				cost: '99.99'
			});
			this.view = new this.SearchUIHotelsBrowseItemView({
				model: m,
				extraCost: 200
			});
			this.region.show(this.view);
			
			expect($('.price').html()).toContain('299.99');
		});
	});
});

describe("SearchUIHotelsBrowseView", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'views/search-ui/hotels/hotels.browse.view',
			'models/multicom/multicom-accommodation',
			'collections/multicom-accommodation'
			], function(Backbone, Marionette, SearchUIHotelsBrowseView, MulticomHotel, MulticomHotelCollection) {

			that.view = new SearchUIHotelsBrowseView();
			that.SearchUIHotelsBrowseView = SearchUIHotelsBrowseView;
			
			that.MulticomHotel = MulticomHotel;
			that.MulticomHotelCollection = MulticomHotelCollection;
			
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
		it('If initialised with a selected View, it sets it initially to selected', function(){
			this.view.close(); this.view=null;
			
			
			var m = new this.MulticomHotel({
				accommodationName: 'test',
				description: 'test'
			});
			var mm = new this.MulticomHotel({
				accommodationName: 'test2',
				description: 'test2'
			});
		
			var c = new this.MulticomHotelCollection([m, mm]);
			
			this.view = new this.SearchUIHotelsBrowseView({
				collection: c,
				selectedHotel: m
			});
			
			expect(this.view._initialHotel).toEqual(m);
			
			this.region.show(this.view);
			
			//selected child should be selected
			expect(this.view.children.findByModel(m).$el).toHaveClass('selected');
			//other model shouldn't
			expect(this.view.children.findByModel(mm).$el).not.toHaveClass('selected');
		});
		
	});
	
	
	
});

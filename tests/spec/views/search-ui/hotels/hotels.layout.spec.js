describe("SearchUIHotelsLayout", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'views/search-ui/hotels/hotels.layout'
			], function(Backbone, Marionette, SearchUIHotelsLayout) {

			that.layout = new SearchUIHotelsLayout();
			
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
});

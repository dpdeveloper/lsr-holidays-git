describe("TravellersEditCollectionView", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'views/search-ui/travellers/travellers.edit.collection.view'
			], function(Backbone, Marionette, TravellersEditCollectionView) {

			that.view = new TravellersEditCollectionView();
			
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
		it('Adds to DOM', function(){
			this.region.show(this.view);
			expect(this.view.$el).toBeVisible();
		});
	});
});

describe("ContentHomeAbout", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'models/content/home-about'
			], function(Backbone, Marionette, ContentHomeAbout) {

			that.model = new ContentHomeAbout();
			
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
			expect(this.model).not.toBeNull();
		});
	});
});

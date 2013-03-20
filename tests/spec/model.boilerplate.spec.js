describe("MODEL_NAME", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'model/MODEL_PATH'
			], function(Backbone, Marionette, MODEL_NAME) {

			that.model = new MODEL_NAME();
			
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

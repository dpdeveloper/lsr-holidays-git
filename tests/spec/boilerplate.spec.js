describe("DESCRIPTION", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'PATH'
			], function(Backbone, Marionette, OBJECT) {

			that.model = new OBJECT();
			
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
	
	
	/* Async Code */
	/*
	describe('Async', function(){
				
		var flag;
		it('...', function(){
			runs(function(){
				flag=false;
				var self = this;
				// SPYING FOR EVENTS
				// spyOn(this.ITEM, "trigger");
				
				this.ITEM.DO_ASYNC_FUNCTION ITEM({});
				
				setInterval(function() {
					if(!self.ITEM.ASYNC_CONDITION()){
						flag = true;clearInterval();
					}
				}, 10);	
			});
			
			waitsFor(function(){
				return flag;
			});
			
			runs(function(){
				// EXPECTATIONS
			});
		});
	});
	*/
});

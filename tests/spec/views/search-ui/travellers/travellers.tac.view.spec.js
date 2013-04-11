describe("TravellersTACView", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette','vent',
			'views/search-ui/travellers/travellers.tac.view'
			], function(Backbone, Marionette, vent, TravellersTACView) {

			that.view = new TravellersTACView();
			that.vent = vent;
			
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
		it('Add to DOM', function(){
			this.region.show(this.view);			
			expect(this.view.$el).toBeVisible();
		});
	});
	
	describe('Interactions', function(){
		
		it('On click of tac-item, colour changes', function(){
			this.region.show(this.view);
			
			expect(this.view.ui.items[0]).toHaveClass('invalid');
			
			$(this.view.ui.items[0]).trigger('click');
			
			expect(this.view.ui.items[0]).toHaveClass('valid');
		});
		
		it('Once all checkboxes are ticked, the message changes', function(){
			this.region.show(this.view);
			$(this.view.ui.items).trigger('click');
			
			expect(this.view._status).toEqual(this.view._lang.go);
			expect(this.view.ui.msg).toHaveText(this.view._lang.go);
			expect(this.view.ui.status).toHaveClass('valid');
		});
		
		it('If submit is clicked and disabled, nothing happens', function(){
			this.region.show(this.view);
			
			var complete = false;
			this.view.listenTo(this.vent,'search:travellers:complete',function(){
				complete = true;
			});
			this.view.ui.submit.trigger('click');
			expect(complete).toBeFalsy();
			
			
		});
		
		it('If submit is clicked enabled, message fired', function(){
			this.region.show(this.view);
			
			var complete = false;
			this.view.listenTo(this.vent,'search:travellers:complete',function(){
				complete = true;
			});
			
			$(this.view.ui.items).trigger('click');
			this.view.ui.submit.trigger('click');
			
			expect(complete).toBeTruthy();
			
			
		});
		
	});
});

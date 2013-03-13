describe("Multiload", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'models/multiload'
			], function(Backbone, Marionette, Multiload) {

			that.model = new Multiload();
			
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
		it('Defaults to be set', function(){
			var m = this.model.toJSON();
			
			expect(m.isReady).toBeTruthy();
			expect(m.fetchRequestTotal).toEqual(0);
			expect(m.fetchRequestComplete).toEqual(0);
		});
	});
	describe('Loading Behaviour', function(){
		it('Should increment the counter on addLoadingRequest', function(){
			this.model.addLoadingRequest(function(){return;});
			expect(this.model.get('fetchRequestTotal')).toEqual(1);
			expect(this.model.get('isReady')).toBeFalsy();
			
			this.model.addLoadingRequest(function(){return;});
			expect(this.model.get('fetchRequestTotal')).toEqual(2);
		});
		it('addLoadingRequest can accept arrays and incremenets per each array item', function(){
			this.model.addLoadingRequest([
				function(){return;},
				function(){return;},
				function(){return;}
			]);
			
			expect(this.model.get('fetchRequestTotal')).toEqual(3);
			
		});
		it('Should callback when all requests are loaded', function(){
			var a = false;
			
			this.model.addLoadingRequest(function(){return;});
			this.model.addLoadingRequest(function(){return;});
			
			var fx = function(){
				a = true;
			};
			expect(a).toBeFalsy();
			
			this.model.loadingQueue(fx);
			
			this.model.loadingCallback();
			expect(a).toBeFalsy();
			
			this.model.loadingCallback();
			expect(a).toBeTruthy();
		});
		it('Should callback immediately if no loading requests by default', function(){
			var a = false;
			
			var fx = function(){
				a = true;
			};
			this.model.loadingQueue(fx);
			expect(a).toBeTruthy();
		});
		it('Should not callback immediately if executeNow is false', function(){
			var a = false;
			
			var fx = function(){
				a = true;
			};
			this.model.loadingQueue(fx,false);
			expect(a).toBeFalsy();
		});
		
		it('c Should serve as a shortcut to callback', function(){
			spyOn(this.model,'loadingCallback');
			this.model.c();
			expect(this.model.loadingCallback).toHaveBeenCalled();
		});
		
		it('l Should serve as a shortcut to addLoadingRequest', function(){
			spyOn(this.model,'addLoadingRequest');
			this.model.l();
			expect(this.model.addLoadingRequest).toHaveBeenCalled();
		});
		
		it('q Should serve as a shortcut to loadingQueue', function(){
			spyOn(this.model,'loadingQueue');
			this.model.q();
			expect(this.model.loadingQueue).toHaveBeenCalled();
		});
	});
});

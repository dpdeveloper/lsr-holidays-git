describe("A Symphony Airline Collection", function() {
	
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
	
		require([
			'collections/symphony-airline'
			], function(SymphonyAirlineCollection) {
			that.collection = new SymphonyAirlineCollection();
			
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {});
	
	
	/* Default Spec Code */
	describe('Initialize Correctly', function(){
		it('url is set correctly', function(){
			expect(this.collection.url.indexOf('/json/airlines') !== -1).toBeTruthy();
		});
	});
	
	describe('setTestMode function', function(){
		it('Changes the URL between test mode', function(){
			this.collection.setTestMode(true);
			expect(this.collection.url.indexOf('/json-test') !== -1).toBeTruthy();
			
			this.collection.setTestMode(false);
			expect(this.collection.url.indexOf('/json-test') !== -1).toBeFalsy();
			expect(this.collection.url.indexOf('/json/airlines') !== -1).toBeTruthy();
		});
		
	});
	

	describe('fetch functionality', function(){
				
		var flag;
		var error;
		it('should load test data correctly from a fetch command', function(){
			runs(function(){
				flag=false;
				error=false;
				var self = this;
				
				this.collection.setTestMode(true);
				this.collection.fetch({
					success: function(){
						flag=true;
					},
					error: function(){
						flag=true;
						error=true;
					}
				});
			});
			
			waitsFor(function(){
				return flag;
			});
			
			runs(function(){
				expect(error).toBeFalsy();
				expect(this.collection.length).toEqual(2);
				expect(this.collection.at(0).get('code')).toEqual('BA');
			});
		});
	});
	
	describe('getAirlineFromCode', function(){
		var flag;
		it('should load test data correctly from a fetch command', function(){
			runs(function(){
				flag=false;
				var self = this;
				
				this.collection.setTestMode(true);
				this.collection.fetch({
					success: function(){flag=true;},
					error: function(){flag=true;}
				});
			});
			
			waitsFor(function(){
				return flag;
			});
			
			runs(function(){
				expect(this.collection.getAirlineFromCode('BA').title).toEqual('British Airways');
			});
		});
		
		it('should return null if nothing is found', function(){
			expect(this.collection.getAirlineFromCode('ASDASA')).toBeNull();
		});
		
	});

});

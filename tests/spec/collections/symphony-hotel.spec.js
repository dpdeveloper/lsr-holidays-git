describe("Symphony Hotel Collection", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'collections/symphony-hotel',
			'collections/multicom-accommodation'
			], function(SymphonyHotelCollection, MulticomAccommodationCollection) {
			
			that.collection = new SymphonyHotelCollection();
			that.mcAccomCollection = new MulticomAccommodationCollection();
			that.mcAccomCollection.setTestMode(true);
			
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {
		$('#sandbox').html('');
		$('#sandbox').hide();
	});
	
	
	/* Default Spec Code */
	describe('Initializes', function(){
		it('Is Not Null', function(){
			expect(this.collection).not.toBeNull();
		});
	});
	
	
	describe('Can load (test) data', function(){
				
		var flag;
		it('Load and Combine Data', function(){
			runs(function(){
				
				flag=false;
				var self = this;
				
				spyOn(this.collection, "trigger");
				
				this.collection.fetchDestination('las-vegas');
				
				setInterval(function() {
					if(	!self.collection.isLoading()){
						flag = true;clearInterval();
					}
				}, 10);
			});
			
			waitsFor(function(){
				return flag;
			});
			
			runs(function(){
				expect(this.collection.trigger).toHaveBeenCalledWith('complete');
				expect(this.collection.length).toEqual(5);
			});
		});
	});

	describe('Can combine data with multicom', function(){
				
		var flag;
		it('Load and Combine Data', function(){
			runs(function(){
				flag=false;
				var self = this;

				
				this.collection.fetchDestination('las-vegas');
				this.mcAccomCollection.performSearch({});
				
				setInterval(function() {
					if(	!self.collection.isLoading() &&
						!self.mcAccomCollection.isLoading()){
						
						flag = true;clearInterval();
					}
				}, 10);
			});
			
			waitsFor(function(){
				return flag;
			});
			
			runs(function(){
				expect(this.collection.length).toEqual(5);
				expect(this.mcAccomCollection.length).toEqual(71);
				
				//do the combining
				this.collection.combineWithMulticomData(this.mcAccomCollection);
				
				expect(this.collection.length).toEqual(71);
				
				//check symData is set correctly
				expect(this.collection.filter(function(item){
					return item.get('symData') === true;
				}).length).toEqual(4);
				
				//mcData should be true for ALL
				expect(this.collection.filter(function(item){
					return item.get('mcData') === true;
				}).length).toEqual(71);

			});
		});
	});

});

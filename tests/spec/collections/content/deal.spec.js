describe("ContentDealCollection", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'collections/content/deal'
			], function(Backbone, Marionette, ContentDealCollection) {

			that.collection = new ContentDealCollection();
			
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
			expect(this.collection).not.toBeNull();
		});
		it('Can set test mode', function(){
			expect(this.collection.url).not.toMatch('json-test');
			
			this.collection.setTestMode(true);
			expect(this.collection.url).toMatch('json-test');
		});
	});
	
	describe('Fetch and Parse Data', function(){
		var flag, error;
		it('Can fetch and parse sample data', function(){
			runs(function(){
				flag = false;
				error = false;
				this.collection.setTestMode(true);
				this.collection.fetch({
					success: function(collection,response,options){
						flag = true;
					},
					error: function(colleciton,response,options){
						flag=true; error=true;
					}
				});
			});
			waitsFor(function(){
				return flag;
			});
			runs(function(){
				expect(error).toBeFalsy();
				
				expect(this.collection.length).toEqual(1);
				var m = this.collection.at(0);
				
				expect(m.get('title')).toEqual('Sample Deal');
			});
		});
	});
	
	
});

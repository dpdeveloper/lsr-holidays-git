describe("SearchFormView", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'backbone','marionette',
			'views/page/search.form.view',
			'models/holiday-search'
			], function(Backbone, Marionette, SearchFormView, HolidaySearch) {

			that.view = new SearchFormView();
			that.HolidaySearch = HolidaySearch;
			that.SearchFormView = SearchFormView;
			
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
		it('Can add to DOM', function(){
			this.region.show(this.view);
			
			expect(this.view.$el).toBeVisible();
		});
		
		it('Populates fields from the model', function(){
			var m =new this.HolidaySearch({
				destination: 'new york',
				dateStart: '22/05/2013',
				numNights: 5,
				departingFrom: 'LHR'
			});
			m.setOccupancy([
				{adults: 2, children: 3},
				{adults: 1, children: 1}	
			]);
			
			this.view.close();
			this.view = new this.SearchFormView({model: m});
			this.region.show(this.view);
			
			expect(this.view.ui.fieldDestination.val()).toEqual('new york');
			expect(this.view.ui.dateStart.val()).toEqual('22/05/2013');
			expect(this.view.ui.dateEnd.val()).toEqual('27/05/2013');
			expect(this.view.ui.fieldDeparture.val()).toEqual('LHR');
			expect(this.view.ui.fieldNumRooms.val()).toEqual('2');
			
			var o = this.view.getFormOccupancy();
			
			expect(o[0].adults).toEqual(2);
			expect(o[0].children).toEqual(3);
			expect(o[1].adults).toEqual(1);
		});
	});
	
	describe('Form Submission', function(){
		
		it('Validate returns false if fields are missing', function(){
			var m =new this.HolidaySearch({
				destination: 'test',
				dateStart: '22/11/2013',
				numRooms: 2,
				numNights: 5,
				departingFrom: 'LHR'
			});
			m.setOccupancy([
				{adults: 2, children: 3},
				{adults: 1, children: 1}	
			]);
			

			this.view = new this.SearchFormView({model: m});
			this.region.show(this.view);
			
			expect(this.view.validate()).toBeTruthy();
			
			//remove destination
			this.view.model.set({destination: ''});
			this.view.render();
			
			//expect(this.view.validate()).toBeFalsy(); //commented out as need to default to las vegas at the moment
			
			//remove dateStart
			this.view.model.set({destination: 'test', dateStart: ''});
			this.view.render();
			
			expect(this.view.validate()).toBeFalsy();
			
			//make dateStart invalid
			this.view.model.set({destination: 'test', dateStart: '22/11/2013'});
			this.view.render();
			
			this.view.ui.dateStart.val('AA');
			
			expect(this.view.validate()).toBeFalsy();
			
		});
		
		it('getFormOccupancy gets occupancy from form', function(){
			this.region.show(this.view);
			$("#fields-number-of-rooms").val(2);
			this.view.updateRooms();

			var occ = this.view.getFormOccupancy();
			
			expect(occ).toEqual([
				{adults: 2, children: 0, infants: 0},
				{adults: 2, children: 0, infants: 0}
			]);
		});
		
	});
});

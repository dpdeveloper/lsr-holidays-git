describe("Search UI Layout", function() {
	"use strict";
	
	beforeEach(function() {
		var flag = false,
			that = this;
		
		$('#sandbox').show();
		
		require([
			'views/search-ui/search-ui.layout',
			'models/holiday-search'
			], function(SearchUILayout,HolidaySearch) {
			that.layout = new SearchUILayout({el: '#sandbox', testMode: true});
			that.holidaySearch = new HolidaySearch();
			
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {
		$('#sandbox').html('');
		$('#sandbox').hide();
	});
	
	
	/* Default Spec Code */
	describe('Search UI Initializes', function(){
		it('is not null', function(){
			expect(this.layout).not.toBeNull(true);
		});
		it('status mode should be null', function(){
			expect(this.layout._status.mode).toBeNull();
			expect(this.layout._status.flight).toBeNull();
			expect(this.layout._status.hotel).toBeNull();
		});
	});
	
	describe('Set Status', function(){
		it('returns true and sets a valid mode', function(){
			expect(this.layout.setStatus('mode',this.layout.STATES.MODE.PACKAGE)).toBeTruthy();
			expect(this.layout._status.mode).toEqual(this.layout.STATES.MODE.PACKAGE);
		});
		it('returns false for an invalid mode', function(){
			expect(this.layout.setStatus('mode','ABC')).toBeFalsy();
		});
		it('returns true and sets a valid flight status', function(){
			expect(this.layout.setStatus('flight',this.layout.STATES.FLIGHT.LOADING)).toBeTruthy();
			expect(this.layout._status.flight).toEqual(this.layout.STATES.FLIGHT.LOADING);
		});
	});
	
	describe('setModeFromHolidaySearch', function(){
		it('set the mode from a holidaySearch object', function(){
			expect(this.layout._status.mode).toBeNull();
			
			this.layout.setModeFromHolidaySearch(this.holidaySearch); //holidaySearch defaults to package mode
			
			expect(this.layout._status.mode).toEqual(this.layout.STATES.MODE.PACKAGE);
			
		});
	});
	
});

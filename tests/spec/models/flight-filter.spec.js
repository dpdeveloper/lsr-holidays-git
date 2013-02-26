describe("A FlightFilter Backbone Model", function() {
	
	beforeEach(function() {
		var flag = false,
			that = this;
	
		require([
			'models/flight-filter'
			], function(FlightFilter) {
			that.model = new FlightFilter();
			
			flag = true;
		});
		
		waitsFor(function() {return flag;});
	});
	afterEach(function() {;});
	
	
	/* Default Spec Code */
	describe('defaults are set correctly', function(){
		it('outboundAirline is set to null', function(){
			expect(this.model.get('outboundAirline')).toBeNull();
		});
		it('outboundNoStops is set to null', function(){
			expect(this.model.get('outboundNoStops')).toBeNull();
		});
		it('outboundDepartureTimes is set to null', function(){
			expect(this.model.get('outboundDepartureTimes')).toBeNull();
		});
		it('returnAirline is set to null', function(){
			expect(this.model.get('returnAirline')).toBeNull();
		});
		it('returnNoStops is set to null', function(){
			expect(this.model.get('returnNoStops')).toBeNull();
		});
		it('returnDepartureTimes is set to null', function(){
			expect(this.model.get('returnDepartureTimes')).toBeNull();
		});
	});
	
	describe('get and set outboundDepartureTimes', function(){
		it('can be set to a string', function(){
			this.model.setProperty('outboundDepartureTimes',this.model.TIMES.MORNING);
			
			var a = this.model.getProperty('outboundDepartureTimes');
			expect(a[0]).toEqual(this.model.TIMES.MORNING);
		});
		it('can be set to an array', function(){
			this.model.setProperty('outboundDepartureTimes',[this.model.TIMES.MORNING,this.model.TIMES.AFTERNOON]);
			expect(this.model.get('outboundDepartureTimes')).toEqual('m,a');
			
			var a = this.model.getProperty('outboundDepartureTimes');
			expect(a[0]==this.model.TIMES.MORNING && a[1]==this.model.TIMES.AFTERNOON).toBeTruthy();
		});
	});
	
	describe('get and set returnDepartureTimes', function(){
		it('can be set to a string', function(){
			this.model.setProperty('returnDepartureTimes',this.model.TIMES.MORNING);
			expect(this.model.get('returnDepartureTimes')).toEqual(this.model.TIMES.MORNING);
			
			expect(this.model.getProperty('returnDepartureTimes')[0]).toEqual(this.model.TIMES.MORNING);
		});
		it('can be set to an array', function(){
			this.model.setProperty('returnDepartureTimes',[this.model.TIMES.MORNING,this.model.TIMES.AFTERNOON]);
			expect(this.model.get('returnDepartureTimes')).toEqual('m,a');
			
			var a = this.model.getProperty('returnDepartureTimes');
			expect(a[0]==this.model.TIMES.MORNING && a[1]==this.model.TIMES.AFTERNOON).toBeTruthy();
		});
	});
	
	describe('toJSONExpanded returns deserialized json', function(){
		it('returns all array properties as arrays', function(){
		
			this.model.setProperty('returnDepartureTimes',this.model.TIMES.MORNING);
			expect(this.model.toJSONExpanded()['returnDepartureTimes'][0]).toEqual(this.model.TIMES.MORNING);
			expect(this.model.toJSONExpanded()['returnDepartureTimes'] === this.model.TIMES.MORNING).toBeFalsy();
			
			this.model.setProperty('outboundDepartureTimes',[this.model.TIMES.MORNING, this.model.TIMES.EVENING]);
			expect(this.model.toJSONExpanded()['outboundDepartureTimes'][1]).toEqual(this.model.TIMES.EVENING);
			
		});
	});
	
	describe('can filter departureTimes with isDepartureTimeFiltered', function(){
		it('returns true if no filter set', function(){
			var f = this.model.isDepartureTimeFiltered('outboundDepartureTimes','');
			expect(f).toBeTruthy();
		});
		it('returns true if an invalid number is passed', function(){
			this.model.setProperty('outboundDepartureTimes',this.model.TIMES.MORNING);
			var f = this.model.isDepartureTimeFiltered('outboundDepartureTimes','a');
			expect(f).toBeTruthy();
		});
		it('returns true if a morning filter is set and the time is 0600', function(){
			this.model.setProperty('outboundDepartureTimes',this.model.TIMES.MORNING);
			expect(this.model.isDepartureTimeFiltered('outboundDepartureTimes','0600')).toBeTruthy();	
			
		});
		it('returns false if a morning filter is set and the time is 1800', function(){
			this.model.setProperty('outboundDepartureTimes',this.model.TIMES.MORNING);
			expect(this.model.isDepartureTimeFiltered('outboundDepartureTimes','1800')).toBeFalsy();	
			
		});
		it('returns true if a afternoon filter is set and the time is 1300', function(){
			this.model.setProperty('outboundDepartureTimes',this.model.TIMES.AFTERNOON);
			expect(this.model.isDepartureTimeFiltered('outboundDepartureTimes','1300')).toBeTruthy();	
		});
		it('returns false if a afternoon filter is set and the time is 1800', function(){
			this.model.setProperty('outboundDepartureTimes',this.model.TIMES.AFTERNOON);
			expect(this.model.isDepartureTimeFiltered('outboundDepartureTimes','0600')).toBeFalsy();	
		});
		it('returns true if a evening filter is set and the time is 2300', function(){
			this.model.setProperty('outboundDepartureTimes',this.model.TIMES.EVENING);
			expect(this.model.isDepartureTimeFiltered('outboundDepartureTimes','2300')).toBeTruthy();	
		});
		it('returns false if a evening filter is set and the time is 0600', function(){
			this.model.setProperty('outboundDepartureTimes',this.model.TIMES.EVENING);
			expect(this.model.isDepartureTimeFiltered('outboundDepartureTimes','0600')).toBeFalsy();	
		});
		it('returns true if a morning & evening filter is set and the time is 2300', function(){
			this.model.setProperty('outboundDepartureTimes',[this.model.TIMES.MORNING, this.model.TIMES.EVENING]);
			expect(this.model.isDepartureTimeFiltered('outboundDepartureTimes','2300')).toBeTruthy();	
		});
		it('returns false if a morning & evening filter is set and the time is 1600', function(){
			this.model.setProperty('outboundDepartureTimes',[this.model.TIMES.MORNING, this.model.TIMES.EVENING]);
			expect(this.model.isDepartureTimeFiltered('outboundDepartureTimes','1600')).toBeFalsy();	
		});
		it('returns false if a morning & evening filter is set and the time is 1600 for return flights', function(){
			this.model.setProperty('returnDepartureTimes',[this.model.TIMES.MORNING, this.model.TIMES.EVENING]);
			expect(this.model.isDepartureTimeFiltered('returnDepartureTimes','1600')).toBeFalsy();	
		});

		
	});
	
});

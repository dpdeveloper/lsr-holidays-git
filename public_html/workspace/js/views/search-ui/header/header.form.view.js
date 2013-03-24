/* @filename views/search-ui/header/header.form.view.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent','config',
	'jquery-ui',
	
	'tpl!views/search-ui/templates/header.form.view.tpl.html',
	'models/holiday-search'
	
], function(	$,_,Backbone,Marionette,vent, config, jqueryUI,
				HeaderFormTemplate,
				HolidaySearch
			){
	"use strict";

	var HeaderFormView = Backbone.Marionette.ItemView.extend(
	/** @lends HeaderFormView */
	{
		template: HeaderFormTemplate,
		
		roomRowHTML: null,
		_advancedInit: false,
		
		events:{
			'click #search-ui-header-form': 'showAdvanced',
			'click .action-back': 'hideAdvanced',
			'change #fields-number-of-rooms': 'updateRooms',
			'click .action-next': 'submitForm'
		},
		
		ui: {
			//fields
			destination: '#fields-destination',
			dateStart: '#fields-date-start',
			numberOfNights: '#fields-number-of-nights',
			numberOfRooms: '#fields-number-of-rooms',
			departureAirport: '#fields-departure-airport',
			flightClass: '#fields-flight-class',
			
			//other things
			outer: '.three.cols',
			flightsCol: '.flights-col',
			rooms: '.rooms'
	
		},
		
		/**
			Constructor
			
			@class View to display the search ui header
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			this.model = new HolidaySearch();
			if(typeof options.model !== 'undefined'){
				this.model.set(this.options.model.toJSON());
			}
			this.listenTo(vent,'search:trip:edit',this.setTrip);
		},
		
		/**
		 * onRender
		 *
		 *
		 * Init the UI Elements
		*/
		onShow: function(){
			this.$el.find(".fields-date-start").datepicker({
					changeMonth: true,
					changeYear: true,
					constrainInput: false,
					dateFormat: 'dd/mm/yy',
					numberOfMonths: 2,
					minDate: 0,
					maxDate: "+2y",
					onSelect: function(dateText,inst){
							$(this).val(dateText);
					}
				});
			this.roomRowHTML= "<div class='room-row room-row-item clearfix'>"+$(".room-row-template", this.$el).html()+"</div>";
			
			//set the select box values
			this.ui.numberOfNights.val(this.model.get('numNights'));
			this.ui.numberOfRooms.val(this.model.get('numRooms'));
			this.ui.destination.val(this.model.get('destination'));
			this.ui.departureAirport.val(this.model.get('departingFrom'));
			this.ui.flightClass.val(this.model.get('flightClass'));
			
			this.setTripType(this.model.get('tripType'),true);
			
			this.updateRooms();
			
			/*set the adults/children/infants for the rooms*/
			var adult = this.model.get('adultCsv').split(',');
			var child = this.model.get('childCsv').split(',');
			var infant = this.model.get('infantCsv').split(',');
			
			this.$el.find('.room-row-item').each(function(i,el){
				$(el).find('select.fields-number-of-adults').val(adult[i]);
				$(el).find('select.fields-number-of-children').val(child[i]);
				$(el).find('select.fields-number-of-infants').val(infant[i]);
			});
			
			
		},
		
		/* initSelectBoxes
		*
		* Inits the Select2.0 select boxes
		*
		*/
		initSelectBoxes: function(){
			$('select',this.$el).select2({width: 'resolve'});
			
			this.ui.departureAirport.select2({
				width: 'element',
				placeholder: 'Select an Airport',
				minimumInputLength: 1,
				initSelection: function(element,callback){
					var data = {
						id: $(element).val(),
						text: $(element).val()
					};
					callback(data);
				},
				ajax: {
					url: config.root+"json/airports/",
					dataType: 'json',
					data: function(term,page){
						return {
							q: term
						};
					},
					results: function(data,page){
						var obj = [];
						
						_.each(data.airports, function(element){
							obj.push({
								id: element.code,
								text: element.title + " ("+element.code+")"
							});
						});
					
						return {results: obj};
					}
				}
			});
		},
		
		/**
		 * setTripType
		 *
		 * @param {String} tripType
		 * @param {Boolean} (optional) whether or not this is the initial load
		 *
		 * Sets the trip type and updates the UI as needed
		 *
		*/
		setTripType: function(tripType,initial){
			if(typeof initial === 'undefined'){initial = false;}
			
			var currentType = this.model.get('tripType');
			
			if(initial || currentType !== tripType){
				
				//update the UI if needed
				if(	(currentType === this.model.TRIP_TYPES.PACKAGE && tripType === this.model.TRIP_TYPES.FLIGHT) ||
					initial ){
					this.toggleFlightsColumn();
				}
				
				if(initial){
					this.model.set({tripType: tripType});
				}
			}
		},
		
		
		/**
		 * toggleFlightsColumn
		 *
		 * shows/hides the flights column and updates the outer container width to fit with it
		 *
		*/
		toggleFlightsColumn: function(){
			if(this.ui.flightsCol.css('display')!=='none'){
				this.ui.flightsCol.hide();
				this.ui.outer.css({width: 400});
			}
			else{
				this.ui.flightsCol.show();
				this.ui.outer.css({width: 600});
			}
		},
		
		
		/* addRoom
		*
		* Adds a room to the UI
		*
		*/
		addRoom: function(){
			this.ui.rooms.append(this.roomRowHTML);
			this.initSelectBoxes();
		},
		
		
		/**
		* updateRooms
		*
		* Callback for when the number of rooms is changed
		* - Updates the model value
		* - Triggers a callback if more is selected
		* - Updates the UI with the correct number of occupancy fields
		*
		*/
		updateRooms: function(){
			
			var value = $("#fields-number-of-rooms",this.$el).val();
		
			if(value === "more"){
				var destination = $('#fields-destination',this.$el).val();
				destination = destination.toLowerCase().replace(' ','-');
			
				Backbone.history.navigate('/destination/'+destination+'/group-travel/', {trigger: true});
				this.trigger('callback');
			}
			else{
				var delta= value - $('.room-row-item',this.$el).length;
				if(delta > 0){
					for(var i=0; i<delta; i++){this.addRoom();}
				}
				else if(delta < 0){
					var noRooms = this.ui.rooms.children().length;
					for(var k=1; k<=-delta; k++){$(this.ui.rooms.children().get(noRooms-k)).remove();}
				}
				this.model.set({numRooms: value});
			}
		},
		
		
		/* --------------------------------
		 *
		 *			UI CALLBACKS
		 *
		 * ----------------------------- */
		
		
		 
		setTrip: function(holidaySearch){
			this.model.set(holidaySearch.toJSON());
		},
		
		showAdvanced: function(){
			
			if(this.$el.find('.header-overlay').is(':visible')){
				this.hideAdvanced();
				return;	
			}
		
			this.$el.find('.header-overlay').show();
			this.$el.find('.header-bar .edit').addClass('active');
			
			if(!this._advancedInit){
				this.initSelectBoxes();
				this._advancedInit = true;
			}
			
		},
		hideAdvanced: function(){
			this.$el.find('.header-overlay').hide();
			this.$el.find('.header-bar .edit').removeClass('active');
		},
		
		
		/**
		 * saveRoomOccupancy
		 *
		 * @return {Object} the occupancy
		 *
		 * Saves the room occupancy into the trip object
		 *
		 *
		*/
		saveRoomOccupancy: function(){
		
			var adultCSV="", childCSV="", infantCSV="";
			
			$("select.fields-number-of-adults",this.$el).each(function(i,element){
				adultCSV=adultCSV+$(element).val()+",";
			});
			$("select.fields-number-of-children",this.$el).each(function(i,element){
				childCSV=childCSV+$(element).val()+",";
			});
			$("select.fields-number-of-infants",this.$el).each(function(i,element){
				infantCSV=infantCSV+$(element).val()+",";
			});
			var occupancy = {
				adultCsv:	adultCSV,
				childCsv:	childCSV,
				infantCsv:	infantCSV
			};
			this.model.set(occupancy);
			
			return occupancy;
		},
		
		
		/* submitForm
		*
		* Callback function for saving and submitting the search
		* - Parses the 'csv' fields into the correct format
		* - Saves all the fields into the model
		*/
		submitForm: function(event){
			event.preventDefault();
		
			this.saveRoomOccupancy();
			this.model.set({
				destination: $("#fields-destination", this.$el).val(),
				numNights:	$("#fields-number-of-nights",this.$el).val(),
				numRooms:	$("#fields-number-of-rooms",this.$el).val(),
				dateStart:	$("#fields-date-start",this.$el).val(),
				departingFrom: $('#fields-departure-airport',this.$el).val(),
				flightClass: $('#fields-flight-class',this.$el).val()
			});
			
			this.hideAdvanced();
			
			vent.trigger("search:trip:edit",this.model);
		}
	});
	
	return HeaderFormView;
});
	
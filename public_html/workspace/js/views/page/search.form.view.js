/* @filename views/page/search.form.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent','config',
	'tpl!views/page/templates/search.form.view.tpl.html',
	'models/holiday-search',
	
	'moment',
	'jquery-ui',
	'libs/string-helpers',
	'libs/select2.min'
], function($,_,Backbone,Marionette,vent,config,
			Template,
			HolidaySearch,
			moment
			){
	"use strict";

	var SearchFormView = Backbone.Marionette.ItemView.extend(
	/** @lends SearchFormView */
	{
		/**
			Constructor
			
			@class View to allow searching
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			_.bindAll(this);
			
			if('holidaySearch' in options && options.holidaySearch !== null){
				this.model = new HolidaySearch(options.holidaySearch.toJSON());	
			}
			else{
				this.model = new HolidaySearch();	
			}
		},
		
		template: Template,
		
		$roomContainer: null,
		roomRowHTML: null,
		
		STATES: {
			NEW: 0,
			EDIT: 1
		},
		_state: 0,
		
		events: {
			'change #fields-number-of-rooms': 'updateRooms',
			'click .search-submit': 'submitForm',
			'click .trip-type li': 'handleTripTypeChange'
		},
		ui: {
			tripType: '.trip-type'
		},		
		
		/**
			Close the form
		*/
		close: function(){
			this.$el.find(".fields-date-start").datepicker('destroy');
		},
		
		/**
			Updates the mode that the form is in
			@param {String} mode 'new' / 'edit'
		*/
		setMode: function(mode){
			if(mode === 'new'){
				this._state = this.STATES.NEW;
			}
			else if(mode === 'edit'){
				this._state = this.STATES.EDIT;
			}
		},
		
		/* initSelectBoxes
		 *
		 * Inits the Select2.0 select boxes
		 *
		*/
		initSelectBoxes: function(){
			$('select',this.$el).select2({width: '100%'});
			
			$('#fields-departure',this.$el).select2({
				width: '100%',
				placeholder: 'Flying From',
				minimumInputLength: 1,
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
		 * @param: {String - from Trip.TRIP_TYPES} tripType
		 * @param: {Boolean}	(optional) Used to specify that this is the initial setup
		 *						So don't save it into the trip
		 *
		 * Sets the trip type and updates the UI as needed
		*/
		setTripType: function(tripType, initial){
			if(typeof initial === 'undefined'){initial=false;}
			
			var currentTripType = this.model.get('tripType');
			
			if(initial || currentTripType !== tripType){
				
				$(this.ui.tripType).find('.active').removeClass('active');
				
				switch(tripType){
					case this.model.TRIP_TYPES.FLIGHT:
						this.$el.find(this.ui.tripType).find('.flight').addClass('active');
						
						//show / hide the needed fields
						this.$el.find('.fields-departure-wrapper').show();
						
						break;
					case this.model.TRIP_TYPES.HOTEL:
						this.$el.find(this.ui.tripType).find('.hotel').addClass('active');
						
						//show / hide the needed fields
						this.$el.find('.fields-departure-wrapper').hide();
						
						break;
					case this.model.TRIP_TYPES.PACKAGE:
						this.$el.find(this.ui.tripType).find('.package').addClass('active');
						
						//show / hide the needed fields
						this.$el.find('.fields-departure-wrapper').show();
						
						break;
				}
				
			}
			
			if(!initial){
				this.model.setType(tripType);
			}
			
		},
		 
		/* addRoom
		*
		* Adds a room to the UI
		*
		*/
		addRoom: function(){
			$(this.$roomContainer).append(this.roomRowHTML);
			this.initSelectBoxes();
		},
		
		/* updateRooms
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
					var noRooms = this.$roomContainer.children().length;
					for(var j=1; j<=-delta; j++){$(this.$roomContainer.children().get(noRooms-j)).remove();}
				}
				this.model.set({numRooms: value});
			}
		},

		
		/**
			After Render Callback function
		*/
		onRender: function(){
			this.$roomContainer = $(".rooms", this.$el);
			this.roomRowHTML= "<div class='room-row room-row-item clearfix'>"+$(".room-row-template", this.$el).html()+"</div>";	
		},
		
		/**
			onShow Callback function
		*/
		onShow: function(){
			this.setTripType(this.model.get('tripType'),true);
			
			this.$el.find(".fields-date-start, .fields-date-end").datepicker({
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
			
			//if in edit mode, set the correct field values
			if(this._state === this.STATES.EDIT){
			
				this.$el.find('#fields-destination').val(this.model.get('destination').capitalize());
				
				this.$el.find('#fields-number-of-nights').val(this.model.get('numNights'));
				this.$el.find('#fields-number-of-rooms').val(this.model.get('numRooms'));
				
				this.updateRooms();
				
				/*set the adults/children/infants for the rooms*/
				var adult = this.model.get('adultCsv').split(',');
				var child = this.model.get('childCsv').split(',');
				
				this.$el.find('.room-row-item').each(function(i,el){
					$(el).find('select.fields-number-of-adults').val(adult[i]);
					$(el).find('select.fields-number-of-children').val(child[i]);
				});
				
			}
			else{
				this.updateRooms();
			}
			this.initSelectBoxes();
		},
		
		
		/**
			Extracts the correct type to change mode to from the css class and calls the changeTypeFunction
			
			@param event {jQuery Event Object}
		*/
		handleTripTypeChange: function(event){
			var self=this;
			event.preventDefault();
			var classList =$(event.currentTarget).attr('class').split(/\s+/);
			
			_.each(classList,function(element){
				if(element!=='active'){
					self.setTripType(element);
				}
			});
		},
		
		/**
			Validate before submission
				
		*/
		validate: function(){
			
			return true;
		},
		
		
		/**
			get the occupancy information from the form into an array
		*/
		getFormOccupancy: function(){
			var occ = [];
			
			$("select.fields-number-of-adults",this.$el).each(function(i,element){
				occ[i] = {};
				occ[i].adults = parseInt($(element).val(),10);
			});
			$("select.fields-number-of-children",this.$el).each(function(i,element){
				occ[i].children = parseInt($(element).val(),10);
				occ[i].infants = 0;
			});
			/*
			$("select.fields-number-of-infants",this.$el).each(function(i,element){
				occ[i].infants = $(element).val();
			});*/
			
			return occ;
		},
		
		 
		/**
			Callback function for saving and submitting the search
			- Parses the 'csv' fields into the correct format
			- Saves all the fields into the model
			
			@param {jQuery Event} event
		*/
		submitForm: function(event){
		
			if(!this.validate()){
				return;
			}
		
			event.preventDefault();
			this.model.setOccupancy(this.getFormOccupancy());
			
			//work out num nights
			
			this.model.setDatesFromStartFinish($("#fields-date-start",this.$el).val(), $("#fields-date-end",this.$el).val());
			
			this.model.set({
				destination: $("#fields-destination", this.$el).val(),
				departingFrom: $('#fields-departure',this.$el).val()
			});
			
			this.trigger("save", this.model);
		}

	});
	
	return SearchFormView;
});
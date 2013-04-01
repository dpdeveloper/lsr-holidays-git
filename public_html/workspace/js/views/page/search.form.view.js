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
	'select2',
	'the-tooltip'
], function($,_,Backbone,Marionette,vent,config,
			Template,
			HolidaySearch,
			moment,
			theToolTip
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
			
			//legacy support for holidaySearch. Should really use model
			if('holidaySearch' in options && options.holidaySearch !== null){
				this.model.set(options.holidaySearch.toJSON());
			}
			
			this._visible = false;
			
			//this.listenTo(this.model,'change',this.render);
		},
		
		template: Template,
		model: new HolidaySearch(),
		$roomContainer: null,
		roomRowHTML: null,

		
		events: {
			'change #fields-number-of-rooms': 'updateRooms',
			'click .search-submit': 'submitForm',
			'click .trip-type li': 'handleTripTypeChange',
			'focus input': 'removeErrors'	
		
		},
		ui: {
			tripType: '.trip-type',
			dateStart: '.fields-date-start',
			dateEnd: '.fields-date-end',
			fieldNumNights: '#fields-number-of-nights',
			fieldNumRooms: '#fields-number-of-rooms',
			
			fieldDestination: '#fields-destination',
			fieldDeparture: '#fields-departure',
			
			fieldSelectAll: 'select'
		},	
		
	
		
		/* initSelectBoxes
		 *
		 * Inits the Select2.0 select boxes
		 *
		*/
		initSelectBoxes: function(){
			this.ui.fieldSelectAll.select2({width: '100%'});
			
			this.ui.fieldDeparture.select2({
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
				},
				initSelection: function(element,callback){
					callback({id: $(element).val(), text: $(element).val()});
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
			this.bindUIElements();
			this.initSelectBoxes();
			this.model.addRoom({adults:2, children: 0, infants: 0});
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
			
			this.setTripType(this.model.get('tripType'),true);
			
			//if in edit mode, set the correct field values
			var m =this.model.toJSON();
			
			if(!m.destination || m.destination.length === 0){
				m.destination = 'las vegas';
			}
			
			if(!m.numNights || m.numNights === 0){
				m.numNights = 5;
			}
			if(!m.numRooms){
				m.numRooms = 1;
			}
			
			this.ui.fieldDestination.val(m.destination.toLowerCase());
			this.ui.dateStart.val(m.dateStart);
			this.ui.dateEnd.val(this.model.getEndDate());
			this.ui.fieldNumRooms.val(m.numRooms);
			this.ui.fieldDeparture.val(m.departingFrom);
			
			this.updateRooms();
			
			/*set the adults/children/infants for the rooms*/
			var adult = this.model.get('adultCsv').split(',');
			var child = this.model.get('childCsv').split(',');
			
			this.$el.find('.room-row-item').each(function(i,el){
				$(el).find('select.fields-number-of-adults').val(adult[i]);
				$(el).find('select.fields-number-of-children').val(child[i]);
			});
		},
		
		/**
			onShow Callback function
		*/
		onShow: function(){
			
			var self = this;
			
			//datepickers and select2.0
			if(this._visible !== true){
				this._visible = true;
				
				this.ui.dateStart.datepicker({
					changeMonth: true,
					changeYear: true,
					constrainInput: false,
					dateFormat: 'dd/mm/yy',
					numberOfMonths: 2,
					minDate: 0,
					maxDate: "+2y",
					onSelect: function(dateText,inst){
						$(this).val(dateText);
						self.model.setStartDate(dateText);
						self.ui.dateEnd.val(self.model.getEndDate());
						
						//prevent weird UI stuff
						self.ui.dateEnd.datepicker('option','minDate',self.model.get('dateStart'));	
					}
				});
				this.ui.dateEnd.datepicker({
					changeMonth: true,
					changeYear: true,
					constrainInput: false,
					dateFormat: 'dd/mm/yy',
					numberOfMonths: 2,
					minDate: 0,
					maxDate: "+2y",
					onSelect: function(dateText,inst){
						$(this).val(dateText);
						self.model.setStartDateFromEndDate(dateText);
						self.ui.dateStart.val(self.model.get('dateStart'));
						self.ui.dateEnd.datepicker('option','minDate',self.model.get('dateStart'));
					}
				});			
				this.initSelectBoxes();
			}
		},
		
		/**
			Close callback function
		*/
		onClose: function(){
			if($.contains(document.documentElement, this.$el[0])){
				this.ui.dateStart.datepicker('destroy');	
				this.ui.dateEnd.datepicker('destroy');
				this.ui.fieldDeparture.select2('destroy');
				this.ui.fieldSelectAll.select2('destroy');
			}
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
			
			this.removeErrors();
			
			//only if in the correct trip mode
			if(this.model.get('tripType') === this.model.TRIP_TYPES.PACKAGE){
				if(this.ui.fieldDeparture.val().length < 1){
					this.addError(this.ui.fieldDeparture,'Select an Airport', 'top center');
					return false;
				}
			}
			if(this.ui.dateStart.val().length < 1){
				this.addError(this.ui.dateStart,'Choose a Start Date', 'bottom center');
				return false;
				
			}
			//valid date
			if(!moment(this.ui.dateStart.val(),'DD/MM/YYYY').isValid()){
				this.addError(this.ui.dateStart,'Enter a Valid Date', 'bottom center');
				return false;
			}
			
			if(this.ui.dateEnd.val().length < 1){
				this.addError(this.ui.dateEnd,'Choose an End Date', 'bottom center');
				return false;
			}
			if(!moment(this.ui.dateEnd.val(),'DD/MM/YYYY').isValid()){
				this.addError(this.ui.dateEnd,'Enter a Valid Date', 'bottom center');
				return false;
			}
			if(this.ui.fieldDestination.val().length < 1){
				this.addError(this.ui.fieldDestination,'Select a Destination', 'top center');
				return false;
			}
			return true;
		},
		
		
		/**
			Removes any errors that have been added with addError
		*/
		removeErrors: function(){
			this.$el.find('.the-tooltip').remove();
		},
		
		/**
			Adds a 'tooltip' error to the elements
			
			@param element {jQuery Element} the object to append the error to
			@param message {String} the Error message
			@param [position] {String} 'the-tooltip' position. Defaults to 'top center'
		*/
		addError: function(element,message, position){
			position = position || 'top center';
			
			var ttHtml = '<div class="the-tooltip '+position+' apple-green"><span>'+message+"</span></div>";
			
			if(position.indexOf('bottom')!== -1){
				$(element).parent().append(ttHtml);	
			}
			else{
				$(element).parent().prepend(ttHtml);	
			}
		
			var $tt = $(element).parent().find('.the-tooltip span');
			
			$tt.css({visibility: 'visible', opacity: '1', 'z-index':'99'});
			
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
			event.preventDefault();
			
			
			if(!this.validate()){
				return;
			}
		
			
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
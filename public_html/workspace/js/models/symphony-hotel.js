/* models/symphony-hotel.js
 *
 * This is used for storing content a hotel entry retrieved from symphony
 *
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational','config',
	'models/multicom/multicom-accommodation'
], function(	$,_,Backbone,BackboneRelational,config,
				MulticomAccommodation
				){
	'use strict';

	var SymphonyHotel = Backbone.RelationalModel.extend({
		
		relations: [{
			type: 'HasOne',
			key: 'multicomHotel',
			relatedModel: MulticomAccommodation
		}],
		
		defaults: {
			title: '',
			destination: '',
			multicomID: null,
			starRating: '',
			
			/*content*/
			summary: '',
			overview: '',
			hotelFacilities: '',
			rooms: null,
			images: null,
			activities: null,
			
			symData: false,
			mcData: false
		},
		
		
		/**
		 * initialize
		 *
		*/
		initialize: function(){
			_.bindAll(this);
			this.set('multicomHotel',new MulticomAccommodation());
		},
		
		/**
		 * parse
		 *
		 * Overridden parse function to set the symData param to true
		 *
		*/
		parse: function(result){
			result.symData = true;
			return result;
		},
		
		/**
		 * setDataFromSymphony
		 *
		 * Sets data from symphony (mainly for testing purposes) and sets the flag correctly.
		*/
		setFromSymphony: function(data){
			this.set(data);
			this.set('symData',true);
		},
		
		/**
		 * setMulticomData
		 *
		 * Sets the multicom data and sets the flag correctly
		 *
		*/
		setMulticomData: function(mcHotel){
			this.set('multicomHotel',mcHotel);
			this.set({mcData: true});
		},
		
		/**
		 * buildFromMulticomHotel
		 *
		 * Builds the parameters as best it can from the multicom data
		 *
		*/
		buildFromMulticomHotel: function(mcHotel){
			var imgArr = [];
			
			_.each(mcHotel.get('images'), function(el){
				var i = {
					path: '',
					filename: el.url,
					external: '1'
				};
				imgArr.push(i);
			});
			
			this.set({
				mcData: true,
				title: mcHotel.get('accommodationName'),
				overview: "&lt;div&gt;"+$('<div/>').text(mcHotel.get('description')).html()+"&lt;/div&gt;", //encode the html
				starRating: mcHotel.get('classCode') === null ? null : mcHotel.get('classCode').substr(0, 1),
				images: imgArr
			});
			this.set('multicomHotel',mcHotel);
		},
		
		/**
		 * getActivityCategories
		 *
		 * Returns an array of category groups for the activities in the hotel (if any)
		*/
		getActivityCategories: function(){
			var ret = [];
			
			var activities = this.get('activities');
			
			if(activities !== null && activities.length > 0){
				
				//get the activities
				_.each(activities, function(item){
				
					var inArr = false;
					//see if already in the array
					_.each(ret,function(r){
						if(item.category === r.title){inArr=true;}
					});
					
					if(inArr === false){
						var a = [];
						a.title=item.category;
						a.handle=item.categoryHandle;
						ret.push(a);
					}
				});
			}
			
			return ret;
		},
		
		/**
		 * getActivitiesByCategory
		 *
		 * @param category
		 *
		 * Returns an array of activity objects based on the filter category provided
		*/
		getActivitiesByCategory: function(category){
			
			if(category === '' || category === null){
				return this.get('activities');
			}

			return _.filter(this.get('activities'),function(item){
				return item.categoryHandle === category;
			});
		}
	});
	
	return SymphonyHotel;
});
	
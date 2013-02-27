/* collection/symphony-hotel.js
 *
 * This is to retrieve lists of hotels from symphony
 *
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'config',
	'models/symphony-hotel'
], function($,_,Backbone,Marionette,vent,config, SymphonyHotelModel){
	"use strict";
	
	var SymphonyHotelCollection = Backbone.Collection.extend(
	/** @lends SymphonyHotelCollection */
	{
		destination: '',
		model: SymphonyHotelModel,
		
		_loading: false,
		_mode: config.multicomMode,
		
		
		/**
			Constructor
			
			@class Collection to fetch and manipulate Symphony Hotel Objects
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			this._loading = false;
			//_.bindAll(this);
		},
		
		
		/**
		 * isLoading
		 *
		 * Returns true if the data is being loaded
		 *
		*/
		isLoading: function(){
			return this._loading;
		},
		
		
		/**
		 * fetchDestination
		 *
		 * Fetches all the hotels via JSON for a destinatoin
		 *
		 * @param destination: the destination to fetch
		 *
		*/
		fetchDestination: function(destination){
			destination = destination.toLowerCase();
			destination = destination.replace(' ', '-');
			
			this._loading = true;
			
			
			//if in testing mode then only return 20
			var limit = 100;
			
			if(this._mode === 'test'){
				console.log("Symphony Hotel Collection is in Test Mode: Loading Test Data");
				this.url=config.root+'json-test/symphony-hotels-vegas.json';
			}
			else{
				this.destination = destination;
				this.url=config.root+'json/hotels/'+destination+"/?limit="+ limit;
			}
				
			var self = this;
			this.fetch({
				success: function(){
					self._loading = false;
					self.trigger('complete');
				}
			});
		},
		
		/**
		 * parse
		 *
		 * @param: result
		 *
		 * A parse function override to handle the 'hotels' element in the returned JSON
		*/
		 
		parse: function(result){
			return result.hotels;
		},
		
		
		/**
		 * filterHotels
		 *
		 * @param filter - A filter model object
		 *
		 * Filters the hotels by whether or not they have symphony data
		 *
		*/
		filterHotels: function(filter){
		
			if(filter === null){
				return this.models;
			}
			else{
				
				var filtered = this.models;
				
				//filter only the featured
				if(filter.get('filterFeaturedOnly') === true){
					filtered = _.filter(filtered,function(item){
						return item.get('symData') && item.get('mcData');
					});
				}
				
				//filter by star Rating
				if(filter.get('filterStarRatings') !== ''){
					
					var starRatings = filter.get('filterStarRatings').split(',');
					
					if(starRatings.length > 0){
						filtered = _.filter(filtered,function(item){
							if($.inArray(item.get('starRating').toString(),starRatings)>-1){
								return true;
							}
							return false;
						});
					}
							
				}
				
				//filter by Accom Name
				if(filter.get('filterHotelName') !== ''){
					filtered = _.filter(filtered,function(item){
						if(item.get('title').toLowercase().indexOf(filter.get('filterHotelName').toLowerCase()) >=0){
							return true;
						}
						return false;
					});
				}
				return filtered;
			}
		},
		
		
		/**
		 * combineWithMulticomData
		 *
		 * @param mcHotelCollection: A collection of Multicom Hotels
		 *
		 * Combines the data with that from multicom
		 *
		*/
		combineWithMulticomData: function(mcHotelCollection){
		
			//make an array of models
			var unfoundArray = [];
			var self = this;
		
			_.each(this.models, function(symHotel){
				//if has a multicom id set, then look for that
				var foundItem = null;
				
				//Try and match via multicom ID
				if(symHotel.get('multicomID') !== null && symHotel.get('multicomID') !== null){
					foundItem = _.find(mcHotelCollection.models, function(mcHotel){
						var str = mcHotel.get('accommodationId').toString();
						return str.indexOf(symHotel.get('multicomID').toString()) !== -1;
					});
				}
				
				//If no multicom ID or the ID didn't return anything, try and match via title
				if(foundItem === null){
					var title = symHotel.get('title');
					if(symHotel.get('simpleTitle') !== null){
						title = symHotel.get('simpleTitle');
					}
					
					foundItem = _.find(mcHotelCollection.models, function(mcHotel){
						return mcHotel.get('accommodationName') !== null;
					});
				}
				
				if(typeof foundItem !== 'undefined' && foundItem !== null){
					//remove the item to prevent future searching
					mcHotelCollection.remove(foundItem);
					symHotel.setMulticomData(foundItem);
				}
				else{
					unfoundArray.push(symHotel);
				}
			});
			
			//remove all the unfound ones
			_.each(unfoundArray,function(item){
				self.remove(item);
			});
			
			
			//add the unfound hotels to the end
			_.each(mcHotelCollection.models,function(item){
				var u = new SymphonyHotelModel();
				u.buildFromMulticomHotel(item);
				self.add(u);
			});
			return;
			
		}
	});
	
	return SymphonyHotelCollection;
});
	
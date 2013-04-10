/* models/travellers.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational'
], function($,_,Backbone, BackboneRelational){
	
	"use strict";
	
	/**
		@module Model: TravellersInfo
		@exports TravellersInfo
		
		@property surname
		@property firstName
		@property dob
		@property title
		@property middleInitials
		@property countAs
		@property passengerId
		@property idExpiry
		@property idIssue
		@property foid
		@property nationality
		@property gender
		
		@property phone
		@property email
		@property middleName
		@property address1
		@property address2
		@property addressCity
		@property addressPostcode
		@property addressCountry
		
		@property {Boolean} isLeadTraveller
		@property {String} travellerType (adult | child | infant)
		@property {Integer} travellerNo  Number to identify the order of the travellers for data entry
		
	*/
	
	var TravellersInfo = Backbone.RelationalModel.extend({
		defaults: {
			//multicom params
			surname: null,
			firstName: null,
			dob: null,
			title: null,
			middleInitials: null,
			countAs: null,
			passengerId: null,
			idExpiry: null,
			idIssue: null,
			foid: null,
			nationality: null,
			gender: null,
			
			//symphony params
			phone: null,
			email: null,
			middleName: null,
			address1: null,
			address2: null,
			addressCity: null,
			addressPostcode: null,
			addressCountry: null,
			
			isLeadTraveller: false,
			travellerType: null,
			travellerNo: null
		},
		
		/**
			Joins the name parameters to return the full name
		*/
		getFullName: function(){
			var first = this.get('firstName') || '';
			
			var middle = this.get('middleName');
			var surname = this.get('surname');
			

			if(middle && middle.length > 0){
				first = first + ' ' + middle;
			}
			if(surname && surname.length > 0){
				first = first + ' ' + surname;
			}
			return first;
		},
		
		
		/**
			Parses a string into the the name fields:
			surname, firstName, middleInitials, middleName
			
			@param {string} name Name to be parsed
		*/
		parseName: function(name){
			name = $.trim(name);
			
			//only first name
			if(name.indexOf(' ') === -1){
				this.set({
						firstName: name,
						middleName: '',
						middleInitials: '',
						surname: ''
						});
				return;
			}
			
			var names = name.split(' ');
			
			//firstname and surname
			if(names.length === 2){
				this.set({
					firstName: names[0],
					middleName: '',
					middleInitials: '',
					surname: names[1]
				});
				return;
			}
			//firstname, middlename and surname
			if(names.length === 3){
				this.set({
					firstName: names[0],
					middleName: names[1],
					middleInitials: names[1].charAt(0),
					surname: names[2]
				});
				return;
			}
			
			//multiple middle names
			var middleNames = _.clone(names);
			middleNames.splice(0,1);
			middleNames.splice(middleNames.length-1,1);
			
			var middleInitials = [];
			_.each(middleNames, function(elem, index){
				middleInitials.push(elem.charAt(0));
			});
			
			this.set({
				firstName: names[0],
				surname: names[names.length-1],
				middleName: middleNames.join(' '),
				middleInitials: middleInitials.join(' ')
			});
			
		}
		
	});
	
	return TravellersInfo;
});
	
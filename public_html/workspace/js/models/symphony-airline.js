
/* models/symphony-airline.js
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','backbone-relational'
], function($,_,Backbone, BackboneRelational){
	
	"use strict";
	
	var SymphonyAirline = Backbone.RelationalModel.extend({
		defaults: {
			title: '',
			code: '',
			imageFilename: '',
			imagePath: '',
			imageWidth: 0,
			imageHeight: 0
		}
	});
	
	return SymphonyAirline;
});
	
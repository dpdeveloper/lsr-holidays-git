/* @filename views/home/home.aboutus.view
 *
 * David Anderson 2013
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	'tpl!views/home/templates/home.aboutus.view.tpl.html',
	'models/content/home-about'
	
], function($,_,Backbone,Marionette,vent,
			Template,
			ContentHomeAbout
			){
	"use strict";

	var HomeAboutUsView = Backbone.Marionette.ItemView.extend(
	/** @lends HomeAboutUsView */
	{
		/**
			Constructor
			
			@class View to Display About Us Content
			@constructs
			@param {Object} [options] Options Hash
		*/
		initialize: function(options){
			options = options || {};
			
			if('model' in options && options.model !== null){
				this.model = options.model;
			}
			else{
				this.model = new ContentHomeAbout();
			}
		},

		template: Template,
		tagName: 'div',
		attributes: {'class':'home-aboutus'}
	});
	
	return HomeAboutUsView;
});
	
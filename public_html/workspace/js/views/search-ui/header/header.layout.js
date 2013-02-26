/* @filename views/search-ui/
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent', 'reqres',
	
	'tpl!views/search-ui/templates/header.layout.tpl.html',
	'views/search-ui/header/header.form.view',
	'views/search-ui/header/header.progress.view',
	'views/search-ui/header/header.status.view'
], function(	$,_,Backbone,Marionette,vent,reqres,
				HeaderLayoutTemplate,
				HeaderFormView,
				HeaderProgressView,
				HeaderStatusView
		){
	"use strict";
	
	var HeaderLayout = Backbone.Marionette.Layout.extend({

		template: HeaderLayoutTemplate,
		regions: {
			form: '.header-form',
			progress: '.header-progress',
			status: '.header-status'
		},
		
		_formView: null,
		_progressView: null,
		_statusView: null,
		
		initialize: function(options){
			
		},
		
		onShow: function(){
			this._formView = new HeaderFormView({
				model: reqres.request('search:get:booking').trip
			});
			this._progressView = new HeaderProgressView();
			this._statusView = new HeaderStatusView();
			
			this.form.show(this._formView);
			this.progress.show(this._progressView);
			this.status.show(this._statusView);
		}
		
	});
	
	return HeaderLayout;
});
	
/* @filename views/search-ui/header/header.form.view.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','marionette','vent',
	
	'tpl!views/search-ui/templates/header.progress.view.tpl.html',
	
], function(	$,_,Backbone,Marionette,vent,
				HeaderProgressForm
			){

	var SearchHeaderProgressView = Backbone.Marionette.ItemView.extend(
	/** @lends SearchHeaderProgressView */
	{
		template: SearchHeaderProgressForm,
		
	});
	
	return HeaderProgressView;
});
	
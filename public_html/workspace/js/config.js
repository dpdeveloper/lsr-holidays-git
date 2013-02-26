/* config.js
 *
 * David Anderson 2012
 *
*/
define([
	'jquery'
],function ($) {
	
	var origin = window.location.protocol + "//" + window.location.hostname;
	var config = {
		root: $('base').attr('href').replace(origin,""),
		multicomMode: 'test' //'live' or 'test'
    };
    
    return config;
});
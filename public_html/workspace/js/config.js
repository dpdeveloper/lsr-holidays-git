/* config.js
 *
 * David Anderson 2012
 *
*/
define([
	'jquery',
	'reqres'
],function ($, reqres) {
	"use strict";

	var config = {
		root: $('base').attr('href').replace(window.location.protocol + "//" + window.location.hostname,""),
		
		contentRoot: reqres.request('config:get').contentUrl+"/",
		
		multicomMode: 'live' //'live' or 'test'
    };
    
    return config;
});
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
	var base;
	
	if($('base').length > 0){
		base = $('base').attr('href');
	}
	else{
		base = '../public_html/'; //test code
	}
	

	var config = {
		root: base.replace(window.location.protocol + "//" + window.location.hostname,""),
		
		contentRoot: reqres.request('config:get').contentUrl+"/",
		
		multicomMode: 'live' //'live' or 'test'
    };
    
    return config;
});
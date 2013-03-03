/* helpers/view-helper.js
 *
 * David Anderson 2012
 *
*/

define([
	'jquery','underscore','backbone','config'
], function($,_,Backbone,config){
	"use strict";
	
	
	/** @class ViewHelper */
	var viewHelper = {
	
	
		/**
			Generates a jit image url for symphony JIT image resizing
			
			@param image: An image object that should contain
				image.path
				image.filename
				image.height
				image.fit
			@param width: The desired width of the resulting image
			@param height: The desired height of the resulting image
			@param mode: Supported: (full | crop-fill | fit) Unsupported ( resize | resize-canvas | image-fit)
			@param external: If the image is from an external source
			
		*/
		imageUrl: function(image, width, height, mode){
			
			if(mode === undefined || mode === null){
				mode = 'crop-fill';
			}
			var url= config.contentRoot + 'image/';
			
			//external images
			var external=0;
			if(image.external === 1){
				external=1;
				
				//remove http from url if possible
				image.filename = image.filename.replace('http://', '');
					
			}
			if( mode === 'crop-fill'){
				url = url + "2/"+width+"/"+height+"/5/"+external+image.path+"/"+image.filename;
			}
			else if( mode === 'fit'){
				var srcHeight = image.height;
				var srcWidth = image.width;
				var destHeight = height;
				var destWidth = width;
				
				var sf1 = destHeight / srcHeight;
				var sf2 = destWidth / srcWidth;
				
				var sf = 0;
				
				if(sf1 * srcWidth <= destWidth){
					sf = sf1;
				}
				else if(sf2 * srcHeight <= destHeight){
					sf = sf2;
				}
				
				url = url + "2/"+Math.round(srcWidth * sf)+"/"+Math.round(srcHeight * sf)+"/5/"+external+image.path+"/"+image.filename;
			}
			else{
				url = url + external+image.path+"/"+image.filename;
			}
			
			return url;
		},
		
		/**
			Function to render star ratings
			
			@param n = The number of 'active stars'
			@param total = The total number of possible stars
		*/
		stars: function(n,total){
			var output="";
			for(var i=1; i<=total; i++){
				
				if(i <= n){
					output=output + "<span class='star'></span>";
				}
				else{
					output=output + "<span class='star grey'></span>";
				}
			}
			return output;
		},
		
		/**
			Takes HTML, flattens out any tags and truncates to the specified length
			'word aware' so  will attempt to truncate to the nearest word
			
			@param html = The html to be truncated
			@param len = The length to truncate to
		*/
		flattenAndTruncate: function(html, len){
			
			var str = $(html).contents().text();
			
			if(str.length > len){
				for(var i=len; i > 0; i++){
					if(str.charAt(i) === ' '){
						break;
					}
				}
				if(i === 0){
					str = str.substr(0, len);
				}
				else{
					str = str.substr(0, i);
				}
				str=str+"…";
			}
			return str;
		},
		
		
		/**
			Expects a date in the format YYYYMMDD
			
			@param date
			@return a date in the format dd/mm/yyyy
		*/
		formatMulticomDate: function(date){
			var y = date.substring(0,4);
			var m = date.substring(4,6);
			var d = date.substring(6);
			return d + "/" + m + "/" + y;
		}
		
		
	};
	return viewHelper;
});
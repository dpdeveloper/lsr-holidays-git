/*
	libs/string-helpers.js
	
	Collection of helper functions
	
*/


/**
 * String.unescape()
 *
 * Unescapes string functions, coping with html or non-html
 *
 * Useful for displaying HTML that has been encoded for JSON transmit
*/
String.prototype.unescape = function() {
  var node = document.createElement('div');
  node.innerHTML = this;
  if('undefined' == typeof(node.innerText)) {
    return node.textContent; // FF
  }
  return node.innerText; // IE
}

/**
 * String.capitalize
 *
*/
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};
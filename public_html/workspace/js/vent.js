/* vent.js
 * Event Aggregator
 *
*/
define([
	'backbone','marionette'
],function(Backbone,Marionette){
  "use strict";
  return new Backbone.Wreqr.EventAggregator();
});
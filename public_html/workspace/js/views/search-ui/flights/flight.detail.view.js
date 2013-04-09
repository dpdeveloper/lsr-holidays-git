/* @filename views/search-ui/summary/summary.flight.view.js
*
* David Anderson 2012
*
*/

define([
'jquery', 'underscore', 'backbone', 'marionette', 'vent', 'colorbox',
'tpl!views/search-ui/templates/flight.detail.view.tpl.html',
'helpers/view-helper'

], function ($, _, Backbone, Marionette, vent, jcb,
popup,
viewHelper
) {
    "use strict";

    var SearchUIFlightsDetailView = Backbone.Marionette.ItemView.extend(
{
   
    template: popup,
    templateHelpers: viewHelper,


    tagName: 'div',
    attributes: { 'class': 'filter-detail-view' },

    initialize: function (options) {
        options = options || {};
      
        this.render();

    },
    onRender: function () {
        this.$el.addClass('selected');
    }

});

return SearchUIFlightsDetailView;
});

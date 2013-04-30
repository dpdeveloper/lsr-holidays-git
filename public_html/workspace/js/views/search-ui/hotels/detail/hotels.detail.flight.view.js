/* @filename views/search-ui/summary/summary.flight.view.js
*
* David Anderson 2012
*
*/

define([
	'jquery', 'underscore', 'backbone', 'marionette', 'vent',  'moment',
	'tpl!views/search-ui/templates/hotels.detail.flight.view.tpl.html',
	'tpl!views/search-ui/templates/flight.detail.view.tpl.html',
	'collections/symphony-airline',
	'models/multicom/multicom-flight',
	'helpers/view-helper',
	'views/search-ui/flights/flight.detail.view'


], function ($, _, Backbone, Marionette, vent,  moment,
			SearchUIHotelsDetailFlightTemplate, popup,
			SymphonyAirlineCollection,
			MulticomFlight,
			viewHelper, FlightDetailView
			) {
    "use strict";

    var SearchUIHotelsDetailFlightView = Backbone.Marionette.ItemView.extend(
    /** @lends SearchUIHotelsDetailFlightView */
	{
	template: SearchUIHotelsDetailFlightTemplate,
	model: new MulticomFlight(),
	templateHelpers: viewHelper,

	tagName: 'div',
	attributes: { 'class': 'search-ui-hotels-detail-flight' },

	events: {
	    'click .summary-flight-outer': 'handleClick',
	    'click .action-edit': 'handleClick',
	    'click .action-detail': 'handlePopup'
	},

	_flightSelected: false,
	_isSelected: false,
	_airlineCollection: null,


	/**
	Constructor
			
	@class View to display the chosen flights
	@constructs
	@param {Object} [options] Options Hash
	*/
	initialize: function (options) {
	    options = options || {};

	    this._airlineCollection = new SymphonyAirlineCollection();

	    if (options.airlineCollection) {
	        this._airlineCollection.reset(options.airlineCollection.models, { silent: true });
	    }
	    if (options.model && options.model !== null) {
	        this.model.set(options.model.toJSON());
	        this._flightSelected = true;
	    }
	    else {

	        this.model = new MulticomFlight();
	    }

	    this.listenTo(vent, 'search:flight:selected', this.handleFlightSelected);
	    this.listenTo(vent, 'search:flight:edit', this.handleFlightEdit);
	    this.listenTo(vent, 'search:hotel:selected', this.handleHotelSelected);
		this.listenTo(vent, 'search:rooms:updated', this.handleHotelSelected);


	},

	onClose: function () {
	    this._airlineCollection = null;
	},

	handleFlightEdit: function () {
	    this._isSelected = true;

		this.render();
	},

	handleHotelSelected: function () {
	    this._isSelected = false;
	    this.render();
	},

	handleFlightSelected: function (flight) {
	    this.model.set(flight.toJSON());

	    this._flightSelected = true;
	    this._isSelected = false;
	    this.render();
	},

	serializeData: function () {

	    return $.extend({
	        flightSelected: this._flightSelected,
	        outboundFlightLogo: this._airlineCollection.getAirlineFromCode(this.model.get('outboundCarrier')),
	        returnFlightLogo: this._airlineCollection.getAirlineFromCode(this.model.get('returnCarrier'))
	    },

		this.model.toJSON()
		);s
	},

	onRender: function () {
	    if (this._isSelected) {

	        this.$el.addClass('selected');
	    }
	    else {
	        this.$el.removeClass('selected');
	    }
	},

	handleClick: function (ev) {
	    ev.preventDefault();
	    vent.trigger('search:flight:edit');
	},
	setDatesFromStartFinish: function (start, end) {
	    var format = "DD/MM/YYYY HH:mm:ss";

	    var s = moment(start, format);
	    var e = moment(end, format);

	    var nights = (e.diff(s, 'seconds')).toString();


	    var t = parseInt(nights);
	    var h = Math.floor(t / 3600);
	    t %= 3600;
	    var m = Math.floor(t / 60);
	    var s = t % 60;

	    return (h > 0 ? h + 'h ' : '0h ') + (m > 0 ? m + 'm ' : '0m');


	},


	handlePopup: function (ev) {
	    ev.preventDefault();

	    var flightdetails = new FlightDetailView({ model: this.model });
	    flightdetails.render();

	    console.log(flightdetails.el);

	}

});

    return SearchUIHotelsDetailFlightView;
});
	
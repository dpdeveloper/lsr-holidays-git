/* @filename views/search-ui/summary/summary.flight.view.js
*
* David Anderson 2012
*
*/

define([
'jquery', 'underscore', 'backbone', 'marionette', 'vent', 'colorbox', 'moment',
'text!views/search-ui/templates/flight.detail.view.tpl.html',
'helpers/view-helper'

], function ($, _, Backbone, Marionette, vent, jcb, moment,
popup,
viewHelper
) {
    "use strict";

    var SearchUIFlightsDetailView = Backbone.Marionette.ItemView.extend(
{


    templateHelpers: viewHelper,


    tagName: 'div',
    attributes: { 'class': 'filter-detail-view' },

    initialize: function (options) {
        options = options || {};

        this.template = _.template(popup);

        this.onRender();

    }, setDatesFromStartFinish: function (start, end) {

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


    }, serializeData: function () {

        if (this.model.get('outboundSubSegments').length > 0) {
        } else { }
        ////Outbound Legs Generation
        if (this.model.get('outboundNumStops') == 0 && this.model.get('outboundMultiLeg') == false) {

            this.model.set({

                Outboundtimespan: this.setDatesFromStartFinish(moment(this.model.get('departureDate') + this.model.get('departureTime'), 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'), moment(this.model.get('arrivalDate') + this.model.get('arrivalTime'), 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'))
            });
        }
        else {

            this.model.set({

                Outboundtimespan: this.setDatesFromStartFinish(moment(this.model.get('departureDate') + this.model.get('departureTime'), 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'), moment(this.model.get('arrivalDate') + this.model.get('arrivalTime'), 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'))
            });
            _.each(this.model.get("outboundSubSegments"), function (outboundSubSegment, index) {
                if (index > 0) {
                    this.model.get('outboundSubSegments')[index - 1].OutBoundStopOver = this.setDatesFromStartFinish(moment(this.model.get('outboundSubSegments')[index - 1].arrivalDate + this.model.get('outboundSubSegments')[index - 1].arrivalTime, 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'), moment(outboundSubSegment.departureDate + outboundSubSegment.departureTime, 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'));
                }

                var outboundSubSegmentstimespan = this.setDatesFromStartFinish(moment(outboundSubSegment.departureDate + outboundSubSegment.departureTime, 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'), moment(outboundSubSegment.arrivalDate + outboundSubSegment.arrivalTime, 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'));
                outboundSubSegment['outboundSubSegmentstimespan'] = outboundSubSegmentstimespan;
                outboundSubSegment['departureTimeFormat'] = moment(outboundSubSegment.departureTime, 'HHmm').format('HH:mm');
                outboundSubSegment['arrivalTimeFormat'] = moment(outboundSubSegment.arrivalTime, 'HHmm').format('HH:mm');


            }, this);
        }
        //Inbound Legs Generation
        if (this.model.get('returnNumStops') == 0) {

            this.model.set({

                Inboundtimespan: this.setDatesFromStartFinish(moment(this.model.get('returnHomeDepartDate') + this.model.get('returnHomeDepartTime'), 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'), moment(this.model.get('returnHomeDate') + this.model.get('returnHomeTime'), 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'))
            });
        } else {

            this.model.set({

                Inboundtimespan: this.setDatesFromStartFinish(moment(this.model.get('returnHomeDepartDate') + this.model.get('returnHomeDepartTime'), 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'), moment(this.model.get('returnHomeDate') + this.model.get('returnHomeTime'), 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'))
            });
            _.each(this.model.get("returnSubSegments"), function (inboundSubSegment, index) {
                if (index > 0) {
                    this.model.get('returnSubSegments')[index - 1].InBoundStopOver = this.setDatesFromStartFinish(moment(this.model.get('returnSubSegments')[index - 1].arrivalDate + this.model.get('returnSubSegments')[index - 1].arrivalTime, 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'), moment(inboundSubSegment.departureDate + inboundSubSegment.departureTime, 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'));
                }
                var inboundSubSegmentstimespan = this.setDatesFromStartFinish(moment(inboundSubSegment.departureDate + inboundSubSegment.departureTime, 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'), moment(inboundSubSegment.arrivalDate + inboundSubSegment.arrivalTime, 'YYYY-MM-DDHHmm').format('DD/MM/YYYY HH:mm:ss'));
                inboundSubSegment['inboundSubSegmentstimespan'] = inboundSubSegmentstimespan;
                inboundSubSegment['departureTimeFormat'] = moment(inboundSubSegment.departureTime, 'HHmm').format('HH:mm');
                inboundSubSegment['arrivalTimeFormat'] = moment(inboundSubSegment.arrivalTime, 'HHmm').format('HH:mm');

            }, this);
        }
        //Timeformat Generation
        this.model.set({

            departureTimeformat: moment(this.model.get('departureTime'), 'HHmm').format('HH:mm')
, arrivalTimeformat: moment(this.model.get('arrivalTime'), 'HHmm').format('HH:mm'),
            returnHomeDepartTimeformat: moment(this.model.get('returnHomeDepartTime'), 'HHmm').format('HH:mm'), returnHomeTimeformat: moment(this.model.get('returnHomeTime'), 'HHmm').format('HH:mm')
        });

        console.log(this.model.toJSON());
        this.$el.html(this.template(this.model.toJSON()));


        jQuery.colorbox({
            html: this.el
        });
    },
    onRender: function () {
        this.$el.addClass('selected');
    }

});

    return SearchUIFlightsDetailView;
});

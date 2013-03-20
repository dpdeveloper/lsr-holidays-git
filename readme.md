# LSR Holidays Content Server

* David Anderson
* 2013-03-20
* Readme v1.0



# Installation

Pre-requisites:

1. A locally installed web server [for example xampp](http://www.apachefriends.org/en/xampp.html)
2. Empty MySQL database created with full priviledges
3. [Compass for CSS complication](http://compass-style.org)
4. A Browser (ie Google Chrome) to run application and unit tests!

Installation

1. Pull repository from github
2. Run build/deploy/staging/install
3. Visit /install on the server to complete the process
4. Configure Database Access [@TODO]



# Frontend Development



## Overview




All work should be carried out in a git controlled environment with all development made on the **integration** branch.

The javascript component of the application is contained:

* Application: /public_html/workspace/js
* Unit Tests: /tests/
* Development Environment: /designer/

The (/designer/) folder loads the application in *test* mode such that all external data is pulled from the (public_html/json_test) folder for ease of development. The live application will pull information from a seperate server.





## Design Patterns



### Javascript

The application is structured into Asynchronous-Module-Definitions (AMD), such that each javascript 'object' has a seperate file. [For reference, please see here](http://backbonetutorials.com/organizing-backbone-using-modules/).
As such, require.js is used to define dependencies between modules and to load files (please see public_html/workspace/js/boilerplate).

The design patterns of the application conform to those laid out in the Backbone.Marionette library. This features:

* ItemViews
* CollectionViews
* Layout & Regions
* [Event Aggregation](http://lostechies.com/derickbailey/2012/04/03/revisiting-the-backbone-event-aggregator-lessons-learned/)
* Application Router

The model design patterns use the Backbone.Relational library to provide data to provide nested data structures.



### HTML Templates



The [underscore templating system](http://www.bennadel.com/blog/2411-Using-Underscore-js-Templates-To-Render-HTML-Partials.htm) is used to for HTML templates.
Unlike the previous link, these are stored in seperate files, for example (/public_html/workspace/js/views/search-ui/templates).

These are loaded into the Backbone Views using the requirejs tpl! plugin (see boilerplate) for compilation



### CSS / SCSS



[SCSS - Dynamic CSS is used in this project](http://sass-lang.com/) and is compiled with the [Compass compiler](http://compass-style.org/)

The SCSS resides in the *(public_html/workspace/scss)* folder and is compiled into the *(public_html/workspace/stylesheets)* folder.

For ease of use, compass should be installed and set to [watch the folder for automatic compilation](http://compass-style.org/help/tutorials/command-line/)


## Unit Tests



Unit testing was added to this project mid way through development, as such there is not complete unit test coverage. However all new code or bugs should be unit tested.

The tests reside in the *(/tests/specs/)* folder and can be run using the *(/tests/index.html)* file. They are powered by the Jasmine Framework:

* [Jasmine](https://github.com/pivotal/jasmine)
* [Available Matchers](https://github.com/pivotal/jasmine/wiki/Matchers)
* [Additionally, the [jQuery plugin is used](https://github.com/velesin/jasmine-jquery)

**Unit tests should pass before a commit is made**.



## Adding Unit Tests



1. Copy the boilerplate code (tests/spec/view.boilerplate.spec.js) into the correct folder in the spec folder
2. Rename the file to match the naming convention (see spec folder for existing examples)
3. Replace the DESCRIPTION/PATH/VIEW_NAME as required in the new file
4. Add the filename to tests/specRunner.js
5. Load (tests/index.html) in browser to confirm that the test has run


## Useful Files / Foliders:

* **/designer/** An environment that loads the application in test mode and displays the search pane
* **/tests/** Unit Tests Suite
* **/public_html/workspace/js/** Javascript app root

* **public_html/workspace/js/boilerplate/** Boilerplate folder for Backbone componenets
* **tests/view.boilerplate.spec.js** Jasmine Boilerplate Unit Test

* **/docs** JSDOC documentation for application (Incomplete at present time)





## Libraries and Reference

*Backend/CMS*
* Symphony CMS (http://getsymphony.com/)

*General*
* [Require.js](http://requirejs.org/docs/api.html)
* [jQuery](http://api.jquery.com/)
* [Backbone](http://backbonejs.org/)
* [Underscore](http://underscorejs.org/)

*Data Structures*
* [Backbone.Relational](http://backbonerelational.org/)

*UI Structure*
* [Backbone Marionette MVC Framework](https://github.com/marionettejs/backbone.marionette)

*Animations / Effects*

* [jQueryUI](http://api.jqueryui.com/)
* [jQuery.Transit - CSS3 Transitions](http://ricostacruz.com/jquery.transit/)
* [Colorbox - lightbox effects](http://www.jacklmoore.com/colorbox/)
* [Select2.0 - select boxes](http://ivaynberg.github.com/select2/)

*Unit Testing*

* [Jasmine](http://pivotal.github.com/jasmine/)
* [Jasmine jQuery Plugin](https://github.com/velesin/jasmine-jquery)

*Browser Compatibility*

* [Modernizr](http://modernizr.com/)
* [Respond.js](https://github.com/scottjehl/Respond)

*Miscellaneous*
* [Moment -Date Manipulation](http://momentjs.com/)
* [jQuery.Actual - DOM manipulation when not shown](https://github.com/dreamerslab/jquery.actual)






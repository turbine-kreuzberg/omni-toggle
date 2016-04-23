requirejs.config( {
    baseUrl: '../src/'
} );

require( ['toggle'], function( Toggle ) {
    var toggleTrigger = document.querySelectorAll( '[data-toggle]' );
    var toggle = new Toggle();
    toggle.initMultiple( toggleTrigger );
} );

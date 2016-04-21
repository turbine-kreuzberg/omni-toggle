requirejs.config( {
    baseUrl: '../src/'
} );

require( ['toggle'], function( Toggle ) {
    var toggleTrigger = document.querySelectorAll( '[data-toggle]' );
    if( toggleTrigger.length > 0 ) {
        Toggle.initMultiple( toggleTrigger );
    }
} );

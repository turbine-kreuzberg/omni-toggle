define( ['toggle'], function( Toggle ) {

    describe( 'module API', function() {

        it( 'has Require.js loaded', function() {
            if( typeof define !== "function" || !define.amd ) {
                throw new Error( 'Require.js was not loaded' );
            }
        } );

        it( 'has module loaded', function() {
            if( !Toggle ) {
                throw new Error( 'The module Toggle could not be loaded.' );
            }
        } );

        it( 'has public method init()', function() {
            if( typeof Toggle.init !== 'function' ) {
                throw new Error( 'The module Toggle has no (public) init() method.' );
            }
        } );

    } );

} );

//describe( 'Testing module API', function() {
//
//    var Toggle;
//
//    beforeEach( function( done ) {
//        require( ['src/toggle'], function( _Toggle ) {
//            Toggle = _Toggle;
//            done();
//        } );
//    } );
//
//    describe( 'module loaded', function() {
//
//    } );
//
//} );

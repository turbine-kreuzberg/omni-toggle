describe( 'Basic setup', function() {

    it( 'has Require.js loaded', function() {
        define.should.be.Function();
        define.should.have.property( 'amd' );
    } );

    describe( 'Check Toggle module with default config', function() {
        var toggle;

        beforeEach( function( done ) {
            require( ['toggle'], function( Toggle ) {
                toggle = new Toggle();
                done();
            } );
        } );

        it( 'can load module', function() {
            toggle.should.exist;
        } );

        it( 'has public method init()', function() {
            toggle.init.should.be.Function();
        } );

        it( 'has public method initMultiple()', function() {
            toggle.initMultiple.should.be.Function();
        } );
    } );

} );

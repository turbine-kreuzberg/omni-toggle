describe( 'Basic setup', function() {

    it( 'has Require.js loaded', function() {
        define.should.be.Function();
        define.should.have.property( 'amd' );
    } );

    describe( 'Check Toggle module', function() {
        var Toggle;

        beforeEach( function( done ) {
            require( ['toggle'], function( _Toggle ) {
                Toggle = _Toggle;
                done();
            } );
        } );

        it( 'can load module', function() {
            Toggle.should.exist;
        } );

        it( 'has public method init()', function() {
            Toggle.init.should.be.Function();
        } );

        it( 'has public method initMultiple()', function() {
            Toggle.initMultiple.should.be.Function();
        } );
    } );

} );

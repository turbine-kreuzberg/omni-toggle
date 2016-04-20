describe( 'Toggle', function() {

    var Toggle;

    before( function( done ) {
        require( ['toggle'], function( _Toggle ) {
            Toggle = _Toggle;
            done();
        } );
    } );

    for( var fixtureName in window.__html__ ) {
        (function() {
            var fixture = window.__html__[fixtureName];
            describe( fixtureName, function() {
                var toggleTrigger,
                    status;

                before( function( done ) {
                    document.body.innerHTML = fixture;
                    done();
                } );

                it( 'document has toggle trigger element', function() {
                    toggleTrigger = document.body.querySelector( '[data-toggle]' );
                    toggleTrigger.should.is.instanceof( Element );
                } );

                it( 'initialize toggle script', function() {
                    status = Toggle.init( toggleTrigger );
                    status.should.be.true();
                } );

                it( 'toggle targets have class .toggle-target', function() {
                    var toggleTargets = document.querySelectorAll( toggleTrigger.dataset.toggle ),
                        toggleTargetsLength = toggleTargets.length;

                    for( var i = 0; i < toggleTargetsLength; i++ ) {
                        toggleTargets[i].classList.contains( 'toggle-target' ).should.be.true();
                    }
                } );

                it( 'toggle targets have max-height', function() {
                    var toggleTargets = document.querySelectorAll( toggleTrigger.dataset.toggle ),
                        toggleTargetsLength = toggleTargets.length,
                        maxHeight;

                    for( var i = 0; i < toggleTargetsLength; i++ ) {
                        maxHeight = parseInt( toggleTargets[i].style.maxHeight );
                        maxHeight.should.be.Number().and.above( 0 );
                    }
                } );

                it( 'changes state on click', function() {
                    toggleTrigger.dispatchEvent( new Event( 'click' ) );

                    /* The trigger should have a className "open" */
                    toggleTrigger.classList.contains( 'open' ).should.be.true();

                    /* Each toggle target should have a className "visible" */
                    var toggleTargets = document.querySelectorAll( toggleTrigger.dataset.toggle ),
                        toggleTargetsLength = toggleTargets.length;

                    for( var i = 0; i < toggleTargetsLength; i++ ) {
                        toggleTargets[i].classList.contains( 'visible' ).should.be.true();
                    }
                } );
            } );
        })()
    }

} );

describe( 'Toggle', function() {

    var toggle;

    before( function( done ) {
        require( ['toggle'], function( Toggle ) {
            toggle = new Toggle();
            done();
        } );
    } );

    var basicFixtures = ['test/html/multiple-toggle.htm', 'test/html/single-toggle.htm'];
    for( var i=0; i<basicFixtures.length; i++){
        (function() {
            var fixtureName = basicFixtures[i];

            var fixture = window.__html__[fixtureName];
            describe( fixtureName, function() {
                var toggleTrigger,
                    toggleTargets = [],
                    toggleTargetsLength = 0,
                    status;

                before( function( done ) {
                    document.body.innerHTML = fixture;

                    toggleTrigger = document.body.querySelector( '[data-toggle]' );

                    var toggleTargetElements = document.querySelectorAll( toggleTrigger.dataset.toggle );
                    toggleTargetsLength = toggleTargetElements.length;

                    for( var i = 0; i < toggleTargetsLength; i++ ) {
                        toggleTargets[i] = {
                            element: toggleTargetElements[i],
                            initialVisible: toggleTargetElements[i].classList.contains( 'visible' )
                        }
                    }
                    done();
                } );

                it( 'document has toggle trigger element', function() {
                    toggleTrigger.should.be.instanceof( Element );
                } );

                it( 'initialize toggle script', function() {
                    status = toggle.init( toggleTrigger );
                    status.should.be.true();
                } );

                it( 'toggle targets have class .toggle-target', function() {
                    for( var i = 0; i < toggleTargetsLength; i++ ) {
                        toggleTargets[i]['element'].classList.contains( 'toggle-target' ).should.be.true();
                    }
                } );

                it( 'toggle targets have max-height', function() {
                    var maxHeight;

                    for( var i = 0; i < toggleTargetsLength; i++ ) {
                        maxHeight = parseInt( toggleTargets[i]['element'].style.maxHeight );
                        maxHeight.should.be.Number().and.above( 0 );
                    }
                } );

                it( 'changes state on first click', function() {
                    toggleTrigger.dispatchEvent( new Event( 'click' ) );

                    setTimeout( function() {
                        /* The trigger should have a className "open" */
                        toggleTrigger.classList.contains( 'open' ).should.be.true();

                        /* Each toggle target should have a className "visible" */
                        for( var i = 0; i < toggleTargetsLength; i++ ) {
                            should.notEqual(
                                toggleTargets[i]['element'].classList.contains( 'visible' ),
                                toggleTargets[i]['initialVisible']
                            );
                        }
                    }, 10 );
                } );

                it( 'prevent double click', function() {
                    /* If a repeated click is triggered immediately, the plugin should do nothing */
                    toggleTrigger.dispatchEvent( new Event( 'click' ) );

                    setTimeout( function() {
                        /* The trigger should have a className "open" */
                        toggleTrigger.classList.contains( 'open' ).should.be.true();

                        /* Each toggle target should have a className "visible" */
                        for( var i = 0; i < toggleTargetsLength; i++ ) {
                            should.notEqual(
                                toggleTargets[i]['element'].classList.contains( 'visible' ),
                                toggleTargets[i]['initialVisible']
                            );
                        }
                    }, 10 );
                } );

                it( 'revert state on second click', function() {
                    /* Use a little delay, since the  */
                    setTimeout( function() {
                        toggleTrigger.dispatchEvent( new Event( 'click' ) );

                        /* The trigger should have a className "open" */
                        toggleTrigger.classList.contains( 'open' ).should.be.false();

                        for( var i = 0; i < toggleTargetsLength; i++ ) {
                            should.equal(
                                toggleTargets[i]['element'].classList.contains( 'visible' ),
                                toggleTargets[i]['initialVisible']
                            );
                        }
                    }, 500 );
                } );
            } );
        })()
    }

    describe( 'radio buttons', function() {
        var fixtureName = 'test/html/radio-button-toggle.htm';
        var fixture = window.__html__[fixtureName];

        before( function( done ) {
            document.body.innerHTML = fixture;
            done();
        } );

        it( 'switch the checked state on click', function() {
            var firstRadio = document.getElementById('radio1');
            var secondRadio = document.getElementById('radio2');
            secondRadio.click();

            firstRadio.checked.should.be.false();
            secondRadio.checked.should.be.true();
        });
    });

} );

/**
 * Module for toggling visibility of content elements.
 *
 * Supports multiple triggers and toggling multiple areas at once as well as switching texts in toggle triggers.
 */
define( ['functions'], function( Functions ) {

    var config = {
        dataAttribute: {
            toggle: 'toggle',
            defaultText: 'toggleDefaultText',
            alternativeText: 'toggleText',
            initialStateFlag: 'toggleDefaultState'
        },
        className: {
            toggleTarget: 'toggle-target',
            visible: 'visible',
            transitionEnd: 'full'
        },
        event: {
            toggleStart: 'toggle-start'
        }
    };

    function dispatchStartEvent( trigger, contentToToggle, isInitialToggleState ) {
        document.dispatchEvent( new CustomEvent( config.event.toggleStart, {
            detail: {
                toggleTrigger: trigger,
                toggleTargets: contentToToggle,
                isInitialToggleState: isInitialToggleState
            }
        } ) );
    }

    /**
     * This helper function replaces the default text content with an alternative text,
     * when the toggle was triggered.
     *
     * @param {Element} trigger
     * @param {Boolean} isInitialToggleState
     */
    function switchTexts( toggleTrigger, isInitialToggleState ) {
        if( !(config.dataAttribute.alternativeText in toggleTrigger.dataset) ) {
            /* No alternative text was set – do nothing */
            return;
        }

        if( isInitialToggleState === true ) {
            toggleTrigger.textContent = toggleTrigger.dataset[config.dataAttribute.defaultText];
        }
        else {
            toggleTrigger.textContent = toggleTrigger.dataset[config.dataAttribute.alternativeText];
        }
    }

    /**
     * @param {Element} trigger
     * @param elementsToToggle
     * @return {*|Function}
     */
    function toggleStates( trigger, elementsToToggle ) {
        return Functions.debounce( function( event ) {
            /* Just in case that the trigger was a link or submit button */
            event.preventDefault();

            /* The current initialStateFlag must be inverted */
            var isInitialToggleState = !(trigger.dataset[config.dataAttribute.initialStateFlag] === 'true');

            dispatchStartEvent( trigger, elementsToToggle, isInitialToggleState );

            switchTexts( trigger, isInitialToggleState );

            /* Store current toggle state */
            trigger.dataset[config.dataAttribute.initialStateFlag] = isInitialToggleState;

            /* Toggle the target elements by setting or removing a class name */
            for( var i = 0; i < elementsToToggle.length; i++ ) {
                var isVisible = elementsToToggle[i].classList.contains( config.className.visible );
                if( !isVisible ) {
                    elementsToToggle[i].classList.add( config.className.visible );
                    trigger.classList.add( 'open' );
                }
                else {
                    elementsToToggle[i].classList.remove( config.className.transitionEnd );
                    elementsToToggle[i].classList.remove( config.className.visible );
                    trigger.classList.remove( 'open' );
                }
            }
        }, 100, true );
    }

    /**
     * @param {Element} toggleTrigger
     */
    function initTriggerElement( toggleTrigger ) {
        toggleTrigger.dataset[config.dataAttribute.initialStateFlag] = true;

        if( config.dataAttribute.alternativeText in toggleTrigger.dataset ) {
            /* Store default text to allow switching back and forth between to labels */
            toggleTrigger.dataset[config.dataAttribute.defaultText] = toggleTrigger.textContent;
        }
    }

    /**
     * Set the computed max-height for a smooth transition;
     * This is mostly voodoo based on trial and error
     *
     * @param {Element} element
     */
    function setComputedMaxHeight( element ) {
        var computedMaxHeight;

        /* Take invisible elements out of flow to prevent jumping up and down of the following elements */
        if( !element.classList.contains( config.className.visible ) ) {
            element.style.visibility = 'hidden';
            element.style.position = 'absolute';
        }

        /* Disable any transition, to prevent flickering */
        element.style.transition = 'initial';

        element.style.setProperty( 'max-height', 'none', 'important' );

        /* Store teh computed Height of the toggled element */
        computedMaxHeight = Math.ceil( element.offsetHeight );

        /* Remove all temporary styles again */
        element.style.removeProperty( 'max-height' );
        element.style.removeProperty( 'visibility' );
        element.style.removeProperty( 'position' );

        /* Set the computed height to the target element */
        element.style.maxHeight = computedMaxHeight + 'px';

        /* Re-enable transition asynchronously to give the browser some time to render the content */
        setTimeout( function() {
            element.style.removeProperty( 'transition' );
        }, 1 );
    }

    /**
     * @param {NodeList} elementsToToggle
     */
    function initToggleTargets( elementsToToggle ) {
        var i, len = elementsToToggle.length;

        for( i = 0; i < len; i++ ) {

            setComputedMaxHeight( elementsToToggle[i] );

            /* For specific styling or animations on toggle targets */
            elementsToToggle[i].classList.add( config.className.toggleTarget );

            /* Add a class name when the transition has ended */
            ['transitionend', 'webkitTransitionEnd'].forEach( function( transition ) {
                /* Required for async callback */
                var currentElement = elementsToToggle[i];
                currentElement.addEventListener( transition, function() {
                    var isVisible = currentElement.classList.contains( config.className.visible );
                    if( isVisible ) {
                        currentElement.classList.add( config.className.transitionEnd );
                    }
                }, false );
            } );
        }
    }

    /**
     * Setup the main event handlers
     *
     * @param {Element|HTMLInputElement} toggleTrigger
     * @param {NodeList} elementsToToggle
     */
    function listenToToggleInteraction( toggleTrigger, elementsToToggle ) {
        var eventName = 'click';
        if( requiresChangeEventListener() ) {
            eventName = 'change';
        }
        toggleTrigger.addEventListener( eventName, toggleStates( toggleTrigger, elementsToToggle ) );
    }

    /**
     * Checks if the given element needs a change event listener instead of click.
     */
    function requiresChangeEventListener(element){
      return element instanceof HTMLInputElement && (element.type === 'radio' || element.type === 'checkbox');
    }

    var module = {
        /**
         * Toggle visibility of content elements with the given trigger. Needs an attribute [data-toggle] with a comma
         * separated list of CSS selectors as its value. All content matching the selectors will have a class .toggle-target
         * added to them and be initially hidden.
         *
         * Add the classes .visible and .full to the elements that should be open by default.
         *
         * Additionally the attribute [data-toggle-text] can be used to set the text that the button content should be changed
         * to on toggle.
         *
         * @param {Element} toggleTrigger The  trigger element, which referred to the toggle contents with a selector in [data-toggle].
         * @return {boolean}
         */
        init: function( toggleTrigger ) {
            if( !(toggleTrigger instanceof Element) ) {
                console.error( 'Toggle.init(): The first parameter must be of type Element.' );
                return false;
            }

            var elementsToToggle;

            try {
                elementsToToggle = document.querySelectorAll( toggleTrigger.dataset[config.dataAttribute.toggle] );
            } catch( e ) {
                console.error( 'Toggle.init(): Invalid selector for toggle target.' );
                return false;
            }

            initTriggerElement( toggleTrigger );

            initToggleTargets( elementsToToggle );

            listenToToggleInteraction( toggleTrigger, elementsToToggle );

            return true;
        },

        /**
         * Initialize a list of toggle triggers at once from a NodeList. With
         * the default configuration you can use:
         *
         * var toggleTrigger = document.querySelectorAll( '[data-toggle]' );
         * Toggle.initMultiple( toggleTrigger );
         *
         * See initToggleTrigger() for specifics on the requirements for the
         * elements in the collection.
         *
         * @param {NodeList} toggleTriggers
         * @return {boolean}
         */
        initMultiple: function( toggleTriggers ) {
            if( !(toggleTriggers instanceof NodeList) ) {
                console.error( 'initToggleTriggerCollection(): The first parameter must be of type NodeList.' );
                return false;
            }

            var toggleTriggerCount = toggleTriggers.length;
            for( var i = 0; i < toggleTriggerCount; i++ ) {
                this.init( toggleTriggers[i] );
            }

            return true;
        }
    };

    return module;
} );

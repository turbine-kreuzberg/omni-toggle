/**
 * This is a common VOTUM module for often used functions.
 *
 * The functions must be without further dependencies outside this module scope.
 *
 * @author    Thomas Heuer <thomas.heuer@votum.de>
 * @copyright Copyright © 2015 VOTUM GmbH
 */
define( function() {

    // Polyfill Object.assign if not present
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    if (typeof Object.assign != 'function') {
        (function () {
            Object.assign = function (target) {
                'use strict';
                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        })();
    }

    var module = {

        /**
         * Returns a function, that, as long as it continues to be invoked, will not be triggered.
         * The function will be called after it stops being called for N milliseconds.
         * If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
         *
         * This function is copied from Underscore.js
         * @see https://github.com/jashkenas/underscore
         *
         * @param {Function} func
         * @param {Integer} wait
         * @param {Boolean} immediate
         * @returns {Function}
         */
        debounce: function( func, wait, immediate ) {
            var timeout, args, context, timestamp, result;

            var later = function() {
                var last = new Date().getTime() - timestamp;

                if( last < wait && last >= 0 ) {
                    timeout = setTimeout( later, wait - last );
                }
                else {
                    timeout = null;
                    if( !immediate ) {
                        result = func.apply( context, args );
                        if( !timeout ) {
                            context = args = null;
                        }
                    }
                }
            };

            return function() {
                context = this;
                args = arguments;
                timestamp = new Date().getTime();
                var callNow = immediate && !timeout;
                if( !timeout ) {
                    timeout = setTimeout( later, wait );
                }
                if( callNow ) {
                    result = func.apply( context, args );
                    context = args = null;
                }

                return result;
            };
        }

    };

    return module;

} );

var tests = [];

/* Get a list of all the test files to include */
Object.keys( window.__karma__.files ).forEach( function( file ) {
    if( /test-.*\.js$/.test( file ) ) {
        tests.push( file );
    }
} );

require.config( {
    /* Karma serves files under /base, which is the basePath from your config file */
    baseUrl: '/base/src',

    /* ask Require.js to load these files (all our tests) */
    deps: tests,

    /* start test run, once Require.js is done */
    callback: window.__karma__.start
} );

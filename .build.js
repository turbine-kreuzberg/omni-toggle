/**
 * Use the require.js optimizer on the command line interface to build the JavaScript.
 *
 * $ r.js -o build.js
 *
 * For debugging use:
 * $ r.js -o build.js optimize=none
 */
({
    baseUrl: './src/',
    dir: 'dist',
    removeCombined: true,
    preserveLicenseComments: false,
    fileExclusionRegExp: /^\.|^test\/.*\.js/,
    optimize: "uglify",
    writeBuildTxt: false,
    modules: [
        {
            /* The main JS file, including all scripts, that are loaded on most pages */
            name: 'toggle',
            include: [
                'functions'
            ]
        }
    ]
})
[![Build Status](https://travis-ci.org/votum/omni-toggle.svg?branch=master)](https://travis-ci.org/votum/omni-toggle)

# VOTUM Omni-Toggle

VOTUM Omni-Toggle is a simple AMD JavaScript module to toggle the visibility of one or multiple HTML elements (or rather CSS classes of elements). Configuration is 

## Installation

You may use Bower to download the source and remove any unnecessary files:

```bash
bower install omni-toggle
```

## Usage Example

In your website include Require.js and load the toggle script using AMD syntax:

```html
<script src="bower_components/requirejs/require.js"></script>
<script>
requirejs.config( {
    baseUrl: 'bower_components/omni-toggle/src/'
} );

require( ['toggle'], function( Toggle ) {
    var toggleTrigger = document.querySelectorAll( '[data-toggle]' );
    if( toggleTrigger.length > 0 ) {
        Toggle.initMultiple( toggleTrigger );
    }
} );
</script>
```

For examples of the HTML markup to use, please take a look at the provided [examples](docs/example.htm).

## Development

To start making changes, simply run:

```bash
npm install
```

If you have changes that you think would contribute, we are happy to receive a pull request and will try to incorporate it as soon as possible. Please make sure that the current travis-ci tests are passing and that new functionality is covered by new tests as well.

### Running the Tests

Our test are written with a combination of [Mocha](https://mochajs.org/) and [should.js](https://github.com/shouldjs/should.js). To run the tests you can use the following npm commands:

```bash
npm test
```

```bash
npm run test-once
```

Additionally, to make sure you adhere to the coding style you should run
[ESLint](http://eslint.org/):

```bash
npm run lint
```

## License

VOTUM Omni-Toggle is released under the MIT License. See the bundled [LICENSE](LICENSE) file for details.

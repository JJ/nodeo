# NodEO

[![NPM](https://nodei.co/npm/nodeo.png)](https://npmjs.org/package/nodeo)

## Evolutionary Algorithm, simplified, for node

NodEO includes the functions necessary to create a simple evolutionary algorithm in JavaScript in CommonJS format, for
node.js and anything else that uses that format. Can be (and indeed has been) converted to the browser using
[Browserify](http://browserify.org/). Check out
[the presentation I did for FOSDEM](http://jj.github.io/js-ga-fosdem/#/home)
in case you want to know more about evolutionary algorithms and how
they have been implemented in JavaScript.

## Build Status

[![Build Status](https://travis-ci.org/JJ/nodeo.png)](https://travis-ci.org/JJ/nodeo)

### Installation
```bash
npm install nodeo
```

### Testing
```bash
npm test
```

### Developing

You will have to install a bit of more stuff, including Grunt, which, for the time being, is used to check code and generate documentation. That is
```bash
npm install -g grunt-cli
```

And then

	grunt docco

to generate documentation (if you've installed docco previously) or

	grunt jshint

to check the code or

	grunt browsify

to generate a browser-ready evolutionary algorithm based on the `classic` version.


### Running an evolutionary algorithm

There's a simple evolutionary algorithm in the `app` directory, 

	cd node_modules/nodeo
	node app/ea.js

or

	node app/classic-ea.js

for the version with a bit more complicated data structures and no cached fitness function (lighter on the memory front).


## Problems? Questions?

Please use [GitHub issues](https://github.com/JJ/nodeo/issues) and I'll try to help you. 




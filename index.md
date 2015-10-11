---
layout: index
---

# NodEO

[![Join the chat at https://gitter.im/JJ/nodeo](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JJ/nodeo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![NPM](https://nodei.co/npm/nodeo.png)](https://npmjs.org/package/nodeo)


## Evolutionary Algorithm, simplified, for node.js

NodEO includes the functions necessary to create a simple evolutionary
algorithm using JavaScript in CommonJS format, for 
node.js and anything else that uses that format. A
[Browserify](http://browserify.org/)ed version is also included in the
distribution and can be installed using `bower`. Check out
[the presentation I did for FOSDEM](http://jj.github.io/js-ga-fosdem/#/home)
in case you want to know more about evolutionary algorithms and how
they have been implemented in JavaScript.

## Build Status

[![Build Status](https://travis-ci.org/JJ/nodeo.png)](https://travis-ci.org/JJ/nodeo)

## How to start

Hints on installing and running it.

### Installation

```bash
npm install nodeo
```

Or the browser version

```bash
bower install nodeo
```

You can also clone it from this repo:
```bash
git clone git@github.com:JJ/nodeo.git
```

### Testing

If you have downloaded it from `npm`, it's already tested. If you have cloned it,

```bash
npm install 
npm test
```


### Running an evolutionary algorithm

There's a simple evolutionary algorithm in the `app` directory, 

	cd node_modules/nodeo
	node app/ea.js

or

	node app/classic-ea.js

or

	node app/classic-ea-trap.js
	
for the version with a bit more complicated data structures and no
cached fitness function (lighter on the memory front), this last one
implementing the Trap function we cherish so much.


## How to go further

You can try and add your own stuff fitness functions and operators to
this module. Start here:

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

to generate a browser-ready evolutionary algorithm based on the
`classic` version and the library.


## Problems? Questions?

Please use [GitHub issues](https://github.com/JJ/nodeo/issues) and
I'll try to help you. Can't guarantee I'll be in Gitter, but if that's
your thing, please go ahead and try it, I'll arrive eventually.




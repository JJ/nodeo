---
layout: index
---

# NodEO

[![Join the chat at https://gitter.im/JJ/nodeo](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JJ/nodeo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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

## How to start

Hints on installing and running it.

### Installation

```bash
npm install nodeo
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

There's a simple evolutionary algorithm in the `app` directory of this
repository. Run

	node app/ea.js

or

	node app/classic-ea.js

from the command line, for the version with a bit more complicated
data structures and no cached fitness function (lighter on the memory
front). 


## How to go further

You can try and add your own stuff to the library. Start here

### Contributing.

You will have to install a bit of more stuff, including Grunt, which,
for the time being, is used to check code and generate
documentation. That is

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
`classic` version. 

## Do you want to help in an evolutionary computing experiment?

It's sometimes [running here](http://nodio-jmerelo.rhcloud.com/). It
is a browserified version of this evolutionary algorithm.

## Problems? Questions?

Please use [GitHub issues](https://github.com/JJ/nodeo/issues) and
I'll try to help you. Can't guarantee I'll be in Gitter, but if that's
your thing, please go ahead and try it, I'll arrive eventually. 




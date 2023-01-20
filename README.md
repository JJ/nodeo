# NodEO [![nodeo](https://snyk.io/advisor/npm-package/nodeo/badge.svg)](https://snyk.io/advisor/npm-package/nodeo)

[![NPM](https://nodei.co/npm/nodeo.png)](https://npmjs.org/package/nodeo)

[![codecov](https://codecov.io/gh/JJ/nodeo/branch/master/graph/badge.svg)](https://codecov.io/gh/JJ/nodeo)

## Evolutionary Algorithm, simplified, for node

NodEO includes the functions necessary to create a simple evolutionary algorithm in JavaScript in CommonJS format, for
node.js and anything else that uses that format. Can be (and indeed has been) converted to the browser using
[Browserify](http://browserify.org/). Check out
[the presentation I did for FOSDEM](http://jj.github.io/js-ga-fosdem/#/home)
in case you want to know more about evolutionary algorithms and how
they have been implemented in JavaScript.

## Build Status

> We're right now in an extensive refactoring phase.

[![Test code and coverage](https://github.com/JJ/nodeo/actions/workflows/test.yaml/badge.svg)](https://github.com/JJ/nodeo/actions/workflows/test.yaml)

## How to start

Hints/instructions on installing and running it.

### Installation

```bash
npm install nodeo
```

You can also clone it from this repo:

```bash
git clone git@github.com:JJ/nodeo.git
```

If you want to generate documentation from the source, you will have to install
it independently via `npm i -g docco`. It's been eliminated from the source due
to its state of maintenance, which is poor.

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

You can try and add your own stuff to the library. **Work in progress**


## Problems? Questions?

Please use [GitHub issues](https://github.com/JJ/nodeo/issues) and
I'll try to help you.

# bodyparser-json-error
Beautify body parser JSON syntax error

[![Build Status](https://travis-ci.org/Igor-Lopes/bodyparser-json-error.svg?branch=master)](https://travis-ci.org/Igor-Lopes/bodyparser-json-error) [![npm version](https://badge.fury.io/js/bodyparser-json-error.svg)](https://badge.fury.io/js/bodyparser-json-error)

## Installation

```
npm install bodyparser-json-error --save
```

## Usage

```javascript

var express = require('express');
var bodyParser = require('body-parser');
var bodyParserError = require('bodyparser-json-error');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Beautify body parser json syntax error
app.use(bodyParserError.beautify());

```

## Middleware Options
You can optionally set the status code and response for the body parser syntax error.

```javascript
app.use(bodyParserError.beautify({status: 500 , res: {msg: 'You sent a bad JSON !'}}));
```

The output:

**HTTP Status Code:** 500 

```javascript
{
  "msg": "You sent a bad JSON !"
}
```

### Options
* status: The response status code. **Default:** 400
* res: The response body. **Default:** ``{msg: 'Invalid JSON'}``

## Tests
To run the test suite, first install the dependencies, then run `npm test`:

```bash
$ npm install
$ npm test
```

## License
MIT License

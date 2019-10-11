<h1 align="center">time-in-words</h1>

<p align="center">
    <a href="https://www.npmjs.com/package/time-in-words"><img src="https://travis-ci.com/ourmaninamsterdam/time-in-words.svg?token=YXchmSx7dBJfsDqLqwdv&branch=master"></a>
    <a href="https://travis-ci.org/ourmaninamsterdam/time-in-words"><img src="https://img.shields.io/npm/v/time-in-words.svg"></a>
</p>


Returns the time in words (in English) given valid hour and minute parameters. 

Examples

```javascript
timeInWords(1, 01) // one o'clock
timeInWords(1, 01) // one minute past one
timeInWords(1, 08) // eight minutes past one
timeInWords(1, 15) // quarter past one
timeInWords(1, 30) // half past one
timeInWords(1, 45) // quarter to two
timeInWords(1, 56) // four minutes to two
```

## Setup

```sh
yarn
```

Then do start and watch for changes

```
yarn run start
```

To build once

```
yarn run build
```

### Running tests

To run tests once

```sh
yarn run test
```

To run tests and watch for changes

```sh
yarn run test:watch
```

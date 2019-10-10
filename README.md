# time-in-words

Returns the time in words (for English) given an hour and minute parameters. 

Examples

```
timeInWords(1, 01) // one o'clock
timeInWords(1, 01) // one minute past one
timeInWords(1, 08) // eight minutes past one
timeInWords(1, 15) // fifteen minutes past one
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

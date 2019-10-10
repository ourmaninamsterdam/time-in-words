import timeInWords from './index';

const hoursInDay = [...Array(12).keys()].map(index => (index += 1));
const minutesInHour = [...Array(60).keys()];

const getNumberAsWord = (numbers, number) =>
  number > 20 ? `${numbers[20]} ${numbers[number % 20]}` : numbers[number];

it('should return if an incorrect hour and time are passed', () => {
  expect(timeInWords(-1, 0)).toBeUndefined();
  expect(timeInWords(0, 0)).toBeUndefined();
  expect(timeInWords(0, -1)).toBeUndefined();
  expect(timeInWords(13, 0)).toBeUndefined();
  expect(timeInWords(2, 60)).toBeUndefined();
});

describe('en-gb', () => {
  const numbers = [
    ,
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
    'twenty'
  ];
  const durationPlural = 'minutes';
  const durationSingular = 'minute';

  it('should output the time in words "{hour} o\'clock" for on the hour', () => {
    hoursInDay.forEach(hour => {
      return expect(timeInWords(hour, 0)).toEqual(`${numbers[hour]} o'clock`);
    });
  });

  it('should output the time in words "quarter past {hour}" for quarter to the hour', () => {
    hoursInDay.forEach(hour => {
      return expect(timeInWords(hour, 15)).toEqual(
        `quarter past ${numbers[hour]}`
      );
    });
  });

  it('should output the time in words "half past {hour}" for half past the hour', () => {
    hoursInDay.forEach(hour => {
      return expect(timeInWords(hour, 30)).toEqual(
        `half past ${numbers[hour]}`
      );
    });
  });

  it('should output the time in words "quarter to {hour}" for quarter to the hour', () => {
    hoursInDay.forEach(hour => {
      return expect(timeInWords(hour, 45)).toEqual(
        `quarter to ${numbers[hour + 1]}`
      );
    });
  });

  it('should output the time in words "{minutes} minutes to {hour}" for times between 31-44 and 46-59', () => {
    const minutesRange = minutesInHour
      .slice(31, 45)
      .concat(minutesInHour.slice(46, 60));
    hoursInDay.forEach(hour => {
      minutesRange.forEach(minute => {
        const diff = minute > 30 && minute < 60 ? 60 - minute : minute;
        return expect(timeInWords(hour, minute)).toEqual(
          `${getNumberAsWord(numbers, diff)} ${
            diff > 1 ? durationPlural : durationSingular
          } to ${numbers[hour + 1]}`
        );
      });
    });
  });

  it('should output the time in words "{minutes} past {hour}" for times between 01-29 and 31-44', () => {
    const minutesRange = minutesInHour
      .slice(1, 15)
      .concat(minutesInHour.slice(16, 30));
    hoursInDay.forEach(hour => {
      minutesRange.forEach(minute => {
        const diff = minute > 30 && minute < 60 ? 60 - minute : minute;
        return expect(timeInWords(hour, minute)).toEqual(
          `${getNumberAsWord(numbers, diff)} ${
            diff > 1 ? durationPlural : durationSingular
          } past ${numbers[hour]}`
        );
      });
    });
  });
});

describe('es-es', () => {
  const numbers = [
    ,
    'una',
    'dos',
    'tres',
    'cuatro',
    'cinco',
    'seis',
    'siete',
    'ocho',
    'nueve',
    'diez',
    'once',
    'doce',
    'trece',
    'catorce',
    'quince',
    'dieceseis',
    'diecesiete',
    'dieceocho',
    'diecenueve',
    'viente'
  ];
  it('should output the time in words "es la {{hour}}" for hours 1', () => {
    [1].forEach(hour => {
      return expect(timeInWords(hour, 0, 'es-es')).toEqual(
        `es la ${numbers[hour]}`
      );
    });
  });

  it('should output the time in words "son la {{hour}}" for hours 2-12', () => {
    hoursInDay.slice(1, 12).forEach(hour => {
      return expect(timeInWords(hour, 0, 'es-es')).toEqual(
        `son las ${numbers[hour]}`
      );
    });
  });
});

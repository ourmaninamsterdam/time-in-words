import timeInWords from './index';

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
  'eighteen',
  'nineteen',
  'twenty'
];
const hours = [...Array(12).keys()].map(index => (index += 1));
const minutes = [...Array(60).keys()];

it('should output the time in words for on the hour', () => {
  hours.forEach(hour => {
    return expect(timeInWords(hour, 0)).toEqual(`${numbers[hour]} o'clock`);
  });
});

it('should output the time in words for quarter past the hour', () => {
  hours.forEach(hour => {
    return expect(timeInWords(hour, 15)).toEqual(
      `quarter past ${numbers[hour]}`
    );
  });
});

it('should output the time in words for half past the hour', () => {
  hours.forEach(hour => {
    return expect(timeInWords(hour, 30)).toEqual(`half past ${numbers[hour]}`);
  });
});

it('should output the time in words for quarter to the hour', () => {
  hours.forEach(hour => {
    return expect(timeInWords(hour, 45)).toEqual(`quarter to ${numbers[hour]}`);
  });
});

it('should output the time in words for the time between 46-59', () => {
  const minutesRange = minutes.slice(46, 60);
  hours.forEach(hour => {
    minutesRange.forEach(minute => {
      const diff = 60 - minute;
      const durationPlural = 'minutes';
      const durationSingular = 'minute';

      return expect(timeInWords(hour, minute)).toEqual(
        `${numbers[diff]} ${diff > 1 ? durationPlural : durationSingular} to ${
          numbers[hour + 1]
        }`
      );
    });
  });
});

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
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty'
];
const durationPlural = 'minutes';
const durationSingular = 'minute';

const hours = [...Array(12).keys()].map(index => (index += 1));
const minutes = [...Array(60).keys()];

it('should output the time in words "{hour} o\'clock" for on the hour', () => {
  hours.forEach(hour => {
    return expect(timeInWords(hour, 0)).toEqual(`${numbers[hour]} o'clock`);
  });
});

it('should output the time in words "quarter past {hour}" for quarter past the hour', () => {
  hours.forEach(hour => {
    return expect(timeInWords(hour, 15)).toEqual(
      `quarter past ${numbers[hour]}`
    );
  });
});

it('should output the time in words "half past {hour}" for half past the hour', () => {
  hours.forEach(hour => {
    return expect(timeInWords(hour, 30)).toEqual(`half past ${numbers[hour]}`);
  });
});

it('should output the time in words "quarter to {hour}" for quarter to the hour', () => {
  hours.forEach(hour => {
    return expect(timeInWords(hour, 45)).toEqual(`quarter to ${numbers[hour]}`);
  });
});

it('should output the time in words "{minutes} minutes to {hour}" for the time between 31-44 and 46-59', () => {
  const minutesRange = minutes.slice(31, 45).concat(minutes.slice(46, 60));
  hours.forEach(hour => {
    minutesRange.forEach(minute => {
      const diff = 60 - minute;
      const numberAsWord =
        diff > 20 ? `${numbers[20]} ${numbers[diff % 20]}` : numbers[diff];
      return expect(timeInWords(hour, minute)).toEqual(
        `${numberAsWord} ${diff > 1 ? durationPlural : durationSingular} to ${
          numbers[hour + 1]
        }`
      );
    });
  });
});

it.skip('should output the time in words {minutes} past {hour} for the time between 01-29 and 31-44', () => {
  const minutesRange = minutes.slice(1, 30).concat(minutes.slice(31, 45));
  hours.forEach(hour => {
    minutesRange.forEach(minute => {
      const diff = 60 - minute;
      return expect(timeInWords(hour, minute)).toEqual(
        `${numbers[diff]} ${
          diff > 1 ? durationPlural : durationSingular
        } past ${numbers[hour + 1]}`
      );
    });
  });
});

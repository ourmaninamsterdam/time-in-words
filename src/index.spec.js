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

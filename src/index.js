// @flow

const numbers = [,
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

/**
 *
 * 10:00 - ten o'clock
 * 02:15 - quarter past two
 * 9:30 - half past nine
 * 07:45 - quarter to eight
 *
 * 05:56 - four minutes to six
 * 10:26 - twenty six minutes past ten
 * 11:34 - thirty minutes to twelve
 * 03:13 - thirteen minutes past three
 */

// {noOfMins=thirteen minuteLabel=minutes past=preposition hour=three}

const createTimeInWords = (numbersAsWords: Array<string>): function => {
  return (hourNumeral: number, minuteNumeral: number): string => {
    let output = [];
    const prepositions = {
      past: 'past',
      to: 'to',
    };

    if (minuteNumeral === 0) {
      output.push(numbersAsWords[hourNumeral], 'o\'clock');
    }

    if (minuteNumeral === 15) {
      output.push('quarter', prepositions.past, numbersAsWords[hourNumeral]);
    }

    if (minuteNumeral === 30) {
      output.push('half', prepositions.past, numbersAsWords[hourNumeral]);
    }

    if (minuteNumeral === 45) {
      output.push('quarter', prepositions.to, numbersAsWords[hourNumeral]);
    }

    return output.join(' ');
  };
};

export default createTimeInWords(numbers);

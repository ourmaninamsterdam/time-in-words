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
  'seventeen',
  'eighteen',
  'nineteen',
  'twenty',
];

const createTimeInWords = (numbersAsWords: Array<string>): function => {
  return (hourNumeral: number, minuteNumeral: number): string => {
    let output = [];
    const prepositions = {
      past: 'past',
      to: 'to',
    };
    const durationPlural = 'minutes';
    const durationSingular = 'minute';

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

    if(minuteNumeral > 30 && minuteNumeral < 45 || minuteNumeral > 45 && minuteNumeral < 60) {
      const minutesDifference = 60 - minuteNumeral;
      const numberAsWord = minutesDifference > 20
          ? `${numbers[20]} ${numbers[minutesDifference % 20]}`
          : numbers[minutesDifference];
      const duration = minutesDifference > 1? durationPlural : durationSingular;
      output.push(numberAsWord, duration, prepositions.to, numbersAsWords[hourNumeral+1])
    }

    return output.join(' ');
  };
};

export default createTimeInWords(numbers);

// @flow

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

const templateStrings = {
  HOUR_MARKER: '{{hourMarker}}',
  HOURS: '{{hours}}',
  MINUTES: '{{minutes}}',
  MINUTES_LABEL_PLURAL: '{{minutesLabelPlural}}',
  MINUTES_LABEL_SINGULAR: '{{minutesLabelSingular}}',
  PREPOSITION_TO: '{{prepositionTo}}',
  PREPOSITION_PAST: '{{prepositionPast}}',
  QUARTER: '{{quarter}}',
  HALF: '{{half}}'
};

const templateMap = {
  [templateStrings.HOUR_MARKER]: "o'clock",
  [templateStrings.QUARTER]: 'quarter',
  [templateStrings.HALF]: 'half',
  [templateStrings.PREPOSITION_PAST]: 'past',
  [templateStrings.PREPOSITION_TO]: 'to',
  [templateStrings.MINUTES_LABEL_PLURAL]: 'minutes',
  [templateStrings.MINUTES_LABEL_SINGULAR]: 'minute'
};

const isBetween = (x: number, min: number, max: number): boolean =>
  x >= min && x <= max;

const template = (
  templateString: string,
  variables: { [string]: string | number }
): string =>
  templateString.replace(/{{([^{}]*)}}/g, (a: string, b: string): string => {
    const r = variables[b];
    return typeof r === 'string' || typeof r === 'number' ? r.toString() : a;
  });

const convertNumbersToWords = (number: number): string => {
  return number >= 20
    ? number
        .toString()
        .split('')
        .map(number => numbers[parseInt(number, 10)])
        .join(' ')
    : numbers[number];
};

const createTimeInWords = (
  numbersAsWords: Array<string>,
  {
    HOURS,
    HOUR_MARKER,
    MINUTES,
    MINUTES_LABEL_PLURAL,
    MINUTES_LABEL_SINGULAR,
    PREPOSITION_PAST,
    PREPOSITION_TO,
    QUARTER,
    HALF
  }: { [string]: string | number }
): Function => {
  return (hourNumeral: number, minuteNumeral: number): string => {
    const templateString = [];
    const minutesAsWord = convertNumbersToWords(minuteNumeral);
    const hoursAsWord = convertNumbersToWords(hourNumeral);

    if (minuteNumeral === 0) {
      templateString.push(HOURS, HOUR_MARKER);
    }

    return template(templateString.join(' '), {
      minutes: minutesAsWord,
      hours: hoursAsWord,
      hourMarker: templateMap[HOUR_MARKER]
    });
  };
};

export default createTimeInWords(numbers, templateStrings);

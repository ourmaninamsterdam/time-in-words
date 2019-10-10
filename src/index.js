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

const MINUTES_LABEL_PLURAL = 'MINUTES_LABEL_PLURAL';
const MINUTES_LABEL_SINGULAR = 'MINUTES_LABEL_SINGULAR';
const PREPOSITION_TO = 'PREPOSITION_TO';
const PREPOSITION_PAST = 'PREPOSITION_PAST';
const QUARTER = 'QUARTER';
const HALF = 'HALF';

const templateStrings = {
  HOUR_MARKER: '{{hourMarker}}',
  HOURS: '{{hours}}',
  MINUTES: '{{minutes}}',
  MINUTES_LABEL: '{{minutesLabel}}',
  PREPOSITION: '{{preposition}}',
  FRACTION: '{{fraction}}'
};

const templateStringsMap = {
  MINUTES_LABEL_PLURAL: 'MINUTES_LABEL_PLURAL',
  MINUTES_LABEL_SINGULAR: 'MINUTES_LABEL_SINGULAR',
  PREPOSITION_TO: 'PREPOSITION_TO',
  PREPOSITION_PAST: 'PREPOSITION_PAST',
  QUARTER: 'QUARTER',
  HALF: 'HALF'
};

const templateMap = {
  [templateStrings.HOUR_MARKER]: "o'clock",
  [QUARTER]: 'quarter',
  [HALF]: 'half',
  [PREPOSITION_PAST]: 'past',
  [PREPOSITION_TO]: 'to',
  [MINUTES_LABEL_PLURAL]: 'minutes',
  [MINUTES_LABEL_SINGULAR]: 'minute'
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
  return number > 20
    ? number
        .toString()
        .split('')
        .map((num, index) =>
          index === 0 ? numbers[20] : numbers[parseInt(num, 10)]
        )
        .join(' ')
    : numbers[number];
};

const getTimeFraction = (minute: number): string => {
  if (minute === 15 || minute === 45) {
    return templateStringsMap.QUARTER;
  } else if (minute === 30) {
    return templateStringsMap.HALF;
  }
  return '';
};

const getPreposition = (number): string => {
  if (isBetween(number, 31, 44) || isBetween(number, 46, 59) || number === 45) {
    return templateStringsMap.PREPOSITION_TO;
  } else if (isBetween(number, 1, 29) || number === 15 || number === 30) {
    return templateStringsMap.PREPOSITION_PAST;
  }
  return '';
};

const getHour = (hour: number, preposition: string): number => {
  if (preposition === templateStringsMap.PREPOSITION_PAST) {
    return hour;
  } else if (preposition === templateStringsMap.PREPOSITION_TO) {
    return hour + 1;
  }
  return hour;
};

const getMinutes = (minutes: number, preposition: string): number => {
  if (preposition === templateStringsMap.PREPOSITION_PAST) {
    return minutes;
  } else if (preposition === templateStringsMap.PREPOSITION_TO) {
    return 60 - minutes;
  }
  return minutes;
};

const getMinutesLabel = (minutes: number): string => {
  if (minutes > 1) {
    return templateStringsMap.MINUTES_LABEL_PLURAL;
  }
  return templateStringsMap.MINUTES_LABEL_SINGULAR;
};

const createTimeInWords = (
  numbersAsWords: Array<string>,
  {
    HOURS,
    HOUR_MARKER,
    MINUTES,
    MINUTES_LABEL,
    PREPOSITION,
    QUARTER,
    HALF,
    FRACTION
  }: { [string]: string | number }
): Function => {
  return (hourNumeral: number, minuteNumeral: number): string => {
    const templateString = [];

    if (minuteNumeral === 0) {
      templateString.push(HOURS, HOUR_MARKER);
    } else if ([15, 30, 45].includes(minuteNumeral)) {
      templateString.push(FRACTION, PREPOSITION, HOURS);
    } else {
      templateString.push(MINUTES, MINUTES_LABEL, PREPOSITION, HOURS);
    }

    const preposition = getPreposition(minuteNumeral);
    const minutes = getMinutes(minuteNumeral, preposition);

    return template(templateString.join(' '), {
      minutesLabel: templateMap[getMinutesLabel(minutes)],
      minutes: convertNumbersToWords(minutes),
      hours: convertNumbersToWords(getHour(hourNumeral, preposition)),
      hourMarker: templateMap[HOUR_MARKER],
      fraction: templateMap[getTimeFraction(minuteNumeral)],
      preposition: templateMap[preposition]
    });
  };
};

export default createTimeInWords(numbers, templateStrings);

// @flow

const MINUTES_LABEL_PLURAL = 'MINUTES_LABEL_PLURAL';
const MINUTES_LABEL_SINGULAR = 'MINUTES_LABEL_SINGULAR';
const PREPOSITION_TO = 'PREPOSITION_TO';
const PREPOSITION_PAST = 'PREPOSITION_PAST';
const QUARTER = 'QUARTER';
const HALF = 'HALF';
const HOUR_MARKER = 'HOUR_MARKER';
const LANGUAGE_ENGLISH = 'en';

type LANGUAGE = typeof LANGUAGE_ENGLISH;

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

const DEFINITIONS_ENGLISH = {
  [HOUR_MARKER]: "o'clock",
  [QUARTER]: 'quarter',
  [HALF]: 'half',
  [PREPOSITION_PAST]: 'past',
  [PREPOSITION_TO]: 'to',
  [MINUTES_LABEL_PLURAL]: 'minutes',
  [MINUTES_LABEL_SINGULAR]: 'minute'
};

const CONFIG_ENGLISH: {
  default: string
} = {
  default: '{{minutes}} {{minutesLabel}} {{preposition}} {{hours}}',
  cases: [
    ['{{hours}} {{hourMarker}}', [0]],
    ['{{fraction}} {{preposition}} {{hours}}', [15, 30, 45]]
  ]
};

const DEFINITIONS = {
  [LANGUAGE_ENGLISH]: DEFINITIONS_ENGLISH
};

const TEMPLATES = {
  [LANGUAGE_ENGLISH]: CONFIG_ENGLISH
};

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
  templates: any,
  definitions: any
): Function => {
  const timeInWords = (
    hourNumeral: number,
    minuteNumeral: number,
    language: LANGUAGE = 'en'
  ): ?string => {
    if (
      hourNumeral <= 0 ||
      minuteNumeral < 0 ||
      hourNumeral > 12 ||
      minuteNumeral > 59
    )
      return;

    const templateString = [];
    const preposition = getPreposition(minuteNumeral);
    const minutes = getMinutes(minuteNumeral, preposition);
    const hours = getHour(hourNumeral, preposition);
    const { defaultCase, cases } = templates[language];
    const definitionsMap = definitions[language];

    console.log(definitionsMap);

    cases.forEach(caseItem => {
      const [template, ranges] = caseItem;

      if (ranges.includes(minuteNumeral)) {
        templateString.push(template);
      }
    });

    return template(templateString.join(' '), {
      minutesLabel: definitionsMap[getMinutesLabel(minutes)],
      minutes: convertNumbersToWords(minutes),
      hours: convertNumbersToWords(hours),
      hourMarker: definitionsMap['HOUR_MARKER'],
      fraction: definitionsMap[getTimeFraction(minuteNumeral)],
      preposition: definitionsMap[preposition]
    });
  };

  return timeInWords;
};

export default createTimeInWords(numbers, TEMPLATES, DEFINITIONS);

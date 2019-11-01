// @flow

const LANGUAGE_EN_GB = 'en-gb';
const LANGUAGE_ES_ES = 'es-es';

type LANGUAGE = typeof LANGUAGE_EN_GB | typeof LANGUAGE_ES_ES;
type DEFINITION = {
  cases: Array<any>,
  numbers: Array<?string>,
  templateReplacements: {
    [string]: string
  }
};
type TYPE_DEFINITIONS = {
  [LANGUAGE]: DEFINITION
};

const MINUTES_LABEL_PLURAL = 'MINUTES_LABEL_PLURAL';
const MINUTES_LABEL_SINGULAR = 'MINUTES_LABEL_SINGULAR';
const PREPOSITION_TO = 'PREPOSITION_TO';
const PREPOSITION_PAST = 'PREPOSITION_PAST';
const QUARTER = 'QUARTER';
const HALF = 'HALF';
const HOUR_MARKER = 'HOUR_MARKER';
const CONJUCTION = 'CONJUCTION';
const ARTICLE_DEFINITE = 'ARTICLE';
const ARTICLE_INDEFINITE = 'ARTICLE_INDEFINITE';

const templateStrings = {
  HOUR_MARKER: '{{hourMarker}}',
  HOURS: '{{hours}}',
  MINUTES: '{{minutes}}',
  MINUTES_LABEL: '{{minutesLabel}}',
  PREPOSITION: '{{preposition}}',
  FRACTION: '{{fraction}}',
  CONJUCTION: '{{conjuction}}',
  ARTICLE: '{{article}}'
};

const templateStringsMap = {
  MINUTES_LABEL_PLURAL: 'MINUTES_LABEL_PLURAL',
  MINUTES_LABEL_SINGULAR: 'MINUTES_LABEL_SINGULAR',
  PREPOSITION_TO: 'PREPOSITION_TO',
  PREPOSITION_PAST: 'PREPOSITION_PAST',
  QUARTER: 'QUARTER',
  HALF: 'HALF',
  CONJUCTION: 'CONJUCTION',
  ARTICLE_DEFINITE: 'ARTICLE',
  ARTICLE_INDEFINITE: 'ARTICLE_INDEFINITE'
};

const CASES_ENGLISH = [
  ['{{hours}} {{hourMarker}}', [0]],
  ['{{fraction}} {{preposition}} {{hours}}', [15, 30, 45]],
  ['{{minutes}} {{minutesLabel}} {{preposition}} {{hours}}', []]
];

const CASES_SPANISH = [
  ['{{article}} {{hours}}', [0]],
  ['{{fraction}} {{preposition}} {{hours}}', [15, 30, 45]],
  ['{{minutes}} {{minutesLabel}} {{preposition}} {{hours}}', []]
];

const DEFINITIONS: TYPE_DEFINITIONS = {
  [LANGUAGE_EN_GB]: {
    cases: CASES_ENGLISH,
    numbers: [
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
    ],
    templateReplacements: {
      [HOUR_MARKER]: "o'clock",
      [QUARTER]: 'quarter',
      [HALF]: 'half',
      [PREPOSITION_PAST]: 'past',
      [PREPOSITION_TO]: 'to',
      [MINUTES_LABEL_PLURAL]: 'minutes',
      [MINUTES_LABEL_SINGULAR]: 'minute'
    }
  },
  [LANGUAGE_ES_ES]: {
    cases: CASES_SPANISH,
    numbers: [
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
    ],
    templateReplacements: {
      [HOUR_MARKER]: '',
      [QUARTER]: 'cuarto',
      [HALF]: 'media',
      [CONJUCTION]: 'y',
      [ARTICLE_DEFINITE]: 'es la',
      [ARTICLE_INDEFINITE]: 'sonl as',
      [PREPOSITION_PAST]: '',
      [PREPOSITION_TO]: '',
      [MINUTES_LABEL_PLURAL]: '',
      [MINUTES_LABEL_SINGULAR]: ''
    }
  }
};

const CONFIG = {
  [LANGUAGE_EN_GB]: DEFINITIONS[LANGUAGE_EN_GB],
  [LANGUAGE_ES_ES]: DEFINITIONS[LANGUAGE_ES_ES]
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

const convertNumbersToWords = (
  numbers: Array<?string>,
  number: number
): string => {
  return number > 20
    ? number
        .toString()
        .split('')
        .map((num, index) =>
          index === 0 ? numbers[20] : numbers[parseInt(num, 10)]
        )
        .join(' ')
    : typeof numbers[number] === 'string'
    ? numbers[number]
    : '';
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

const getConfig = (
  config: typeof DEFINITIONS,
  language: LANGUAGE
): DEFINITION => {
  return config[language];
};

const createTimeInWords = (CONFIG: typeof DEFINITIONS): Function => {
  const timeInWords = (
    hourNumeral: number,
    minuteNumeral: number,
    language: LANGUAGE = 'en-gb'
  ): ?string => {
    if (
      hourNumeral <= 0 ||
      minuteNumeral < 0 ||
      hourNumeral > 12 ||
      minuteNumeral > 59
    )
      return;

    let templateString = '';
    const preposition = getPreposition(minuteNumeral);
    const minutes = getMinutes(minuteNumeral, preposition);
    const hours = getHour(hourNumeral, preposition);
    const { cases, templateReplacements, numbers } = getConfig(
      CONFIG,
      language
    );

    for (let item = 0; item < cases.length; item++) {
      const [template, ranges] = cases[item];
      if (ranges.includes(minuteNumeral)) {
        templateString = template;
        break;
      } else {
        templateString = template;
      }
    }

    return template(templateString, {
      minutesLabel: templateReplacements[getMinutesLabel(minutes)],
      minutes: convertNumbersToWords(numbers, minutes),
      hours: convertNumbersToWords(numbers, hours),
      hourMarker: templateReplacements[HOUR_MARKER],
      fraction: templateReplacements[getTimeFraction(minuteNumeral)],
      preposition: templateReplacements[preposition]
    });
  };

  return timeInWords;
};

export default createTimeInWords(CONFIG);

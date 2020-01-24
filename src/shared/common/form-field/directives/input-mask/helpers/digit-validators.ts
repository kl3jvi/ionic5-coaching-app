type DigitValidator = (char: string) => boolean;

const numericValidator = (char: string) => /[0-9]{1}/.test(char);

const lowerCaseValidator = (char: string) => /[a-z]{1}/.test(char);

const upperCaseValidator = (char: string) => /[A-Z]{1}/.test(char);

const textValidator = (char: string) => /^[a-zA-Z '-]{1}/.test(char);

const anyValidator = (char: string) => true;

const numberRangeValidator = (maxValue: number, char: string) => numericValidator(char) && parseInt(char, null) <= maxValue;

export const neverValidator = (char) => false;

export const maskDigitValidators: { [key: string]: DigitValidator } = {

    'a': lowerCaseValidator,
    'A': upperCaseValidator,
    'T': textValidator,
    '*': anyValidator
};

for (let i = 0; i <= 9; i++) {
    maskDigitValidators[i] = numberRangeValidator.bind(undefined, i);
}

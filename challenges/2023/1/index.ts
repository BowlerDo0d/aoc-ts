import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day);

const part1 = (input: string) => {
  const inputArr = input.split('\n');
  let total = 0;

  inputArr.forEach((value) => {
    let firstDigit, lastDigit;

    for (let i=0; i<value.length; i++) {
      const nextChar = Number.parseInt(value.charAt(i), 10);

      if (Number.isInteger(nextChar)) {
        firstDigit = nextChar;
        break;
      }
    }

    for (let j=value.length-1; j>=0; j--) {
      const nextChar = Number.parseInt(value.charAt(j), 10);

      if (Number.isInteger(nextChar)) {
        lastDigit = nextChar;
        break;
      }
    }

    if (firstDigit && lastDigit) {
      total += Number.parseInt(`${firstDigit}${lastDigit}`, 10);
    }
  });

  return total;
}

const part2 = (input: string) => {
  const inputArr = input.split('\n');
  const validStrings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  let total = 0;

  inputArr.forEach((value) => {
    let firstDigit, lastDigit;

    for (let i=0; i<value.length; i++) {
      const nextChar = Number.parseInt(value.charAt(i), 10);

      if (Number.isInteger(nextChar)) {
        firstDigit = nextChar;
        break;
      }

      validStrings.forEach((stringDigit, idx) => {
        if (value.substring(i, i+stringDigit.length) === stringDigit) {
          firstDigit = idx + 1;
        }
      });

      let idx = 0;
      let found = false;

      while (!found && idx < validStrings.length) {
        const subStr = value.substring(i, i+validStrings[idx].length);
        const currentValidStr = validStrings[idx];

        if (subStr === currentValidStr) {
          lastDigit = idx + 1;
          found = true;
        }

        idx += 1;
      };

      if (found) {
        break;
      }
    }

    for (let j=value.length-1; j>=0; j--) {
      const nextChar = Number.parseInt(value.charAt(j), 10);

      if (Number.isInteger(nextChar)) {
        lastDigit = nextChar;
        break;
      }

      let idx = 0;
      let found = false;

      while (!found && idx < validStrings.length) {
        const subStr = value.substring(j-validStrings[idx].length+1, j+1);
        const currentValidStr = validStrings[idx];

        if (subStr === currentValidStr) {
          lastDigit = idx + 1;
          found = true;
        }

        idx += 1;
      };

      if (found) {
        break;
      }
    }

    const calibrationCode = Number.parseInt(`${firstDigit}${lastDigit}`, 10);

    if (firstDigit && lastDigit) {
      total += calibrationCode;
    }
  });

  return total;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

import getInput from '../../../utils/getInput';

const runTestData = false;

const isWindows = process.platform === 'win32',
  pathParts = __dirname.split(isWindows ? '\\' : '/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day, runTestData).replace(/\r/g, '').split('\n');

const part1 = (input: string[]) => {
  const directions = input[0];
  const mappings: { [key: string]: string[] } = {};

  let i=2;
  while (i < input.length) {
    const mapping = input[i].split(' = ');
    const mapKey = mapping[0];
    const mapValues = mapping[1].replace('(', '').replace(')','').split(', ');

    mappings[mapKey] = mapValues;

    i++;
  }

  let currentStep = 'AAA';
  let foundZZZ = false;
  let totalSteps = 0;
  let j = 0;
  while (!foundZZZ) {
    // console.log(`Currently at ${currentStep}`);
    // console.log(`Going ${directions[j]}`);

    if (directions[j] === 'L') {
      currentStep = mappings[currentStep][0];
    } else if (directions[j] === 'R') {
      currentStep = mappings[currentStep][1];
    }

    // console.log(`Landed on ${currentStep}`);

    totalSteps += 1;

    foundZZZ = currentStep === 'ZZZ';

    if (j === directions.length - 1) {
      j = 0;
    } else {
      j++;
    }
  }

  return totalSteps;
}

const isPrime = (n: number) => {
  if (Number.isNaN(n) || !Number.isFinite(n) || n % 1 || n < 2) return false;
  if (n % 2 == 0) return (n == 2);
  if (n % 3 == 0) return (n == 3);
  var m = Math.sqrt(n);
  for (var i = 5; i <= m; i += 6) {
      if (n % i == 0) return false;
      if (n % (i + 2) == 0) return false;
  }
  return true;
}

const LCM = (numbers: number[]): number => {
  let lowestMult = 1;

  let allOnes = false;
  let lowPrime = 2;
  while (!allOnes) {
    if (!numbers.filter((val) => val !== 1).length) {
      allOnes = true;
    }

    if (!allOnes) {
      let canDivide = false;

      numbers = numbers.map((num) => {
        if (num % lowPrime === 0) {
          canDivide = true;
          return num / lowPrime;
        }

        return num;
      });

      if (canDivide) {
        lowestMult *= lowPrime;
      } else {
        // Bump to next prime
        lowPrime++;
        while (!isPrime(lowPrime)) {
            lowPrime++;
        }
      }
    }
  }

  return lowestMult;
}

const part2 = (input: string[]) => {
  const directions = input[0];
  const mappings: { [key: string]: string[] } = {};
  let startSteps: string[] = [];

  let i=2;
  while (i < input.length) {
    const mapping = input[i].split(' = ');
    const mapKey = mapping[0];
    const mapValues = mapping[1].replace('(', '').replace(')','').split(', ');

    mappings[mapKey] = mapValues;

    if (mapKey[mapKey.length - 1] === 'A') {
      startSteps.push(mapKey);
    }

    i++;
  }

  // console.log(startSteps);

  const zEndValues = [];

  let j = 0; // R L Direction
  let k = 0; // startSteps
  while(k < startSteps.length) {
    let step = startSteps[k];
    let totalSteps = 0;

    let zFound = false;
    while(!zFound) {
      if (directions[j] === 'L') {
        step = mappings[step][0];
      } else {
        step = mappings[step][1];
      }

      totalSteps += 1;

      if (step.slice(-1) === 'Z') {
        zFound = true;
      }

      if (j === directions.length - 1) {
        j = 0;
      } else {
        j++;
      }
    }

    zEndValues.push(totalSteps);
    k++;
  }

  console.log(zEndValues);

  return LCM(zEndValues);
}

// console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

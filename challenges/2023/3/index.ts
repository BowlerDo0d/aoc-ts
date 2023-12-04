import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('\\'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day);
const inputArr = fullInput.split('\n');

// Part 1
const symbolCoords: string[] = [];
const numberCoordsPt1: string[] = [];

// Part 2
const numberCoordsPt2: string[] = [];
const possibleGears: string[] = [];
const associatedNumbers: number[] = [];

const checkForSymbol = (xCoord: number, yCoord: number, numDist: number): boolean => {
  let symbolFound = false;
  let x = xCoord - 1;
  let y = yCoord - 1;

  do {
    do {
      let coord = `x${x}y${y}`;

      if (symbolCoords.includes(coord)) {
        symbolFound = true;
      }

      y += 1;
    }
    while (!symbolFound && y <= yCoord + numDist);

    x += 1;
    y = yCoord - 1;

  }
  while (!symbolFound && x <= xCoord + 1);

  return symbolFound;
}

const getAdjPartNumbers = (xCoord: number, yCoord: number): number[] => {
  const adjNumbers: number[] = [];
  let x = xCoord - 1;
  let y = yCoord - 1;

  do {
    do {
      let coord = `x${x}|y${y}`;
      let indexOfNumber = numberCoordsPt2.indexOf(coord);

      if (indexOfNumber > -1 && !adjNumbers.includes(associatedNumbers[indexOfNumber])) {
        adjNumbers.push(associatedNumbers[indexOfNumber]);
      }

      y += 1;
    }
    while (y <= yCoord + 1);

    x += 1;
    y = yCoord - 1;

  }
  while (x <= xCoord + 1);

  return adjNumbers;
}

const part1 = (input: string[]) => {
  let answer = 0;

  for (let x=0; x<inputArr.length; x++) {
    const inputRow = inputArr[x];
    let numberStart = '';
    let numberDist = 0;

    for (let y=0; y<inputRow.length; y++) {
      const currentChar = inputRow[y];

      if (currentChar !== '.') {
        if (Number.isNaN(Number.parseInt(currentChar, 10))) {
          // Must be a symbol
          symbolCoords.push(`x${x}y${y}`);

          // If number was being tracked, log it and reset
          if (numberStart.length && numberDist > 0) {
            numberCoordsPt1.push(`${numberStart}|${numberDist}`);
            numberStart = '';
            numberDist = 0;
          }

        } else {
          // Must be a number
          if (!numberStart.length) {
            numberStart = `x${x}|y${y}`;
          }

          numberDist += 1;
        }
      } else {
        // If number was being tracked, log it and reset
        if (numberStart.length && numberDist > 0) {
          numberCoordsPt1.push(`${numberStart}|${numberDist}`);
          numberStart = '';
          numberDist = 0;
        }
      }
    }
    
    // If number was being tracked, log it and reset
    if (numberStart.length && numberDist > 0) {
      numberCoordsPt1.push(`${numberStart}|${numberDist}`);
      numberStart = '';
      numberDist = 0;
    }

  }

  numberCoordsPt1.forEach((num) => {
    let numberStr = '';
    let coords = num.split('|');
    let x = Number.parseInt(coords[0].replace('x',''), 10);
    let y = Number.parseInt(coords[1].replace('y',''), 10);
    let dist = Number.parseInt(coords[2], 10);

    for (let i=0; i<dist; i++) {
      numberStr += inputArr[x][y+i];
    }

    const numberInt = Number.parseInt(numberStr, 10);
    const nearSymbol = checkForSymbol(x, y, dist);

    if (nearSymbol) {
      answer += numberInt;
    }
  });

  return answer;
}

const part2 = (input: string[]) => {
  let answer = 0;

  for (let x=0; x<inputArr.length; x++) {
    const inputRow = inputArr[x];
    let tempNumberCoords = [];
    let numberString = '';

    for (let y=0; y<inputRow.length; y++) {
      const currentChar = inputRow[y];

      if (currentChar !== '.') {
        if (currentChar === '*') {
          // Possible gear
          possibleGears.push(`x${x}|y${y}`);

          // If number was being tracked, log it and reset
          if (tempNumberCoords.length) {
            tempNumberCoords.forEach((tempCoord) => {
              numberCoordsPt2.push(tempCoord);
              associatedNumbers.push(Number.parseInt(numberString, 10));
            });

            tempNumberCoords = [];
            numberString = '';
          }

        } else if (!Number.isNaN(Number.parseInt(currentChar, 10))) {
          // Must be a number
          tempNumberCoords.push(`x${x}|y${y}`);
          numberString += currentChar;
        } else {
          // If number was being tracked, log it and reset
          if (tempNumberCoords.length) {
            tempNumberCoords.forEach((tempCoord) => {
              numberCoordsPt2.push(tempCoord);
              associatedNumbers.push(Number.parseInt(numberString, 10));
            });

            tempNumberCoords = [];
            numberString = '';
          }
        }
      } else {
        // If number was being tracked, log it and reset
        if (tempNumberCoords.length) {
          tempNumberCoords.forEach((tempCoord) => {
            numberCoordsPt2.push(tempCoord);
            associatedNumbers.push(Number.parseInt(numberString, 10));
          });

          tempNumberCoords = [];
          numberString = '';
        }
      }
    }
    
    // If number was being tracked, log it and reset
    if (tempNumberCoords.length) {
      tempNumberCoords.forEach((tempCoord) => {
        numberCoordsPt2.push(tempCoord);
        associatedNumbers.push(Number.parseInt(numberString, 10));
      });

      tempNumberCoords = [];
      numberString = '';
    }

  }

  possibleGears.forEach((gear) => {
    let coords = gear.split('|');
    let x = Number.parseInt(coords[0].replace('x',''), 10);
    let y = Number.parseInt(coords[1].replace('y',''), 10);

    const adjPartNumbers = getAdjPartNumbers(x, y);
    
    if (adjPartNumbers.length === 2) {
      const gearRatio = adjPartNumbers[0] * adjPartNumbers[1];
      answer += gearRatio;
    }
  });

  return answer;
}

console.log(`Solution 1: ${part1(inputArr)}`);
console.log(`Solution 2: ${part2(inputArr)}`);

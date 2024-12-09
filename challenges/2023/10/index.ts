import getInput from '../../../utils/getInput';

const runTestData = false;

const isWindows = process.platform === 'win32',
  pathParts = __dirname.split(isWindows ? '\\' : '/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day, runTestData).replace(/\r/g, '').split('\n');

const findS = (input: string[]): number[] => {
  let s: number[] = [];

  let i = 0;
  while (s.length === 0) {
    let line = input[i];
    let j = 0;
    while (j < line.length) {
      if (line[j] === 'S') {
        s = [i, j];
      }
      j++;
    }
    i++;
  }

  return s;
}

const getSSymbol = (input: string[], startS: number[]) => {
  // What symbol is S?
  let SSymbol = '';
  let canGoN = false;
  let canGoS = false;
  let canGoE = false;
  let canGoW = false;
  
  if (
    startS[0] - 1 >= 0 &&
    ['F','7','|'].includes(input[startS[0] - 1][startS[1]])
  ) {
    // Can go N
    canGoN = true;
  }
  
  if (
    startS[0] + 1 < input.length &&
    ['J','L','|'].includes(input[startS[0] + 1][startS[1]])
  ) {
    // Can go S
    canGoS = true;
  }
  
  if (
    startS[1] + 1 < input[startS[0]].length &&
    ['J','7','-'].includes(input[startS[0]][startS[1] + 1])
  ) {
    // Can go E
    canGoE = true;
  }
  
  if (
    startS[1] - 1 >= 0 &&
    ['F','L','-'].includes(input[startS[0]][startS[1] - 1])
  ) {
    // Can go W
    canGoW = true;
  }

  if (canGoN) {
    if (canGoS) {
      SSymbol = '|'
    } else if (canGoE) {
      SSymbol = 'L';
    } else {
      SSymbol = 'J';
    }
  } else if (canGoS) {
    if (canGoE) {
      SSymbol = 'F';
    } else {
      SSymbol = '7';
    }
  } else if (canGoE && canGoW) {
    SSymbol = '-';
  }

  return SSymbol;
}

const getNextStep = (input: string[], currentLoc: number[], prevLoc: number[] = []): number[] => {
  const currentX = currentLoc[0];
  const currentY = currentLoc[1];
  let currentSymbol = input[currentX][currentY];
  let nextStep = null;

  if (currentSymbol === 'S') {
    currentSymbol = getSSymbol(input, currentLoc);
  }

  if (
    ['|', 'J', 'L'].includes(currentSymbol) &&
    currentX - 1 !== prevLoc[0] &&
    currentX - 1 >= 0
  ) {
    // Go N
    nextStep = [currentX - 1, currentY];
  } else if (
    ['|', 'F', '7'].includes(currentSymbol) &&
    currentX + 1 !== prevLoc[0] &&
    currentX + 1 < input.length
  ) {
    // Go S
    nextStep = [currentX + 1, currentY];
  } else if (
    ['-', 'F', 'L'].includes(currentSymbol) &&
    currentY + 1 !== prevLoc[1] &&
    currentY + 1 < input[currentX].length
  ) {
    // Go E
    nextStep = [currentX, currentY + 1];
  } else {
    // Go W
    nextStep = [currentX, currentY - 1];
  }

  return nextStep;
}

const getPipeLoop = (input: string[], start: number[], returnAsPipeCharacters = true): string[] => {
  const loopCoords: number[][] = [];
  const loopCoordsStr: string[] = [];
  const loopString: string[] = [];

  let currentLoc = [...start];
  let prevLoc: number[] = [];
  let backAtStart = false;

  while (!backAtStart) {
    const nextStep = getNextStep(input, currentLoc, prevLoc);
    prevLoc = currentLoc;
    currentLoc = nextStep;
    backAtStart = currentLoc[0] === start[0] && currentLoc[1] === start[1];

    if (!backAtStart) {
      loopCoords.push(currentLoc);
      loopCoordsStr.push(`${currentLoc[0]},${currentLoc[1]}`);
      loopString.push(input[currentLoc[0]][currentLoc[1]]);
    }
  }

  return returnAsPipeCharacters ? loopString : loopCoordsStr;
}

const part1 = (input: string[]) => {
  const startS = findS(input);
  const pipeLoop = getPipeLoop(input, startS);

  return Math.ceil(pipeLoop.length / 2);
}

const part2 = (input: string[]) => {
  const startS = findS(input);
  const pipeLoop = getPipeLoop(input, startS, false);

  let insideBox = 0;
  let isInside = false;
  input.forEach((line, idx) => {
    let i = 0;
    while (i < line.length) {
      const coord = `${idx},${i}`;
      const char = input[idx][i];

      if (
        (pipeLoop.includes(coord) && ['|','L','J'].includes(char)) ||
        (idx === startS[0] && i === startS[1] && ['|','L','J'].includes(getSSymbol(input, startS)))
      ) {
        isInside = !isInside;
      } else if (isInside && !pipeLoop.includes(coord) && !(idx === startS[0] && i === startS[1])) {
        insideBox += 1;
      }

      i++;
    }
  });

  return insideBox;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

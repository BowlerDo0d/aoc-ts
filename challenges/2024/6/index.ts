import getInput from '../../../utils/getInput';

const runTestData = true;

const isWindows = process.platform === 'win32',
  pathParts = __dirname.split(isWindows ? '\\' : '/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day, runTestData).replace(/\r/g, '').split('\n');

const printMap = (floorMap: string[][]) => {
  floorMap.forEach(line => {
    let printLine = '';

    for (let i = 0; i < line.length; i++) {
      printLine += `${line[i]}      `.substring(0, 4);
    }

    console.log(printLine)
  });
};

const part1 = (input: string[]) => {
  const floorMap: string[][] = [];

  let currentRow = 0;
  let currentCol = 0;
  let facing = 'N|S|E|W';

  input.forEach((line, row) => {
    const guardCheck: RegExpMatchArray | null = line.match(/\^|v|<|>/);

    if (guardCheck) {
      currentRow = row;
      currentCol = guardCheck.index!;

      switch(guardCheck[0]) {
        case '^':
          facing = 'N';
          break;
        case 'v':
          facing = 'S';
          break;
        case '>':
          facing = 'E';
          break;
        case '<':
          facing = 'W';
          break;
      }
    }

    floorMap.push(line.split(''));
  });

  let spacesVisited = 1;
  let patrolling = true;

  floorMap[currentRow][currentCol] = 'X';

  while (patrolling) {
    switch (facing) {
      case 'N':
        if (currentRow - 1 < 0) {
          // off map
          patrolling = false;
        } else if (floorMap[currentRow-1][currentCol] !== '#') {
          // clear path to move
          currentRow -= 1;

          if (floorMap[currentRow][currentCol] !== 'X') {
            spacesVisited += 1;
            floorMap[currentRow][currentCol] = 'X';
          }
        } else {
          // obstruction, turn right
          facing = 'E';
        }

        break;
      case 'S':
        if (currentRow + 1 >= floorMap.length) {
          // off map
          patrolling = false;
        } else if (floorMap[currentRow+1][currentCol] !== '#') {
          // clear path to move
          currentRow += 1;

          if (floorMap[currentRow][currentCol] !== 'X') {
            spacesVisited += 1;
            floorMap[currentRow][currentCol] = 'X';
          }
        } else {
          // obstruction, turn right
          facing = 'W';
        }

        break;
      case 'E':
        if (currentCol + 1 >= floorMap[currentRow].length) {
          // off map
          patrolling = false;
        } else if (floorMap[currentRow][currentCol+1] !== '#') {
          // clear path to move
          currentCol += 1;

          if (floorMap[currentRow][currentCol] !== 'X') {
            spacesVisited += 1;
            floorMap[currentRow][currentCol] = 'X';
          }
        } else {
          // obstruction, turn right
          facing = 'S';
        }

        break;
      case 'W':
        if (currentCol - 1 < 0) {
          // off map
          patrolling = false;
        } else if (floorMap[currentRow][currentCol-1] !== '#') {
          // clear path to move
          currentCol -= 1;

          if (floorMap[currentRow][currentCol] !== 'X') {
            spacesVisited += 1;
            floorMap[currentRow][currentCol] = 'X';
          }
        } else {
          // obstruction, turn right
          facing = 'N';
        }

        break;
    }
  }

  return spacesVisited;
}

const part2 = (input: string[]) => {
  const floorMap: string[][] = [];

  let currentRow = 0;
  let currentCol = 0;
  let facing = 'N|S|E|W';

  input.forEach((line, row) => {
    const guardCheck: RegExpMatchArray | null = line.match(/\^|v|<|>/);

    if (guardCheck) {
      currentRow = row;
      currentCol = guardCheck.index!;

      switch(guardCheck[0]) {
        case '^':
          facing = 'N';
          break;
        case 'v':
          facing = 'S';
          break;
        case '>':
          facing = 'E';
          break;
        case '<':
          facing = 'W';
          break;
      }
    }

    floorMap.push(line.split(''));
  });

  let patrolling = true;
  let possibleLoopSpots = 0;

  while (patrolling) {
    switch (facing) {
      case 'N':
        if (currentRow - 1 < 0) {
          // off map
          patrolling = false;
        } else if (floorMap[currentRow-1][currentCol] !== '#') {
          // clear path to move
          // move on
          currentRow -= 1;

          // is there a former path to the right?
          if (
            floorMap[currentRow][currentCol].includes('E') // position to the right contains a former path
          ) {
            // position in front could be new obstacle for a loop
            console.log(`obstacle added at ${currentRow-1}${currentCol}`);
            possibleLoopSpots += 1;
          }
        } else {
          // obstruction, turn right
          facing = 'E';
        }

        break;
      case 'S':
        if (currentRow + 1 >= floorMap.length) {
          // off map
          patrolling = false;
        } else if (floorMap[currentRow+1][currentCol] !== '#') {
          // clear path to move
          // move on
          currentRow += 1;

          // is there a former path to the right?
          if (
            floorMap[currentRow][currentCol].includes('W') // position to the right contains a former path
          ) {
            // position in front could be new obstacle for a loop
            console.log(`obstacle added at ${currentRow+1}${currentCol}`);
            possibleLoopSpots += 1;
          }
        } else {
          // obstruction, turn right
          facing = 'W';
        }

        break;
      case 'E':
        if (currentCol + 1 >= floorMap[currentRow].length) {
          // off map
          patrolling = false;
        } else if (floorMap[currentRow][currentCol+1] !== '#') {
          // clear path to move
          // move on
          currentCol += 1;

          // is there a former path to the right?
          if (
            floorMap[currentRow][currentCol].includes('S') // position to the right contains a former path
          ) {
            // position in front could be new obstacle for a loop
            console.log(`obstacle added at ${currentRow}${currentCol+1}`);
            possibleLoopSpots += 1;
          }
        } else {
          // obstruction, turn right
          facing = 'S';
        }

        break;
      case 'W':
        if (currentCol - 1 < 0) {
          // off map
          patrolling = false;
        } else if (floorMap[currentRow][currentCol-1] !== '#') {
          // clear path to move
          // move on
          currentCol -= 1;

          // is there a former path to the right?
          if (
            floorMap[currentRow][currentCol].includes('N') || // position to the right contains a former path
            floorMap[currentRow][currentCol].includes('^') // position to the right contains a former path
          ) {
            // position in front could be new obstacle for a loop
            console.log(`obstacle added at ${currentRow}${currentCol-1}`);
            possibleLoopSpots += 1;
          }
        } else {
          // obstruction, turn right
          facing = 'N';
        }

        break;
    }

    floorMap[currentRow][currentCol] = `${floorMap[currentRow][currentCol].replace('.','')}${facing}`;
  }

  console.log(`Stopped at ${currentRow},${currentCol} moving ${facing}`);
  printMap(floorMap);

  return possibleLoopSpots;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

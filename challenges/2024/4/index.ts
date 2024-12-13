import getInput from '../../../utils/getInput';

const runTestData = false;

const isWindows = process.platform === 'win32',
  pathParts = __dirname.split(isWindows ? '\\' : '/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day, runTestData).replace(/\r/g, '').split('\n');

const part1 = (input: string[]) => {
  const wordMatrix: string[][] = [];
  const searchString = 'XMAS';

  const findWords = (rowIndex: number, colIndex: number): number => {
    let wordFound = 0;

    // Check NW
    if (
      rowIndex - 3 >= 0 && colIndex - 3 >= 0 &&
      wordMatrix[rowIndex-1][colIndex-1] === searchString[1] &&
      wordMatrix[rowIndex-2][colIndex-2] === searchString[2] &&
      wordMatrix[rowIndex-3][colIndex-3] === searchString[3]
    ) {
      wordFound += 1;
    }

    // Check N
    if (
      rowIndex - 3 >= 0 &&
      wordMatrix[rowIndex-1][colIndex] === searchString[1] &&
      wordMatrix[rowIndex-2][colIndex] === searchString[2] &&
      wordMatrix[rowIndex-3][colIndex] === searchString[3]
    ) {
      wordFound += 1;
    }

    // Check NE
    if (
      rowIndex - 3 >= 0 && colIndex + 3 < wordMatrix[rowIndex].length &&
      wordMatrix[rowIndex-1][colIndex+1] === searchString[1] &&
      wordMatrix[rowIndex-2][colIndex+2] === searchString[2] &&
      wordMatrix[rowIndex-3][colIndex+3] === searchString[3]
    ) {
      wordFound += 1;
    }

    // Check W
    if (
      colIndex - 3 >= 0 &&
      wordMatrix[rowIndex][colIndex-1] === searchString[1] &&
      wordMatrix[rowIndex][colIndex-2] === searchString[2] &&
      wordMatrix[rowIndex][colIndex-3] === searchString[3]
    ) {
      wordFound += 1;
    }

    // Check E
    if (
      colIndex + 3 < wordMatrix[rowIndex].length &&
      wordMatrix[rowIndex][colIndex+1] === searchString[1] &&
      wordMatrix[rowIndex][colIndex+2] === searchString[2] &&
      wordMatrix[rowIndex][colIndex+3] === searchString[3]
    ) {
      wordFound += 1;
    }

    // Check SW
    if (
      rowIndex + 3 < wordMatrix.length && colIndex - 3 >= 0 &&
      wordMatrix[rowIndex+1][colIndex-1] === searchString[1] &&
      wordMatrix[rowIndex+2][colIndex-2] === searchString[2] &&
      wordMatrix[rowIndex+3][colIndex-3] === searchString[3]
    ) {
      wordFound += 1;
    }

    // Check S
    if (
      rowIndex + 3 < wordMatrix.length &&
      wordMatrix[rowIndex+1][colIndex] === searchString[1] &&
      wordMatrix[rowIndex+2][colIndex] === searchString[2] &&
      wordMatrix[rowIndex+3][colIndex] === searchString[3]
    ) {
      wordFound += 1;
    }

    // Check SE
    if (
      rowIndex + 3 < wordMatrix.length && colIndex + 3 < wordMatrix[rowIndex].length &&
      wordMatrix[rowIndex+1][colIndex+1] === searchString[1] &&
      wordMatrix[rowIndex+2][colIndex+2] === searchString[2] &&
      wordMatrix[rowIndex+3][colIndex+3] === searchString[3]
    ) {
      wordFound += 1;
    }

    return wordFound;
  };

  input.forEach((line) => {
    wordMatrix.push(line.split(''));
  });

  let wordCount = 0;

  for (let i=0; i < wordMatrix.length; i++) {
    let line = wordMatrix[i];

    for (let j=0; j < line.length; j++) {
      if (wordMatrix[i][j] === searchString[0]) {
        wordCount += findWords(i,j);
      }
    }
  }

  return wordCount;
}

const part2 = (input: string[]) => {
  const wordMatrix: string[][] = [];
  const searchString = 'MAS';

  const findWords = (rowIndex: number, colIndex: number): number => {
    let wordFound = 0;

    if (
      (rowIndex - 1 >= 0 && colIndex - 1 >= 0 &&
       rowIndex + 1 < wordMatrix.length && colIndex + 1 < wordMatrix[rowIndex].length) &&
      // NW -> SE
      (
        // MAS
        (wordMatrix[rowIndex-1][colIndex-1] === searchString[0] &&
         wordMatrix[rowIndex+1][colIndex+1] === searchString[2]) ||
         // SAM
        (wordMatrix[rowIndex-1][colIndex-1] === searchString[2] &&
         wordMatrix[rowIndex+1][colIndex+1] === searchString[0])
      ) &&
      // NE -> SW
      (
        // MAS
        (wordMatrix[rowIndex-1][colIndex+1] === searchString[0] &&
         wordMatrix[rowIndex+1][colIndex-1] === searchString[2]) ||
         // SAM
        (wordMatrix[rowIndex-1][colIndex+1] === searchString[2] &&
         wordMatrix[rowIndex+1][colIndex-1] === searchString[0])
      )
    ) {
      wordFound += 1;
    }

    return wordFound;
  };

  input.forEach((line) => {
    wordMatrix.push(line.split(''));
  });

  let wordCount = 0;

  for (let i=0; i < wordMatrix.length; i++) {
    let line = wordMatrix[i];

    for (let j=0; j < line.length; j++) {
      if (wordMatrix[i][j] === searchString[1]) {
        wordCount += findWords(i,j);
      }
    }
  }

  return wordCount;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

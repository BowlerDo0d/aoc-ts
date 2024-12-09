import getInput from '../../../utils/getInput';

const runTestData = false;

const isWindows = process.platform === 'win32',
  pathParts = __dirname.split(isWindows ? '\\' : '/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day, runTestData).replace(/\r/g, '').split('\n');

const isRowEmpty = (input: string) => {
  // return !!input.replace(/\./g, '').length;
  return input.indexOf('#') === -1;
}

const isColEmpty = (input: string[], colIdx: number) => {
  let foundGalaxy = false;
  
  let row = 0;
  while (row < input.length && !foundGalaxy) {
    foundGalaxy = input[row][colIdx] === '#';
    row++;
  }

  return !foundGalaxy;
}

const expandUniverse = (input: string[], expandRows: number[], expandCols: number[]): string[] => {
  const expandedInput = [];

  let row = 0;
  while (row < input.length) {
    let newRow = input[row];

    expandCols.forEach((col, idx) => {
      newRow = `${newRow.substring(0, col+1+idx)}.${newRow.slice((input[row].length - col - 1) * -1)}`;
    });

    expandedInput.push(newRow);

    if (expandRows.includes(row)) {
      expandedInput.push(newRow);
    }

    row++;
  }

  return expandedInput;
}

const part1 = (input: string[]) => {
  const emptyRows: number[] = [];
  const emptyCols: number[] = [];

  input.forEach((line, idx) => {
    if (isRowEmpty(line)) {
      emptyRows.push(idx);
    }
  });

  let col = 0;
  while (col < input[0].length) {
    if (isColEmpty(input, col)) {
      emptyCols.push(col);
    }
    col++;
  }

  const newInput: string[] = expandUniverse(input, emptyRows, emptyCols);
  const galaxyCoords: { x: number, y: number }[] = [];
  
  let x = 0;
  while (x < newInput.length) {
    let y = 0;
    while (y < newInput[x].length) {
      if (newInput[x][y] === '#') {
        galaxyCoords.push({x,y});
      }

      y++;
    }

    x++;
  }

  let totalDist = 0;
  let i = 0;
  while (i < galaxyCoords.length) {
    let j = i + 1;
    while (j < galaxyCoords.length) {
      if (i !== j) {
        totalDist += Math.abs(galaxyCoords[j].x - galaxyCoords[i].x) + Math.abs(galaxyCoords[j].y - galaxyCoords[i].y);
      }
      j++;
    }
    i++;
  }

  return totalDist;
}

const part2 = (input: string[]) => {
  const emptyRows: number[] = [];
  const emptyCols: number[] = [];

  input.forEach((line, idx) => {
    if (isRowEmpty(line)) {
      emptyRows.push(idx);
    }
  });

  let col = 0;
  while (col < input[0].length) {
    if (isColEmpty(input, col)) {
      emptyCols.push(col);
    }
    col++;
  }

  const galaxyCoords: { x: number, y: number }[] = [];
  let totalDist = 0;
  
  let x = 0;
  while (x < input.length) {
    let y = 0;
    while (y < input[x].length) {
      if (input[x][y] === '#') {
        galaxyCoords.push({x,y});
      }

      y++;
    }

    x++;
  }

  const expandBy = 999999;
  const newGalaxyCoords: { x: number, y: number}[] = [...galaxyCoords];

  newGalaxyCoords.map((coord) => {
    // Adjust x based on empty rows
    let i = 0;
    let expandCountX = 0;
    while (i < emptyRows.length) {
      if (coord.x > emptyRows[i]) {
        expandCountX += 1;
      }
      i++;
    }

    coord.x += expandCountX * expandBy;
    
    // Adjust y based on empty cols
    let j = 0;
    let expandCountY = 0;
    while (j < emptyCols.length) {
      if (coord.y > emptyCols[j]) {
        expandCountY += 1;
      }
      j++;
    }

    coord.y += expandCountY * expandBy;

    return coord;
  });

  let k = 0;
  while (k < newGalaxyCoords.length) {
    let m = k + 1;
    while (m < newGalaxyCoords.length) {
      if (k !== m) {
        totalDist += Math.abs(newGalaxyCoords[m].x - newGalaxyCoords[k].x) + Math.abs(newGalaxyCoords[m].y - newGalaxyCoords[k].y);
      }
      m++;
    }
    k++;
  }

  return totalDist;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

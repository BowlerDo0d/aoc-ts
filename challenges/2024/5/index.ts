import getInput from '../../../utils/getInput';

const runTestData = false;

const isWindows = process.platform === 'win32',
  pathParts = __dirname.split(isWindows ? '\\' : '/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day, runTestData).replace(/\r/g, '').split('\n');

const part1 = (input: string[]) => {
  const updates: string[] = [];

  let middlePages = 0;
  let rules = '';
  let insertRules = true;

  input.forEach((line) => {
    if (line.length) {
      if (insertRules) {
        rules += `${line}$`;
      } else {
        updates.push(line);
      }
    } else {
      insertRules = false;
    }
  });

  updates.forEach((update) => {
    const pages = update.split(',');
    let validUpdate = true;

    for (let i = 0; i < pages.length; i++) {
      for (let j = i+1; j < pages.length; j++) {
        if (rules.indexOf(`${pages[j]}|${pages[i]}`) !== -1) {
          // invalid update
          validUpdate = false;
          i = pages.length + 1;
          j = pages.length + 1;
        }
      }
    }

    if (validUpdate) {
      middlePages += +pages[Math.floor(pages.length/2)];
    }
   });

   return middlePages;
  }

const part2 = (input: string[]) => {
  const updates: string[] = [];
  const invalidUpdates: string[][] = [];

  let middlePages = 0;
  let rules = '';
  let insertRules = true;

  input.forEach((line) => {
    if (line.length) {
      if (insertRules) {
        rules += `${line}$`;
      } else {
        updates.push(line);
      }
    } else {
      insertRules = false;
    }
  });

  updates.forEach((update) => {
    const pages = update.split(',');

    for (let i = 0; i < pages.length; i++) {
      for (let j = i+1; j < pages.length; j++) {
        if (rules.indexOf(`${pages[j]}|${pages[i]}`) !== -1) {
          // invalid update
          invalidUpdates.push(pages);
          i = pages.length + 1;
          j = pages.length + 1;
        }
      }
    }
  });

  invalidUpdates.forEach((invalidUpdate) => {
    // Reorder/sort
    invalidUpdate.sort((a, b) => {
      if (rules.indexOf(`${a}|${b}`) !== -1) {
        return -1;
      } else if (rules.indexOf(`${b}|${a}`)) {
        return 1;
      }

      return 0;
    });

    middlePages += +invalidUpdate[Math.floor(invalidUpdate.length/2)];
  });

   return middlePages;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

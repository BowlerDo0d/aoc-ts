import getInput from '../../../utils/getInput';

const runTestData = false;

const isWindows = process.platform === 'win32',
  pathParts = __dirname.split(isWindows ? '\\' : '/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day, runTestData).replace(/\r/g, '').split('\n');

const part1 = (input: string[]) => {
  const data = input.join();
  const matches = data.match(/mul\(\d{1,3},\d{1,3}\)/g);

  let total = 0;

  matches?.forEach((operation) => {
    const parts = operation.match(/mul\((\d{1,3}),(\d{1,3})\)/)!;

    total += +parts[1] * +parts[2];
  });

  return total;
}

const processMuls = (data: string): number => {
  const matches = data.match(/mul\(\d{1,3},\d{1,3}\)/g);

  let total = 0;

  matches?.forEach((operation) => {
    const parts = operation.match(/mul\((\d{1,3}),(\d{1,3})\)/)!;

    total += +parts[1] * +parts[2];
  });

  return total;
}

const part2 = (input: string[]) => {
  let data = input.join();
  let searching = true;

  let total = 0;

  while (searching) {
    let dontIndex = data.indexOf('don\'t()');

    if (dontIndex === -1) {
      dontIndex = data.length - 1;
    }

    total += processMuls(data.slice(0, dontIndex));

    data = data.slice(dontIndex+7);

    let doIndex = data.indexOf('do()');

    data = data.slice(doIndex);

    searching = data.length >= 8;
  }

  return total;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day);

const part1 = (input: string) => {
  const inputArr = input.split('\n');
  const listA: any[] = [];
  const listB: any[] = [];

  inputArr.forEach((pairing) => {
    const pair = pairing.match(/(\d+)\s+(\d+)/) ?? [];

    listA.push(+pair[1]);
    listB.push(+pair[2]);
  });

  listA.sort();
  listB.sort();

  let totalDist = 0;

  if (listA.length !== listB.length) {
    console.log('Uneven lists, plan B!');
  } else {
    listA.forEach((val, idx) => {
      totalDist += Math.abs(val - listB[idx]);
    });
  }

  return totalDist;
}

const part2 = (input: string) => {
  const inputArr = input.split('\n');
  const listA: any[] = [];
  const listB: any[] = [];

  inputArr.forEach((pairing) => {
    const pair = pairing.match(/(\d+)\s+(\d+)/) ?? [];

    listA.push(+pair[1]);
    listB.push(+pair[2]);
  });

  listA.sort();
  listB.sort();

  let similarityScore = 0;
  let i = 0;
  let startIndex = 0;

  listA.forEach((val) => {
    let occurrences = 0;
    let stillSearching = true;

    i = startIndex;

    while (stillSearching) {
      if (listB[i] > val || i > listB.length) {
        startIndex = i > 0 ? i - occurrences : 0;
        stillSearching = false;
      } else if (listB[i] === val) {
        occurrences += 1;
      }

      i += 1;
    }

    similarityScore += val * occurrences;
  });

  return similarityScore;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

import getInput from '../../../utils/getInput';

const runTestData = false;

const isWindows = process.platform === 'win32',
  pathParts = __dirname.split(isWindows ? '\\' : '/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day, runTestData).replace(/\r/g, '').split('\n');

const breakDown = (sequence: number[]): number[][] => {
  const fullSequence: number[][] = [[...sequence]];
  
  let allZero = false;
  let nextSequence: number[] = [...sequence];
  
  while (!allZero) {
    const currentSequence = [...nextSequence];
    nextSequence = [];

    let i = 0;
    while (i < currentSequence.length - 1) {
      nextSequence.push(currentSequence[i + 1] - currentSequence[i]);
      i++;
    }
    
    fullSequence.push(nextSequence);
    allZero = !!nextSequence.length && !nextSequence.filter((val) => val !== 0).length;
  }

  return fullSequence;
}

const extrapolateFuture = (sequenceBreakDown: number[][]): number => {
  let nextSequenceValue = 0;  

  let j = sequenceBreakDown.length - 1;
  while (j >= 0) {
    if (j === sequenceBreakDown.length - 1) {
      sequenceBreakDown[j].push(0);
    } else {
      const activeSequence = sequenceBreakDown[j];
      const prevSequence = sequenceBreakDown[j + 1];
      const activeEndValue = activeSequence.slice(-1)[0];
      const prevEndValue = prevSequence.slice(-1)[0];

      const nextValue = activeEndValue + prevEndValue;

      sequenceBreakDown[j].push(nextValue);

      if (j === 0) {
        nextSequenceValue = nextValue;
      }
    }

    j--;
  }

  return nextSequenceValue;
}

const extrapolatePast = (sequenceBreakDown: number[][]): number => {
  let nextSequenceValue = 0;  

  let j = sequenceBreakDown.length - 1;
  while (j >= 0) {
    if (j === sequenceBreakDown.length - 1) {
      sequenceBreakDown[j].unshift(0);
    } else {
      const activeSequence = sequenceBreakDown[j];
      const prevSequence = sequenceBreakDown[j + 1];
      const activeEndValue = activeSequence[0];
      const prevEndValue = prevSequence[0];

      const nextValue = activeEndValue - prevEndValue;

      sequenceBreakDown[j].unshift(nextValue);

      if (j === 0) {
        nextSequenceValue = nextValue;
      }
    }

    j--;
  }

  return nextSequenceValue;
}

const part1 = (input: string[]) => {
  let totalHistory = 0;

  input.forEach((sequence) => {
    const sequenceBreakDown = breakDown(sequence.trim().split(' ').map((val) => Number.parseInt(val, 10)));

    // sequenceBreakDown.forEach((seq) => {
    //   console.log(seq);
    // });

    const nextHistoryVal = extrapolateFuture(sequenceBreakDown);

    totalHistory += nextHistoryVal;
  });

  return totalHistory;
}

const part2 = (input: string[]) => {
  let totalHistory = 0;

  input.forEach((sequence) => {
    const sequenceBreakDown = breakDown(sequence.trim().split(' ').map((val) => Number.parseInt(val, 10)));
    const nextHistoryVal = extrapolatePast(sequenceBreakDown);

    totalHistory += nextHistoryVal;
  });

  return totalHistory;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

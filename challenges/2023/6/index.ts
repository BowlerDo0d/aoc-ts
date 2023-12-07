import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('\\'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day),
  fullInputArr = fullInput.split('\n');

const part1 = (input: string[]) => {
  const times = input[0].replace('Time:', '').trim().split(' ').filter((val) => val != '').map((val) => Number.parseInt(val.trim()));
  const distances = input[1].replace('Distance:', '').trim().split(' ').filter((val) => val !== '').map((val) => Number.parseInt(val.trim()));

  let answer = 0;

  let i = 0,
    len = times.length;
  while (i < len) {
    const raceTime = times[i];
    const recordDist = distances[i];
    let winningHoldTimes = 0;

    let holdTime = 0;
    while (holdTime <= raceTime) {
      const totalDist = holdTime * (raceTime-holdTime);
      
      if (totalDist > recordDist) {
        winningHoldTimes += 1;
      }

      holdTime++;

      // Early exit
      if (holdTime > raceTime/2 && totalDist < recordDist) {
        holdTime = raceTime + 1;
      }
    }

    if (answer === 0) {
      answer = winningHoldTimes;
    } else {
      answer *= winningHoldTimes;
    }

    i++;
  }

  return answer;
}

const part2 = (input: string[]) => {
  const time = Number.parseInt(input[0].replace('Time:', '').trim().replace(/\s/g,''), 10);
  const distance = Number.parseInt(input[1].replace('Distance:', '').trim().replace(/\s/g,''), 10);

  let winningHoldTimes = 0;

  let holdTime = 0;
  while (holdTime <= time) {
    const totalDist = holdTime * (time-holdTime);
    
    if (totalDist > distance) {
      winningHoldTimes += 1;
    }

    holdTime++;

    // Early exit
    if (holdTime > time/2 && totalDist < distance) {
      holdTime = time + 1;
    }
  }

  return winningHoldTimes;
}

console.log(`Solution 1: ${part1(fullInputArr)}`);
console.log(`Solution 2: ${part2(fullInputArr)}`);

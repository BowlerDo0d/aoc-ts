import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day);


const part1 = (input: string) => {
  const inputArr = input.split('\n');
  let gameTotal = 0;
  const maxRed = 12;
  const maxGreen = 13;
  const maxBlue = 14;

  inputArr.forEach((game) => {
    const gameParts = game.split(':');
    const gameNumber = Number.parseInt(gameParts[0].replace('Game ', '').replace(':', ''), 10);
    const cubeSets = gameParts[1].split(';');
    let valid = true;

    cubeSets.forEach((cubeSet) => {
      const colorGroups = cubeSet.split(',');

      colorGroups.forEach((colorGroup) => {
        if (colorGroup.indexOf('red') > 0) {
          const numRed = Number.parseInt(colorGroup.replace(' red', '').trim(), 10);

          if (numRed > maxRed) {
            valid = false;
          }
        } else if (colorGroup.indexOf('green') > 0) {
          const numGreen = Number.parseInt(colorGroup.replace(' green', '').trim(), 10);

          if (numGreen > maxGreen) {
            valid = false;
          }
        } else if (colorGroup.indexOf('blue') > 0) {
          const numBlue = Number.parseInt(colorGroup.replace(' blue', '').trim(), 10);

          if (numBlue > maxBlue) {
            valid = false;
          }
        }
      });
    });

    if (valid) {
      gameTotal += gameNumber;
    }
  });

  return gameTotal;
}

const part2 = (input: string) => {
  const inputArr = input.split('\n');
  let totalPower = 0;

  inputArr.forEach((game) => {
    const gameParts = game.split(':');
    const cubeSets = gameParts[1].split(';');
    let gamePower = 0;
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    cubeSets.forEach((cubeSet) => {
      const colorGroups = cubeSet.split(',');

      colorGroups.forEach((colorGroup) => {
        if (colorGroup.indexOf('red') > 0) {
          const numRed = Number.parseInt(colorGroup.replace(' red', '').trim(), 10);

          if (numRed > maxRed) {
            maxRed = numRed;
          }
        } else if (colorGroup.indexOf('green') > 0) {
          const numGreen = Number.parseInt(colorGroup.replace(' green', '').trim(), 10);

          if (numGreen > maxGreen) {
            maxGreen = numGreen;
          }
        } else if (colorGroup.indexOf('blue') > 0) {
          const numBlue = Number.parseInt(colorGroup.replace(' blue', '').trim(), 10);

          if (numBlue > maxBlue) {
            maxBlue = numBlue;
          }
        }
      });
    });

    gamePower = maxRed * maxGreen * maxBlue;
    totalPower += gamePower;
  });

  return totalPower;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

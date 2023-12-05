import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day),
  fullInputArr = fullInput.split('\n');

const flattenArray = (inputArr: string[]): string[] => {
  const newArray: string[] = [];

  inputArr.forEach((element) => {
    if (element.length) {
      newArray.push(element);
    }
  })

  return newArray;
}

const part1 = (input: string[]) => {
  let totalScore = 0;

  input.forEach((gameCard) => {
    const cardParts = gameCard.split(':');
    const gameNum = Number.parseInt(cardParts[0].replace('Card ', '').trim(), 10);
    const numberSets = cardParts[1].split('|');
    const winningNumbers = flattenArray(numberSets[0].split(' '));
    const cardNumbers = flattenArray(numberSets[1].split(' '));
    let cardScore = 0;

    cardNumbers.forEach((cardNum) => {
      if (winningNumbers.indexOf(cardNum) > -1) {
        if (cardScore === 0) {
          cardScore = 1;
        } else {
          cardScore *= 2;
        }
      }
    });

    totalScore += cardScore;
  });

  return totalScore;
}

const part2 = (input: string[]) => {
  const winCountCache: number[] = [];
  let allCards: number[] = [];

  input.forEach((gameCard) => {
    const cardParts = gameCard.split(':');
    const gameNum = Number.parseInt(cardParts[0].replace('Card ', '').trim(), 10);
    const numberSets = cardParts[1].split('|');
    const winningNumbers = flattenArray(numberSets[0].split(' '));
    const cardNumbers = flattenArray(numberSets[1].split(' '));
    let winningMatches = 0;

    cardNumbers.forEach((cardNum) => {
      if (winningNumbers.indexOf(cardNum) > -1) {
        winningMatches += 1;
      }
    });

    winCountCache.push(winningMatches);
    allCards.push(gameNum);
  });

  for (let i=0; i<allCards.length; i++) {
    const cardNumber = allCards[i];

    for (let j=1; j<=winCountCache[cardNumber-1]; j++) {
      if ((cardNumber+j) <= input.length) {
        allCards.push(cardNumber+j);
      }
    }
  }

  return allCards.length;
}

console.log(`Solution 1: ${part1(fullInputArr)}`);
console.log(`Solution 2: ${part2(fullInputArr)}`);

import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day).split('\n');

const handRanks = ['5 of a kind', '4 of a kind', 'Full House', 'Trips', '2 Pair', 'Pair', 'High Card'];

const part1 = (input: string[]) => {
  const cardRanks = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];

  const sortHand = (hand: string): string => {
    const cards = Array.from(hand);

    cards.sort((a, b) => {
      const rankA = cardRanks.indexOf(a);
      const rankB = cardRanks.indexOf(b);

      if (rankA < rankB) {
        return -1;
      } else if (rankA > rankB) {
        return 1;
      }
      return 0;
    });

    return cards.join('');
  }

  const getHandStrength = (hand: string): number => {
    // Five of a kind
    if (
      hand[0] === hand[1] &&
      hand[1] === hand[2] &&
      hand[2] === hand[3] &&
      hand[3] === hand[4]
    ) {
      return 0;
    }

    // Four of a kind
    if (
      (hand[0] === hand[1] &&
      hand[1] === hand[2] &&
      hand[2] === hand[3]) ||
      (hand[1] === hand[2] &&
      hand[2] === hand[3] &&
      hand[3] === hand[4])
    ) {
      return 1;
    }

    // Full house
    if (
      (hand[0] === hand[1] &&
      hand[2] === hand[3] &&
      hand[3] === hand[4]) ||
      (hand[0] === hand[1] &&
      hand[1] === hand[2] &&
      hand[3] === hand[4])
    ) {
      return 2;
    }

    // Trips
    if (
      (hand[0] === hand[1] &&
      hand[1] === hand[2]) ||
      (hand[1] === hand[2] &&
      hand[2] === hand[3]) ||
      (hand[2] === hand[3] &&
      hand[3] === hand[4])
    ) {
      return 3;
    }

    // Two pair
    if (
      (hand[0] === hand[1] &&
      (hand[2] === hand[3] || hand[3] === hand[4])) ||
      (hand[1] === hand[2] &&
      hand[3] === hand[4])
    ) {
      return 4;
    }

    // Pair
    if (
      hand[0] === hand[1] ||
      hand[1] === hand[2] ||
      hand[2] === hand[3] ||
      hand[3] === hand[4]
    ) {
      return 5;
    }

    // High card
    return 6;
  }

  const allHands: {
    hand: string,
    strength: number,
    bet: number
  }[] = [];

  input.forEach((game, i) => {
    const gameParts = game.split(' ');
    const hand = gameParts[0];
    const handSorted = sortHand(hand);
    const bet = Number.parseInt(gameParts[1], 10);
    const strength = getHandStrength(handSorted);

    allHands.push({
      hand,
      strength,
      bet
    });
  });

  allHands.sort((a, b) => {
    if (a.strength < b.strength) {
      return 1;
    }
    if (a.strength > b.strength) {
      return -1;
    }

    let strongerHand = '';
    let i=0;
    while (i<5) {
      if (a.hand[i] !== b.hand[i]) {
        if (cardRanks.indexOf(a.hand[i]) < cardRanks.indexOf(b.hand[i])) {
          strongerHand = 'b';
        } else {
          strongerHand = 'a';
        }
        i = 5;
      }
      i++;
    }

    return strongerHand === 'a' ? -1 : 1;
  });

  let totalWinnings = 0;

  allHands.forEach((handObj, idx) => {
    totalWinnings += handObj.bet * (idx + 1);
  });

  return totalWinnings;
}

const part2 = (input: string[]) => {
  const cardRanks = ['A','K','Q','T','9','8','7','6','5','4','3','2','J'];

  const sortHand = (hand: string): string => {
    const cards = Array.from(hand);

    cards.sort((a, b) => {
      const rankA = cardRanks.indexOf(a);
      const rankB = cardRanks.indexOf(b);

      if (rankA < rankB) {
        return -1;
      } else if (rankA > rankB) {
        return 1;
      }
      return 0;
    });

    return cards.join('');
  }

  const getHandStrength = (hand: string): number => {
    // Five of a kind
    if (
      (hand[0] === hand[1] &&
      hand[1] === hand[2] &&
      hand[2] === hand[3] &&
      hand[3] === hand[4]) ||
      (hand[0] === hand[1] &&
      hand[1] === hand[2] &&
      hand[2] === hand[3] &&
      hand[4] === 'J') ||
      (hand[0] === hand[1] &&
      hand[1] === hand[2] &&
      hand[3] === 'J') ||
      (hand[0] === hand[1] &&
      hand[2] === 'J') ||
      (hand[1] === 'J')
    ) {
      return 0;
    }

    // Four of a kind
    if (
      (hand[0] === hand[1] &&
      hand[1] === hand[2] &&
      hand[2] === hand[3]) ||
      (hand[1] === hand[2] &&
      hand[2] === hand[3] &&
      hand[3] === hand[4]) ||
      (hand[0] === hand[1] &&
      hand[1] === hand[2] &&
      hand[4] === 'J') ||
      (hand[1] === hand[2] &&
      hand[2] === hand[3] &&
      hand[4] === 'J') ||
      (hand[0] === hand[1] &&
      hand[3] === 'J' &&
      hand[4] === 'J') ||
      (hand[1] === hand[2] &&
      hand[3] === 'J' &&
      hand[4] === 'J') ||
      (hand[2] === 'J' &&
      hand[3] === 'J' &&
      hand[4] === 'J')
    ) {
      return 1;
    }

    // Full house
    if (
      (hand[0] === hand[1] &&
      hand[2] === hand[3] &&
      hand[3] === hand[4]) ||
      (hand[0] === hand[1] &&
      hand[1] === hand[2] &&
      hand[3] === hand[4]) ||
      (hand[0] === hand[1] &&
      hand[2] === hand[3] &&
      hand[4] === 'J')
    ) {
      return 2;
    }

    // Trips
    if (
      (hand[0] === hand[1] &&
      hand[1] === hand[2]) ||
      (hand[1] === hand[2] &&
      hand[2] === hand[3]) ||
      (hand[2] === hand[3] &&
      hand[3] === hand[4]) ||
      (hand[0] === hand[1] &&
      hand[4] === 'J') ||
      (hand[1] === hand[2] &&
      hand[4] === 'J') ||
      (hand[2] === hand[3] &&
      hand[4] === 'J') ||
      (hand[3] === 'J' &&
      hand[4] === 'J')
    ) {
      return 3;
    }

    // Two pair
    if (
      (hand[0] === hand[1] &&
      (hand[2] === hand[3] || hand[3] === hand[4])) ||
      (hand[1] === hand[2] &&
      hand[3] === hand[4])
    ) {
      return 4;
    }

    // Pair
    if (
      hand[0] === hand[1] ||
      hand[1] === hand[2] ||
      hand[2] === hand[3] ||
      hand[3] === hand[4] ||
      hand[4] === 'J'
    ) {
      return 5;
    }

    // High card
    return 6;
  }

  const allHands: {
    hand: string,
    strength: number,
    bet: number
  }[] = [];

  input.forEach((game, i) => {
    const gameParts = game.split(' ');
    const hand = gameParts[0];
    const handSorted = sortHand(hand);
    const bet = Number.parseInt(gameParts[1], 10);
    const strength = getHandStrength(handSorted);

    allHands.push({
      hand,
      strength,
      bet
    });
  });

  allHands.sort((a, b) => {
    if (a.strength < b.strength) {
      return 1;
    }
    if (a.strength > b.strength) {
      return -1;
    }

    let strongerHand = '';
    let i=0;
    while (i<5) {
      if (a.hand[i] !== b.hand[i]) {
        if (cardRanks.indexOf(a.hand[i]) < cardRanks.indexOf(b.hand[i])) {
          strongerHand = 'b';
        } else {
          strongerHand = 'a';
        }
        i = 5;
      }
      i++;
    }

    return strongerHand === 'a' ? -1 : 1;
  });

  let totalWinnings = 0;

  allHands.forEach((handObj, idx) => {
    totalWinnings += handObj.bet * (idx + 1);
  });

  return totalWinnings;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

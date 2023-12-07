import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('\\'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day).split('/n');

const rankings = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];

const part1 = (input: string[]) => {
  return input;
}

const part2 = (input: string[]) => {

}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

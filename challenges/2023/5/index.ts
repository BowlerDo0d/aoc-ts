import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day),
  inputArr = fullInput.split('\n');

let seeds: number[] = [];
const seed2Soil: any[] = [];
const soil2Fert: any[] = [];
const fert2Water: any[] = [];
const water2Light: any[] = [];
const light2Temp: any[] = [];
const temp2Humid: any[] = [];
const humid2Loc: any[] = [];

const parseInput = (input: string[]) => {
  let activeSection = 0;

  input.forEach((line) => {
    if (line.trim().length === 0) {
      activeSection += 1;
    }

    if (line.indexOf('-to-') === -1 && line.trim().length > 0) {
      switch (activeSection) {
        case 1:
          // seed-to-soil
          seed2Soil.push(line);
          break;
        case 2:
          // soil-to-fertilizer
          soil2Fert.push(line);
          break;
        case 3:
          // fertilizer-to-water
          fert2Water.push(line);
          break;
        case 4:
          // water-to-light
          water2Light.push(line);
          break;
        case 5:
          // light-to-temperature
          light2Temp.push(line);
          break;
        case 6:
          // temperature-to-humidity
          temp2Humid.push(line);
          break;
        case 7:
          // humidity-to-location
          humid2Loc.push(line);
          break;
        default:
          // seeds
          seeds = line.replace('seeds: ', '').split(' ').map((seed) => Number.parseInt(seed, 10));
      }
    }
  });
}

const part1 = (input: string[]) => {
  parseInput(input);

  console.log('Seeds:');
  console.log(seeds);
  console.log('');
  console.log('seed-to-soil:');
  console.log(seed2Soil);
  console.log('');
  console.log('soil-to-fertilizer');
  console.log(soil2Fert);
  console.log('');
  console.log('fertilizer-to-water');
  console.log(fert2Water);
  console.log('');
  console.log('water-to-light');
  console.log(water2Light);
  console.log('');
  console.log('light-to-temperature');
  console.log(light2Temp);
  console.log('');
  console.log('temperature-to-humidity:');
  console.log(temp2Humid);
  console.log('');
  console.log('humidity-to-location:');
  console.log(humid2Loc);
  console.log('');
}

const part2 = (input: string[]) => {

}

console.log(`Solution 1: ${part1(inputArr)}`);
console.log(`Solution 2: ${part2(inputArr)}`);

import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('\\'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day),
  inputArr = fullInput.split('\n');

let seeds: number[] = [];
const seed2Soil: number[][] = [];
const soil2Fert: number[][] = [];
const fert2Water: number[][] = [];
const water2Light: number[][] = [];
const light2Temp: number[][] = [];
const temp2Humid: number[][] = [];
const humid2Loc: number[][] = [];

const getMappedValue = (sourceNumber: number, targetRanges: number[][]) => {
  let mappedValue = sourceNumber;

  targetRanges.forEach((targetRange) => {
    const destinationStart = targetRange[0];
    const sourceStart = targetRange[1];
    const range = targetRange[2];

    if (sourceNumber >= sourceStart && sourceNumber < sourceStart + range) {
      const diff = sourceNumber - sourceStart;
      mappedValue = destinationStart + diff;
    }
  });

  return mappedValue;
}

const parseInput = (input: string[]) => {
  let activeSection = 0;

  input.forEach((line) => {
    if (line.trim().length === 0) {
      activeSection += 1;
    }

    if (line.indexOf('-to-') === -1 && line.trim().length > 0) {
      // const mappedValues = buildMaps(line, activeSection);

      switch (activeSection) {
        case 1:
          // seed-to-soil
          seed2Soil.push(line.split(' ').map((val) => Number.parseInt(val, 10)));
          break;
        case 2:
          // soil-to-fertilizer
          soil2Fert.push(line.split(' ').map((val) => Number.parseInt(val, 10)));
          break;
        case 3:
          // fertilizer-to-water
          fert2Water.push(line.split(' ').map((val) => Number.parseInt(val, 10)));
          break;
        case 4:
          // water-to-light
          water2Light.push(line.split(' ').map((val) => Number.parseInt(val, 10)));
          break;
        case 5:
          // light-to-temperature
          light2Temp.push(line.split(' ').map((val) => Number.parseInt(val, 10)));
          break;
        case 6:
          // temperature-to-humidity
          temp2Humid.push(line.split(' ').map((val) => Number.parseInt(val, 10)));
          break;
        case 7:
          // humidity-to-location
          humid2Loc.push(line.split(' ').map((val) => Number.parseInt(val, 10)));
          break;
        default:
          // seeds
          seeds = line.replace('seeds: ', '').split(' ').map((seed) => Number.parseInt(seed, 10));
      }
    }
  });
}

const part1 = (input: string[]) => {
  let lowestLocation = -1;
  parseInput(input);

  // console.log('Seeds:');
  // console.log(seeds);
  // console.log('');
  // console.log('seed-to-soil:');
  // console.log(seed2Soil);
  // console.log('');
  // console.log('soil-to-fertilizer');
  // console.log(soil2Fert);
  // console.log('');
  // console.log('fertilizer-to-water');
  // console.log(fert2Water);
  // console.log('');
  // console.log('water-to-light');
  // console.log(water2Light);
  // console.log('');
  // console.log('light-to-temperature');
  // console.log(light2Temp);
  // console.log('');
  // console.log('temperature-to-humidity:');
  // console.log(temp2Humid);
  // console.log('');
  // console.log('humidity-to-location:');
  // console.log(humid2Loc);
  // console.log('');

  seeds.forEach((seed) => {
    const soilNumber = getMappedValue(seed, seed2Soil);
    const fertNumber = getMappedValue(soilNumber, soil2Fert);
    const waterNumber = getMappedValue(fertNumber, fert2Water);
    const lightNumber = getMappedValue(waterNumber, water2Light);
    const tempNumber = getMappedValue(lightNumber, light2Temp);
    const humidNumber = getMappedValue(tempNumber, temp2Humid);
    const locationNumber = getMappedValue(humidNumber, humid2Loc);

    if (lowestLocation === -1 || locationNumber < lowestLocation) {
      lowestLocation = locationNumber;
    }
  });

  return lowestLocation;
}

const part2 = (input: string[]) => {
  let lowestLocation = -1;
  
  const seedRanges: { min: number, max: number }[] = [];

  for (let i=0; i<seeds.length; i+=2) {
    const startSeed = seeds[i];
    const seedRange = seeds[i+1];
    let rangeAppended = false;

    for (let j=0; j<seedRanges.length; j++) {
      let min = seedRanges[j].min;
      let max = seedRanges[j].max;
    
      if (startSeed >= min && startSeed <= max) {
        if ((startSeed + seedRange) < max) {
          // Already accounted for
          rangeAppended = true;
        } else {
          // Append to current range
          seedRanges[j].max = startSeed + seedRange;
          rangeAppended = true;
        }
      }
    }

    if (!seedRanges.length || !rangeAppended) {
      seedRanges.push({
        min: startSeed,
        max: startSeed + seedRange
      });
    }
  }

  console.log(seedRanges);

  let i = 0,
    len = seedRanges.length;
  while (i < len) {
    const startSeed = seedRanges[i].min;
    const endSeed = seedRanges[i].max;

    console.log(`Range ${i+1}: Checking from ${startSeed} to ${endSeed}. Total ${endSeed - startSeed} seeds`);

    let j =startSeed,
      stop = endSeed;

    while (j < stop) {

      if (j % 100000000 === 0) {
        console.log(`Still checking range ${i+1}...`);
      }

      const soilNumber = getMappedValue(j, seed2Soil);
      const fertNumber = getMappedValue(soilNumber, soil2Fert);
      const waterNumber = getMappedValue(fertNumber, fert2Water);
      const lightNumber = getMappedValue(waterNumber, water2Light);
      const tempNumber = getMappedValue(lightNumber, light2Temp);
      const humidNumber = getMappedValue(tempNumber, temp2Humid);
      const locationNumber = getMappedValue(humidNumber, humid2Loc);

      if (lowestLocation === -1 || locationNumber < lowestLocation) {
        lowestLocation = locationNumber;
      }

      j++;
    }

    console.log(`Lowest location so far: ${lowestLocation}`);

    i++;
  }

  return lowestLocation;
}

console.log(`Solution 1: ${part1(inputArr)}`);
console.log(`Solution 2: ${part2(inputArr)}`);

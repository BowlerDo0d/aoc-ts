import getInput from '../../../utils/getInput';

const pathParts = __dirname.split('/'),
  day = pathParts?.length ? pathParts[pathParts.length-1] : '',
  year = pathParts?.length ? pathParts[pathParts.length-2] : '',
  fullInput = getInput(year, day);

const isReportSafe = (report: number[]): boolean => {
  let isSafe = false;
  let checkingSafety = true;
  let i = 0;

  while (checkingSafety) {
    if (i === report.length) {
      checkingSafety = false;
      isSafe = true;
    }

    if (
      report[i] >= report[i+1] ||
      report[i+1] - report[i] > 3
    ) {
      checkingSafety = false;
    }

    i += 1;
  }

  return isSafe;
}

const part1 = (input: string) => {
  const inputArr = input.split('\n');

  let safeReports = 0;

  inputArr.forEach((reportData) => {
    const report = reportData.split(' ').map((val) => +val);
    const maxDiff = (report.length - 1) * 3;

    if (report[0] > report[report.length - 1]) {
      report.reverse();
    }

    if (report[report.length - 1] - report[0] <= maxDiff) {
      // Possibly safe
      if (isReportSafe(report)) {
        safeReports += 1;
      }
    }
  });

  return safeReports;
}

const part2 = (input: string) => {
  const inputArr = input.split('\n');

  let safeReports = 0;

  inputArr.forEach((reportData) => {
    const report = reportData.split(' ').map((val) => +val);
    const maxDiff = (report.length - 1) * 3;

    if (report[0] > report[report.length - 1]) {
      report.reverse();
    }

    if (report[report.length - 1] - report[0] <= maxDiff) {
      // Possibly safe
      if (isReportSafe(report)) {
        safeReports += 1;
      } else {
        for (let i=0; i < report.length; i++) {
          const tempReport = [...report.slice(0,i), ...report.slice(i+1)];

          if (isReportSafe(tempReport)) {
            safeReports += 1;
            i = tempReport.length;
          }
        }
      }
    }
  });

  return safeReports;
}

console.log(`Solution 1: ${part1(fullInput)}`);
console.log(`Solution 2: ${part2(fullInput)}`);

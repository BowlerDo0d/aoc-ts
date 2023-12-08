const { readFileSync } = require('fs');

export default function readInputFile(year: string, day: string, useTestData = false): string {
    return readFileSync(`challenges/${year}/${day}/input${useTestData ? '-test' : ''}.txt`, 'utf-8');
}
import { promises as fs } from 'fs';

import { camelCaseToSentence, measureTime } from './lib/benckmark';

const myArgs = process.argv.slice(2);

myArgs.forEach(async (element) => {
    console.log(element);
    const contentAsTs = await fs.readFile(element, 'utf8');

    element.replace('src', 'dist');
    const contentAsJs = await fs.readFile(element, 'utf8');

    const moduleToBenchmark = await import(element);

    const testingFunction = moduleToBenchmark.test as ((callback:() => number) => number);
    if(typeof testingFunction === ) {}
    Object.entries(moduleToBenchmark).forEach(([key, value]) => {
        console.log(key);
        console.log(value);

        const nameTimeArr = [];
        if (typeof value === 'function') {
            const time = measureTime(value());
            nameTimeArr.push([camelCaseToSentence(key), time]);
        }

    });
});

export {};

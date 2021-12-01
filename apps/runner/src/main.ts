import { promises as fs } from 'fs';

const myArgs = process.argv.slice(2);

myArgs.forEach(async (element) => {
    console.log(element);
    const contentAsTs = await fs.readFile(element, 'utf8');

    element.replace('src', 'dist');
    const contentAsJs = await fs.readFile(element, 'utf8');

    const moduleToBenchmark = await import(element);

    const testingFunction = moduleToBenchmark.test as (callback: (...args: unknown[]) => unknown) => () => unknown;
    if (typeof testingFunction === 'function') {
        Object.entries(moduleToBenchmark).forEach(([key, value]) => {
            console.log(key);
            console.log(value);

            // const nameTimeArr = [];
            if (typeof value === 'function') {
                const fct = value as (...args: unknown[]) => unknown;
                // const benchmarkFunction = testingFunction(fct);
                // const time = measureTime(benchmarkFunction);
                // nameTimeArr.push([camelCaseToSentence(key), time]);
            }
        });
    }

    console.log(contentAsTs, contentAsJs);
});

export {};

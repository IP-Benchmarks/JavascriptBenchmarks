import * as jsBenchmarks from '@javascript-benchmarks/benchmarks';
import { dashToCamelCase, IBenchmark } from '@javascript-benchmarks/shared';
import { promises } from 'fs';

import { generateBarChart } from './app/generate-chart';

const benchmarks = [
    {
        name: 'JSON stringify - primitives',
        averageTime: 0.0007384411573410035,
        opsPerSec: 1354204.041931823,
        functionBody: 'function jsonStringify(value) {\r\n    return JSON.stringify(value);\r\n}',
        functionName: 'jsonStringify',
    },
    {
        name: 'Custom stringify - primitives',
        averageTime: 0.0004705503225326538,
        opsPerSec: 2125171.213607244,
        functionBody:
            'function stringifyPrimitives(value) {\r\n' +
            "    if (typeof value === 'string') {\r\n" +
            '        return `"${value}"`;\r\n' +
            '    }\r\n' +
            "    if (typeof value === 'number' || typeof value === 'boolean' || value === null) {\r\n" +
            '        return `${value}`;\r\n' +
            '    }\r\n' +
            '}',
        functionName: 'stringifyPrimitives',
    },
];
console.log('Chart Saving', __dirname);
generateBarChart(benchmarks).then((x) => console.log(x));
generateBarChart(benchmarks).then(async (x) => await promises.writeFile(`${__dirname}/chart.png`, x, 'utf8'));

const myArgs = process.argv.slice(2);

myArgs.forEach(async (element) => {
    await runBenchmark(element);
    // console.log(element);
    // const contentAsTs = await fs.readFile(element, 'utf8');
    // element.replace('src', 'dist');
    // const contentAsJs = await fs.readFile(element, 'utf8');
    // const moduleToBenchmark = await import('@javascript-benchmarks/benchmarks').then((x) => x.importBenchmark(element));
    // const moduleToBenchmark = await import(/* webpackMode: "eager" */ element);
    // console.log(contentAsTs, contentAsJs);
});

export async function runBenchmark(path: string) {
    const moduleName = dashToCamelCase(path.split('/').pop().replace('.ts', ''));
    const moduleToBenchmark = jsBenchmarks[moduleName];

    if (typeof moduleToBenchmark.test === 'function') {
        const testingFunction = moduleToBenchmark.test as () => Array<IBenchmark>;
        console.log(`Running benchmark ${path}`, testingFunction());
        return testingFunction();
    }
}

export {};

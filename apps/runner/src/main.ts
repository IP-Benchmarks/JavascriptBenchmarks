import * as jsBenchmarks from '@javascript-benchmarks/benchmarks';
import { dashToCamelCase, IBenchmark } from '@javascript-benchmarks/shared';

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

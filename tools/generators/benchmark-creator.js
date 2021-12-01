main();

async function main() {
    const fs = require('fs');
    const basePath = './libs/benchmarks/src';

    let myArgs = process.argv.slice(2);
    if (myArgs.length < 2) {
        myArgs = await getUserInput();
    }
    const [category, benchmark] = myArgs;
    createBenchmarkFiles(fs, basePath, category, benchmark);
    updateIndex(fs, basePath, benchmark, category);

    process.exit(0);
}

function updateIndex(fs, basePath, benchmark, category) {
    const indexData = fs.readFileSync(`${basePath}/index.ts`, 'utf8');
    const benchmarkData = `
    export * as ${dashToCamelCase(benchmark)} from './lib/${category}/${benchmark}/${benchmark}';`;

    fs.writeFileSync(`${basePath}/index.ts`, indexData + benchmarkData, 'utf8');
}

function createBenchmarkFiles(fs, basePath, category, benchmark) {
    const testData = `
    describe('${benchmark}.spec', () => {
        test('', () => {
           
        });
    });
    `;

    const benchmarkData = `
    import { generateMixedPrimitivesArray, generateSamples, IBenchmark, runBenchmark } from '@javascript-benchmarks/shared';

    export function test(): Array<IBenchmark> {
    const matrix = generateSamples(1000, () => generateMixedPrimitivesArray(1000, true));

    return [
        runBenchmark('Benchmark 1', () => undefined, matrix),
        runBenchmark('Benchmark 2', () => undefined, matrix),
    ];
}
    `;

    fs.writeFileSync(`${basePath}/lib/${category}/${benchmark}/${benchmark}.ts`, benchmarkData, 'utf8');
    fs.writeFileSync(`${basePath}/lib/${category}/${benchmark}/${benchmark}.spec.ts`, testData, 'utf8');

    console.log(`Benchmark ${benchmark} created in ${category} category`);
}

async function getUserInput() {
    const category = await getInput('Category name:');
    const benchmark = await getInput('Benchmark name:');
    return [category, benchmark];
}

function getInput(query) {
    const readline = require('readline');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) =>
        rl.question(query, (ans) => {
            rl.close();
            resolve(ans);
        })
    );
}

function dashToCamelCase(str) {
    return str.replace(/-([a-z])/g, (foundStr) => foundStr[1].toUpperCase());
}

const fs = require('fs');

main();

async function main() {
    const basePath = `./libs/benchmarks/src`;

    let myArgs = process.argv.slice(2);
    if (myArgs.length < 2) {
        myArgs = await getUserInput();
    }
    myArgs = myArgs.map((arg) => arg.toLocaleLowerCase());
    const [category, benchmark] = myArgs;
    createBenchmarkFiles(basePath, category, benchmark);
    updateIndex(basePath, benchmark, category);

    process.exit(0);
}

function updateIndex(basePath, benchmark, category) {
    const indexData = fs.readFileSync(`${basePath}/index.ts`, 'utf8');
    const benchmarkData = `
export * as ${dashToCamelCase(benchmark)} from './lib/${category}/${benchmark}/${benchmark}';`;

    writeFileSync(basePath, 'index.ts', indexData + benchmarkData);
}

function createBenchmarkFiles(basePath, category, benchmark) {
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
        runBenchmark('Benchmark 1', () => 'Please update this function', matrix),
        runBenchmark('Benchmark 2', () => 'Please update this function', matrix),
    ];
}
    `;

    writeFileSync(`${basePath}/lib/${category}/${benchmark}`, `${benchmark}.ts`, benchmarkData);
    writeFileSync(`${basePath}/lib/${category}/${benchmark}`, `${benchmark}.spec.ts`, testData);

    console.log(`Benchmark ${benchmark} created in ${category} category`);
}

function writeFileSync(folderPath, fileName, content) {
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(`${folderPath}/${fileName}`, content, 'utf8');
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

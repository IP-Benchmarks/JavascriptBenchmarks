import * as jsBenchmarks from '@javascript-benchmarks/benchmarks';
import { dashToCamelCase, getAllFiles, getFilesChanged, IBenchmark } from '@javascript-benchmarks/shared';

import { createBenchmarkDoc, createSummaryFile } from './app/generate-benchmark-docs';

Promise.all([main()]).then(() => process.exit(0));
async function main() {
    const myArgs = Array.from(process.argv.slice(2));
    const files = myArgs.includes('files-changed')
        ? await getFilesChanged('libs/benchmarks/src/lib', '.ts', '.spec.')
        : await getAllFiles('libs/benchmarks/src/lib', '.ts', '.spec.');
    files.forEach(async (element) => {
        const benchmarkResults = await runBenchmark(element);
        createBenchmarkDoc(benchmarkResults, element);
    });

    const allFiles = await getAllFiles('libs/benchmarks/src/lib', '.ts', '.spec.');
    createSummaryFile(allFiles);
}

async function runBenchmark(path: string) {
    const benchmarkName = path.split('/').pop().replace('.ts', '');
    const moduleName = dashToCamelCase(benchmarkName);
    const moduleToBenchmark = jsBenchmarks[moduleName];

    if (moduleToBenchmark?.test && typeof moduleToBenchmark.test === 'function') {
        const testingFunction = moduleToBenchmark.test as () => Array<IBenchmark>;
        return testingFunction();
    }
}

export {};

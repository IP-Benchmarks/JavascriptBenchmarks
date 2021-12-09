import { dashToSentence, IBenchmark, readFileSync, writeFileSync } from '@javascript-benchmarks/shared';

import { generateStackblitz } from './generate-stackblitz';

// will create the readme to be submitted

export function createSummaryFile(benchmarkFiles: string[]) {
    const paths = benchmarkFiles.map((file) => [
        file.split('/').pop().replace('.ts', ''),
        `./docs/${file.split('/').pop().replace('.ts', '.md')}`,
    ]);
    const list = paths.map((path) => `- [${dashToSentence(path[0])}](${path[1]})`).join('\n');
    const summaryFile = `# Table of Contents
${list}
`;
    writeFileSync('./', 'SUMMARY.md', summaryFile);
}

export function createBenchmarkDoc(benchmarks: IBenchmark[], benchmarkPath: string): void {
    const code = readFileSync(benchmarkPath);

    const benchmarkName = benchmarkPath.split('/').pop().replace('.ts', '');
    const outputFolderPath = `./docs`;
    const outputFilePath = `${benchmarkName}.md`;
    const title = benchmarks.map((b) => b.name).join(' vs ');
    const benchmarksSortedByPerformance = benchmarks.sort((a, b) => b.opsPerSec - a.opsPerSec);
    const readme = `
# ${title}
## Benchmark Results
### Best Performance: **${benchmarksSortedByPerformance[0].name}**
#### **${benchmarksSortedByPerformance[0].name}** is ***${(
        Math.round((benchmarksSortedByPerformance[0].opsPerSec / benchmarksSortedByPerformance[1].opsPerSec) * 100) /
        100
    ).toFixed(2)}x*** faster than **${benchmarksSortedByPerformance[1].name}**
${benchmarks.map((b) => createCodeBlock(`${b.name}: ${b.opsPerSec.toFixed(3)} ops/s (${b.samples})`)).join('\n\n')}

## Code
${createCodeBlock(code)}

## Checkout the code on Stackblitz
{% embed url="${generateStackblitz(benchmarkPath)}" %} 
`;
    writeFileSync(outputFolderPath, outputFilePath, readme);
}

function createCodeBlock(str: string, codeType = 'typescript'): string {
    return `\`\`\`${codeType}
${str}
\`\`\``;
}

function createEmphasisBlock(str: string): string {
    return `\`${str}\``;
}

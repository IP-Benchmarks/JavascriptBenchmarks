import { dashToSentence, IBenchmark, writeFileSync } from '@javascript-benchmarks/shared';

import { generateStackblitz } from './generate-stackblitz';

// will create the readme to be submitted

export function createSummaryFile(benchmarkFiles: string[]) {
    const paths = benchmarkFiles.map((file) => [file.split('/').pop().replace('.ts', ''), file.replace('.ts', '.md')]);
    const list = paths.map((path) => `- [${dashToSentence(path[0])}](${path[1]})`).join('\n');
    const summaryFile = `# Table of Contents
${list}
`;
    writeFileSync('./', 'SUMMARY.md', summaryFile);
}

export function createBenchmarkDoc(benchmarks: IBenchmark[], benchmarkPath: string): void {
    const benchmarkName = benchmarkPath.split('/').pop().replace('.ts', '');
    const outputFolderPath = `./docs`;
    const outputFilePath = `${benchmarkName}.md`;
    const title = benchmarks.map((b) => b.name).join(' vs ');
    const readme = `
# ${title}
## Benchmark Results
### Best Benchmark: *${benchmarks.sort((a, b) => b.opsPerSec - a.opsPerSec).map((b) => b.name)[0]}*
${benchmarks.map((b) => createCodeBlock(`${b.name}: ${b.opsPerSec.toFixed(3)} ops/s`)).join('\n\n')}

## Benchmark Code
{% embed url="${generateStackblitz(benchmarkPath)}"" %}}  
`;
    writeFileSync(outputFolderPath, outputFilePath, readme);
}

function createCodeBlock(str: string): string {
    return `\`\`\`
${str}
\`\`\``;
}

function createEmphasisBlock(str: string): string {
    return `\`${str}\``;
}

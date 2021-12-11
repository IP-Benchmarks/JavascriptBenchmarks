import {
    dashToSentence,
    firstLetterUpperCase,
    IBenchmark,
    readFileSync,
    writeFileSync,
} from '@javascript-benchmarks/shared';

import { generateStackblitz } from './generate-stackblitz';

// will create the readme to be submitted

export function createSummaryFile(benchmarkFiles: string[]) {
    const fixedPath = 'libs/benchmarks/src/lib/';

    const benchmarksData = benchmarkFiles.map((file) => ({
        title: getTitleFromFile(file, dashToSentence(file.split('/').pop().replace('.ts', ''))),
        categories: getCategoriesFromFile(file, file.split(fixedPath).pop().split('/')[0]).map((x) =>
            firstLetterUpperCase(x)
        ),
        filePath: `./docs/${file.split('/').pop().replace('.ts', '.md')}`,
    }));
    const groupedDataByCategory: Record<string, typeof benchmarksData> = benchmarksData.reduce((acc, curr) => {
        curr.categories.forEach((category) => {
            if (!acc[category]) acc[category] = [];
            acc[category].push(curr);
        });
        return acc;
    }, {});

    const sortedCategories = Object.keys(groupedDataByCategory).sort();

    const generateBenchmarkList = (benchmarks: typeof benchmarksData) =>
        benchmarks.map((benchmark) => `[${benchmark.title}](${benchmark.filePath})`);
    const list = sortedCategories
        .map(
            (categoryName) =>
                `${createListItem(`## **[${createEmphasisBlock(categoryName)}]()**`, 1)}${createList(
                    generateBenchmarkList(groupedDataByCategory[categoryName]),
                    2
                )}`
        )
        .join('\n');

    const summaryFile = `# ${createEmphasisBlock('Table of Contents')}
${list}

${createLastUpdatedOnBlock()}
`;
    writeFileSync('./', 'SUMMARY.md', summaryFile);
}

export function createBenchmarkDoc(benchmarks: IBenchmark[], benchmarkPath: string): void {
    const code = readFileSync(benchmarkPath);
    const benchmarkName = benchmarkPath.split('/').pop().replace('.ts', '');
    const outputFolderPath = `./docs`;
    const outputFilePath = `${benchmarkName}.md`;
    const title = getTitleFromFile(benchmarkPath, benchmarks.map((b) => b.name).join(' vs '));
    const benchmarksSortedByPerformance = benchmarks.sort((a, b) => b.opsPerSec - a.opsPerSec);
    const readme = `
# ${title}
## Benchmark Results
### Best Performance: **${benchmarksSortedByPerformance[0].name}**
#### **${benchmarksSortedByPerformance[0].name}** is ***${createEmphasisBlock(
        (
            Math.round(
                (benchmarksSortedByPerformance[0].opsPerSec / benchmarksSortedByPerformance[1].opsPerSec) * 100
            ) / 100
        ).toFixed(2) + 'x'
    )}*** faster than **${benchmarksSortedByPerformance[1].name}**
${benchmarks.map((b) => createCodeBlock(`${b.name}: ${b.opsPerSec.toFixed(3)} ops/s (${b.samples})`)).join('\n\n')}

## Code
${createCodeBlock(code)}

## Checkout the code on Stackblitz
{% embed url="${generateStackblitz(benchmarkPath)}" %} 

${createLastUpdatedOnBlock()}
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

function createList(arr: string[], spaces = 1): string {
    return arr.map((x) => createListItem(x, spaces)).join('\n');
}

function createListItem(str: string, spaces = 1): string {
    return `${' '.repeat(spaces * 2)}- ${str}\n`;
}

function getTitleFromFile(file: string, defaultTitle?: string): string {
    const code = readFileSync(file).split('\n');
    const title = code.find((line) => line.includes('// Title:'));
    return title?.split('// Title:')[1]?.trim() ?? defaultTitle;
}

function getCategoriesFromFile(file: string, defaultCategory?: string): string[] {
    const code = readFileSync(file).split('\n');
    const categoriesStr = code.find((line) => line.includes('// Categories:'));
    const categories = categoriesStr?.split('// Categories:')[1]?.trim()?.split(',') ?? [defaultCategory];
    if (defaultCategory) categories.push(defaultCategory);
    return [...new Set(categories.map((x) => firstLetterUpperCase(x.trim().toLocaleLowerCase())))];
}

function createLastUpdatedOnBlock() {
    return `### ${createEmphasisBlock('Last updated on:')} ${createEmphasisBlock(
        `${new Date().toLocaleDateString()} ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}`
    )}`;
}

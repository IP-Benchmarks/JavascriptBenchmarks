import {
    createCodeBlock,
    createEmphasisBlock,
    createLastUpdatedOnBlock,
    createList,
    createListItem,
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
        filePath: `${file.split('/').pop().replace('.ts', '.md')}`,
    }));
    const groupedDataByCategory: Record<string, typeof benchmarksData> = benchmarksData.reduce((acc, curr) => {
        curr.categories.forEach((category) => {
            if (!acc[category]) acc[category] = [];
            acc[category].push(curr);
        });
        return acc;
    }, {});

    const sortedCategories = Object.keys(groupedDataByCategory).sort();

    const generateBenchmarkList = (benchmarks: typeof benchmarksData, category: string) =>
        benchmarks.map(
            (benchmark) => `[${benchmark.title}](/docs/${category.toLocaleLowerCase()}/${benchmark.filePath})`
        );

    const createListOfBenchmarks = (withEmphasis = false) =>
        sortedCategories
            .map((categoryName) => {
                const category = categoryName.toLocaleLowerCase();
                const categoryItem = (withEmphasis = false) =>
                    withEmphasis
                        ? `## **[${createEmphasisBlock(categoryName)}](docs/${category}/SUMMARY.md)**`
                        : `[${categoryName}](docs/${category}/SUMMARY.md)`;

                const categorySummaryFile = `# ${createEmphasisBlock('Table of Contents')}
${createListItem(categoryItem(true), 1)}${createList(
                    generateBenchmarkList(groupedDataByCategory[categoryName], categoryName),
                    2
                )}

${createLastUpdatedOnBlock()}
`;
                writeFileSync(`/docs/${category}`, 'SUMMARY.md', categorySummaryFile);

                return `${createListItem(categoryItem(withEmphasis), 1)}${createList(
                    generateBenchmarkList(groupedDataByCategory[categoryName], categoryName),
                    2
                )}`;
            })
            .join('\n');

    const createContentsLink = (withEmphasis = false) =>
        withEmphasis ? `## **[${createEmphasisBlock('Contents')}](docs/SUMMARY.md)**` : `[Contents](docs/SUMMARY.md)`;

    const createSummaryFile = (withEmphasis = false) => `# ${createEmphasisBlock('Table of Contents')}
${createListItem(createContentsLink(withEmphasis), 1)}
${createListOfBenchmarks(withEmphasis)}

${createLastUpdatedOnBlock()}
`;
    writeFileSync('/', 'SUMMARY.md', createSummaryFile());
    writeFileSync('/docs', 'SUMMARY.md', createSummaryFile(true));
}

export function createBenchmarkDoc(benchmarks: IBenchmark[], benchmarkPath: string): void {
    const code = readFileSync(benchmarkPath);
    const benchmarkName = benchmarkPath.split('/').pop().replace('.ts', '');
    const outputFolderPath = `./docs`;
    const fixedPath = 'libs/benchmarks/src/lib/';
    const categories = getCategoriesFromFile(benchmarkPath, benchmarkPath.split(fixedPath).pop().split('/')[0]).map(
        (x) => firstLetterUpperCase(x)
    );
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
    categories.forEach((category) => {
        writeFileSync(`${outputFolderPath}/${category.toLocaleLowerCase()}`, outputFilePath, readme);
    });
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

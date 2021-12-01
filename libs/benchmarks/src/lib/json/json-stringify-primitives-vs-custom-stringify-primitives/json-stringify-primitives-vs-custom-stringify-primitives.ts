import { generateMixedPrimitivesArray, IBenchmark, runBenchmark } from '@javascript-benchmarks/shared';

export function test(): Array<IBenchmark> {
    const matrix = generateMixedPrimitivesArray();

    return [
        runBenchmark('JSON stringify - primitives', jsonStringify, matrix),
        runBenchmark('Custom stringify - primitives', stringifyPrimitives, matrix),
    ];
}

export function jsonStringify(value: unknown) {
    return JSON.stringify(value);
}

export function stringifyPrimitives(value: unknown): string {
    if (typeof value === 'string') {
        return `"${value}"`;
    }
    if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
        return `${value}`;
    }
}

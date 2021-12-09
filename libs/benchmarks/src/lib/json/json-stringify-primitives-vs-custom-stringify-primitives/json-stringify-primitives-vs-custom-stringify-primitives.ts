import { generateMixedPrimitivesArray, IBenchmark, runBenchmark } from '@javascript-benchmarks/shared';

export function test(): Array<IBenchmark> {
    return [
        runBenchmark('JSON stringify', jsonStringify, () => generateMixedPrimitivesArray(1000)),
        runBenchmark('Custom stringify for primitives', stringifyPrimitives, () => generateMixedPrimitivesArray(1000)),
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

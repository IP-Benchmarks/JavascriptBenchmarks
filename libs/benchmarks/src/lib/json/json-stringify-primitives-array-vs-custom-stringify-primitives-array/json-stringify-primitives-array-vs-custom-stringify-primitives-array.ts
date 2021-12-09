import { generateMixedPrimitivesArray, generateSamples, IBenchmark, runBenchmark } from '@javascript-benchmarks/shared';

export function test(): Array<IBenchmark> {
    return [
        runBenchmark('JSON stringify', jsonStringify, () =>
            generateSamples(100, () => generateMixedPrimitivesArray(1000, true))
        ),
        runBenchmark('Custom stringify for array of primitives', stringifyPrimitivesArray, () =>
            generateSamples(100, () => generateMixedPrimitivesArray(1000, true))
        ),
    ];
}

export function jsonStringify(arr: unknown[]) {
    return JSON.stringify(arr);
}

export function stringifyPrimitivesArray(arr: unknown[]): string {
    return `[${arr.map(stringifyPrimitives).join(',')}]`;
}

/** In an array the undefined value is stringified as null */
function stringifyPrimitives(value: unknown): string {
    if (typeof value === 'string') {
        return `"${value}"`;
    }
    if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
        return `${value}`;
    }
    if (value === undefined) return 'null';
}

import { generateMixedPrimitivesArray, generateSamples, IBenchmark, runBenchmark } from '@javascript-benchmarks/shared';

export function test(): Array<IBenchmark> {
    const matrix = generateSamples(1000, () =>
        generateMixedPrimitivesArray(1000, true)
    );

    return [
        runBenchmark(
            'JSON stringify - primitives array',
            jsonStringify,
            matrix
        ),
        runBenchmark(
            'Custom stringify - primitives array',
            stringifyPrimitivesArray,
            matrix
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
    if (
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        value === null
    ) {
        return `${value}`;
    }
    if (value === undefined) return 'null';
}

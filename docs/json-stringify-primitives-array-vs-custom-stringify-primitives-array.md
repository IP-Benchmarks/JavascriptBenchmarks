# JSON stringify - primitives array vs Custom stringify - primitives array

## Benchmark Results

### Best Performance: _JSON stringify - primitives array_

```typescript
JSON stringify - primitives array: 5920.250 ops/s
```

```typescript
Custom stringify - primitives array: 4363.914 ops/s
```

## Benchmark Code

```typescript
import { generateMixedPrimitivesArray, generateSamples, IBenchmark, runBenchmark } from '@javascript-benchmarks/shared';

export function test(): Array<IBenchmark> {
    const matrix = generateSamples(1000, () => generateMixedPrimitivesArray(1000, true));

    return [
        runBenchmark('JSON stringify - primitives array', jsonStringify, matrix),
        runBenchmark('Custom stringify - primitives array', stringifyPrimitivesArray, matrix),
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
```

## Checkout Benchmark on Stackblitz

{% embed url="https://stackblitz.com/github/IP-Benchmarks/JavascriptBenchmarks/tree/main?file=libs/benchmarks/src/lib/json/json-stringify-primitives-array-vs-custom-stringify-primitives-array/json-stringify-primitives-array-vs-custom-stringify-primitives-array.ts" %}

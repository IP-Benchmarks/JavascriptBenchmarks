# JSON stringify vs Custom stringify for array of primitives

## Benchmark Results

### Best Performance: **JSON stringify**

#### **JSON stringify** is **_`1.21x`_** faster than **Custom stringify for array of primitives**

```typescript
JSON stringify: 15843.772 ops/s (100 runs over 100 unique samples each)
```

```typescript
Custom stringify for array of primitives: 13137.706 ops/s (100 runs over 100 unique samples each)
```

## Code

```typescript
import { generateMixedPrimitivesArray, generateSamples, IBenchmark, runBenchmark } from '@javascript-benchmarks/shared';

// Title: JSON stringify vs Custom stringify for array of primitives
// Categories: JSON, Object
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
```

## Checkout the code on Stackblitz

{% embed url="https://stackblitz.com/github/IP-Benchmarks/JavascriptBenchmarks/tree/main?file=libs/benchmarks/src/lib/json/json-stringify-primitives-array-vs-custom-stringify-primitives-array/json-stringify-primitives-array-vs-custom-stringify-primitives-array.ts" %}

#### `Last updated on: 2/5/2024 0:53:51`

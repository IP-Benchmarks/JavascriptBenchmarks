
# JSON stringify - primitives vs Custom stringify - primitives
## Benchmark Results
### Best Performance: *Custom stringify - primitives*
```typescript
Custom stringify - primitives: 4327674.181 ops/s
```

```typescript
JSON stringify - primitives: 2402616.545 ops/s
```

## Benchmark Code
```typescript
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

```

## Checkout Benchmark on Stackblitz
{% embed url="https://stackblitz.com/github/IP-Benchmarks/JavascriptBenchmarks/tree/main?file=libs/benchmarks/src/lib/json/json-stringify-primitives-vs-custom-stringify-primitives/json-stringify-primitives-vs-custom-stringify-primitives.ts" %} 

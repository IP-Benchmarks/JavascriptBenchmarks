
# JSON stringify vs Custom stringify for primitives
## Benchmark Results
### Best Performance: **Custom stringify for primitives**
#### **Custom stringify for primitives** is ***`1.66`x*** faster than **JSON stringify**
```typescript
Custom stringify for primitives: 3162116.358 ops/s (100 runs over 1000 unique samples each)
```

```typescript
JSON stringify: 1908214.925 ops/s (100 runs over 1000 unique samples each)
```

## Code
```typescript
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

```

## Checkout the code on Stackblitz
{% embed url="https://stackblitz.com/github/IP-Benchmarks/JavascriptBenchmarks/tree/main?file=libs/benchmarks/src/lib/json/json-stringify-primitives-vs-custom-stringify-primitives/json-stringify-primitives-vs-custom-stringify-primitives.ts" %} 

### `Last updated on:` `12/10/2021`

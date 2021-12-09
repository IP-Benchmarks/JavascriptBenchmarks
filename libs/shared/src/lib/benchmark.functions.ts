import { performance } from 'perf_hooks';

export interface IBenchmark {
    /** Human readable benchmark name */
    name: string;

    /** Average time in milliseconds */
    averageTime: number;

    /** Operations per second */
    opsPerSec: number;

    /** Samples */
    samples: string;
    functionBody: string;
    functionName: string;
}
export function runBenchmark(
    name: string,
    benchmarkFunction: (...args: unknown[]) => unknown,
    sampleGenerator: () => unknown[],
    runs = 100
): IBenchmark {
    const times: number[] = [];
    for (let i = 0; i < runs; i++) {
        sampleGenerator().forEach((sample) => {
            times.push(measureTimeMs(() => benchmarkFunction(sample)));
        });
    }
    const averageTimeMs = times.reduce((acc, curr) => acc + curr, 0) / times.length;
    return {
        name,
        averageTime: averageTimeMs,
        opsPerSec: convertToOpsPerSecond(averageTimeMs),
        functionBody: benchmarkFunction.toString(),
        functionName: benchmarkFunction.name,
        samples: `${runs} runs over ${times.length / runs} unique samples each`,
    };
}

export function convertToOpsPerSecond(timeMs: number): number {
    return 1000 / timeMs;
}
export function measureTimeMs(callback: () => unknown) {
    const time = performance.now();
    callback();
    return performance.now() - time;
}

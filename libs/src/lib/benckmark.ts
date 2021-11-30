import { performance } from 'perf_hooks';

export function measureTime(callback: () => void) {
  const time = performance.now();
  callback();
  return performance.now() - time;
}

export function camelCaseToSentence(camelCase: string) {
  return camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase())
    .trim();
}

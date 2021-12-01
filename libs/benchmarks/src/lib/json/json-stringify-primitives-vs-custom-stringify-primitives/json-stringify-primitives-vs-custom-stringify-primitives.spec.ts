import { jsonStringify, stringifyPrimitives } from './json-stringify-primitives-vs-custom-stringify-primitives';

describe('json-stringify-primitives-array-vs-custom-stringify-primitives-array.spec', () => {
    test('JSON.stringify() performance compared to a Custom Stringify for entire the entire Array of primitive values', () => {
        const primitivesArray = [1, '1', true, null, undefined];

        primitivesArray.forEach((primitive, index) => {
            expect(jsonStringify(primitive)).toBe(
                JSON.stringify(primitivesArray[index])
            );
            expect(stringifyPrimitives(primitive)).toBe(
                JSON.stringify(primitivesArray[index])
            );
        });
    });
});

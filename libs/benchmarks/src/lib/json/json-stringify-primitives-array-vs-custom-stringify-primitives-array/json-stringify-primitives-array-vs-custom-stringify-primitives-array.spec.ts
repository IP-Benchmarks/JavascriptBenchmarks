import {
    jsonStringify,
    stringifyPrimitivesArray,
} from './json-stringify-primitives-array-vs-custom-stringify-primitives-array';

describe('json-stringify-primitives-array-vs-custom-stringify-primitives-array.spec', () => {
    test('JSON.stringify() performance compared to a Custom Stringify for entire the entire Array of primitive values', () => {
        const primitivesArray = [1, '1', true, null, undefined];
        const output = '[1,"1",true,null,null]';

        expect(stringifyPrimitivesArray(primitivesArray)).toBe(output);
        expect(jsonStringify(primitivesArray)).toBe(output);
    });
});

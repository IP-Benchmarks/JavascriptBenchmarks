export function generateSamples<T>(size = 10000, fillInCallback: () => T): T[] {
    return Array(size)
        .fill(0)
        .map(() => fillInCallback());
}

export function generateNullArr(size = 10000) {
    return Array(size)
        .fill(0)
        .map(() => null);
}

export function generateUndefinedArr(size = 10000) {
    return Array(size)
        .fill(0)
        .map(() => undefined);
}

export function generateNumberArr(size = 10000) {
    return Array(size)
        .fill(0)
        .map(() => Math.floor(Math.random() * 12345678901412341));
}

export function generateBooleanArr(size = 10000) {
    return Array(size)
        .fill(0)
        .map(() => Math.floor(Math.random() * 12345678901412341) % 2 === 0);
}

export function generateNullUndefinedArr(size = 10000) {
    return Array(size)
        .fill(0)
        .map(() => (Math.floor(Math.random() * 12345678901412341) % 2 === 0 ? null : undefined));
}

export function generateStringArr(size = 10000) {
    const alphabet = [
        'a',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        ' ',
    ];
    return Array(size)
        .fill(0)
        .map((_, i) => alphabet[(i * Math.random() * 12345678901412341) % alphabet.length]);
}

export function generateMixedPrimitivesArray(size = 10000, withNullAndUndefined = false) {
    const methodsCalled = withNullAndUndefined ? 6 : 4;
    const sizePerMethod = Math.floor(size / methodsCalled);
    return shuffleArray([
        ...generateStringArr(sizePerMethod),
        ...generateNumberArr(sizePerMethod),
        ...generateBooleanArr(sizePerMethod),
        ...generateNullUndefinedArr(sizePerMethod),
        ...(withNullAndUndefined ? generateNullArr(sizePerMethod) : []),
        ...(withNullAndUndefined ? generateUndefinedArr(sizePerMethod) : []),
    ]);
}

function shuffleArray(array: unknown[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

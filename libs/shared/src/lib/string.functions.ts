export function camelCaseToSentence(camelCase: string) {
    return camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim();
}

export function dashToCamelCase(str: string) {
    return str.replace(/-([a-z])/g, (foundStr) => foundStr[1].toUpperCase());
}

export function dashToSentence(str: string) {
    return camelCaseToSentence(dashToCamelCase(str));
}

export function firstLetterUpperCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

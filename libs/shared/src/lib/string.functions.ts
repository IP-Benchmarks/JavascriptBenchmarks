export function camelCaseToSentence(camelCase: string) {
    return camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim();
}

export function dashToCamelCase(str: string) {
    return str.replace(/-([a-z])/g, (foundStr) => foundStr[1].toUpperCase());
}

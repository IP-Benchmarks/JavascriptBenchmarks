export function createCodeBlock(str: string, codeType = 'typescript'): string {
    return `\`\`\`${codeType}
${str}
\`\`\``;
}

export function createEmphasisBlock(str: string): string {
    return `\`${str}\``;
}

export function createList(arr: string[], spaces = 1): string {
    return arr.map((x) => createListItem(x, spaces)).join('\n');
}

export function createListItem(str: string, spaces = 1): string {
    return `${' '.repeat(spaces * 2)}- ${str}\n`;
}

export function createLastUpdatedOnBlock() {
    const str = `Last updated on: ${new Date().toLocaleDateString()} ${new Date().getUTCHours()}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}`;
    return `#### ${createEmphasisBlock(str)}`;
}

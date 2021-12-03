import * as fs from 'fs';

export function writeFileSync(folderPath: string, fileName: string, content: string) {
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFileSync(`${folderPath}/${fileName}`, content, 'utf8');
}

export function readFileSync(path: string) {
    return fs.readFileSync(path, 'utf8');
}

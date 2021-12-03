import { exec } from 'child_process';
import { promisify } from 'util';

export async function getAllFiles(folderPath: string, extension: string, exclude?: string): Promise<string[]> {
    const files = (await promisifiedExec('git ls-files')).split('\n');
    return filterFiles(files, folderPath, extension, exclude);
}
export async function getFilesChanged(folderPath: string, extension: string, exclude?: string): Promise<string[]> {
    const files = (await promisifiedExec('git diff --name-only HEAD HEAD~1')).split('\n');
    return filterFiles(files, folderPath, extension, exclude);
}

async function promisifiedExec(command: string, options?: any): Promise<string> {
    return await promisify(exec)(command, options).then((result: any) => result.stdout ?? '');
}

function filterFiles(files: string[], folderPath: string, extension: string, exclude?: string): string[] {
    return files.filter(
        (x: string) => x.startsWith(folderPath) && x.endsWith(extension) && (exclude ? !x.includes(exclude) : true)
    );
}

export function commitChangesInPipeline() {
    exec(
        'git config --local user.email "github-actions@noreply.com" && git config --local user.name "github-actions" && git commit -m "Updated docs" -a'
    );
}

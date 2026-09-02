import { existsSync, readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

export type Config = {
    from: string;
    to: string;
    order?: string;
    package: string;
};

const forward = (p: string): string => p.split(sep).join('/');

export const config = (at: string): Config => {
    const folder = resolve(at);
    const file = resolve(folder, 'libconfig.json');
    const said = existsSync(file) ? JSON.parse(readFileSync(file, 'utf-8')) : {};
    const from = forward(said.from ? resolve(folder, said.from) : folder);
    return {
        from,
        to: said.to ? forward(resolve(folder, said.to)) : `${from}/..public`,
        ...(said.order ? { order: forward(resolve(folder, said.order)) } : {}),
        package: said.package ?? '@dna-platform/lib',
    };
};

const alone = !!process.argv[1] && import.meta.url.toLowerCase() === pathToFileURL(process.argv[1]).href.toLowerCase();

if (alone) {
    const at = process.argv[2];
    if (!at) {
        console.error('config.ts <corpus>');
        process.exit(1);
    }
    console.log(JSON.stringify(config(at), null, 4));
}

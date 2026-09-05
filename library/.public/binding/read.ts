import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { walk } from './walk.ts';
import type { Library } from './library.ts';

const declaration = /^export\s+const\s+([A-Za-z_$][\w$]*)\s*=/m;

// A cover declares the book's title, author and subject. The compiler reads them
// off the source so it can generate the card each name resolves to.
const worn = (source: string, kind: string): string =>
    new RegExp(`<${kind}>([^<]*)</${kind}>`).exec(source)?.[1].trim() ?? '';

export const read = (library: Library): Library => {
    const diagnostics = [...library.diagnostics];
    const entries = library.entries.map(entry => ({
        ...entry,
        files: entry.files.map(file => {
            const source = readFileSync(`${library.root}/${entry.path}/${file.name}`, 'utf-8');
            const declares = declaration.exec(source)?.[1] ?? '';
            if (!declares) diagnostics.push({ at: entry.path, says: `${file.name} exports nothing a book can compose` });
            if (file.role !== 'cover') return { ...file, declares };
            const cards = { title: worn(source, 'Title'), author: worn(source, 'Author'), subject: worn(source, 'Subject') };
            for (const [kind, said] of Object.entries(cards))
                if (!said) diagnostics.push({ at: entry.path, says: `a cover carries its ${kind}, and this one carries none` });
            return { ...file, declares, cards };
        }),
    }));
    return { ...library, entries, diagnostics };
};

const alone = !!process.argv[1] && import.meta.url.toLowerCase() === pathToFileURL(process.argv[1]).href.toLowerCase();

if (alone) {
    const at = process.argv[2];
    if (!at) {
        console.error('read.ts <corpus>');
        process.exit(1);
    }
    const library = read(walk(at));
    const files = library.entries.flatMap(e => e.files);
    console.log(`READ ${files.length} files · ${files.filter(f => !f.declares).length} exporting nothing`);
}

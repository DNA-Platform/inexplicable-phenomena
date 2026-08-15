import { join, relative, dirname, sep } from 'node:path';
import { Project, SyntaxKind } from 'ts-morph';
import type { Node } from 'ts-morph';
import type { Complaint, Entry, Library, Reference } from './library.ts';

// THE REFERENCES. One book names another by importing its cover under whatever
// alias reads well and writing that alias as a child — so the ALIAS is the
// display name and the IMPORT is the link, and one construct does both jobs.
//
//     import { Cover as Math } from '../.mathematics/.subject/.cover';
//     <Subject>{Math}</Subject>          both forms are read
//     <Subject><Math /></Subject>
//
// A cover's location is its book's location, so resolving the import to a file
// and dropping the filename gives the book that was named.

const forward = (p: string): string => p.split(sep).join('/');

const kinds = new Set(['Author', 'Subject', 'Canonical']);

// Files are added BY COMPUTED PATH. ts-morph's own glob does not match a
// dot-prefixed name and silently loads nothing at all.
const open = (paths: string[]): Project => {
    const project = new Project({
        compilerOptions: { jsx: 4, target: 99, module: 99, moduleResolution: 100, noEmit: true, allowJs: true },
        skipAddingFilesFromTsConfig: true,
    });
    for (const at of paths) project.addSourceFileAtPath(at);
    return project;
};

const holder = (node: Node): string => {
    const element = node.getFirstAncestorByKind(SyntaxKind.JsxElement);
    return element?.getOpeningElement().getTagNameNode().getText() ?? '';
};

const declared = (id: Node): string => {
    const symbol = id.getSymbol();
    const at = (symbol?.getAliasedSymbol?.() ?? symbol)?.getDeclarations?.()[0];
    return at?.getSourceFile?.().getFilePath() ?? '';
};

export const refer = (library: Library): Library => {
    const covers = library.entries.flatMap(entry =>
        entry.files.filter(file => file.role === 'cover').map(file => ({ entry, at: join(library.root, entry.path, file.name) })));
    if (!covers.length) return library;

    const project = open(covers.map(c => c.at));
    const complaints: Complaint[] = [...library.complaints];
    const entries: Entry[] = library.entries.map(e => ({ ...e, references: [] }));
    const byPath = new Map(entries.map(e => [e.path, e]));

    for (const cover of covers) {
        const source = project.getSourceFile(cover.at);
        if (!source) continue;
        const entry = byPath.get(cover.entry.path)!;

        const found: { as: string; id: Node }[] = [];
        for (const braced of source.getDescendantsOfKind(SyntaxKind.JsxExpression)) {
            const inner = braced.getExpression();
            if (inner?.getKind() === SyntaxKind.Identifier) found.push({ as: holder(braced), id: inner });
        }
        for (const element of source.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)) {
            found.push({ as: holder(element), id: element.getTagNameNode() });
        }

        for (const { as, id } of found) {
            if (!kinds.has(as)) continue;
            const display = id.getText();
            const file = declared(id);
            if (!file) {
                complaints.push({ at: entry.path, says: `the ${as.toLowerCase()} ${JSON.stringify(display)} names nothing that resolves` });
                continue;
            }
            const at = forward(relative(library.root, file));
            const book = forward(dirname(at));
            const reference: Reference = { as: as.toLowerCase(), display, at, book };
            entry.references.push(reference);
            if (!byPath.has(book)) {
                complaints.push({ at: entry.path, says: `the ${reference.as} ${JSON.stringify(display)} points outside the library, at ${at}` });
            }
        }
    }

    return { ...library, entries, complaints };
};

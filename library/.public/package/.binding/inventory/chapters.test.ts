import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { accountOfFiles } from './chapters';
import { accompanying, isChapter } from './filenames';

// WHAT ACCOMPANIES A CHAPTER — Sprint 89, Doug, 2026-09-28: "Any file that has the extension-free name of
// the chapter as its prefix. The rest of the name is its filename, skipping one character as a separator,
// so it might be .ts or version1.tsx… It is empty, identify it by its extension"; "just skip a character,
// let them use what they want, and we make the dot a convention and recommendation." The account reads a
// folder once and says what every file is; these promises hand it a folder and read the answer.
describe('the account of a book\'s files', () => {
    let folder: string;
    const files = [
        '.book.tsx', '.cover.tsx', '.synopsis.tsx', '.table.tsx',
        '5-the-plate.tsx', '5-the-plate.ts', '5-the-plate.version1.tsx', '5-the-plate-figures.tsx', '5-the-plate.png',
        '6-the-ledger.tsx', '6-the-ledger.tsx.tsx',
        '7-the-domain.tsx', '7-the-domain.id.tsx', '7-the-domain-id.tsx',
        'plate.tsx', '5-the-plate.bak', '5-the-plate.d.ts',
    ];

    beforeAll(() => {
        folder = mkdtempSync(join(tmpdir(), 'account-'));
        for (const file of files) writeFileSync(join(folder, file), '');
    });
    afterAll(() => { rmSync(folder, { recursive: true, force: true }); });

    it('tells a chapter from a numbered file that accompanies one, whatever character separates them', () => {
        const { chapters } = accountOfFiles(folder);
        expect(chapters).toEqual(['.cover.tsx', '.synopsis.tsx', '.table.tsx', '5-the-plate.tsx', '6-the-ledger.tsx', '7-the-domain.tsx']);
        expect(isChapter('5-the-plate-figures.tsx')).toBe(true);
    });

    it('gives each accompanying file its identifier and its type: empty for the name alone, the rest after one character otherwise', () => {
        const { resources } = accountOfFiles(folder);
        expect(resources.get('5-the-plate.tsx')).toEqual([
            { file: '5-the-plate-figures.tsx', identifier: 'figures', type: '.tsx' },
            { file: '5-the-plate.png', identifier: '', type: '.png' },
            { file: '5-the-plate.ts', identifier: '', type: '.ts' },
            { file: '5-the-plate.version1.tsx', identifier: 'version1', type: '.tsx' },
        ]);
        expect(resources.get('6-the-ledger.tsx')).toEqual([{ file: '6-the-ledger.tsx.tsx', identifier: 'tsx', type: '.tsx' }]);
        expect(accompanying('.cover.masthead.tsx', '.cover.tsx')).toEqual({ file: '.cover.masthead.tsx', identifier: 'masthead', type: '.tsx' });
    });

    it('refuses what accompanies nothing and what carries an extension no library knows, and excuses a declaration', () => {
        const { unaccounted } = accountOfFiles(folder);
        expect(unaccounted).toEqual(['5-the-plate.bak', 'plate.tsx']);
    });

    // Doug, 2026-09-28: "the compiler would error on chapter-name.id.tsx, chapter-name-id.tsx, because ids must be
    // unique per type."
    it('names two files that accompany one writing under one identifier and type, whatever separates them', () => {
        const { clashing } = accountOfFiles(folder);
        expect(clashing).toEqual([
            { file: '7-the-domain-id.tsx', identifier: 'id', type: '.tsx', writing: '7-the-domain.tsx' },
            { file: '7-the-domain.id.tsx', identifier: 'id', type: '.tsx', writing: '7-the-domain.tsx' },
        ]);
    });
});

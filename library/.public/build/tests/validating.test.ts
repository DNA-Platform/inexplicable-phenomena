import { describe, it, expect } from 'vitest';
import { join } from 'node:path';
import { walk } from '../walk.ts';
import { refer } from '../refer.ts';
import { resolve } from '../resolve.ts';
import { validate } from '../validate.ts';
import { root } from '../where.ts';

// VALIDATING is the one phase that must open the program, so its promises run
// against the emitted library rather than a synthetic one. What they promise is
// the PHASE — the counts, the levels, the wiring — not the rules, which are the
// framework's and are promised in the lib suite.

const workspace = root();
const corpus = join(workspace, 'library/.test-library');
const emitted = join(workspace, 'library/.public/app/src/library');

const checked = await validate(resolve(refer(walk(corpus, workspace))), emitted);

describe('every book in the emitted program is opened and asked', () => {
    it('and every one of them stands', () => {
        expect(checked.verdicts.filter(v => !v.stands)).toEqual([]);
        expect(checked.stood).toBe(checked.verdicts.length);
    });

    it('a verdict names the COVER FILE, because that is where a cover fault is fixed', () => {
        for (const verdict of checked.verdicts) expect(verdict.at).toMatch(/\.cover\.tsx$/);
    });
});

describe('validity is asked at EVERY level, which is the thing the old walk did not do', () => {
    it('reaches below paragraph — sentences, words and letters are not zero', () => {
        expect(checked.levels.sentences).toBeGreaterThan(0);
        expect(checked.levels.words).toBeGreaterThan(0);
        expect(checked.levels.letters).toBeGreaterThan(0);
    });

    it('and the levels descend, because each is composed of the next', () => {
        const { chapters, sections, paragraphs, sentences, words, letters } = checked.levels;
        expect(sections).toBeGreaterThanOrEqual(chapters);
        expect(paragraphs).toBeGreaterThanOrEqual(sections);
        expect(words).toBeGreaterThan(sentences);
        expect(letters).toBeGreaterThan(words);
    });

    it('every book constructs chapters — a count of zero is a walk that asked nothing', () => {
        for (const verdict of checked.verdicts) expect(verdict.levels.chapters).toBeGreaterThan(0);
    });
});

describe('THE CARDS ARE FILLED BEFORE ANYTHING IS ASKED, and that is what makes a link followable', () => {
    it('so the author rule has something true to be true of', async () => {
        const team = checked.verdicts.find(v => v.route === '/the-team');
        expect(team).toBeDefined();
        expect(team?.stands).toBe(true);
    });

    it('and a book whose links point nowhere would be judged on nothing rather than crash', async () => {
        // Pointed at a folder holding no program: the import fails, and the
        // phase says so instead of taking the process down.
        await expect(validate({ root: corpus, books: [], complaints: [] }, join(workspace, 'nowhere')))
            .rejects.toBeTruthy();
    });
});

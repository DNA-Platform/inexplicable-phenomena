import { describe, expect, it } from 'vitest';
import { annotating } from './annotations';
import { source } from './source';

// WHAT THE SOURCE PROMISES ABOUT WHERE WRITING STANDS IN A FILE — the parser locates, and only what
// it locates is ever read for the notation. Sprint 90, on the finding that a scanner over raw source
// catalogued a comment as a title while the transform, which parsed, never saw it.
const file = 'C:/a-library/a-book/1-a-chapter.tsx';

const chapter = [
    `// [[ A Ghost Title ]] would have named this chapter before Sprint 90`,
    `import x from './[[ A Path ]]';`,
    `export default () => (`,
    `    <p title="[[ In A Prop ]]">`,
    `        {'$[[ In A String ]]'} [[[ In Prose ]]] and`,
    `        $[[ A Reference ]]`,
    `    </p>`,
    `);`,
].join('\n');

describe('the source of a file', () => {
    const read = source(file, chapter);

    it('locates prose and strings, skips the whitespace between tags, and never enters an import', () => {
        expect(read.runs.map(run => run.kind)).toEqual(['string', 'string', 'prose']);
        expect(read.runs.every(run => run.text.trim() !== '')).toBe(true);
        expect(read.runs.some(run => run.text.includes('A Path'))).toBe(false);
    });

    it('slices each run out of the file exactly, by its positions', () => {
        for (const run of read.runs) expect(chapter.slice(run.from, run.to)).toBe(run.text);
        expect(read.runs[1].text).toBe('$[[ In A String ]]');
    });

    it('keeps prose raw, line breaks and indentation as the writer left them, so its offsets are the file\'s', () => {
        expect(read.runs[2].text).toContain('and\n        $[[ A Reference ]]');
    });

    it('answers the line of any offset, one-based', () => {
        expect(read.line(0)).toBe(1);
        expect(read.line(chapter.indexOf('$[[ A Reference ]]'))).toBe(6);
        expect(read.line(chapter.indexOf(');'))).toBe(8);
    });

    it('answers lines the same in a file with Windows line endings', () => {
        const text = chapter.replace(/\n/gu, '\r\n');
        const crlf = source(file, text);
        expect(crlf.runs.map(run => run.kind)).toEqual(['string', 'string', 'prose']);
        expect(crlf.line(text.indexOf('$[[ A Reference ]]'))).toBe(6);
    });
});

describe('the scanner over a source', () => {
    const read = annotating(source(file, chapter));

    it('never reads a comment or an import\'s path, so neither is a form nor a refusal', () => {
        expect(read.annotations.map(said => said.said)).toEqual(['In A Prop', 'In Prose']);
        expect(read.refused).toEqual([]);
    });

    it('reads a string as written and prose as JSX reads it', () => {
        expect(read.references.map(said => said.said)).toEqual(['In A String', 'A Reference']);
        expect(read.annotations.find(said => said.form.is === 'mention')?.said).toBe('In Prose');
    });

    it('places every form on the line a person counts', () => {
        expect(read.annotations.map(said => said.line)).toEqual([4, 5]);
        expect(read.references.map(said => said.line)).toEqual([5, 6]);
    });
});

// A LITERAL IS READ IN PROSE, BY A NAME OF THE CHAPTER'S OWN, AND EVERY OTHER SPELLING IS REFUSED
// WITH ITS REASON. Sprint 92.
describe('the scanner over literals', () => {
    const text = [
        `export default () => (`,
        `    <p title="![[ .svg ]]">`,
        `        ![[ this ]] and ![[ code.tsx ]] and {'![[ this ]]'}`,
        `        ![ one ]] and ![[ words ]]( code.tsx ) and ![[ ./other.code.tsx ]] and $[ One Bracket ]`,
        `    </p>`,
        `);`,
    ].join('\n');
    const read = annotating(source(file, text));

    it('yields a literal for the chapter\'s own file and for a file beside it, with where it stands', () => {
        expect(read.literals.map(one => one.name)).toEqual([{ of: 'this' }, { of: 'file', identifier: 'code', type: '.tsx' }]);
        expect(read.literals.map(one => text.slice(one.at, one.to))).toEqual(['![[ this ]]', '![[ code.tsx ]]']);
        expect(read.literals.map(one => one.line)).toEqual([3, 3]);
    });

    it('refuses a literal in a string, one with a words half, one reaching across chapters, and one with the wrong brackets — each saying why', () => {
        expect(read.refused.map(one => one.said)).toEqual(['.svg', 'this', 'one', 'code.tsx', './other.code.tsx', 'One Bracket']);
        expect(read.refused.map(one => one.why ?? '')).toEqual([
            expect.stringContaining('never inside a string'),
            expect.stringContaining('never inside a string'),
            expect.stringContaining('two brackets'),
            expect.stringContaining('one slot'),
            expect.stringContaining('never a path'),
            expect.stringContaining('$[[ X ]]'),
        ]);
        expect(read.references).toEqual([]);
    });
});

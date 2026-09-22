import { describe, it, expect } from 'vitest';
import { notation } from '@dna-platform/public';

// THE NOTATION READS THE FIVE AND REFUSES THE REST. Prefix says what is allocated, postfix says
// what comes back; the reading takes the mark out of the prose and records where it stood.

describe('the notation reads the five shapes', () => {
    it('a mention allocates here and returns nothing', () => {
        const read = notation.read('Turing was *[ great ] at it');
        expect(read.text).toBe('Turing was great at it');
        expect(read.marks).toEqual([{ shape: 'mention', quote: 'great', key: 'great', start: 11, end: 16 }]);
        expect(read.faults).toEqual([]);
    });

    it('a title allocates a stand-in for this writing', () => {
        const read = notation.read('*$[ Doug’s Library ]*');
        expect(read.text).toBe('Doug’s Library');
        expect(read.marks[0].shape).toBe('title');
        expect(read.faults).toEqual([]);
    });

    it('an author allocates a stand-in for the book', () => {
        const read = notation.read('**$[ Doug ]*');
        expect(read.text).toBe('Doug');
        expect(read.marks[0].shape).toBe('author');
    });

    it('a subject allocates a stand-in for the collection', () => {
        const read = notation.read('**$[ Doug’s Library ]**');
        expect(read.text).toBe('Doug’s Library');
        expect(read.marks[0].shape).toBe('subject');
    });

    it('a citation allocates nothing and stands in', () => {
        const read = notation.read('as shown $[ Aaronson ]*');
        expect(read.text).toBe('as shown Aaronson');
        expect(read.marks[0].shape).toBe('citation');
    });
});

describe('a key is written after the bracket, and the copy is the key when none is', () => {
    it('takes the key and keeps the quote in the prose', () => {
        const read = notation.read('**$[ Doug ](My Library Log)*');
        expect(read.text).toBe('Doug');
        expect(read.marks[0]).toEqual({ shape: 'author', quote: 'Doug', key: 'My Library Log', start: 0, end: 4 });
    });

    it('where no key is written the copy is the key', () => {
        const read = notation.read('*$[ The Title ]*');
        expect(read.marks[0].key).toBe('The Title');
    });
});

describe('the reading records where a mark stood, in the prose a reader meets', () => {
    it('two marks in one line carry their own places', () => {
        const read = notation.read('*[ one ] and *[ two ]');
        expect(read.text).toBe('one and two');
        expect(read.marks.map(one => [one.quote, one.start, one.end])).toEqual([['one', 0, 3], ['two', 8, 11]]);
        expect(read.text.slice(read.marks[1].start, read.marks[1].end)).toBe('two');
    });

    it('copy with no bracket is answered unchanged and allocates nothing', () => {
        const read = notation.read('plain prose with no reference in it');
        expect(read.text).toBe('plain prose with no reference in it');
        expect(read.marks).toEqual([]);
        expect(notation.carries('plain prose')).toBe(false);
    });
});

describe('and it refuses everything that is not one of the five', () => {
    it('THE OLD PLAIN FORM IS REFUSED — the notation replaced it', () => {
        const read = notation.read('[Author: Doug](My Library Log)');
        expect(read.faults).toHaveLength(1);
        expect(read.faults[0].written).toBe('[Author: Doug](My Library Log)');
        expect(read.faults[0].says).toContain('the plain form was replaced by the notation');
        expect(read.marks).toEqual([]);
    });

    it('a prefix with no postfix that is not the mention is refused', () => {
        expect(notation.read('*$[ X ]').faults).toHaveLength(1);
        expect(notation.read('$[ X ]').faults).toHaveLength(1);
        expect(notation.read('**$[ X ]').faults).toHaveLength(1);
    });

    it('a postfix the prefix does not pair with is refused', () => {
        expect(notation.read('*[ X ]*').faults).toHaveLength(1);
        expect(notation.read('*$[ X ]**').faults).toHaveLength(1);
        expect(notation.read('$[ X ]**').faults).toHaveLength(1);
    });

    it('a refusal names what was written and teaches the five', () => {
        const [fault] = notation.read('*[ X ]*').faults;
        expect(fault.says).toContain('*[ … ]*');
        expect(fault.says).toContain('a mention');
        expect(fault.says).toContain('a citation');
    });

    it('a refused group is left in the prose rather than silently dropped', () => {
        const read = notation.read('before [x](y) after');
        expect(read.text).toBe('before [x](y) after');
    });
});

describe('the longest prefix wins, so a longer form is never read as a shorter one', () => {
    it('an author is not a mention followed by a dollar', () => {
        expect(notation.read('**$[ X ]*').marks[0].shape).toBe('author');
    });

    it('a subject is not an author with a stray star', () => {
        expect(notation.read('**$[ X ]**').marks[0].shape).toBe('subject');
    });
});

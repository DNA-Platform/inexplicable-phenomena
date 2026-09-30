import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { $ } from '@dna-platform/chemistry';
import { $Writing, $Sentence, Sentence, $Date, Date as date } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;
const drawn = async (writing: $Writing): Promise<HTMLElement> => {
    const Drawn = $(writing);
    let container: HTMLElement | undefined;
    await act(async () => { container = render(<Drawn />).container; });
    await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
    return container!;
};
const Date = date;

// Doug, 2026-09-30: "We will likely want a Date as a type of word, so add that too." A Word reading the compiler's form
// through the one-line parse, [said words](machine date), drawn as its said words in a time element carrying the
// machine date; the mark pd-date by the pattern he chose.
describe('a date is a word whose said words stand for a day the machine can read', () => {
    it('reads the form: its name the said words, its date the machine date, drawn in a time element carrying it', async () => {
        const day = built<$Date>(<Date>[the last day of September](2026-09-30)</Date>);
        expect(day.level).toBe(2);
        expect(day.name).toBe('the last day of September');
        expect(day.date).toBe('2026-09-30');
        expect([...day.classes]).toEqual(expect.arrayContaining(['pd-word', 'pd-date']));
        expect(day.specify()).toEqual([]);
        const page = await drawn(day);
        const time = page.querySelector('time.pd-date')!;
        expect(time).not.toBeNull();
        expect(time.getAttribute('datetime')).toBe('2026-09-30');
        expect(time.textContent).toContain('the last day of September');
        expect(time.textContent).not.toContain('](');
    });

    it('without the form, draws its words in a time element carrying no date', async () => {
        const day = built<$Date>(<Date>some day</Date>);
        expect(day.name).toBe('some day');
        expect(day.date).toBeUndefined();
        const page = await drawn(day);
        const time = page.querySelector('time.pd-date')!;
        expect(time.getAttribute('datetime')).toBeNull();
        expect([...time.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join('')).toBe('some day');
    });

    it('stands in a sentence as a word does, its own element the time', async () => {
        const sentence = built<$Sentence>(<Sentence>Begun on <Date>[a Tuesday](2026-09-29)</Date>, as it says.</Sentence>);
        expect(sentence.parts).toHaveLength(1);
        expect(sentence.parts[0]).toBeInstanceOf($Date);
        const page = await drawn(sentence);
        expect(page.querySelector('.pd-sentence > time.pd-date')).not.toBeNull();
    });

    it('demands a day the machine can read, and says so when the form names none', () => {
        expect(built<$Date>(<Date>[yesterday](not-a-day)</Date>).specify()).toContain('Date: a date names a day the machine can read, and this one names none');
        expect(built<$Date>(<Date>[the first of October](2026-10-01)</Date>).specify()).toEqual([]);
        expect(built<$Date>(<Date>undated</Date>).specify()).toEqual([]);
    });
});

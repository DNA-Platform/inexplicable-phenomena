import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Writing, Type, Writing, TypeOfParagraph, TypeOfList, TypeOfSection, TypeOfChapter } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

describe('a type carried by writing is asked what it is, and answers once', () => {
    it('A BARE TYPE ANSWERS ITS OWN NAME AND DOES NOT WALK PAST ITSELF', () => {
        const held = built<$Writing>(<Writing><Type />Born 23 June 1912</Writing>);
        expect(() => held.kind).not.toThrow();
    });

    it('AND A SPECIALISED TYPE IS CHOSEN OVER THE ONE IT SPECIALISES', () => {
        const held = built<$Writing>(<Writing><TypeOfParagraph /><TypeOfList />{'a\nb'}</Writing>);
        expect(held.kind.name).toBe('List');
    });

    it('and one carried type is still the one carried', () => {
        expect(built<$Writing>(<Writing><TypeOfSection />a</Writing>).kind.name).toBe('Section');
    });

    it('AND TWO KINDS THAT SPECIALISE NEITHER ARE STILL REFUSED', () => {
        const held = built<$Writing>(<Writing><TypeOfSection /><TypeOfChapter />a</Writing>);
        expect(() => held.kind).toThrow(/one kind of writing/u);
    });
});

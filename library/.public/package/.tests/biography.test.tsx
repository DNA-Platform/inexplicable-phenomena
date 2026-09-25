import { describe, it, expect } from 'vitest';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Chapter, Title, Cover, Author, Subject, About, $Biography, Biography, $Autobiography, Autobiography } from '@dna-platform/public';

const built = <T,>(element: React.ReactNode): T => $(element as never) as T;

describe('a biography marks its cover pa-biography, and an autobiography, a kind of biography, pa-autobiography too', () => {
    it('a biography adds pa-biography, and takes it back when it goes', () => {
        const chapter = built<$Chapter>(
            <Chapter>
                <Cover />
                <Biography />
                <Title>[A Persona](/a-persona/)</Title>
                <Author>[The Log](/the-log/)</Author>
                <Subject>[The Log](/the-log/)</Subject>
            </Chapter>
        );
        expect([...chapter.classes]).toContain('pa-biography');
        expect([...chapter.classes]).not.toContain('pa-autobiography');
        chapter.annotations.remove(chapter, chapter.annotations.find($Biography)[0]);
        chapter.annotations.define();
        expect([...chapter.classes]).not.toContain('pa-biography');
    });

    it('an autobiography is a biography, and adds both', () => {
        const chapter = built<$Chapter>(
            <Chapter>
                <Cover />
                <Autobiography />
                <Title>[The Log](/the-log/)</Title>
                <Author>[The Log](/the-log/)</Author>
                <Subject>[The Library](/the-library/)</Subject>
                <About>[The Log](/the-log/)</About>
            </Chapter>
        );
        expect(chapter.annotations.find($Biography)[0]).toBeInstanceOf($Autobiography);
        expect([...chapter.classes]).toContain('pa-biography');
        expect([...chapter.classes]).toContain('pa-autobiography');
    });

    it('an autobiography is by what it is about, which its title and about name — it needs no name of its own', () => {
        const log = built<$Chapter>(
            <Chapter>
                <Cover />
                <Autobiography />
                <Title>[The Log](/the-log/)</Title>
                <Author>[The Log](/the-log/)</Author>
                <Subject>[The Library](/the-library/)</Subject>
                <About>[The Log](/the-log/)</About>
            </Chapter>
        );
        expect(log.specify()).toEqual([]);
        const persona = built<$Chapter>(
            <Chapter>
                <Cover />
                <Autobiography />
                <Title>[A Persona](/a-persona/)</Title>
                <Author>[The Log](/the-log/)</Author>
                <Subject>[The Log](/the-log/)</Subject>
                <About>[A Persona](/a-persona/)</About>
            </Chapter>
        );
        expect(persona.specify()).toContain('Chapter: an autobiography is by what it is about, and this one is not');
        const unsaid = built<$Chapter>(
            <Chapter>
                <Cover />
                <Autobiography />
                <Title>[The Log](/the-log/)</Title>
                <Author>[The Log](/the-log/)</Author>
                <Subject>[The Library](/the-library/)</Subject>
            </Chapter>
        );
        expect(unsaid.specify()).toContain('Chapter: an autobiography is by what it is about, and this one is not');
    });
});

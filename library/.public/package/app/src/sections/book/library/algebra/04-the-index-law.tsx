import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $TheIndexLaw extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Index Law: Numbers That Move</Title>
                    {'\n\nThe composition assigns the index. The cover is chapter zero, the rest count from one, and no author has to bookkeep: assembly numbers the parts the way a shelf numbers its spines — by where they stand.'}
                    {'\n\nThe law reaches every level of writing. A book indexes its chapters, a chapter its sections, a section its paragraphs, a sentence its words. Ask any piece of writing where it stands and it answers with a number it did not choose.'}
                    {'\n\nWatch the numbers stand still while meaning moves: the cover at $0$, chapters at $1, 2, 3, \\dots$ — and between any two neighbours, room. The line of indexes is **dense** where the shelf is not, and position is meaning, as [coordinates](#3) argued a page ago.'}
                </Section>
                <Section>
                    <Title>Decimals: The Latecomer’s Door</Title>
                    {'\n\nA decimal slides a latecomer between neighbours without renaming a thing. Chapter one-point-five is a real address, and the library has always known this trick: the new book takes a shelf mark between two old ones, and nothing else moves.'}
                    {'\n\nAn authored index survives assembly. Number a section nine by hand and the binding respects the hand; the law fills only what the author left unsaid.'}
                    {'\n\nThe decimal is not a compromise; it is the whole philosophy. An address that survives insertion is an address you can **cite**^[And citation is the reference system’s reason to exist — an address that dies when a chapter is added was never an address, only a position.] — the difference between naming a place and counting doors.'}
                </Section>
                <Section>
                    <Title>Special at Zero</Title>
                    {'\n\nOne position is law rather than habit: the cover stands at zero, before the counting, the way a front door stands before the hallway. Validity holds that door — a book without its cover at position zero is rejected at the binding, in one sentence.'}
                    {'\n\n> Zero is the only index with a name.'}
                    {'\n\nEverything after zero is found by walking. The cover is found by *being the book*: its summary is the canonical, its title is the book’s own, and the running head above this page is its standing reference.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nAssembly numbers the parts; decimals insert between them.'}
                </Section>
            </>
        );
    }
}

export const TheIndexLaw = $($TheIndexLaw);

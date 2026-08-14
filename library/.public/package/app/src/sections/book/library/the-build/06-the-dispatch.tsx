import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Handoffs, Order, type Handoff, type Band } from './figures';

const seams: Handoff[] = [
    {
        from: 'writing', to: 'reading', ready: true,
        agreement: 'A folder tree obeying the convention, and an order held beside it rather than inside the filenames. Nothing else: no manifest the reader did not read, no naming beyond the dots.',
        fixture: 'a corpus, and the broken trees the reader writes for itself',
    },
    {
        from: 'reading', to: 'carrying', ready: true,
        agreement: 'A description of the library: every entry with its role, every folder with the one that speaks for it, and every file in its order. The description is the only thing later stages look at.',
        fixture: 'a description typed by hand',
    },
    {
        from: 'carrying', to: 'assembling', ready: true,
        agreement: 'A mirror: the same source at the same relative places, so a chapter still finds its own resource and the framework still resolves. Nothing semantic altered.',
        fixture: 'the demo, whose folders already are a mirror',
    },
    {
        from: 'assembling', to: 'judging', ready: true,
        agreement: 'Book modules — chapters composed in order, contents in place, and the links position implies written into the copy. The generated module is the only door into the dotted files, because no glob will ever find them.',
        fixture: 'the demo, which already is a set of book modules',
    },
    {
        from: 'judging', to: 'cataloguing', ready: true,
        agreement: 'Live books, constructed and standing. Judging invents no rules: the model already refuses six malformations, so judging is construction, watched.',
        fixture: 'the demo, whose books construct in a suite today',
    },
    {
        from: 'cataloguing', to: 'showing', ready: true,
        agreement: 'A catalogue of cards keyed by path, carrying title, synopsis, chapter titles, and references to author, subject and canonical — and importing no book at all.',
        fixture: 'the demo, whose card file is a hand-made catalogue',
    },
];


const bands: Band[] = [
    {
        when: 'first, alone',
        teams: [{ letter: 'A', builds: 'the description — folders become an account of what is there', against: 'trees it writes in order to break them' }],
    },
    {
        when: 'then, together',
        teams: [
            { letter: 'B', builds: 'the mirror — the code, carried to where it is served', against: 'a description written by hand' },
            { letter: 'C', builds: 'the assembly — folders become books', against: 'the demonstration, whose folders already are a mirror' },
            { letter: 'D', builds: 'the judging — books constructed, and the bad ones refused', against: 'the demonstration, whose books already stand' },
            { letter: 'E', builds: 'the catalogue — cards read off living books', against: 'the demonstration, whose books already stand' },
            { letter: 'F', builds: 'the application — a book that draws, a path that resolves', against: 'the demonstration, whose catalogue was typed by hand' },
        ],
    },
    {
        when: 'last, alone',
        teams: [{ letter: 'G', builds: 'the joining — one command, and the library on the open web', against: 'everything above, and nothing before it exists' }],
    },
];

export class $TheDispatch extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Dispatch</Title>
                    {'\n\nThe stages run in one order and that is not the order they have to be built in. Data flows forwards; work does not. What decides whether two people can build at once is not the flow but the agreement between them — and an agreement is only real when the receiving side can build against something today, without waiting for the sending side to exist.'}
                    <Handoffs handoffs={seams} caption="Each row is one agreement, and what the receiving side builds against while the sender is still unwritten. A row that could not name its fixture would be a row nobody can be dispatched to." />
                    {'\n\nThe reason every row can name one is that a hand-made version of this library already exists. Its books were composed by a person, its catalogue typed out, its links wired by hand — and that is exactly the shape each later stage consumes. What was built to find out whether the idea worked turns out to be the input the second half of the machine needs.'}
                    {'\n\nSo the seams are what get agreed first, and after that the work divides on its own. Somebody writes the reader while somebody else writes the thing that reads its output, and neither has to see the other. When both are done the hand-made version is deleted and the real one takes its place; if that swap is difficult, an agreement was wrong, and the difficulty is the report.'}
                    <Order bands={bands} caption="One goes first because its output replaces five hand-made inputs. Five wait on nothing. One cannot start early, because closing the seams is the whole of its work — and if it turns out large, an agreement above it was wrong." />
                    {'\n\nOne team goes first not because the others depend on it but because it pays to. Every other team begins against something written by hand, and the moment the first has landed, five hand-made inputs become one real artifact. Nothing was blocked by waiting; a great deal of pretending was ended by not.'}
                    {'\n\nThe five in the middle are unordered in the strong sense. What one makes is what the next consumes, so the machine runs in a line — but the building does not, because each already holds a version of its input good enough to work against. Two people can write either side of a seam on the same afternoon and meet at the end of it.'}
                    {'\n\nThe last cannot be brought forward, and that is its definition rather than its misfortune. Its work is to take out each hand-made input and put the real one in its place, which cannot happen until the real ones exist. It should be a small job, and if it is a large one an agreement further up was wrong — the size of it is the report.'}
                    {'\n\nOne of the seven stages is not in the seam figure, because nothing hands to it. Showing takes a card and makes a page, and it is the only stage a person actually meets. It is also the one that does not exist: the public application today is a title and an animation, and every reader ever written for this library lives in a demonstration that is never deployed.'}
                    {'\n\nWhich argues for an order that looks backwards. Build the showing first, against the hand-made catalogue, and there is a working library on a screen before a single line of the machine is written. Build the machine first and there are six finished stages and nothing to look at. The second is not slower, but it is unreviewable, and a thing nobody can look at is a thing nobody can correct.'}
                    {'\n\nThree agreements needed a mechanism before anyone could be sent to them, and each is now decided rather than deferred. Order lives in a manifest kept beside the library and read by the same tool that writes it, so an arrangement someone made by hand survives into a build nobody ran by hand. A cover that names no author has one written into its copy — never into what the author wrote, because a mirror is generated code and the source stays exactly as it was left. And judging runs with no browser at all, which was measured rather than assumed: of sixty-two promises about books, fifty-eight hold with nothing but a language runtime, and the four that fail are the four that draw.'}
                    {'\n\nThe last of them is about what a card can do when its book is elsewhere. A card carries a path and hands back no book, because it genuinely has none — and when the reader follows it, the page loads that one book and the card is handed it then. This is what following a card has always meant: a catalogue does not give you the volume, it tells you where the volume is, and once you have fetched it the card is standing beside it.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nAgreements, not order, divide the work — and every receiving side already has something to build against.'}
                </Section>
            </>
        );
    }
}

export const TheDispatch = $($TheDispatch);

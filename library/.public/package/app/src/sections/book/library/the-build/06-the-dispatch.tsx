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
        from: 'reading', to: 'resolving', ready: true,
        agreement: 'A description of the library: every entry with its role, every folder with the one that speaks for it, and every file in its order. Flat, keyed by path, carrying complaints rather than stopping at the first.',
        fixture: 'a description typed by hand',
    },
    {
        from: 'resolving', to: 'emitting', ready: true,
        agreement: 'A library: every book holding its subject, its author and its catalogue as references rather than as words, with whatever a cover left unsaid supplied from where the book sits.',
        fixture: 'the demonstration, whose links were wired by hand and are exactly this shape',
    },
    {
        from: 'emitting', to: 'checking', ready: true,
        agreement: 'A program — a module per book with its chapters composed in order, a catalogue of cards importing no book, and an entry. The emitted module is the only door into the dotted files, because no glob will ever find them.',
        fixture: 'the demonstration, which already is a set of book modules',
    },
    {
        from: 'checking', to: 'showing', ready: true,
        agreement: 'A verdict, and the program it stood over. Checking invents no rules: the bond constructors already refuse six malformations, so it is construction, watched.',
        fixture: 'the demonstration, whose books construct in a suite today',
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
            { letter: 'B', builds: 'resolving — names become references, and silence is filled', against: 'a description written by hand' },
            { letter: 'C', builds: 'emitting the modules — folders become books, carried to where they are served', against: 'the demonstration, whose folders already are the shape' },
            { letter: 'D', builds: 'emitting the catalogue — cards read off living books', against: 'the demonstration, whose books already stand' },
            { letter: 'E', builds: 'checking — every book opened and asked, in a runtime with no browser', against: 'the demonstration, whose books construct today' },
            { letter: 'F', builds: 'showing — a book that draws, a path that resolves', against: 'the demonstration, whose catalogue was typed by hand' },
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
                    {'\n\nThe phases run in one order and that is not the order they have to be built in. Data flows forwards; work does not. What decides whether two people can build at once is not the flow but the agreement between them — and an agreement is only real when the receiving side can build against something today, without waiting for the sending side to exist.'}
                    <Handoffs handoffs={seams} caption="Each row is one agreement, and what the receiving side builds against while the sender is still unwritten. A row that could not name its fixture would be a row nobody can be dispatched to." />
                    {'\n\nThe reason every row can name one is that a hand-made version of this library already exists. Its books were composed by a person, its catalogue typed out, its links wired by hand — and that is exactly the shape each later phase consumes. What was built to find out whether the idea worked turns out to be the input the second half of the machine needs.'}
                    {'\n\nSo the seams are what get agreed first, and after that the work divides on its own. Somebody writes the reader while somebody else writes the thing that reads its output, and neither has to see the other. When both are done the hand-made version is deleted and the real one takes its place; if that swap is difficult, an agreement was wrong, and the difficulty is the report.'}
                    <Order bands={bands} caption="One goes first because its output replaces five hand-made inputs. Five wait on nothing. One cannot start early, because closing the seams is the whole of its work — and if it turns out large, an agreement above it was wrong." />
                    {'\n\nThere are two kinds of parallel here and they are worth telling apart, because an earlier arrangement confused them and produced one team in four costumes. Phases are sequential: nothing resolves before something has been read. But the ARTIFACTS a phase produces are independent of each other, and emitting produces three — the modules, the catalogue, the entry. Two people can build two artifacts of one phase without meeting, and neither is waiting on the other. That is where the room to divide actually is, and it survives a change of mind about layout, which the old arrangement did not.'}
                    {'\n\nOne team goes first not because the others depend on it but because it pays to. Every other team begins against something written by hand, and the moment the first has landed, five hand-made inputs become one real artifact. Nothing was blocked by waiting; a great deal of pretending was ended by not.'}
                    {'\n\nThe last cannot be brought forward, and that is its definition rather than its misfortune. Its work is to take out each hand-made input and put the real one in its place, which cannot happen until the real ones exist. It should be a small job, and if it is a large one an agreement further up was wrong — the size of it is the report.'}
                    {'\n\nOne of the six is not in the seam figure, because nothing is handed onward from it. Showing takes a card and makes a page, and it is the only phase a person actually meets. Which argues for an order that looks backwards. Build the showing first, against the hand-made catalogue, and there is a working library on a screen before a single line of the machine is written. Build the machine first and there are finished phases and nothing to look at. The second is not slower, but it is unreviewable, and a thing nobody can look at is a thing nobody can correct.'}
                    {'\n\nFour agreements needed a mechanism before anyone could be sent to them, and each is now decided rather than deferred. Order lives in a manifest kept beside the library and read by the same tool that writes it, so an arrangement someone made by hand survives into a build nobody ran by hand. A cover that names no author has one supplied when the library is resolved — never written back into what the author wrote. Checking runs with no browser at all, which was measured rather than assumed: of sixty-two promises about books, fifty-eight hold with nothing but a language runtime, and the four that fail are the four that draw. And where emitted code lands is a policy rather than an agreement, which is why nobody is dispatched to it.'}
                    {'\n\nThe last of them is about what a card can do when its book is elsewhere. A card carries a path and hands back no book, because it genuinely has none — and when the reader follows it, the page loads that one book and the card is handed it then. This is what following a card has always meant: a catalogue does not give you the volume, it tells you where the volume is, and once you have fetched it the card is standing beside it.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nAgreements divide the work, not order — and inside a phase, its artifacts divide it again.'}
                </Section>
            </>
        );
    }
}

export const TheDispatch = $($TheDispatch);

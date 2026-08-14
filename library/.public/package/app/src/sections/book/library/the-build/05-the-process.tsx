import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Stages, type Stage } from './figures';

const stages: Stage[] = [
    { name: 'writing', takes: 'a person', makes: 'folders of chapters', where: 'the library', owed: '' },
    { name: 'reading', takes: 'folders', makes: 'a description', where: 'the compiler', owed: 'the exact shape of the description every later stage reads' },
    { name: 'carrying', takes: 'a description', makes: 'a mirror', where: 'the compiler', owed: '' },
    { name: 'assembling', takes: 'a mirror', makes: 'book modules', where: 'the compiler', owed: '' },
    { name: 'judging', takes: 'book modules', makes: 'live books, or a refusal', where: 'a runtime with no browser', owed: '' },
    { name: 'cataloguing', takes: 'live books', makes: 'cards', where: 'the compiler', owed: '' },
    { name: 'showing', takes: 'a card', makes: 'a page', where: 'the application', owed: '' },
];

export class $TheProcess extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Process</Title>
                    {'\n\nSeven things happen between somebody writing a chapter and somebody else reading it on a screen. They are worth naming in order, because most of the difficulty in this design came from arguing about a stage without agreeing which one was under discussion.'}
                    <Stages stages={stages} caption="Each stage takes one thing and makes another. Where a stage still owes a mechanism, the row says so rather than looking finished; one still does." />
                    {'\n\nWriting comes first and is not part of the machine. A person makes a folder, puts chapters in it, and stops. Nothing else is asked of them: no manifest to update by hand, no registry to join, no declaration of what the folder is. That restraint is the point of the whole arrangement, and every stage after it exists to make the restraint affordable.'}
                    {'\n\nReading turns the folders into a description — what every entry is, which folder speaks for which, and what order things stand in. The order is not guessed: it is kept in a manifest beside the library, written by the same tool that lets somebody drag a book into place, so an arrangement made by hand survives into a build nobody ran by hand. What this stage still owes is the shape of the description itself, and it owes it to everyone: it is the one thing every later stage reads, and until it is written down two people cannot build either side of it.'}
                    {'\n\nCarrying moves the code to where it will be served, and it is smaller than it sounds. If the copy keeps the shape of the original, a chapter importing its own resource still finds it and a chapter importing the framework still finds that too. What the copy must not do is change meaning, because the page and the file a person wrote have to say the same thing.'}
                    {'\n\nAssembling writes the module that makes a folder into a book: the chapters in order, the contents in its place, and the links a cover left unsaid. A cover that names no author is given one — written into the copy, never into what its author wrote. That distinction is the whole answer to an objection that looked fatal: editing somebody’s writing would be a violation, and the mirror is not their writing. It is generated code, and generated code is allowed to be complete.'}
                    {'\n\nThe generated module matters for a second reason nobody expected. Files that begin with a dot are invisible to pattern matching — no ordinary search of a folder will find a cover or a synopsis — but an explicit import finds them without difficulty. So the assembled module is the only door into them, and any check that walks by pattern instead of entering through that door will quietly pass over half of every book.'}
                    {'\n\nJudging constructs every book and refuses the ones that will not stand, inventing no rules of its own. The model already refuses a book with no cover, with two covers, with no account of itself, with a duplicated contents, or with a cover naming neither author nor subject — so judging is construction, watched. And it needs no browser: of sixty-two promises about books, fifty-eight hold with nothing but a language runtime, and the four that fail are the four that draw. Constructing is not drawing, which is why the judging can happen somewhere the reader never goes.'}
                    {'\n\nCataloguing reads the cards off the books that survived. A card carries what a reader needs in order to decide whether to open a book, taken from the constructed book rather than parsed from its source, because the constructed book is the only place those answers are certainly right.'}
                    {'\n\nShowing is the application, and it is one sentence long. A path arrives, a card is found, one book is loaded, and the book draws itself — as something to read or something to consult, decided by counting what points elsewhere. A card hands back no book until its book is present, which is not a limitation but the ordinary behaviour of a catalogue: it tells you where the volume is, and once you have fetched it the card is standing beside it.'}
                    {'\n\nThe seven stages are not seven pieces of work in the order they run. Data flows one way; the building does not have to. What matters for dividing the work is not this order but the agreements between the stages, and those are the subject of the next chapter.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nWriting, reading, carrying, assembling, judging, cataloguing, showing — and only the first hand-off still owes its shape.'}
                </Section>
            </>
        );
    }
}

export const TheProcess = $($TheProcess);

import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Stages, type Stage } from './figures';

const phases: Stage[] = [
    { name: 'writing', takes: 'a person', makes: 'folders of chapters', where: 'the library', owed: '' },
    { name: 'reading', takes: 'folders', makes: 'a description', where: 'the compiler', owed: '' },
    { name: 'resolving', takes: 'a description', makes: 'a library', where: 'the compiler', owed: 'a subject reached from outside its own folder: an entry is placed from where a book SITS, and a book that declares a subject elsewhere is not yet stood in it' },
    { name: 'emitting', takes: 'a library', makes: 'a program', where: 'the compiler', owed: '' },
    { name: 'checking', takes: 'a program', makes: 'a verdict', where: 'a runtime with no browser', owed: '' },
    { name: 'showing', takes: 'a card', makes: 'a page', where: 'the application', owed: '' },
];

export class $TheProcess extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Process</Title>
                    {'\n\nSix things happen between somebody writing a chapter and somebody else reading it on a screen, and only four of them are the machine. They are worth naming in order, because most of the difficulty in this design came from arguing about a stage without agreeing which one was under discussion.'}
                    {'\n\nEach one is named for what it PRODUCES, and that is the whole of why this list is short. An earlier version of it had seven entries, and three of them turned out to be one thing wearing three coats. A phase makes a representation the next phase reads. Anything else is a choice about how, and a choice about how is not a stage — it is a decision inside one, and it is free to change without anybody’s work changing with it.'}
                    <Stages stages={phases} caption="Each phase takes one representation and makes the next. Where a phase still owes a mechanism, the row says so rather than looking finished; one does." />
                    {'\n\nWriting comes first and is not part of the machine. A person makes a folder, puts chapters in it, and stops. Nothing else is asked of them: no manifest to update by hand, no registry to join, no declaration of what the folder is. That restraint is the point of the whole arrangement, and every phase after it exists to make the restraint affordable.'}
                    {'\n\nReading turns the folders into a description — what every entry is, which folder speaks for which, and what order things stand in. The order is not guessed: it is kept in a manifest beside the library, written by the same tool that lets somebody drag a book into place, so an arrangement made by hand survives into a build nobody ran by hand. The description carries no writing at all, which is what makes it fast and what lets a whole library be checked before a line of anybody’s prose is compiled.'}
                    {'\n\nResolving turns that description into a library. Names become references: a cover saying it belongs to physics stops being a word and starts being something you can follow, and the folder holding a book is what answers which subject that is. What an author left unsaid is supplied in the same act — a cover naming no author is given one from where the book sits rather than from what it says. This is the phase with the most rules and the least code, and it is where a subject learns what it holds without keeping a list of it.'}
                    {'\n\nOne rule of it is answered by position and should not be. A subject holds the books beneath it, which is right and is most of the truth — but a book may declare a subject that does not hold it, and then it belongs in two catalogues and sits in one folder. Placing an entry from where a book sits gets the common case free and the interesting case wrong, and the row above says so rather than looking finished.'}
                    {'\n\nEmitting turns the library into a program: a module for every book, a catalogue of cards, and an entry that draws them. WHERE any of it lands is a policy of this phase and not a phase of its own. An earlier version of this arrangement had a stage whose whole job was to keep the output in the shape of the input, which reads like a principle until the day anything moves; then it is a stage nobody can name. Layout is a decision emitting makes, and moving things around costs a decision rather than a team.'}
                    {'\n\nOne thing emitting must know, and it is the least obvious fact in this book. Files that begin with a dot are invisible to pattern matching — no ordinary search of a folder will find a cover or a synopsis — but an explicit import finds them without difficulty. So the emitted module is the only door into them, and any check that walks by pattern instead of entering through that door will quietly pass over half of every book. The same fact has a second edge: a chapter need not import the code that sits beside it, so a resource is reached by its FOLDER and never by following imports. One door for the writing, one walk for everything else.'}
                    {'\n\nChecking opens every book in the emitted program and asks the model whether it stands. It invents no rules of its own. The bond constructors already fail a book with no cover, with two covers, with no account of itself, with a duplicated contents, or with a cover naming neither author nor subject — so checking is construction, watched, and what it adds is the softer answer: every part asked, every failure carrying a reason and a file rather than a throw. It needs no browser, because constructing is not drawing, which is why the checking can happen somewhere the reader never goes.'}
                    {'\n\nShowing is the application, and it is one sentence long. A path arrives, a card is found, one book is loaded, and the book draws itself — as something to read or something to consult, decided by counting what points elsewhere. A card hands back no book until its book is present, which is not a limitation but the ordinary behaviour of a catalogue: it tells you where the volume is, and once you have fetched it the card is standing beside it.'}
                    {'\n\nThe phases run in that order and the work does not have to be built in it. Data flows one way; people do not. What decides whether two of them can build at once is not this order but the agreements between the phases, and those are the subject of the next chapter.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nWriting, then reading, resolving, emitting and checking, then showing — each named for what it makes, and only one still owing its shape.'}
                </Section>
            </>
        );
    }
}

export const TheProcess = $($TheProcess);

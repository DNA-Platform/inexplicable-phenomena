import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Summary } from '@/writing/Summary';
import { Title } from '@/writing/Title';
import { Shape, Bench, Listed, type Node } from './figures';
import figures from './figures.tsx?raw';

const shape: Node[] = [
    { name: '..library/', depth: 0, folder: true },
    { name: '.physics/', depth: 1, folder: true },
    { name: '.subject/', depth: 2, folder: true },
    { name: '.cover.tsx', depth: 3 },
    { name: '.synopsis.tsx', depth: 3 },
    { name: 'what-physics-is.tsx', depth: 3 },
    { name: 'the-standard-model/', depth: 2, folder: true },
    { name: '.cover.tsx', depth: 3 },
    { name: '.synopsis.tsx', depth: 3 },
    { name: 'symmetry.tsx', depth: 3 },
    { name: 'symmetry--figures.tsx', depth: 3 },
];

export class $AFolderIsABook extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>A Folder Is a Book</Title>
                    <Paragraph>{'A folder is a book. That is the whole of the arrangement, and everything else is a way of saying which kind of book it is.'}</Paragraph>
                    <Paragraph>{'A book that holds other books is a subject, and a subject wears a dot so that it can be recognised without being opened. The dot is not a second truth competing with the contents. A folder marked a subject must actually hold books, and one that holds none is a failure with a name: the mark makes the claim, and the contents have to earn it.'}</Paragraph>
                    <Paragraph>{'Among folders the count carries the depth. A subject standing over books alone wears one dot. A subject standing over other subjects wears one more than the deepest beneath it, so its children have a rank left to occupy. And in any folder, the folder holding the highest count is that folder speaking about itself rather than about what it holds — which is why exactly one may hold it, and why an arrangement can be checked instead of trusted.'}</Paragraph>
                    <Shape
                        nodes={shape}
                        caption="Every label on the right is computed, not typed. The diagram runs the rule rather than illustrating it, so a mistake in the rule would appear here as a mislabelled line."
                    />
                    <Paragraph>{'Among files it works the other way round. A dot says only that a file is not a chapter, and the name says which of the two it is. A book has a cover and a synopsis, both dotted, both named, and nothing else in a book wears a dot at all.'}</Paragraph>
                    <Paragraph>{'The subject’s own book is a folder rather than a handful of loose files, and the reason is a cost rather than a taste. If a subject kept its chapters directly alongside the books it catalogues, then a book that later became a subject would have to move every chapter it owns into a new folder to make room. Growth would be a restructuring. Here it is an addition: a book becomes a subject when a sibling appears beside it, and not one existing file is touched.'}</Paragraph>
                    <Paragraph>{'That argument is the same one that removed numbers from filenames. A chapter is not called 03-something, because inserting a third chapter into a book of forty-seven would rename every chapter after it. Order is worth having, but not at the price of rewriting a book to insert a page, so order is held beside the files rather than inside their names.'}</Paragraph>
                    <Paragraph>{'And a book may carry code. A file named for a chapter, with a double dash and a word after it, is a resource of that chapter — a figure it draws, a table it holds, whatever the writing needs. Writing code is specifying semantics, so there is no separate place for it and nothing special to declare. The code sits beside the chapter it serves, named for it.'}</Paragraph>
                    <Paragraph>{'Which makes the whole arrangement small enough to hold, and small enough to try.'}</Paragraph>
                    <Bench caption="The same classifier the diagram above runs, answering whatever is put to it. Change the entry, change what it is." />
                    <Listed
                        of="the rule, as both figures above run it"
                        source={figures.slice(figures.indexOf('export type Node'), figures.indexOf('class $Drawn')).trim()}
                        caption="The classifier."
                    />
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'A folder is a book. A dot marks a subject and its count carries the depth; among files, a dot marks what is not a chapter.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const AFolderIsABook = $($AFolderIsABook);

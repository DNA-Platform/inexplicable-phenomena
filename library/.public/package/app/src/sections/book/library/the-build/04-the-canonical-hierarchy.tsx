import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Reciprocal, Listed } from './figures';
import figures from './figures.tsx?raw';

const held = ['the-standard-model', 'gauge-theory', 'thermodynamics'];

export class $TheCanonicalHierarchy extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Canonical Hierarchy</Title>
                    {'\n\nA book may belong to many subjects, but exactly one of them is canonical, and the folder tree is what says which. A book’s canonical subject is the folder holding it. Nothing is written down, nothing can be forgotten, and no two records can disagree, because there is only ever the one.'}
                    {'\n\nEvery other subject a book belongs to is declared. A subject that gathers books from across the library says so with an explicit marker naming each one, and those books go on living where they live. So the tree is the canonical map and the markers are everything else, which is how one book can appear in many catalogues while still having a single home.'}
                    {'\n\nThere is a collision hiding in the word, and it is worth naming before it costs anything. Canonical is said in two directions. A book names the subject it canonically belongs to; a subject names the book that canonically represents it. The two point opposite ways and share a name, and a system that confuses them will happily record a subject as the subject of its own subject.'}
                    {'\n\nThe directions are told apart by where each answer comes from. The book’s direction is never declared, because position already answers it. The subject’s direction cannot be answered by position alone — a folder does not say which of its books speaks for it — so the subject answers it, and by default the answer is the first book in its contents.'}
                    {'\n\nA subject that wants a different one says so on its cover, naming the book that represents it. That is the same shape as every other convention here: the arrangement supplies an answer, and the author overrides it when the arrangement is wrong.'}
                    <Reciprocal
                        subject="physics"
                        books={held}
                        declared=""
                        caption="With nothing declared, the first book in the contents is the canonical one, and the verdict beneath is computed rather than asserted."
                    />
                    {'\n\nReciprocity is then not a rule that has to be enforced so much as a shape that cannot easily be broken. The book named canonical is held by the subject naming it, and being held by that subject is precisely what makes the subject canonical for the book. The two directions agree by construction, and there is only one way to break them: name a book the subject does not hold.'}
                    <Reciprocal
                        subject="physics"
                        books={held}
                        declared="the-standard-model"
                        caption="A subject may name any book it holds, and the reciprocity still closes."
                    />
                    <Reciprocal
                        subject="physics"
                        books={held}
                        declared="the-nature-of-consciousness"
                        caption="And here it does not. The same figure, given a book physics does not hold, computes the failure — a guard nobody has watched fail is not a guard."
                    />
                    {'\n\nWhich leaves the check small enough to state in a sentence. A subject’s canonical book must be one of the books it holds. Everything else the reciprocity used to require is supplied by the arrangement, and a check that only has one thing left to test is a check that will still be true after the next change.'}
                    <Listed
                        of="the reciprocity, as the three figures above run it"
                        source={figures.slice(figures.indexOf('export const canonicalOf'), figures.indexOf('export class $Reciprocal')).trim()}
                        caption="The check."
                    />
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nThe tree names a book’s subject; the subject names its book. One check remains: it must hold what it names.'}
                </Section>
            </>
        );
    }
}

export const TheCanonicalHierarchy = $($TheCanonicalHierarchy);

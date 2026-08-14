import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { Description, Listed } from './figures';
import figures from './figures.tsx?raw';

// The fixture, as it stands on disk. Given to the figure as paths and nothing
// else, so that everything the figure says about it is derived.
const corpus = [
    '..the-library/.cover.tsx',
    '..the-library/.synopsis.tsx',
    '..the-library/what-this-library-is.tsx',
    '.physics/.subject/.cover.tsx',
    '.physics/.subject/.synopsis.tsx',
    '.physics/.subject/what-physics-is.tsx',
    '.physics/the-standard-model/.cover.tsx',
    '.physics/the-standard-model/.synopsis.tsx',
    '.physics/the-standard-model/symmetry.tsx',
    '.physics/the-standard-model/symmetry--figures.tsx',
    '.physics/gauge-theory/.cover.tsx',
    '.physics/gauge-theory/.synopsis.tsx',
    '.physics/gauge-theory/the-gauge-principle.tsx',
    '.philosophy/.subject/.cover.tsx',
    '.philosophy/.subject/.synopsis.tsx',
    '.philosophy/the-hard-problem/.cover.tsx',
    '.philosophy/the-hard-problem/.synopsis.tsx',
    '.philosophy/the-hard-problem/what-it-is-like.tsx',
];

const broken = [
    '.astronomy/.subject/.cover.tsx',
    '.chemistry/the-bond/.synopsis.tsx',
    '.chemistry/the-bond/valence.tsx',
];

export class $TheDescription extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Description</Title>
                    {'\n\nOne stage reads the folders and every stage after it reads what that stage produced. So the description is the single agreement the whole machine turns on, and it is worth being exact about, because two people cannot build either side of a thing that has never been written down.'}
                    {'\n\nIt is a flat list, not a tree. Every folder appears once, carrying its own path, how many dots it wears, whether that makes it a subject or a book, which of the folders inside it speaks for it, what it holds, and what files it contains with the role of each. The hierarchy is not stored because the paths already have it, and a flat list can be written to a file, compared against yesterday, and read by something that was not compiled with it.'}
                    {'\n\nPaths are the identity. They are relative to the top of the library and they use one kind of slash, because the same string that names a folder is the string a route will arrive holding, and having two spellings of one thing is how a system begins to disagree with itself.'}
                    <Description
                        paths={corpus}
                        caption="The fixture, described. Everything on the right is derived from the paths on the left — the kind, the folder that speaks for each, the file counts — so a mistake in the rule would show up here as a wrong description rather than as a wrong build much later."
                    />
                    {'\n\nOrder is resolved here and never again. Reading applies the arrangement a person made and puts anything unarranged after it, so no later stage has to know that ordering was ever a question. A stage that re-derived order would be a second opinion about it, and two opinions are one more than a library can afford.'}
                    {'\n\nWhat the description does not contain is the writing. It says a file is a chapter; it does not say what the chapter says. Reading looks at names and arrangement only, which is what makes it fast, and what makes it possible to check an entire library before a single line of anybody’s prose has been compiled.'}
                    {'\n\nAnd complaints travel with it rather than stopping it. A folder marked a subject that holds nothing, a folder where no single entry speaks for the rest, a book with no cover — each is collected and carried, so one pass tells an author everything that is wrong. A build that reports one fault at a time is a build somebody runs many times, and each run is a chance to give up.'}
                    <Description
                        paths={broken}
                        caption="The same figure, given an arrangement with two faults: a subject holding nothing, and a book with no cover. Both are found in one pass, and neither stops the other from being reported."
                    />
                    {'\n\nThat is the whole of it, and its smallness is the point. Everything downstream — the copying, the assembling, the judging, the cataloguing — reads this and never the filesystem, which is why those four can be built by four people who never speak.'}
                    <Listed
                        of="the description, as both figures above derive it"
                        source={figures.slice(figures.indexOf('export type Described'), figures.indexOf('export class $Description')).trim()}
                        caption="The contract."
                    />
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA flat list of folders, keyed by path, with order resolved and complaints carried — the one agreement the whole machine turns on.'}
                </Section>
            </>
        );
    }
}

export const TheDescription = $($TheDescription);

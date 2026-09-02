import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Summary } from '@/writing/Summary';
import { Title as PlainTitle } from '@/writing/Title';
import { ChapterHeading as Title } from './figures';

const transform = `
type Composed = 'sections' | 'paragraphs' | 'sentences' | 'words' | 'letters' | 'copy';
type Reflexive = 'cover' | 'canonical' | 'ref' | 'tableOfContents';

type Named = Exclude<keyof $Book, keyof $Chemical | Composed | Reflexive>;

type Carried<V> =
    [V] extends [string | number | boolean | undefined] ? V :
    [V] extends [readonly $Chapter[]] ? string[] :
    [V] extends [$Reference<$Book> | undefined] ? $LibraryCard | Extract<V, undefined> :
    string;

export type $LibraryCard = $$Book & { ... };
`;

export class $TheCardInCode extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Card, In Code</Title>
                    <Paragraph>{'The card is a compression, and the interesting thing about it is that the compression is stated as a type rather than performed by a function.'}</Paragraph>
                    <Paragraph>{'Four rules. A plain value passes through. A list of chapters becomes their titles. A reference to a book becomes that book\'s card. Everything else complex becomes a string — which is the rule that took longest to accept, because it throws away structure on purpose.'}</Paragraph>
                    <Paragraph>{'And two exclusions, each stated as a rule rather than a list, because a list is a place for things to be forgotten. Composed is everything below chapter grade, the whole text of the book among it: an index card representation of something does not contain all the words in it. Reflexive is everything pointing back at the very book the card is for — the cover, the way in, the contents — because the card is what those become.'}</Paragraph>
                    <Paragraph>{'That card prints its own fields. Nobody wrote a template for it. It walks what it carries and shows what it finds, which is why a card for a kind of book nobody has invented yet will still print correctly.'}</Paragraph>
                    <Paragraph>{'The last line of the file is the one that keeps the rest honest: the class that implements this type declares that it does. So the compiler proves the compression is buildable, not merely describable — and a rule that produces something nobody can build stops the build rather than shipping.'}</Paragraph>
                </Section>
                <Summary>
                    <PlainTitle>Summary</PlainTitle>
                    <Paragraph>{'Four rules and two exclusions, stated as a type, with a class that proves they can be met.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const TheCardInCode = $($TheCardInCode);

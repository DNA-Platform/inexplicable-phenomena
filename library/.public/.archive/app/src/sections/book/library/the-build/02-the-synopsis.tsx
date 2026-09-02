import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis } from '@/book/Synopsis';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Summary } from '@/writing/Summary';
import { Title } from '@/writing/Title';

export class $BuildSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    <Paragraph>{'Every book on this shelf was assembled by hand. Somebody imported each chapter, listed them in order, and typed the links that say who wrote the book and what it is about. That work is identical every time, which is the sign that it belongs to a machine rather than to a person.'}</Paragraph>
                    <Paragraph>{'This book specifies that machine: how a folder of chapters becomes a library that knows its own subjects, authors and catalogue, without anyone declaring any of it.'}</Paragraph>
                </Section>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'How a folder of chapters becomes a library.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const BuildSynopsis = $($BuildSynopsis);

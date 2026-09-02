import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Cover, List, Paragraph, Ref, Section, Sentence, Title } from '@dna-platform/lib';

export const Wikimedia = $(
    <Cover>
        <Section>
            <Title>Wikimedia</Title>
            <Paragraph>{
                'Wikimedia is a family of free knowledge projects built by volunteers.\n' +
                'Its flagship is an encyclopedia that anyone can edit, and its shelves hold dictionaries, textbooks, source documents, and a commons of media.\n' +
                'Every project is written openly and licensed freely.\n' +
                'This library binds a small shelf of its articles as books.'
            }</Paragraph>
            <List>{
                'Wikipedia, the free encyclopedia\n' +
                'Wiktionary, the free dictionary\n' +
                'Wikibooks, open textbooks for an open world\n' +
                'Wikimedia Commons, a shared store of media\n' +
                'Wikisource, the free document collection'
            }</List>
            <Paragraph>
                <Sentence>{'The shelf opens with '}<Ref>{'[gauge theory](/gauge-theory)'}</Ref>{', continues through '}<Ref>{'[chemistry](/chemistry)'}</Ref>{', and closes on '}<Ref>{'[consciousness](/consciousness)'}</Ref>{'.'}</Sentence>
            </Paragraph>
            <Paragraph>
                {'The movement keeps its own front page at '}
                <Ref>{'[wikimedia.org](https://www.wikimedia.org)'}</Ref>
            </Paragraph>
        </Section>
    </Cover>
);

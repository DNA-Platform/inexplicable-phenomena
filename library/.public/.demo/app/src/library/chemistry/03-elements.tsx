import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Cell, Chapter, Paragraph, Ref, Section, Sentence, Table, Title } from '@dna-platform/lib';

export const Elements = $(
    <Chapter>
        <Section>
            <Title>Elements</Title>
            <Paragraph>{
                'An element is a substance whose atoms all carry the same number of protons.\n' +
                'Ninety two occur in nature, and the rest are made briefly in laboratories.\n' +
                'Arranged by number and behavior they form the periodic table, whose columns rhyme.'
            }</Paragraph>
            <Table>
                <Cell>{'hydrogen, symbol H, the lightest and the first'}</Cell>
                <Cell>{'carbon, symbol C, the backbone of organic chemistry'}</Cell>
                <Cell>{'oxygen, symbol O, the eager partner of respiration'}</Cell>
                <Cell>{'iron, symbol Fe, forged in the death of stars'}</Cell>
            </Table>
            <Paragraph>
                <Sentence>{'In one corner of that table the atoms have learned to study themselves, a puzzle taken up under '}<Ref>{'[consciousness](/consciousness)'}</Ref>{'.'}</Sentence>
            </Paragraph>
            <Paragraph>
                {'The unabridged account remains at '}
                <Ref>{'[the original](https://en.wikipedia.org/wiki/Chemistry)'}</Ref>
            </Paragraph>
        </Section>
    </Chapter>
);

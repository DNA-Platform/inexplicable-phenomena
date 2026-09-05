import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Chapter, Heading, Paragraph, Ref, Section, Sentence, Table } from '@dna-platform/public';

export const Elements = $(
    <Chapter>
        <Section>
            <Heading>Elements</Heading>
            <Paragraph>{
                'An element is a substance whose atoms all carry the same number of protons.\n' +
                'Ninety two occur in nature, and the rest are made briefly in laboratories.\n' +
                'Arranged by number and behavior they form the periodic table, whose columns rhyme.'
            }</Paragraph>
            <Table>
                <Paragraph>{'hydrogen, symbol H, the lightest and the first'}</Paragraph>
                <Paragraph>{'carbon, symbol C, the backbone of organic chemistry'}</Paragraph>
                <Paragraph>{'oxygen, symbol O, the eager partner of respiration'}</Paragraph>
                <Paragraph>{'iron, symbol Fe, forged in the death of stars'}</Paragraph>
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

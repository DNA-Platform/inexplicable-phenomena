import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Chapter, Heading, Paragraph, Ref, Section, Sentence } from '@dna-platform/public';

export const TheHardProblem = $(
    <Chapter>
        <Section>
            <Heading>The Hard Problem</Heading>
            <Paragraph>{
                'The easy problems of consciousness ask how the brain discriminates, integrates, and reports, and each yields to the standard methods of cognitive science.\n' +
                'The hard problem asks why any of that processing is accompanied by experience.\n' +
                'David Chalmers gave the distinction its name in 1995, and the name held.\n' +
                'An answer to every easy problem would still leave the hard one standing.'
            }</Paragraph>
            <Paragraph>
                <Sentence>{'The brain is, among other things, an organ of applied '}<Ref>{'[chemistry](/chemistry)'}</Ref>{', its signals carried by ions and its moods by molecules.'}</Sentence>
                <Sentence>{'Knowing every reaction has not yet explained why the reactions feel like anything.'}</Sentence>
                <Sentence>{'That explanatory gap is the problem stated plainly.'}</Sentence>
            </Paragraph>
        </Section>
    </Chapter>
);

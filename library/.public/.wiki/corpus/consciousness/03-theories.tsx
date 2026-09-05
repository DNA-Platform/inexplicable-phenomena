import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Chapter, Heading, List, Paragraph, Ref, Section, Sentence } from '@dna-platform/public';

export const Theories = $(
    <Chapter>
        <Section>
            <Heading>Theories</Heading>
            <Paragraph>{
                'No single theory of consciousness commands the field, but several have earned standing programs.\n' +
                'Each names a property that conscious processing has and unconscious processing lacks.\n' +
                'Their disagreements are productive, since they predict different correlates.'
            }</Paragraph>
            <List>{
                'global workspace theory, consciousness as broadcast\n' +
                'integrated information theory, consciousness as irreducible wholeness\n' +
                'higher order theories, consciousness as thought about thought\n' +
                'predictive processing, consciousness as controlled hallucination'
            }</List>
            <Paragraph>
                <Sentence>{'Some hope the answer will fall out of physics as quietly as '}<Ref>{'[gauge theory](/gauge-theory)'}</Ref>{' fell out of symmetry.'}</Sentence>
                <Sentence>{'Others suspect the question is not yet well posed.'}</Sentence>
            </Paragraph>
            <Paragraph>
                {'The unabridged account remains at '}
                <Ref>{'[the original](https://en.wikipedia.org/wiki/Consciousness)'}</Ref>
            </Paragraph>
        </Section>
    </Chapter>
);

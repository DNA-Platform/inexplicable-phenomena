import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Author, Cover, Heading, Paragraph, Section, Subject, Title } from '@dna-platform/public';

export const Consciousness = $(
    <Cover>
        <Title><Heading>Consciousness</Heading></Title>
        <Author><Heading>Wikipedia</Heading></Author>
        <Subject><Heading>Wikimedia</Heading></Subject>
        <Section>
            <Heading>Consciousness</Heading>
            <Paragraph>{
                'A book on awareness and the question it raises.\n' +
                'Something it is like to be, written from the inside.'
            }</Paragraph>
        </Section>
    </Cover>
);

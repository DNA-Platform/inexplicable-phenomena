import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Author, Cover, Heading, Paragraph, Section, Subject, Title } from '@dna-platform/public';

export const Chemistry = $(
    <Cover>
        <Title><Heading>Chemistry</Heading></Title>
        <Author><Heading>Wikipedia</Heading></Author>
        <Subject><Heading>Wikimedia</Heading></Subject>
        <Section>
            <Heading>Chemistry</Heading>
            <Paragraph>{
                'A book on matter and its transformations.\n' +
                'Every substance is a sentence written in atoms, and every reaction rewrites it.'
            }</Paragraph>
        </Section>
    </Cover>
);

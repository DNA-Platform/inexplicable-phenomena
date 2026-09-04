import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Paragraph, Section, Synopsis, Title } from '@dna-platform/public';

export const WikimediaSynopsis = $(
    <Synopsis>
        <Section>
            <Title>Wikimedia</Title>
            <Paragraph>{
                'Wikimedia is the movement behind the free encyclopedia and its sister projects.\n' +
                'Volunteers write, cite, and tend its pages in hundreds of languages.\n' +
                'Read as a library, its front page is a cover, each article is a book, and every heading opens a chapter.'
            }</Paragraph>
        </Section>
    </Synopsis>
);

import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { Chapter, Heading, List, Paragraph, Ref, Section, Sentence } from '@dna-platform/public';

export const Bonds = $(
    <Chapter>
        <Section>
            <Heading>Bonds</Heading>
            <Paragraph>{
                'Atoms bind because their electrons find lower energy together than apart.\n' +
                'A covalent bond shares electron pairs between partners.\n' +
                'An ionic bond forms when one atom surrenders an electron to another and the resulting charges attract.\n' +
                'A metallic bond pools electrons into a sea that the whole lattice shares.'
            }</Paragraph>
            <List>{
                'covalent, a shared pair\n' +
                'ionic, a transfer and an attraction\n' +
                'metallic, a common sea of electrons\n' +
                'hydrogen bonding, a weak bridge between molecules'
            }</List>
            <Paragraph>
                <Sentence>{'All of them are one force wearing different masks, the electromagnetic interaction whose deeper story is told in '}<Ref>{'[gauge theory](/gauge-theory)'}</Ref>{'.'}</Sentence>
            </Paragraph>
        </Section>
    </Chapter>
);

import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';
import { manifold } from '../the-manifold/book';

export class $TheManifoldEntry extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>{manifold.title?.copy ?? ''}</Title>
                    {'\n\nA book that points at itself and arrives. Ribbons mark places down to the paragraph, an atlas chapter catalogues the charts, footnotes carry keys their marks resolve, and a citation followed forward has an arrow home. Nothing here is typeset notation standing in for a reference; every one of them is a reference the model can read.'}
                    {'\n\nIts room is night: deep ground, lamplight on the page, a slider that fades away when it is not being used. It proves that a reference earns its keep when it renders itself — a mark and a return are subclasses with a view, and the framework needed no change to hold them.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nThe reference system, read rather than described. Night depth. Proves that pointing is something writing does, not something notation imitates.'}
                </Section>
            </>
        );
    }
}

export const TheManifoldEntry = $($TheManifoldEntry);

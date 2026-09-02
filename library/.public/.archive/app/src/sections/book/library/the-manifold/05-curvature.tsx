import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Paragraph } from '@/writing/Paragraph';
import { Summary } from '@/writing/Summary';
import { Title } from '@/writing/Title';
import { Footer } from '@/document/Footer';
import { Footnote } from '@/document/Footnote';

export class $Curvature extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Curvature: What Reading Never Gives Back</Title>
                    <Paragraph>{'Carry a word around a book and bring it home. Take *light* through a physics chapter, a painting chapter, a chapter on grief — and return it to the sentence where you found it. It does not fit the way it did. The word came back **turned**, and the angle it came back by is the curvature of the book.'}</Paragraph>
                    <Paragraph>{'Geometry has the instrument for this: parallel transport. Move a vector around a closed loop on a curved surface and it returns rotated, though at every step you were careful to keep it parallel^[care]. Flat books exist — glossaries, timetables — and their words come home unchanged. No one rereads a timetable to feel it differently.'}</Paragraph>
                </Section>
                <Section>
                    <Title>The Loop</Title>
                    <Paragraph>{'The measure is a commutator: go chapter-then-chapter one way, then the other way, and subtract. $R(X,Y)Z = \\nabla_X \\nabla_Y Z - \\nabla_Y \\nabla_X Z - \\nabla_{[X,Y]} Z$ — read the grief before the physics and *light* lands otherwise than physics-first. Order fails to commute exactly where the book is most alive.'}</Paragraph>
                    <Paragraph mark=">">{'A rereader is someone measuring curvature with their own hands.'}</Paragraph>
                    <Paragraph>{'The [atlas](#4) hid this well: within one chart everything seemed flat, transitions all smooth. Curvature is invisible on any single page and undeniable on the round trip — it is the first *global* fact of a book, the first thing no page can show you.'}</Paragraph>
                </Section>
                <Footer>
                    <Title>Notes</Title>
                    <Footnote name="care">{'The care is the point. Curvature is not a failure of attention; it is what the surface does to perfect attention.'}</Footnote>
                </Footer>
                <Summary>
                    <Title>Summary</Title>
                    <Paragraph>{'Carry a word around the book and it comes back turned; the turning is curvature: $R(X,Y)Z = \\nabla_X \\nabla_Y Z - \\nabla_Y \\nabla_X Z - \\nabla_{[X,Y]} Z$.'}</Paragraph>
                </Summary>
            </>
        );
    }
}

export const Curvature = $($Curvature);

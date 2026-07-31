import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $TheGeodesic extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>The Geodesic: The Straightest Reading</Title>
                    {'\n\nOn a curved surface nothing is straight, but some paths are *straightest*: the geodesic, the walk that never steers, $\\nabla_{\\dot\\gamma}\\,\\dot\\gamma = 0$. Front to back, chapter by chapter, is the geodesic of a book — not the shortest way to the facts, but the path along which the reader is never yanked sideways.'}
                    {'\n\nEvery other route steers. The skimmer cuts across the surface and pays in [curvature](#5) they never felt — words arriving unturned, conclusions weightless. The index-chaser tunnels. Only the geodesic reader lets the book do all the turning^[This is not a moral claim. Timetables should be tunnelled into. But a book with curvature worth having deserves one geodesic pass before any shortcut.].'}
                </Section>
                <Section>
                    <Title>Completeness</Title>
                    {'\n\nA surface is complete when every geodesic can be followed as far as it runs — no edge where the path falls off mid-stride. A book is complete the same way: the front-to-back walk arrives, every promised turn taken, at a last page that could not have come first. An abandoned book is an incomplete manifold; the reading fell off the surface at the crease it could not cross.'}
                    {'\n\n**Here the geometry closes.** The fold gave the surface its bends, the chart gave the local flatness, curvature gave the round trip its angle — and the geodesic is what they were for: a straightest way through a thing that was never flat.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nFront to back is the geodesic: the reading that never steers, $\\nabla_{\\dot\\gamma}\\,\\dot\\gamma = 0$, on a surface only round trips can measure.'}
                </Section>
            </>
        );
    }
}

export const TheGeodesic = $($TheGeodesic);

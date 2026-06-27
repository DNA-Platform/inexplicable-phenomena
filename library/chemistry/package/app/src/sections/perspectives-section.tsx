import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import ColorPerspectivesDemo from './perspectives-color/case-1';
import colorSource from './perspectives-color/case-1.tsx?raw';
import BookPerspectivesDemo from './perspectives-book/case-1';
import bookSource from './perspectives-book/case-1.tsx?raw';
import LookPerspectivesDemo from './perspectives-look/case-1';
import lookSource from './perspectives-look/case-1.tsx?raw';

export function PerspectivesCases() {
    return (
        <>
            <CaseShell
                caseId="one color"
                subject="One color, four lenses — $Color augmented from outside by four subclasses; the menu previews each, the stage shows the picked one"
                pass="swatch · hex · rgb · hsl each preview live and open full on click; $Color was never edited"
                fail="a lens is blank, the page jumps, or a lens required changing $Color"
                source={colorSource}
                demo={<ColorPerspectivesDemo />}
            />
            <CaseShell
                caseId="the book"
                subject="Perspectival augmentation — a $Book gains four ways of being seen, added from outside by subclassing; the menu previews each face live"
                pass="cover · synopsis · reading · links each preview live and open full on click; the stage is fixed, so nothing jumps; $Book was never edited"
                fail="a preview is blank, the page jumps when switching, or a perspective required editing $Book"
                source={bookSource}
                demo={<BookPerspectivesDemo />}
            />
            <CaseShell
                caseId="the element"
                subject="The vertical axis — one live $PeriodicCell walked up and down its own inheritance with look('up'/'down'); ▲ reverts toward the bare symbol, ▼ specializes back"
                pass="▲/▼ walk cell · named · symbol and back; the breadcrumb tracks and the ends grey at the clamps; one live instance, never re-created"
                fail="a tier is blank, the stage jumps, or reaching a tier needed a menu or reveal"
                source={lookSource}
                demo={<LookPerspectivesDemo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'perspectives',
    cases: 3,
    Component: PerspectivesCases,
};

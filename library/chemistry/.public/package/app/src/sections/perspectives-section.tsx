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
                subject="One color, four looks — $Color declares view, $view, $$view and $$$view, each named by @look; the menu previews every one of them live and the stage shows the picked one"
                pass="swatch · hex · rgb · hsl each preview live and open full on click; dragging hue moves all four at once, because they draw ONE object"
                fail="a look is blank, the page jumps, or the tiles disagree with the stage"
                source={colorSource}
                demo={<ColorPerspectivesDemo />}
            />
            <CaseShell
                caseId="the book"
                subject="Four looks on one book — the cover, the synopsis, the reading order and the network, each a member of the series and each named by @look"
                pass="cover · synopsis · reading · links each preview live and open full on click; the stage is fixed, so nothing jumps"
                fail="a preview is blank, or the page jumps when switching"
                source={bookSource}
                demo={<BookPerspectivesDemo />}
            />
            <CaseShell
                caseId="the element"
                subject="Looks as GRADES rather than alternatives — one live $PeriodicCell whose series runs from the full cell to a bare symbol; ▲ steps toward the barest, ▼ back toward the fullest"
                pass="▲/▼ walk cell · named · symbol and back; the breadcrumb tracks $look and the ends grey at the bounds; one live instance, never re-created — and the panel repaints because the cell is a bonded child"
                fail="a grade is blank, the stage jumps, or the breadcrumb disagrees with what is drawn"
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

import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import FiguresDemo from './formula/figures';
import figuresSource from './formula/figures.tsx?raw';
import Case1Demo from './formula/case-1';
import case1Source from './formula/case-1.tsx?raw';
import Case2Demo from './formula/case-2';
import case2Source from './formula/case-2.tsx?raw';
import Case3Demo from './formula/case-3';
import case3Source from './formula/case-3.tsx?raw';

export function FormulaCases() {
    return (
        <>
            <CaseShell
                caseId="one word, six worlds"
                subject="The same tag six times — only the word inside differs, and `look` flips all six to their other drawing"
                pass="six unrelated visual languages from one tag; both dials move every tile at once; look 0 and look 1 redraw all of them"
                fail="two words draw the same thing, a dial moves only one tile, or look changes nothing"
                source={figuresSource}
                demo={<FiguresDemo />}
            />
            <CaseShell
                caseId="the type system"
                subject="A type enforces structure — the word chooses the law a composition is held to"
                pass="the same three parts pass as a Dictionary and fail as a Biography, each offending part named by position"
                fail="a claim passes on structure it forbids, or a complaint names no part"
                source={case1Source}
                demo={<Case1Demo />}
            />
            <CaseShell
                caseId="the climb"
                subject="An ancestor answers to a descendant's name — a sibling's never climbed there, and this branch has no default"
                pass="one verdict under three widths of tag; a cross-branch ask and an unclaimed word both refused, each naming what the branch holds"
                fail="a width differs, a cross-branch ask resolves, or a miss quietly falls back"
                source={case2Source}
                demo={<Case2Demo />}
            />
            <CaseShell
                caseId="the re-dress"
                subject="A scope can stand a stricter class behind the same word, without touching the catalogue"
                pass="the same tag passes on the left and fails on the right, naming the chapter count this library asks for"
                fail="both panels agree, or the registration reaches the plain one"
                source={case3Source}
                demo={<Case3Demo />}
            />
        </>
    );
}

export const sectionData = {
    id: 'formula',
    cases: 4,
    Component: FormulaCases,
};

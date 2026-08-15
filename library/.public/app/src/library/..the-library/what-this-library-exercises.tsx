import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Section, Title } from '@dna-platform/lib';

export class $WhatThisLibraryExercises extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>What This Library Exercises</Title>
                    {'\n\nNothing here is written for its own sake. Every folder and every file was placed to make some rule of the arrangement have to answer for itself, and a rule that nothing here tests is a rule nobody has checked.'}
                    {'\n\nThe ranking is exercised at three grades at once. This book wears two dots because it speaks for a library that holds subjects; each subject wears one because it stands over books alone; and each book wears none at all. A reader can see the depth of the whole arrangement without opening anything.'}
                    {'\n\nCode is exercised as a resource. One chapter in The Standard Model draws a figure, and the figure lives in a file named for that chapter with a double dash between them. It is lifted and compiled like everything else and composed into nothing, because writing code is specifying semantics rather than adding a chapter.'}
                    {'\n\nSilence is exercised deliberately. Gauge Theory names no author on its cover, so anything that assembles this library has to supply one from where the book sits rather than from what it says. A convention that is never left unsaid has never been tested.'}
                    {'\n\nAnd both halves of canonicality stand here. Physics declares which of its books speaks for it; Philosophy declares nothing and must fall back to the first. Between them they cover the whole of the rule, which is what a corpus is for.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nThree grades of ranking, a resource, a deliberate silence, and both halves of canonicality.'}
                </Section>
            </>
        );
    }
}

export const WhatThisLibraryExercises = $($WhatThisLibraryExercises);

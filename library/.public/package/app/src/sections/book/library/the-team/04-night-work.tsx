import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $NightWork extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Night Work</Title>
                    {'\n\nThe second book was about pointing, and it was written at night because everything in it is a thing that only shows up when you stop looking directly at it.'}
                    {'\n\nA reference, we thought, was an address. You write down where a thing is and later you go there. We built that. It worked, and it was wrong, and the way we found out is the reason this chapter exists: a string that says where something is has already stopped being a reference. It has become a description of a reference — and descriptions rot, because the thing described moves and the description does not.'}
                    {'\n\nThe correction was one sentence and it cost a week: a reference is passed as a reference. Not as a path, not as a key, not as a number you look up later. The address machinery came out — the walk, the climb, the string form — and what was left was smaller and could not lie.'}
                    {'\n\nThe other thing that book taught us was how a reference gets seen. We had been building furniture around them: a button beside a title, a label reading entry four, a dotted underline announcing that a name was clickable. Three rounds of that, each one satisfying the last correction and breaking the same law again. The answer was that a name is already the reference. You do not decorate a thing to tell people it is what it is.'}
                    {'\n\nThat is not a UI opinion. It is the same claim as the sheet: the reference is not something applied to a name. It is what the name already was, and every affordance we added was an apology for not believing it.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nAddresses died, references stayed, and a name turned out to need nothing bolted to it.'}
                </Section>
            </>
        );
    }
}

export const NightWork = $($NightWork);

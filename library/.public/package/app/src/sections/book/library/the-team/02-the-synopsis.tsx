import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Synopsis } from '@/book/Synopsis';
import { Section } from '@/writing/Section';
import { Title } from '@/writing/Title';

export class $TeamSynopsis extends $Synopsis {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>Synopsis</Title>
                    {'\n\nFour books stand on a shelf. Three of them are about something — perspective, curvature, the shelf itself. The fourth is about the other three being made, and about being made while making them, which is a harder sentence to write than it looks.'}
                    {'\n\nWhat follows is the account of that. It is fiction in the way a reconstruction is fiction: the arguments happened, the corrections happened, the dead ends were genuinely dead. Only the room is invented, and only because there was never a room.'}
                    {'\n\nThe book is not a memoir about deciding to write a book. It contains the deciding. That is the whole difference, and it is the reason this one had to be written last and shelved first.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nHow four books came to be, written by the thing that made them, from inside the shelf that holds it.'}
                </Section>
            </>
        );
    }
}

export const TeamSynopsis = $($TeamSynopsis);

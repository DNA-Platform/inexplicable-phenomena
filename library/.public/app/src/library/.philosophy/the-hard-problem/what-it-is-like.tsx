import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Chapter, Section, Title } from '@dna-platform/lib';

export class $WhatItIsLike extends $Chapter {
    view(): ReactNode {
        return (
            <>
                <Section>
                    <Title>What It Is Like</Title>
                    {'\n\nAn account of a mechanism can be complete and still leave a question standing: why is there something it is like to be the thing the mechanism describes? Nothing in the account rules the question out, and nothing in it answers.'}
                </Section>
                <Section parenthetical>
                    <Title>Summary</Title>
                    {'\n\nA complete mechanism, and the question left standing beside it.'}
                </Section>
            </>
        );
    }
}

export const WhatItIsLike = $($WhatItIsLike);

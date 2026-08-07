import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '@/writing/Sentence';
import { $Title } from '@/writing/Title';
import { Heading, Plate, PlateCaption, Rule } from '../../../the-team.styled';

export class $Heading extends $Title {
    view(): ReactNode {
        return <Heading>{this.copy}</Heading>;
    }
}

export class $Figure extends $Sentence {
    view(): ReactNode {
        return (
            <Plate>
                <PlateCaption>{this.copy}</PlateCaption>
                {this.drawn()}
            </Plate>
        );
    }

    drawn(): ReactNode {
        return <Rule />;
    }
}

export const ChapterHeading = $($Heading);
export const Figure = $($Figure);

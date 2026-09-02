import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '@/writing/Sentence';
import { Ribbon, ReturnMark } from '../../manifold.styled';

const ink = '#274a3a';

export class $RibbonMark extends $Sentence {
    $spot = '';
    // Where this ribbon hangs among the others. The demo's own business — it used
    // to borrow the model's index, which was app state kept in the writing.
    $slot = 0;

    get deep(): boolean {
        return this.$spot.split('.').length > 1;
    }

    view(): ReactNode {
        return (
            <Ribbon
                data-ribbon
                $ink={ink}
                $slot={this.$slot}
                $deep={this.deep}
                title={`the ribbon — ${this.copy}`}
            />
        );
    }
}

export class $Return extends $Sentence {
    $spot = '';

    view(): ReactNode {
        return (
            <ReturnMark data-return title={`the way back — ${this.copy}`}>
                ↩
            </ReturnMark>
        );
    }
}

export const RibbonMark = $($RibbonMark);
export const Return = $($Return);

import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Bookmark } from '@/book/Bookmark';
import { Ribbon, ReturnMark } from '../../manifold.styled';

const ink = '#274a3a';

export class $RibbonMark extends $Bookmark {
    get deep(): boolean {
        return this.for.replace(/^#/, '').split('.').length > 1;
    }

    view(): ReactNode {
        return (
            <Ribbon
                data-ribbon
                $ink={ink}
                $slot={this.index}
                $deep={this.deep}
                title={`the ribbon — ${this.copy}`}
            />
        );
    }
}

export class $Return extends $Bookmark {
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

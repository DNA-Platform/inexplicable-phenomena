import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Paragraph } from '../writing/Paragraph';
import { $Key } from './Key';

export class $Legend extends $Paragraph {
    $keys: $Key[] = [];

    $parenthetical? = true;

    get keys(): $Key[] { return this.$keys; }
    get copy(): string { return this.keys.map(k => k.copy).join(' '); }

    view(): ReactNode {
        if (this.parenthetical) return null;
        return <span className="legend">{this.keys.map(k => k.$name).join(' · ')}</span>;
    }

    valid(): boolean {
        return true;
    }
}

export const Legend = $($Legend);

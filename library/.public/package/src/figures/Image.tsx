import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { $Figure } from './Figure';

export class $Image extends $Figure {
    override write(): ReactNode {
        const source = this.contents || html.copy(this.text);
        return (
            <img
                src={source}
                alt={this.$identifier}
            />
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-image');
    }
}

export const Image = $($Image);

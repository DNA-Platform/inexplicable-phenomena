import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { $Figure } from './Figure';

export class $Document extends $Figure {
    override write(): ReactNode {
        const source = this.contents || html.copy(this.text);
        return (
            <object
                data={source}
                aria-label={this.$identifier}
            >
                <a href={source}>{source}</a>
            </object>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-document');
    }
}

export const Document = $($Document);

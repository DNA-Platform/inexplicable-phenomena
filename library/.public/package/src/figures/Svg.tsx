import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { $Figure } from './Figure';

export class $Svg extends $Figure {
    override write(): ReactNode {
        const written = html.copy(this.text);
        const markup = this.contents || (written.trimStart().startsWith('<') ? written : '');
        return markup === '' ? super.write() : <span dangerouslySetInnerHTML={{ __html: markup }} />;
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-svg');
    }
}

export const Svg = $($Svg);

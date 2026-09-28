import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Figure } from './Figure';

export class $Svg extends $Figure {
    override write(): ReactNode {
        const markup = this.contents;
        return markup === '' ? super.write() : <span dangerouslySetInnerHTML={{ __html: markup }} />;
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-svg');
    }
}

export const Svg = $($Svg);

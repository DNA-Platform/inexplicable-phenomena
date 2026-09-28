import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Figure } from './Figure';

// AN SVG IS A FIGURE THAT DRAWS MARKUP INLINE: an appended file's text set as the letter's own markup,
// or the author's own elements drawn as written. What an append holds is a library's own file, and
// it is drawn as it is.
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

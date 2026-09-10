import { $, select } from '@dna-platform/chemistry';
import type { $Figure } from '@/writing/Figure';
import { $Format } from './Format';

export class $FigureFormat extends $Format {
    $measure = '100%';

    @select('> figure.pd-figure img') get image_maxWidth() { return this.$measure; }

    protected override handed(): Record<string, unknown> {
        return { measure: (this.parent as $Figure | undefined)?.$measure ?? '100%' };
    }
}

export const FigureFormat = $($FigureFormat);

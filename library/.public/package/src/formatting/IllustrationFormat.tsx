import { $, select } from '@dna-platform/chemistry';
import type { $Image } from '@/writing/Image';
import { $Format } from './Format';

export class $IllustrationFormat extends $Format {
    // THE PICTURE INSIDE A FIGURE SAYS SO NOW - it carries pd-image where it carried nothing -
    // and this STILL names the elements, because an illustration IS an image so the figure
    // answers .pd-image as well. Measured both ways: the classes alone move the paper 138px.
    @select('> figure.pd-illustration img, > img.pd-image') get image_width() { return this.shown()?.$width ?? 'auto'; }
    get image_height() { return this.shown()?.$height ?? 'auto'; }

    protected shown(): $Image | undefined {
        return ((this.$of ?? this).parent) as $Image | undefined;
    }
}

export const IllustrationFormat = $($IllustrationFormat);

import { $, select } from '@dna-platform/chemistry';
import type { $Image } from '@/writing/Image';
import { $Format } from './Format';

export class $IllustrationFormat extends $Format {
    // THE ELEMENT SAYS WHAT THE CLASS CANNOT. An illustration IS an image, so its <img> wears
    // pd-illustration too - and a selector naming the classes alone cannot tell the figure from
    // the picture inside it. Measured: the figure drew at 343px against 624.
    @select('> figure.pd-illustration img, > img.pd-image') get image_width() { return this.shown()?.$width ?? 'auto'; }
    get image_height() { return this.shown()?.$height ?? 'auto'; }

    protected shown(): $Image | undefined {
        return ((this.$of ?? this).parent) as $Image | undefined;
    }
}

export const IllustrationFormat = $($IllustrationFormat);

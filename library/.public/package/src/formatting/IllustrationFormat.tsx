import { $, select } from '@dna-platform/chemistry';
import type { $Image } from '@/writing/Image';
import { $Format } from './Format';

export class $IllustrationFormat extends $Format {
    @select('> figure.pd-illustration img, > img.pd-image') get image_width() { return this.shown()?.$width ?? 'auto'; }
    get image_height() { return this.shown()?.$height ?? 'auto'; }

    protected shown(): $Image | undefined {
        return ((this.$of ?? this).parent) as $Image | undefined;
    }
}

export const IllustrationFormat = $($IllustrationFormat);

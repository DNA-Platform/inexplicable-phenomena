import { ReactNode } from 'react';
import { $, $Block, $check, select } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { reflection } from '@/utilities/Reflection';
import { $Paragraph$, $Paragraph, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { $Format } from './Format';
import { TypeOfSentence } from './Sentence';
import { TypeOfDescription } from './Description';

export interface $Image$ extends $Paragraph$ {
    source: string;
}

export class $Image extends $Paragraph implements $Image$ {
    $source = '';
    $width = 'auto';
    $height = 'auto';

    get source(): string { return this.$source; }

    $Image(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfImage).concat($check(shownStyle, '!')));
    }

    override view(): ReactNode {
        return reflection.formatted(this, <img src={this.source} alt={html.text(this._block)} className={this.className} />);
    }
}

export class $TypeOfImage extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new ImageSpecification();
}

export class ImageSpecification extends ParagraphSpecification {
    @specify('an image shows something')
    $showsSomething(writing: $Writing): void {
        $check(reflection.is<$Image>(writing, $TypeOfImage) && writing.source !== '',
            'an image shows something, and this one shows nothing');
    }
}

export const Image = $($Image);
export const TypeOfImage = $($TypeOfImage);

export class $IllustrationFormat extends $Format {
    @select('> figure.pd-illustration img, > img.pd-image') get image_width() { return this.shown()?.$width ?? 'auto'; }
    get image_height() { return this.shown()?.$height ?? 'auto'; }

    protected shown(): $Image | undefined {
        return ((this.$of ?? this).parent) as $Image | undefined;
    }
}

export const IllustrationFormat = $($IllustrationFormat);
const shownStyle = IllustrationFormat;

$(Image, TypeOfSentence)(TypeOfDescription);

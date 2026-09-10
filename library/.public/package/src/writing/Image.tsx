import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Paragraph$, $Paragraph, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { IllustrationFormat as shownStyle } from '@/formatting/IllustrationFormat';

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

    override print(content: ReactNode): ReactNode {
        return <img src={this.source} alt={html.text(this._block)} className={this.className} />;
    }
}

export class $TypeOfImage extends $TypeOfParagraph {
    protected override specification: Specification<$Writing> = new ImageSpecification();
}

export class ImageSpecification extends ParagraphSpecification {
    @specify('an image shows something')
    $showsSomething(writing: $Writing): void {
        $check(writing instanceof $Image && writing.source !== '',
            'an image shows something, and this one shows nothing');
    }
}

export const Image = $($Image);
export const TypeOfImage = $($TypeOfImage);

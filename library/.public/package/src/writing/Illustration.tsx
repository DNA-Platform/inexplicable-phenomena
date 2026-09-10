import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Paragraph$, $TypeOfParagraph, ParagraphSpecification } from './Paragraph';
import { $Paragraph } from '@/writing/Paragraph';

export interface $Illustration$ extends $Paragraph$ {
    source: string;
    caption: string;
}

export class $Illustration extends $Paragraph implements $Illustration$ {
    $source = '';

    get source(): string { return this.$source; }
    get caption(): string { return html.text(this._block); }

    $Illustration(block: $Block) {
        super.$Paragraph(this.addType(block, $TypeOfIllustration));
    }

    override print(content: ReactNode): ReactNode {
        return (
            <figure className={this.className}>
                <img src={this.source} alt={this.caption} />
                <figcaption>{content}</figcaption>
            </figure>
        );
    }
}

export class $TypeOfIllustration extends $TypeOfParagraph {
    override name = 'Illustration';
    protected override specification: Specification<$Writing> = new IllustrationSpecification();
}

export class IllustrationSpecification extends ParagraphSpecification {
    @specify('an illustration shows something')
    $showsSomething(writing: $Writing): void {
        $check(writing instanceof $Illustration && writing.source !== '',
            'an illustration shows something, and this one shows nothing');
    }
}

export const Illustration = $($Illustration);
export const TypeOfIllustration = $($TypeOfIllustration);

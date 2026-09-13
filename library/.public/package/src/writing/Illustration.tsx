import { ReactNode } from 'react';
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Writing } from '@/writing/Writing';
import { $Image$, $Image, $TypeOfImage, ImageSpecification } from './Image';
import { TypeOfSentence } from './Sentence';
import { TypeOfCaption } from './Description';

export interface $Illustration$ extends $Image$ {
    caption: string;
}

export class $Illustration extends $Image implements $Illustration$ {
    get caption(): string { return html.text(this._block); }

    $Illustration(block: $Block) {
        super.$Image(this.addType(block, $TypeOfIllustration));
    }

    override view(): ReactNode {
        return <figure className={this.className}>{this.print()}</figure>;
    }

    override print(): ReactNode {
        return (
            <>
                <img src={this.source} alt={this.caption} className="pd-image" width={html.sized(this.$width)} height={html.sized(this.$height)} />
                <figcaption className="pd-caption">{super.print()}</figcaption>
            </>
        );
    }
}

export class $TypeOfIllustration extends $TypeOfImage {
    protected override specification: Specification<$Writing> = new IllustrationSpecification();
}

export class IllustrationSpecification extends ImageSpecification { }

export const Illustration = $($Illustration);
export const TypeOfIllustration = $($TypeOfIllustration);

$(Illustration, TypeOfSentence)(TypeOfCaption);

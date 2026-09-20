import { ReactNode } from 'react';
import { $, $Block } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
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

    // A FIGURE CARRIES THE ID A FOLD GIVES IT, as every element the base draws does. An image must
    // draw its own element, so this cannot lean on the base's view; measured 2026-09-20, a
    // `[[[ ]]]` allocated on a plate planted no id, because the fold's key never reached the figure.
    override view(): ReactNode {
        return <figure id={reflection.folded(this)?.key()} className={this.className}>{this.print()}</figure>;
    }

    override print(): ReactNode {
        return (
            <>
                {this.picture()}
                <figcaption className="pd-caption">{super.print()}</figcaption>
            </>
        );
    }

    // THE PICTURE ITSELF, WHICH IS THE ONE THING A KIND OF ILLUSTRATION CHANGES. A figure and its
    // caption are the same whatever is shown, so the base declares where the picture goes and a kind
    // overrides that alone. `picture` is a PROXY NAME, flagged for Doug.
    picture(): ReactNode {
        return <img src={this.source} alt={this.caption} className="pd-image" width={html.sized(this.$width)} height={html.sized(this.$height)} />;
    }
}

export class $TypeOfIllustration extends $TypeOfImage {
    protected override specification: Specification<$Writing> = new IllustrationSpecification();
}

export class IllustrationSpecification extends ImageSpecification { }

export const Illustration = $($Illustration);
export const TypeOfIllustration = $($TypeOfIllustration);

$(Illustration, TypeOfSentence)(TypeOfCaption);

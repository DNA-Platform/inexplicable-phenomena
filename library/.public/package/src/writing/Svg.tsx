import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Illustration$, $Illustration, $TypeOfIllustration, IllustrationSpecification } from './Illustration';

// A PICTURE THAT IS WRITTEN RATHER THAN FETCHED. Every other illustration names a file somewhere and
// shows what comes back; this one holds its own marks, so a library can draw its own covers without
// asking anything outside itself for them. It is an illustration in every other respect — a figure,
// a caption, a place in the flow — and it overrides only the picture.
// `$marks` and `$box` are PROXY NAMES, flagged for Doug.
export interface $Svg$ extends $Illustration$ { }

export class $Svg extends $Illustration implements $Svg$ {
    $marks: ReactNode = undefined;
    $box = '0 0 100 100';

    $Svg(block: $Block) {
        super.$Illustration(this.addType(block, $TypeOfSvg));
    }

    override picture(): ReactNode {
        return (
            <svg className="pd-image" viewBox={this.$box} role="img" aria-label={this.caption}
                width={html.sized(this.$width)} height={html.sized(this.$height)} xmlns="http://www.w3.org/2000/svg">
                {this.$marks}
            </svg>
        );
    }
}

export class $TypeOfSvg extends $TypeOfIllustration {
    protected override specification: Specification<$Writing> = new SvgSpecification();
}

export class SvgSpecification extends IllustrationSpecification {
    @specify('a drawing holds its own marks rather than naming a file')
    override $showsSomething(writing: $Writing): boolean | void {
        $check(reflection.is<$Svg>(writing, $TypeOfSvg) && writing.$marks !== undefined,
            'a drawing holds its own marks, and this one holds none');
    }
}

export const Svg = $($Svg);
export const TypeOfSvg = $($TypeOfSvg);

// IN PROGRESS · rating 2. A format is an annotation WRITTEN INTO the writing it formats, found by formatted() and applied by wearing a fresh instance of its class around the drawing (probe P7) — its own $-props carried over, so <Ring globe="…"/> keeps its globe. A theme is a format that is a singleton with values.
import { ReactNode } from 'react';
import { $, $Block, $check, look, styled } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { $Writing, WritingSpecification } from '@/writing/Writing';
import { $Annotation$, $Annotation } from '@/writing/Annotation';
import { $Type } from '@/writing/Type';
import type { $Theme } from './Theme';

export interface $Format$ extends $Annotation$ { }

export class $Format extends $Annotation implements $Format$ {
    override selector: any = styled.div;
    $content: ReactNode = null;
    $of: $Format | null = null;

    override get theme(): $Theme { return this.$of === null ? reflection.theme(this) : this.$of.theme; }

    $Format(block: $Block) {
        super.$Writing($check(block, $Block).concat($check($TypeOfFormat, '!')));
    }

    override view(): ReactNode {
        return null;
    }

    @look('worn')
    override $view(): ReactNode {
        return <div>{this.$content}</div>;
    }

    override format(drawn: ReactNode): ReactNode {
        const Worn = reflection.sheet(this.constructor as new() => $Format);

        return <Worn of={this} {...this.handed()} look="worn" content={drawn} />;
    }

    // What the worn instance is handed besides the drawing; a format that carries a prop says so here.
    protected handed(): Record<string, unknown> {
        return {};
    }
}

export class $TypeOfFormat extends $Type {
    override name = 'Format';
    protected override specification: Specification<$Writing> = new FormatSpecification();
}

export class FormatSpecification extends WritingSpecification {
    @specify('a format says nothing of its own; it is worn')
    override $saysSomething(): boolean | void {
        return false;
    }
}

export const Format = $($Format);
export const TypeOfFormat = $($TypeOfFormat);

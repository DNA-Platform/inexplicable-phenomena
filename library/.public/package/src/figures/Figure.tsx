import { ReactNode } from 'react';
import { $, $check } from '@dna-platform/chemistry';
import { specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { $Letter, LetterSpecification } from '@/writing/Letter';
import { $Chapter } from '@/libraries/Chapter';
import { $Append } from '@/writing/Append';

export class $Figure extends $Letter {
    specification = new FigureSpecification();
    $identifier = '';
    $type = '';

    get chapter(): $Chapter | undefined {
        let above = this.parent;
        while (above !== undefined && !(above instanceof $Chapter) && above !== above.parent)
            above = above.parent;
        return above instanceof $Chapter ? above : undefined;
    }
    get names(): boolean { return this.$identifier !== '' || this.$type !== ''; }
    get append(): $Append | undefined {
        if (!this.names) return undefined;
        return this.chapter?.annotations.find($Append).find(append =>
            append.$identifier === this.$identifier && (this.$type === '' || append.$type === this.$type));
    }
    get contents(): string {
        const append = this.append;
        return append === undefined ? '' : html.copy(append.text);
    }

    override write(): ReactNode {
        return (
            <>
                {super.write()}
                {this.contents}
            </>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-figure');
    }
}

export class FigureSpecification extends LetterSpecification {
    @specify('a figure names an append its chapter holds')
    $namesAnAppend(figure: $Figure): void {
        $check(!figure.names || figure.append !== undefined,
            `a figure names an append its chapter holds, and this one names "${figure.$identifier}" of type "${figure.$type}", which the chapter does not hold`);
    }
}

export const Figure = $($Figure);

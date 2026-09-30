import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { $Paragraph } from './Paragraph';
import { Typesetter, typesetting } from './Math';

export class $Equation extends $Paragraph {
    $typesetter: Typesetter = typesetting;
    get tex(): string { return html.copy(this.text).trim(); }

    override write(): ReactNode {
        return <span dangerouslySetInnerHTML={{ __html: this.$typesetter(this.tex, true) }} />;
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-equation');
    }
}

export const Equation = $($Equation);

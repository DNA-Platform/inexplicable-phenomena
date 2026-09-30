import { ReactNode } from 'react';
import katex from 'katex';
import { $ } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { $Word } from './Word';

export type Typesetter = (tex: string, display: boolean) => string;

export const typesetting: Typesetter = (tex, display) =>
    katex.renderToString(tex, { displayMode: display, throwOnError: false });

export class $Math extends $Word {
    $typesetter: Typesetter = typesetting;
    get tex(): string { return html.copy(this.text).trim(); }

    override write(): ReactNode {
        return <span dangerouslySetInnerHTML={{ __html: this.$typesetter(this.tex, false) }} />;
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-math');
    }
}

export const Math = $($Math);

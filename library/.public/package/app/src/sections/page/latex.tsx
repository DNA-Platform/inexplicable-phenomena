import React, { type ReactNode } from 'react';
import katex from 'katex';
import { $, $check, $Chemical, type $Html } from '@dna-platform/chemistry';
import { text } from '@/utilities/html';

export class $Latex extends $Chemical {
    text?: $Html<'block'>;
    inline = true;
    $display? = false;

    get copy(): string { return text(this.text); }

    $Latex(source?: $Html<'block'>) {
        this.text = $check(source, 'block');
    }

    view(): ReactNode {
        const html = katex.renderToString(this.copy, { displayMode: !!this.$display, throwOnError: false });
        return <span className="latex" dangerouslySetInnerHTML={{ __html: html }} />;
    }
}

export const Latex = $($Latex);

import React, { type ReactNode } from 'react';
import katex from 'katex';
import { $, $check, $Chemical, type $Html } from '@dna-platform/chemistry';
import { text } from '@/utilities/html';

export class $Latex extends $Chemical {
    block?: $Html<'block'>;
    inline = true;
    $display? = false;

    get copy(): string { return text(this.block); }

    $Latex(block?: $Html<'block'>) {
        this.block = $check(block, 'block');
    }

    view(): ReactNode {
        const html = katex.renderToString(this.copy, { displayMode: !!this.$display, throwOnError: false });
        return <span className="latex" dangerouslySetInnerHTML={{ __html: html }} />;
    }
}

export const Latex = $($Latex);

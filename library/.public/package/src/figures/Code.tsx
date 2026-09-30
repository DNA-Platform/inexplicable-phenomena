import { ReactNode } from 'react';
import hljs from 'highlight.js';
import { $ } from '@dna-platform/chemistry';
import { html } from '@/utilities/Html';
import { Block as block } from '@/writing/Composition';
import { $Figure } from './Figure';

export type Highlighter = (text: string, language: string) => string;

export const highlighting: Highlighter = (text, language) =>
    hljs.getLanguage(language) === undefined
        ? text.replace(/[&<>]/gu, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[character]!)
        : hljs.highlight(text, { language, ignoreIllegals: true }).value;

export class $Code extends $Figure {
    $language = '';
    $numbered = false;
    $highlighter: Highlighter = highlighting;
    get language(): string { return this.$language || this.append?.$type.replace(/^\./u, '') || ''; }
    get listing(): string {
        const marked = this.$highlighter(this.names ? this.contents : html.copy(this.text), this.language);
        if (!this.$numbered) return marked;
        const open: string[] = [];
        return marked.split('\n').map(line => {
            const carried = open.join('');
            for (const tag of line.match(/<\/?span[^>]*>/gu) ?? [])
                if (tag.startsWith('</')) open.pop(); else open.push(tag);
            return `<span class="pd-code-line">${carried}${line}${'</span>'.repeat(open.length)}</span>`;
        }).join('\n');
    }

    override write(): ReactNode {
        return (
            <pre><code className={this.language === '' ? undefined : `language-${this.language}`} dangerouslySetInnerHTML={{ __html: this.listing }} /></pre>
        );
    }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-code');
        const Block = $(block);
        this.annotations.add(this,
            <Block />
        );
    }
}

export const Code = $($Code);

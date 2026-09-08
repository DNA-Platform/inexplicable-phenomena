import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { lexer } from 'marked';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { parser } from '@/utilities/Parser';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Phrase$, $TypeOfPhrase, PhraseSpecification } from '@/writing/Phrase';
import { Word as word } from '@/writing/Word';
import { $Path, $TypeOfPath } from './Path';

export interface $Ref$ extends $Phrase$ {
    path(): $Path | undefined;
    url(): string | undefined;
    written(): string;
}

export class $Ref extends $Composition implements $Ref$ {
    $path?: string;

    path(): $Path | undefined { return this.searchForOne<$Path>($TypeOfPath); }
    url(): string | undefined { return html.text(this.path()?._block) || this.$path || this.link()?.url; }
    written(): string { return this.link()?.text ?? html.text(this._block); }

    $Ref(block: $Block) {
        super.$Composition($check(block, $Block, '!').concat($check($TypeOfRef, '!')));
    }

    override view(): ReactNode {
        const url = this.url();
        if (url === undefined) return super.view();

        // IT WRITES ITS OWN ELEMENT AND MUST WRITE ITS OWN CLASSES. Overriding view() rather than
        // print() means $Writing.view never runs, so this anchor got neither its pd- classes nor
        // reflection.formatted — measured: 32 of 33 anchors on /turing unreachable by any sheet, and
        // no format can ever reach a reference. The class is added; that view() overrides at all is
        // the finding underneath, and it is the same shape as every wrapper we removed.
        return <a href={url} className={this.className}>{this.written()}</a>;
    }

    async read(): Promise<$Writing> {
        const url = this.url();
        if (url === undefined) throw new Error('a reference reads to what it means, and this one holds nothing to read');
        const fragment = url.startsWith('#') ? url.slice(1) : url;
        const book = this.book;
        const held = book instanceof $Composition ? book.catalogue() : undefined;
        if (/^\d/.test(fragment) && held !== undefined) return held.follow(fragment);
        throw new Error('a reference reads to what it means, and this route is the application to follow');
    }

    protected link(): { text: string; url: string } | undefined {
        const copy = html.text(this._block);
        if (!copy.startsWith('[')) return undefined;
        for (const token of lexer(copy)) {
            if (token.type !== 'paragraph') continue;
            for (const inline of (token as { tokens?: { type: string; text: string; href: string }[] }).tokens ?? [])
                if (inline.type === 'link') return { text: inline.text, url: inline.href };
        }
        return undefined;
    }

    protected override reduce(tokens: (string | $Writing)[]): $Writing[] {
        const text = this.link()?.text ?? parser.text(tokens);
        const Word = $(word);

        return text.split(/\s+/u).filter(piece => piece !== '').map(piece => $(<Word>{piece}</Word>));
    }
}

export class $TypeOfRef extends $TypeOfPhrase {
    override name = 'Ref';
    protected override specification: Specification<$Writing> = new RefSpecification();
}

export class RefSpecification extends PhraseSpecification {
    @specify('a ref names a target')
    $namesTarget(writing: $Writing): void {
        $check(writing instanceof $Ref && writing.url() !== undefined, 'a ref names a target, and this one names none');
    }
}

export const Ref = $($Ref);
export const TypeOfRef = $($TypeOfRef);

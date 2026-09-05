import { ReactNode } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { lexer } from 'marked';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { parser } from '@/utilities/Parser';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Phrase$, $TypeOfPhrase, PhraseSpecification } from '@/writing/Phrase';
import { Word as word } from '@/writing/Word';
import { AnchorFormat as anchor } from '@/encyclopedia/AnchorFormat';
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
        super.$Composition(block);
        if (reflection.is(this, $TypeOfRef)) return;
        this._block.$elements = [...(this._block.$elements ?? []), $check(typeOfRef, '!')];
    }

    override view(): ReactNode {
        const url = this.url();
        if (url === undefined) return super.view();
        const Anchor = $(anchor);

        return <Anchor href={url}>{this.written()}</Anchor>;
    }

    async read(): Promise<$Writing> {
        const url = this.url();
        if (url === undefined) throw new Error('a reference reads to what it means, and this one holds nothing to read');
        const fragment = url.startsWith('#') ? url.slice(1) : url;
        const book = this.book();
        if (/^(?:[A-Z][a-z]?:)?\d/.test(fragment) && book instanceof $Composition) return book.catalogue().follow(fragment);
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

    @specify('a ref points, and its url is not prose')
    override $stopsAtItsEnd(writing: $Writing): boolean | void {
        if (writing instanceof $Ref) return false;
        return super.$stopsAtItsEnd(writing);
    }
}

export const Ref = $($Ref);
export const TypeOfRef = $($TypeOfRef);
const typeOfRef = TypeOfRef;

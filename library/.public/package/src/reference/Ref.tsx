import { ReactNode } from 'react';
import { reflection } from '@/utilities/Reflection';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { lexer } from 'marked';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { parser } from '@/utilities/Parser';
import { $Writing } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Phrase$, $TypeOfPhrase, PhraseSpecification, $Phrase } from '@/writing/Phrase';
import { Word as word } from '@/writing/Word';
import { $Path, $TypeOfPath } from './Path';
import { folded } from './Fold';

export interface $Ref$ extends $Phrase$ {
    path(): $Path | undefined;
    url(): string | undefined;
    written(): string;
}

export class $Ref extends $Phrase implements $Ref$ {
    $path?: string;

    path(): $Path | undefined { return this.searchForOne<$Path>($TypeOfPath); }
    // A BARE KEY NAMES A FOLD. Markdown's own syntax already affords it — [Cook 1971](cook) — and
    // Doug asked for exactly that: "do you use Ref as much as you can and the markdown reference
    // syntax it affords?" A target with no scheme, no slash and no hash is not a URL anybody meant;
    // it is the key a $PageFold denotes, so it is answered as the fragment that reaches it.
    url(): string | undefined {
        const copy = html.text(this._block).trim();
        const named = html.text(this.path()?._block) || this.$path || this.link()?.url || (/^[\w.:-]+(?:,\s*[\w.:-]+)*$/u.test(copy) ? copy.split(',')[0].trim() : undefined);
        return named !== undefined && /^[\w.:-]+$/u.test(named) && !/^\w+:/u.test(named) ? '#' + named : named;
    }
    written(): string { return this.link()?.text ?? html.text(this._block); }

    $Ref(block: $Block) {
        super.$Phrase(this.addType(block, $TypeOfRef));
    }

    // IT WRITES ITS OWN ELEMENT, and print is where a kind writes one. view() ran here until
    // sprint 57 and $Writing.view never did, so this anchor got neither its pd- classes nor
    // reflection.formatted — measured: 32 of 33 anchors on /turing unreachable by any sheet.
    override view(): ReactNode {
        const url = this.url();
        if (url === undefined) return super.view();

        return reflection.formatted(this, <a href={url} className={this.className}>{this.written()}</a>);
    }

    async read(): Promise<$Writing> {
        const url = this.url();
        if (url === undefined) throw new Error('a reference reads to what it means, and this one holds nothing to read');
        const fragment = url.startsWith('#') ? url.slice(1) : url;
        const held = this.document;
        if (/^\d/.test(fragment) && held !== undefined) return held.follow(fragment);
        const named = this.book?.scratchpad.find<$Writing>(folded(fragment));
        if (named !== undefined) return named;
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
    protected override specification: Specification<$Writing> = new RefSpecification();
}

export class RefSpecification extends PhraseSpecification {
    @specify('a ref names a target')
    $namesTarget(writing: $Writing): void {
        $check(reflection.is<$Ref>(writing, $TypeOfRef) && writing.url() !== undefined, 'a ref names a target, and this one names none');
    }
}

export const Ref = $($Ref);
export const TypeOfRef = $($TypeOfRef);

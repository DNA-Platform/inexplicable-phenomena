import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { lexer } from 'marked';
import { Link, useInRouterContext } from 'react-router-dom';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { $Word, Word } from '@/writing/Word';
import { $Phrase, $TypeOfPhrase, PhraseSpecification } from '@/writing/Phrase';
import { $$ } from '@/utilities/Lib';
import type { $Reference$ } from './Reference';
import { $Path, Path } from './Path';
import { Anchor } from '@/encyclopedia/Anchor';
import { parser } from '@/utilities/Parser';

const Routed = ({ to, children }: { to: string; children: ReactNode }) => useInRouterContext()
    ? <Link to={to}>{children}</Link>
    : <Anchor href={to}>{children}</Anchor>;

export class $Ref extends $Phrase implements $Reference$<$Writing> {
    $path?: string;

    get path(): $Path | undefined { return (this.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path); }
    get url(): string | undefined { return this.path?.copy ?? this.$path ?? this.link?.url; }
    get written(): string { return this.link?.text ?? this.copy; }

    $Ref(block: $Block) {
        super.$Phrase(block);
        this._type = $(<TypeOfRef />);
    }

    override view(): ReactNode {
        const url = this.url;
        if (url === undefined) return super.view();
        const internal = /^[A-Z][a-z]?:\d+/.test(url) || (URL.canParse(url, 'https://library') && new URL(url, 'https://library').origin === 'https://library');
        if (internal) return <Routed to={url}>{this.written}</Routed>;
        return <Anchor href={url}>{this.written}</Anchor>;
    }

    async read(): Promise<$Writing> {
        const url = this.url;
        if (url === undefined) throw new Error('a reference reads to what it means, and this one holds nothing to read');
        const path = this.path ?? $<$Path>(<Path>{url}</Path>);
        return path.read(this);
    }

    protected get link(): { text: string; url: string } | undefined {
        const copy = this.copy;
        if (!copy.startsWith('[')) return undefined;
        for (const token of lexer(copy)) {
            if (token.type !== 'paragraph') continue;
            for (const inline of (token as { tokens?: { type: string; text: string; href: string }[] }).tokens ?? [])
                if (inline.type === 'link') return { text: inline.text, url: inline.href };
        }
        return undefined;
    }

    protected override reduce(held: (string | $Writing)[]): $Word[] {
        const text = this.link?.text ?? parser.text(held);
        return text.split(/\s+/u).filter(one => one !== '').map(one => $<$Word>(<Word>{one}</Word>));
    }
}

export class $TypeOfRef extends $TypeOfPhrase {
    override get canonicalForm(): typeof $Writing { return $Ref; }

    constructor() {
        super();
        this[cache]('Ref');
    }

    protected override specification: Specification<$Writing> = new RefSpecification();
}

export class RefSpecification extends PhraseSpecification {
    @specify('a ref names a target')
    $namesTarget(writing: $Writing): void {
        $check($$(writing)($Ref) && $$(writing, $Ref).url !== undefined, 'a ref names a target, and this one names none');
    }

    @specify('a ref points, and its url is not prose')
    override $stopsAtItsEnd(writing: $Writing): boolean | void {
        if ($$(writing)($Ref)) return false;
        return super.$stopsAtItsEnd(writing);
    }
}

export const Ref = $($Ref);
export const TypeOfRef = $($TypeOfRef);

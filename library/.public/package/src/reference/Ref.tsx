import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { lexer } from 'marked';
import { Link, useInRouterContext } from 'react-router-dom';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { Word as word } from '@/writing/Word';
import { $Composition, $Composition$ } from '@/writing/Composition';
import { $TypeOfPhrase, PhraseSpecification } from '@/writing/Phrase';
import type { $Reference$ } from './Reference';
import { $Path } from './Path';
import { Anchor as anchor } from '@/writing/Writing';
import { parser } from '@/utilities/Parser';

const Routed = ({ to, children, anchor: Anchor }: { to: string; children: ReactNode; anchor: typeof anchor }) => useInRouterContext()
    ? <Link to={to}>{children}</Link>
    : <Anchor href={to}>{children}</Anchor>;

export class $Ref extends $Composition implements $Composition$, $Reference$ {
    override indent = 1;
    $path?: string;

    get path(): $Path | undefined { return (this.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path); }
    get url(): string | undefined { return this.path?.copy ?? this.$path ?? this.link?.url; }
    get written(): string { return this.link?.text ?? this.copy; }

    $Ref(block: $Block) {
        const TypeOfRef = $(typeOfRef);
        this.type ??= $(<TypeOfRef />);
        super.$Composition(block);
    }

    override view(): ReactNode {
        const url = this.url;
        if (url === undefined) return super.view();
        const Anchor = $(anchor);
        const internal = /^[A-Z][a-z]?:\d+/.test(url) || (URL.canParse(url, 'https://library') && new URL(url, 'https://library').origin === 'https://library');
        if (internal) return <Routed to={url} anchor={Anchor}>{this.written}</Routed>;

        return <Anchor href={url}>{this.written}</Anchor>;
    }

    async read(): Promise<$Writing> {
        const url = this.url;
        if (url === undefined) throw new Error('a reference reads to what it means, and this one holds nothing to read');
        const fragment = url.startsWith('#') ? url.slice(1) : url;
        const root = this.book();
        if (/^(?:[A-Z][a-z]?:)?\d/.test(fragment) && root instanceof $Composition) return root.catalogue().follow(fragment);
        throw new Error('a reference reads to what it means, and this route is the application to follow');
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

    protected override reduce(held: (string | $Writing)[]): $Writing[] {
        const text = this.link?.text ?? parser.text(held);
        const Word = $(word);
        return text.split(/\s+/u).filter(one => one !== '').map(one => $(<Word>{one}</Word>) as $Writing);
    }
}

export class $TypeOfRef extends $TypeOfPhrase {
    override name = 'Ref';

    constructor() {
        super();
        this[cache](this.name);
    }

    protected override specification: Specification<$Writing> = new RefSpecification();
}

export class RefSpecification extends PhraseSpecification {
    @specify('a ref names a target')
    $namesTarget(writing: $Writing): void {
        $check(writing instanceof $Ref && writing.url !== undefined, 'a ref names a target, and this one names none');
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

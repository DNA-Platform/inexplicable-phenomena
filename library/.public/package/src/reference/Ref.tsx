import { ReactNode } from 'react';
import { $Block, $, $check, cache } from '@dna-platform/chemistry';
import { lexer } from 'marked';
import { Link, useInRouterContext } from 'react-router-dom';
import { Specification, specify } from '@/utilities/Specification';
import { $Writing } from '@/writing/Writing';
import { Word } from '@/writing/Word';
import { $Composition, $Composition$ } from '@/writing/Composition';
import { $TypeOfPhrase, PhraseSpecification } from '@/writing/Phrase';
import type { $Reference$ } from './Reference';
import { $Path } from './Path';
import { Anchor } from '@/encyclopedia/Anchor';
import { parser } from '@/utilities/Parser';

const Routed = ({ to, children, held: Held }: { to: string; children: ReactNode; held: typeof Anchor }) => useInRouterContext()
    ? <Link to={to}>{children}</Link>
    : <Held href={to}>{children}</Held>;

export class $Ref extends $Composition implements $Composition$, $Reference$ {
    override indent = 1;
    $path?: string;

    get path(): $Path | undefined { return (this.block?.$elements ?? []).find((one): one is $Path => one instanceof $Path); }
    get url(): string | undefined { return this.path?.copy ?? this.$path ?? this.link?.url; }
    get written(): string { return this.link?.text ?? this.copy; }

    $Ref(block: $Block) {
        const Asked = $(TypeOfRef);
        this.type ??= $(<Asked />);
        super.$Composition(block);
    }

    override view(): ReactNode {
        const url = this.url;
        if (url === undefined) return super.view();
        const Asked = $(Anchor);
        const internal = /^[A-Z][a-z]?:\d+/.test(url) || (URL.canParse(url, 'https://library') && new URL(url, 'https://library').origin === 'https://library');
        if (internal) return <Routed to={url} held={Asked}>{this.written}</Routed>;

        return <Asked href={url}>{this.written}</Asked>;
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
        const Asked = $(Word);
        return text.split(/\s+/u).filter(one => one !== '').map(one => $(<Asked>{one}</Asked>) as $Writing);
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

import { ReactNode } from 'react';
import { $, $Block, $check, $Chemical, look, resolved, select, styled } from '@dna-platform/chemistry';
import { $Referent$ } from '@/reference/Referent';
import { Specification, specify } from '@/utilities/Specification';
import type { $Reference } from '@/reference/Reference';
import { html } from '@/utilities/Html';
import { reflection } from '@/utilities/Reflection';
import { parser } from '@/utilities/Parser';

export class $Writing extends $Chemical implements $Referent$ {
    inline = true;
    parenthetical = false;
    annotation = false;
    indent = 0;
    index = 0;
    block: $Block = undefined as any;
    type!: $Type;

    get copy(): string { return html.text(this.block); }
    get canonical(): boolean { return true; }
    get types(): $Type[] { return this.annotations.filter((one): one is $Type => one instanceof $Type); }
    get means(): $Reference | undefined { return (this.block?.$elements ?? []).find((one): one is $Reference => one instanceof $Writing && (one as $Reference).path !== undefined); }
    get $print(): boolean { return !this.parenthetical; }
    set $print(print: boolean) { this.parenthetical = !print; }
    get annotations(): $Writing[] { return (this.block?.$elements ?? []).filter((one): one is $Writing => one instanceof $Writing && one.annotation); }

    parts(): $Writing[] {
        const type = this.type;
        const below = type === undefined ? undefined : reflection.below(type);
        return parser.parse(this,
            token => {
                if (type !== undefined && token instanceof $Writing && token !== this && token.type instanceof (type.constructor as new () => $Type)) {
                    const mutual = type instanceof (token.type.constructor as new () => $Type);
                    if (mutual || reflection.indent(token) > 0) return token.parts();
                }
                if (below === undefined) return token;
                return reflection.is(token, below) ? token : undefined;
            },
            held => this.reduce(held),
            type !== undefined);
    }

    protected reduce(held: (string | $Writing)[]): $Writing[] {
        const below = this.type === undefined ? undefined : reflection.below(this.type);
        const make = below === undefined ? undefined : parser.makes.get(below);
        return make === undefined ? [] : make(held);
    }

    book(): $Writing {
        const up = this.parent;
        return up instanceof $Writing && up !== this ? up.book() : this;
    }

    $Writing(block: $Block) {
        this.block = block ?? this.block;
        const carried = this.types;
        const candidates = this.type === undefined ? carried : [...carried, this.type];
        this.type = candidates.find(one => reflection.level(one)) ?? candidates[0] ?? this.type;
    }

    view(): ReactNode {
        const Writing = this.block ? $(this.block) : null;
        const Anchor = $(anchor);
        const means = this.means;

        if (means?.path !== undefined)
            return <Anchor href={means.path.copy}>{Writing && <Writing />}</Anchor>;

        return <>
            {Writing && <Writing />}
        </>;
    }

    @look('back')
    $view(): ReactNode {
        return this.copy;
    }

    override frame(): ReactNode {
        const labels = reflection.classNames(this);
        if (labels.length === 0) return super.frame();
        return <div className={labels.join(' ')}>{super.frame()}</div>;
    }

    specify(): void {
        const ran = new Set<unknown>();
        for (const one of this.type === undefined ? this.types : [this.type, ...this.types]) {
            if (ran.has(one.constructor)) continue;
            ran.add(one.constructor);
            one.specifically(this);
        }
        for (const part of this.parts()) if (part !== this) part.specify();
    }

    valid(): boolean {
        return true;
    }
}

export class $Annotation extends $Writing {
    override parenthetical = true;
    override annotation = true;
}

export class $Theme extends $Annotation {
    paper = '#ffffff';
    ink = '#202122';
    quiet = '#f8f9fa';
    shade = '#eaecf0';
    rule = '#a2a9b1';
    link = '#3366cc';
    measure = '60em';
    body = "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
    display = "'Linux Libertine', 'Georgia', 'Times', serif";
    size = '14px';
    leading = '1.6';
}

export class $Style extends $Chemical {
    theme!: $Theme;

    $Style(block: $Block) {
        const Theme = $(theme);
        const written = (block?.$elements ?? []).find((one): one is $Theme => one instanceof $Theme);

        this.theme = written ?? $(<Theme />) as $Theme;
    }
}

export class $Anchor extends $Style {
    selector = styled.a;
    textDecoration = 'none';
    $href: string | undefined = undefined;
    $onClick: (() => void) | undefined = undefined;
    @select('&:hover') hover_textDecoration = 'underline';
    get color() { return this.theme.link; }
}

export class $Type extends $Annotation {
    formula: boolean | 'new' = true;
    name = 'Type';
    protected specification: Specification<$Writing> = new TypedSpecification<$Writing>();

    specifically(writing: $Writing): void {
        this.specification.check(writing);
    }

    override view(): ReactNode {
        return null;
    }
}

export class TypedSpecification<T extends $Writing> extends Specification<T> {
    @specify('a piece of writing has a block')
    $hasBlock(writing: T): void {
        $check(!!writing.block, 'a piece of writing has a block, and this one has none');
    }

    @specify('a piece of writing has characters')
    $mustHaveText(writing: T): void {
        $check(writing.copy !== '', 'a piece of writing has characters, and this one is empty');
    }

    @specify('a piece of writing has a type')
    $hasType(writing: T): void {
        this.for = writing.type instanceof $Type ? writing.type : undefined;
        $check(this.for !== undefined || writing.parenthetical,
            'a piece of writing has a type, and this one has none');
    }

    @specify('a type that stands for something else has been given it')
    $typesResolve(writing: T): void {
        for (const one of writing.types) {
            if (!one.resolve) continue;
            const named = one.copy.trim();
            if (named === '') continue;
            $check((one as unknown as Record<symbol, unknown>)[resolved] === true,
                `a type that stands for something else has been given it, and nothing here is called ${JSON.stringify(named)}`);
        }
    }

    @specify('a piece of writing has something written in it')
    $hasWriting(writing: T): void {
        const inside = writing.block?.$elements ?? [];
        $check(inside.some(one => !(one instanceof $Writing) || !one.annotation),
            'a piece of writing has something written in it, and this one is nothing but annotations');
    }

    @specify('a piece of writing descends from a chain that terminates')
    $terminates(writing: T): void {
        void writing.book;
    }

}


export const Theme = $($Theme);
const theme = Theme;
export const Style = $($Style);
export const Anchor = $($Anchor);
const anchor = Anchor;

export const Writing = $($Writing);
export const Annotation = $($Annotation);
export const Type = $($Type);

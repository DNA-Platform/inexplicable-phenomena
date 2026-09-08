import { ReactNode } from 'react';
import { $, $Block, $check, $Chemical, $Written, inert, look } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { reflection } from '@/utilities/Reflection';
import { html } from '@/utilities/Html';
import type { $Annotation$, $Annotation } from './Annotation';
import type { $Catalogue$, $Catalogue } from '@/reference/Catalogue';
import type { $Type$, $Type } from './Type';
import { $Reference$ } from '@/reference/Reference';
import type { $Theme } from '@/formatting/Theme';

export interface $Writing$ extends $Chemical {
    $indent: number;
    book: $Writing$;
    theme: $Theme;
    mention?: $Catalogue$;
    meaning: $Reference$ | undefined;
    kind: $Type$;
    type: $Type[];
    annotations: $Annotation[];
    reading(): $Block;
    classes: string[];
    print(content: ReactNode): ReactNode;
    searchFor<T extends $Writing>(type: new() => $Type): T[];
    searchForOne<T extends $Writing>(type: new() => $Type): T | undefined;
    specify(): void;
}

export class $Writing extends $Chemical implements $Writing$ {
    $indent = 0;
    inline = true;
    @inert() mention?: $Catalogue;
    _block!: $Block;

    get theme(): $Theme { return reflection.theme(this); }
    get classes(): string[] { return reflection.classNames(this); }
    get className(): string { return this.classes.join(' '); }
    get meaning(): $Reference$ | undefined { return reflection.meaning(this) as $Reference$ | undefined; }
    get annotations(): $Annotation[] { return reflection.annotations(this); }
    get type(): $Type[] { return reflection.types(this); }
    reading(): $Block { return reflection.content(this); }
    get book(): $Writing {
        const holding = this.parent;
        return reflection.writing(holding) && holding !== this ? holding.book : this;
    }

    get kind(): $Type {
        const carried = this.type;
        const standing = carried.filter(kind => reflection.composition(kind));
        const chosen = standing.filter(kind => !standing.some(other => other !== kind && reflection.specialises(other, kind)));
        $check(chosen.length <= 1, `writing is one kind of writing, and this one is ${chosen.length}`);
        return chosen[0] ?? carried[0];
    }

    $Writing(block: $Block) {
        this._block = $check(block, $Block);
    }

    // A LINK NOBODY CAN REACH IS A LINK NOBODY CAN CHANGE. Measured 2026-09-08: 33 anchors on
    // /turing and 33 of them classless, so no sheet could dress one, no subclass could specialise
    // one and nothing could ask a book for its links. `meant` is a proxy name for the class.
    view(): ReactNode {
        const meant = 'pd-meaning';
        const meaning = this.meaning;
        const Block = $(this.reading());

        return reflection.formatted(this, this.print(meaning === undefined ? <Block /> : <a href={html.text(meaning.path()?._block)} className={meant}><Block /></a>));
    }

    print(content: ReactNode): ReactNode {
        return <span className={this.className}>{content}</span>;
    }

    @look('back')
    $view(): ReactNode {
        return html.text(this._block);
    }

    searchFor<T extends $Writing>(type: new() => $Type): T[] {
        return (this._block.$elements ?? []).filter((part): part is T => reflection.instanceOf(part, type));
    }

    searchForOne<T extends $Writing>(type: new() => $Type): T | undefined {
        const found = this.searchFor<T>(type);
        $check(found.length <= 1, `writing holds one of a kind, and this one holds ${found.length}`);
        return found[0];
    }

    addType(type: new() => $Type): void {
        if (!reflection.is(this, type)) this._block = this._block.concat($check(type, '!'));
    }

    valid(): boolean {
        this.specify();
        return true;
    }

    // A PIECE OF WRITING IS JUDGED BY THE KIND IT IS, NOT BY EVERY KIND IT INHERITS FROM. A child's
    // bond concatenates its own type onto its parent's, so a synopsis carries $TypeOfSynopsis AND
    // $TypeOfChapter — and both specifications ran. SynopsisSpecification overrides $saysSomething
    // so a book's own made-empty apparatus may stand, and ChapterSpecification refused it anyway:
    // the override never won, because the two rules stood side by side rather than one above the
    // other. Measured 2026-09-09 — a book's placed synopsis, index and footer each drew a refusal
    // panel reading "a piece of writing says something, and this one says nothing at all", and no
    // promise looked at that slot. The specification chain ALREADY inherits, so the specialised
    // type carries its parent's rules; running the parent's separately is what broke the override.
    // The test is the one `kind` already uses.
    specify(): void {
        const carried = this.type;
        const kinds = new Set<unknown>();
        for (const annotation of this.annotations) {
            if (kinds.has(annotation.constructor)) continue;
            kinds.add(annotation.constructor);
            if (carried.some(other => other !== annotation && reflection.specialises(other, annotation as $Type))) continue;
            annotation.specifically(this);
        }
    }
}

export class WritingSpecification extends Specification<$Writing> {
    // NOT a `patterns` bag: WordSpecification declares its own and a shared name made the two
    // collide, which is the base reaching for a member a subclass had already spent.
    private readonly divided = /\n[^\S\n]*\n/u;

    // A BLANK LINE IS BLOCK STRUCTURE, NOT TEXT, and the parse owns block structure. Copy that
    // carries one is markdown that never went through the parse — the wart Doug named: we have a
    // paragraph and a section of our own, so a paragraph holding markdown's paragraphs is an error
    // rather than a thing to convert. It was on ParagraphSpecification and is here because it is
    // true of every piece of writing. One test on the copy, no allocation beyond it.
    @specify('a piece of writing carries no blank line')
    $noBlankLine(writing: $Writing): void {
        $check(!this.divided.test(html.text(writing._block)),
            'a piece of writing carries no blank line, and this one is broken by one');
    }

    @specify('a piece of writing says what kind of writing it is')
    $saysItsKind(writing: $Writing): void {
        $check(writing.kind !== undefined,
            'a piece of writing says what kind of writing it is, and this one says nothing');
    }

    @specify('a piece of writing says something')
    $saysSomething(writing: $Writing): void {
        $check(html.text(writing._block).length > 0 || this.composed(writing).length > 0,
            'a piece of writing says something, and this one says nothing at all');
    }

    @specify('a piece of writing holds copy, annotations and writing')
    $holdsCopyAndWriting(writing: $Writing): void {
        $check(this.beside(writing).every(part => reflection.writing(part)),
            'a piece of writing holds copy, annotations and writing, and this one holds something else');
    }

    // A RULE READS, AND A READING IS WHAT parts() ANSWERS. A composition arranges what
    // it holds and supplies what its own rules require, so a rule that consulted the
    // block alone would refuse a book for lacking a footer the book itself answers.
    // A writing that cannot read — one carrying a type but composing nothing — is
    // judged on what is written into it, which is all it has.
    protected composed(writing: $Writing): $Writing[] {
        return (writing._block.$elements ?? []).filter((part): part is $Writing =>
            reflection.writing(part) && reflection.composition(part.kind));
    }

    protected beside(writing: $Writing): $Written[] {
        return (writing._block.$elements ?? []).filter(part => typeof part !== 'string' && typeof part !== 'number');
    }
}

export const Writing = $($Writing);

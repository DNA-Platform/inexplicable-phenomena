import { type ReactNode } from 'react';
import { $Referent } from '../ref/Referent';
import { text } from '../tools/html';

// $Writing — the reading interface. A piece of writing IS its text; every view of
// it (parts, canonical, a selection) is read on demand. Nothing here is mutable.
export interface $Writing {
    copy: string;
    parts: $Writing[];
    canonical: $Writing;
    compose(other: $Writing): $Writing;
    select<U extends $Writing>(selector: (x: $Writing) => $Composition<U>): $Composition<U>;
}

// $Composition<T> — one immutable composition of T. Its content is fixed at birth:
// authored pieces carry it as children, minted pieces receive it at construction,
// composed pieces hold their members. `copy` is the single reading of that content;
// there is no second, writable text — to change the writing you render a new one.
export class $Composition<T extends $Writing = $Writing> extends $Referent implements $Writing {
    protected _content?: ReactNode;   // content of a minted piece; authored pieces use children
    protected _parts?: T[];           // members of a composed piece (of / compose / select)

    constructor(content?: ReactNode) { super(); this._content = content; }

    get copy(): string { return text(this._parts ?? this._content ?? this.children); }
    get parts(): T[] { return this._parts ?? this.split(this.copy); }
    protected split(_copy: string): T[] { return []; }
    get canonical(): T { return this.parts[0] ?? (this as unknown as T); }

    view(): ReactNode { return this.copy; }   // renderable — a minted piece shows its text

    compose(other: $Composition<T>): $Composition<T> {
        return $Composition.of<T>(...this.parts, ...other.parts);
    }
    select<U extends $Writing>(selector: (x: T) => $Composition<U>): $Composition<U> {
        return this.parts.map(selector).reduce((a, b) => a.compose(b), $Composition.of<U>());
    }
    static of<U extends $Writing>(...parts: U[]): $Composition<U> {
        const c = new $Composition<U>();
        c._parts = parts;
        return c;
    }
}

// The atom — no level below. Its copy is a single glyph.
export class $Character extends $Composition {}

// The ladder. `split` per level is the tokenization contract — provisional v1
// rules; the exact grammar (words minus punctuation, abbreviations, blank-line
// paragraphs) is the domain decision still open.
export class $Word extends $Composition<$Character> {
    protected split(copy: string): $Character[] {
        return [...copy].map(g => new $Character(g));
    }
    get characters(): $Composition<$Character> { return this; }
}

export class $Sentence extends $Composition<$Word> {
    protected split(copy: string): $Word[] {
        return copy.split(/\s+/).filter(Boolean).map(w => new $Word(w));
    }
    get words(): $Composition<$Word> { return this; }
    get characters(): $Composition<$Character> { return this.select(x => x.characters); }
}

export class $Paragraph extends $Composition<$Sentence> {
    protected split(copy: string): $Sentence[] {
        return copy.split(/(?<=[.!?])\s+/).filter(Boolean).map(s => new $Sentence(s));
    }
    get sentences(): $Composition<$Sentence> { return this; }
    get words(): $Composition<$Word> { return this.select(x => x.words); }
}

export class $Section extends $Composition<$Paragraph> {
    protected split(copy: string): $Paragraph[] {
        return copy.split(/\n{2,}/).map(p => p.trim()).filter(Boolean).map(p => new $Paragraph(p));
    }
    get paragraphs(): $Composition<$Paragraph> { return this; }
    get sentences(): $Composition<$Sentence> { return this.select(x => x.sentences); }
}

export class $Document extends $Composition<$Section> {
    protected split(copy: string): $Section[] {
        return [new $Section(copy)];
    }
    get sections(): $Composition<$Section> { return this; }
    get paragraphs(): $Composition<$Paragraph> { return this.select(x => x.paragraphs); }
}

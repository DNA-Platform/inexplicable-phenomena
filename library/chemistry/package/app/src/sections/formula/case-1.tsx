import React, { ReactNode } from 'react';
import { $, $Chemical, $Formula, $check } from '@/index';
import {
    Bench, Row, Legend, Written, Card, CardTitle, Meta,
    Verdict, Kind, Demand, Faults, Parts, Chip, Label,
} from './case.styled';

// ─── A little type system, enforced by VALIDATION ────────────────────────────
// A type's power is not how it draws. It is what it REQUIRES and what it
// FORBIDS of the structure it is written on: which part must come first, what
// the rest must be, what may not appear at all. In a compositional system that
// is nearly everything there is to say.
//
// The parts carry written types too, so a work's type checks its parts' types —
// and every one of those words came through the same catalogue.

export class $Part extends $Chemical {
    $name = '';
    kind!: $Type;

    $Part(...parts: $Type[]) {
        this.kind = $check(parts[0], $Type);
    }

    view() {
        const Kindly = $(this.kind);
        return <Chip><Kindly />{this.$name}</Chip>;
    }
}

export class $Work extends $Chemical {
    $title = '';
    $by = '';
    $about = '';
    claim!: $Type;
    parts: $Part[] = [];

    $Work(...written: $Chemical[]) {
        this.claim = $check(written.find(w => w instanceof $Type) as $Type, $Type);
        this.parts = written.filter(w => w instanceof $Part) as $Part[];
    }

    view() {
        const Claim = $(this.claim);
        return (
            <Card>
                <CardTitle>{this.$title}</CardTitle>
                <Meta>by {this.$by}{this.$about ? ` · about ${this.$about}` : ''}</Meta>
                <Parts>{this.parts.map((p, at) => { const P = $(p); return <P key={at} />; })}</Parts>
                <Claim of={this} />
            </Card>
        );
    }
}

// THE BRANCH DECLARES NO DEFAULT, so a word nobody claimed is an error rather
// than a shrug. The base says nothing about structure, so anything satisfies it.
export class $Type extends $Formula {
    $of?: $Work = undefined;

    get work(): $Work {
        return this.$of as $Work;
    }

    demands(): string {
        return 'nothing of what it is written on';
    }

    complains(): string[] {
        return [];
    }

    holds(): boolean {
        return this.complains().length === 0;
    }

    view(): ReactNode {
        const said = this.complains();
        return (
            <Verdict $ok={said.length === 0}>
                <Kind $ok={said.length === 0}>{said.length === 0 ? '✓' : '✗'} {this.constructor.name.slice(1)}</Kind>
                <Demand>demands {this.demands()}</Demand>
                {said.length > 0 && <Faults>{said.map((s, at) => <li key={at}>{s}</li>)}</Faults>}
            </Verdict>
        );
    }
}

// A LABEL NAMES A KIND AND JUDGES NOTHING, so it draws a label rather than a
// verdict. This is the one place a type overrides view, and it is because a
// label is genuinely a different thing from a claim about a structure.
export class $Label extends $Type {
    override view() {
        return <Label $kind={this.constructor.name}>{this.constructor.name.slice(1)}</Label>;
    }
}

export class $Cover extends $Label {
    constructor() {
        super();
        this.cache('Cover');
    }
}

export class $Chapter extends $Label {
    constructor() {
        super();
        this.cache('Chapter');
    }
}

export class $Entry extends $Label {
    constructor() {
        super();
        this.cache('Entry');
    }
}

export class $Book extends $Type {
    constructor() {
        super();
        this.cache('Book');
    }

    override demands() {
        return 'a Cover first, and Chapters after it';
    }

    override complains() {
        const said: string[] = [];
        const held = this.work.parts;
        if (!(held[0]?.kind instanceof $Cover)) said.push('part 1 is not a Cover');
        held.slice(1).forEach((p, at) => {
            if (!(p.kind instanceof $Chapter)) said.push(`part ${at + 2} is ${this.named(p)}, and a Book reads Chapters`);
        });
        return said;
    }

    protected named(part: $Part): string {
        const kind = part.kind.constructor.name.slice(1);
        return `${/^[AEIOU]/.test(kind) ? 'an' : 'a'} ${kind}`;
    }
}

export class $Biography extends $Book {
    constructor() {
        super();
        this.cache('Biography');
    }

    override demands() {
        return `${super.demands()}, and somebody it is about`;
    }

    override complains() {
        const said = super.complains();
        if (this.work.$about === '') said.push('it is about nobody');
        return said;
    }
}

export class $Autobiography extends $Biography {
    constructor() {
        super();
        this.cache('Autobiography');
        this.cache('Auto-biography');
    }

    override demands() {
        return `${super.demands()}, and that its subject wrote it`;
    }

    override complains() {
        const said = super.complains();
        if (this.work.$by !== this.work.$about) said.push(`${this.work.$by} wrote it, and it is about ${this.work.$about || 'nobody'}`);
        return said;
    }
}

// A DICTIONARY DOES NOT CALL SUPER, and that is the evidence it is a sibling
// rather than a refinement: a Book requires Chapters and a Dictionary forbids
// them outright, so it states its own law from the start.
export class $Dictionary extends $Book {
    constructor() {
        super();
        this.cache('Dictionary');
    }

    override demands() {
        return 'a Cover first, then Entries, in alphabetical order';
    }

    override complains() {
        const said: string[] = [];
        const held = this.work.parts;
        if (!(held[0]?.kind instanceof $Cover)) said.push('part 1 is not a Cover');
        const rest = held.slice(1);
        rest.forEach((p, at) => {
            if (!(p.kind instanceof $Entry)) said.push(`part ${at + 2} is ${this.named(p)}, and a Dictionary holds Entries`);
        });
        const names = rest.map(p => p.$name);
        if ([...names].sort().join('|') !== names.join('|')) said.push('the entries are out of alphabetical order');
        return said;
    }
}

const Work = $($Work) as any;
const Part = $($Part) as any;
const Type = $($Type) as any;
$($Cover); $($Chapter); $($Entry); $($Book); $($Biography); $($Autobiography); $($Dictionary);

class $Shelf extends $Chemical {
    view() {
        return (
            <Row>
                <Work title="The Team" by="The Team" about="The Team">
                    <Type>Autobiography</Type>
                    <Part name="The Team"><Type>Cover</Type></Part>
                    <Part name="Who We Are"><Type>Chapter</Type></Part>
                    <Part name="The Build"><Type>Chapter</Type></Part>
                </Work>
                <Work title="Gauge Theory" by="The Team" about="Emmy Noether">
                    <Type>Autobiography</Type>
                    <Part name="Gauge Theory"><Type>Cover</Type></Part>
                    <Part name="The Gauge Principle"><Type>Chapter</Type></Part>
                </Work>
                <Work title="A Test Library" by="The Team">
                    <Type>Dictionary</Type>
                    <Part name="A Test Library"><Type>Cover</Type></Part>
                    <Part name="argon"><Type>Entry</Type></Part>
                    <Part name="iron"><Type>Entry</Type></Part>
                    <Part name="neon"><Type>Entry</Type></Part>
                </Work>
            </Row>
        );
    }
}

// THE SAME COMPOSITION, TWO CLAIMS. Nothing about the parts changes; the word
// does, and with it the law they are held to.
class $Contested extends $Chemical {
    view() {
        return (
            <Row>
                <Work title="A Test Library" by="The Team" about="The Team">
                    <Type>Dictionary</Type>
                    <Part name="A Test Library"><Type>Cover</Type></Part>
                    <Part name="argon"><Type>Entry</Type></Part>
                    <Part name="iron"><Type>Entry</Type></Part>
                </Work>
                <Work title="A Test Library" by="The Team" about="The Team">
                    <Type>Biography</Type>
                    <Part name="A Test Library"><Type>Cover</Type></Part>
                    <Part name="argon"><Type>Entry</Type></Part>
                    <Part name="iron"><Type>Entry</Type></Part>
                </Work>
            </Row>
        );
    }
}

const Shelf = $($Shelf);
const Contested = $($Contested);

export default function Case1Demo() {
    return (
        <Bench>
            <Legend>a word chooses the law the structure is held to</Legend>
            <Written>{'<Work …><Type>Autobiography</Type><Part name="…"><Type>Cover</Type></Part>…</Work>'}</Written>
            <Shelf />

            <Legend>the same parts, two claims — nothing changes but the word</Legend>
            <Written>{'<Type>Dictionary</Type>   ·   <Type>Biography</Type>'}</Written>
            <Contested />
        </Bench>
    );
}

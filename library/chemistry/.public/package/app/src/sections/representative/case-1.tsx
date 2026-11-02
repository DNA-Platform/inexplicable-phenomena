import React from 'react';
import { $, $Chemical, $check } from '@/index';
import * as parts from './parts';
import {
    Frame, WriteRow, WriteLabel, WriteInput,
    Houses, House, HouseName, HouseRegistered, SheetBox, NoteCard,
    TravelRow, TravelLabel, TravelPick, Sameness,
} from './faces';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';
import { children } from '@/index';

// ─── The framework ───────────────────────────────────────────────────────────
// $Note is written ONCE and never subclassed below. It asks `$` for the parts
// it draws with, and the local keeps the component's own name — which is why
// the namespace import above is required rather than stylistic: writing
// `const Mark = $(Mark)` would shadow the import and throw before it read it.

class $Note extends $Chemical {
    $text? = '';
    $n? = 1;

    view() {
        const Mark = $(parts.Mark);
        const Body = $(parts.Body);
        return (
            <NoteCard>
                <Mark n={this.$n} />
                <Body text={this.$text} />
            </NoteCard>
        );
    }
}

// A sheet holds notes. It exists to BE a scope: everything drawn beneath it
// resolves the way the sheet was configured, and the notes never learn of it.
//
// The bond constructor is load-bearing here rather than ceremonial. A chemical
// that merely returns `this[children]` never PARENTS them — the catalyst graph
// is threaded by the bond, and without it a note standing inside a sheet has
// no lineage to resolve through. Binding is what makes a scope reach.
class $Sheet extends $Chemical {
    notes: $Note[] = [];

    $Sheet(...notes: $Note[]) {
        this.notes = notes.map(n => $check(n, $Note));
    }

    view() {
        return (
            <SheetBox>
                {this.notes.map((note, i) => {
                    const Held = $(note);
                    return <Held key={i} />;
                })}
            </SheetBox>
        );
    }
}

const Note = $($Note);
const Sheet = $($Sheet);

// ─── The configuration ───────────────────────────────────────────────────────
// Three houses, each derived from the same sheet, each registering what stands
// in for a part inside it. This is the whole configuration — it runs once, at
// module scope, before anything renders, and nothing below is told about it.

const Draft = $($, Sheet);
const Review = $($, Sheet);
const Press = $($, Sheet);

$(Review, parts.Mark)(parts.Star);
$(Press, parts.Mark)(parts.Numeral);
$(Press, parts.Body)(parts.Boxed);

const houses = [
    { name: 'draft', House: Draft, registered: '— nothing —' },
    { name: 'review', House: Review, registered: 'Mark → Star' },
    { name: 'press', House: Press, registered: 'Mark → Numeral\nBody → Boxed' },
];

// ─── The showcase ────────────────────────────────────────────────────────────
// One text, three houses, and a note that travels between them. Every `<Note/>`
// below is the same JSX with the same props; what differs is only which house
// it stands in.

class $Desk extends $Chemical {
    text = 'A representative stands for what is not present.';
    travelling = 'draft';
    typed = false;
    moved = false;

    write(next: string) {
        this.text = next;
        this.typed = true;
    }

    travel(name: string) {
        this.travelling = name;
        this.moved = true;
    }

    view() {
        const proven = this.typed && this.moved;
        const state = proven ? 'pass' : 'pending';
        return (
            <Frame>
                <WriteRow>
                    <WriteLabel>the text</WriteLabel>
                    <WriteInput value={this.text} onChange={e => this.write(e.target.value)} />
                </WriteRow>

                <TravelRow>
                    <TravelLabel>the travelling note lives in</TravelLabel>
                    {houses.map(h => (
                        <TravelPick key={h.name} $active={this.travelling === h.name} onClick={() => this.travel(h.name)}>
                            {h.name}
                        </TravelPick>
                    ))}
                </TravelRow>

                <Houses>
                    {houses.map(({ name, House: Home, registered }) => (
                        <House key={name} $lit={this.travelling === name}>
                            <HouseName>{name}</HouseName>
                            <HouseRegistered>{registered}</HouseRegistered>
                            <Home>
                                <Note n={1} text={this.text} />
                                <Note n={2} text="Each house draws the same class." />
                                {this.travelling === name
                                    ? <Note n={3} text="I travel, and I change without being edited." />
                                    : null}
                            </Home>
                        </House>
                    ))}
                </Houses>

                <Sameness>
                    Every note above is <b>the same `&lt;Note/&gt;`</b>, from one class that is never
                    subclassed here. No house passes it a component, and no note knows which
                    house it is in — <b>the house it stands in answers what it asks for.</b>
                </Sameness>

                <VerdictSection>
                    <VerdictRow $state={state}>
                        <VerdictDot $state={state} />
                        {proven
                            ? '✓ one class, three houses — the text moved all three at once, and the travelling note changed by moving rather than by being edited'
                            : '○ type in the text, then move the travelling note between houses'}
                    </VerdictRow>
                </VerdictSection>
            </Frame>
        );
    }
}

const Desk = $($Desk);

export default function RepresentativeDemo() {
    return <Desk />;
}

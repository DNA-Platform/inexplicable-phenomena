import { ReactNode, createElement } from 'react';
import { $, $Block, $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@/utilities/Specification';
import { html } from '@/utilities/Html';
import { parser } from '@/utilities/Parser';
import { reflection } from '@/utilities/Reflection';
import { $Writing } from '@/writing/Writing';
import { $Phrase$, $Phrase, $TypeOfPhrase, PhraseSpecification } from '@/writing/Phrase';

// A DATE IS A PHRASE THAT NAMES A DAY. It is written on one line like any phrase, and what makes it
// its own kind is that it says one thing to a reader and names another to everything else: the words
// a person would write, and the day those words mean. The library already has that shape — a
// catalogue says `[what it says](what it names)` — so a date borrows it rather than inventing a
// second syntax for the same idea:
//
//     <Date>[15 September 2026](2026-09-15)</Date>
//     <Date>2026-09-15</Date>
//
// Written plainly, the words and the day are the same thing and the second form is enough.
//
// AND IT IS A `<time>`, which is the one element HTML has for this. The day goes in `datetime` where
// a machine reads it and the words stand in the page where a person does, so a log entry can be
// ordered, compared and found by something that never reads the prose — which is the whole reason a
// library would want a date to be a KIND rather than some text that happens to look like one.
// THE REAL ONE, NAMED THROUGH THE GLOBAL BECAUSE THIS MODULE TAKES ITS NAME. A kind exports the
// element an author writes, and the element an author writes for a date is `Date` — which shadows the
// language's own inside this file, so nothing here could parse anything. Reaching for it on
// `globalThis` is the honest way to say which one is meant.
type Moment = InstanceType<typeof globalThis.Date>;

export interface $Date$ extends $Phrase$ {
    readonly record: Moment;
}

export class $Date extends $Phrase implements $Date$ {
    protected definition = 'time';

    protected get copy(): string { return html.text(this._block).trim(); }

    // WHAT IT SAYS, which is the words a person wrote and never the token.
    get said(): string { const copy = this.copy; return (parser.link(copy)?.text ?? copy).trim(); }

    // WHAT IT NAMES, which is the token where one was written and the words themselves where it was
    // not — `[15 September 2026](2026-09-15)` names the second, and `15 September 2026` names itself.
    protected get named(): string { const copy = this.copy; return (parser.link(copy)?.url ?? copy).trim(); }

    // THE MOMENT THIS RECORDS, and recording it is all a date does. Doug, 2026-09-16: "it should
    // expose it as a member called record. It has been recorded. And that's all it does." Whatever a
    // person wrote is read once, here, so nothing downstream ever parses prose again.
    get record(): Moment { return new globalThis.Date(this.named); }

    // THE DAY A MACHINE READS, which is the record written back out in the one form every machine
    // agrees on. An author may write the day however they like and the `datetime` attribute is still
    // the token an ordering, a comparison or a search can use.
    get day(): string { const at = this.record; return Number.isNaN(at.getTime()) ? this.named : at.toISOString().slice(0, 10); }

    $Date(block: $Block) {
        super.$Phrase(this.addType(block, $TypeOfDate));
    }

    override view(): ReactNode {
        if (this.parenthetical) return null;

        return createElement('time', { className: this.className, dateTime: this.day, id: this.id }, this.print());
    }

    override print(): ReactNode {
        return parser.link(this.copy)?.text ?? super.print();
    }
}

export class $TypeOfDate extends $TypeOfPhrase {
    protected override specification: Specification<$Writing> = new DateSpecification();
}

export class DateSpecification extends PhraseSpecification {
    // A DATE RECORDS A MOMENT, AND A DATE THAT RECORDS NOTHING IS A PHRASE. The demand is that it
    // PARSES, not that it was written one particular way: a person may put down the day however they
    // say it, and what the library keeps is the moment those words meant. Something that never reads
    // the prose can still order two entries, which is the whole reason a date is a kind at all.
    @specify('a date records a moment')
    $recordsAMoment(writing: $Writing): void {
        const said = (writing as $Date).said;
        $check(!Number.isNaN((writing as $Date).record.getTime()),
            `a date records the moment its words mean, and "${said}" reads as no day at all`);
    }
}

export const Date = $($Date);
export const TypeOfDate = $($TypeOfDate);

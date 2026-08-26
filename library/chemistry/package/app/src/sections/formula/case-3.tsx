import React from 'react';
import { $, $Chemical } from '@/index';
import { $Work, $Part, $Type, $Autobiography } from './case-1';
import { Bench, Legend, Written, Pair, Panel } from './case.styled';

// ─── The resolution is ASKED FOR, not used ───────────────────────────────────
// What a name stands for goes through the representative like any other
// component, so a SCOPE can stand a stricter class behind the same word. The
// library decides what Autobiography means here; the work never learns that it
// was judged by a different law.

export class $Strict extends $Autobiography {
    override demands() {
        return `${super.demands()}, and at least three chapters`;
    }

    override complains() {
        const said = super.complains();
        if (this.work.parts.length - 1 < 3) said.push(`it has ${this.work.parts.length - 1} chapters, and this library asks for three`);
        return said;
    }
}

const Work = $($Work) as any;
const Part = $($Part) as any;
const Type = $($Type) as any;
const Autobiography = $($Autobiography);
const Strict = $($Strict);

class $Room extends $Chemical {
    view() {
        return (
            <Work title="The Team" by="The Team" about="The Team">
                <Type>Autobiography</Type>
                <Part name="The Team"><Type>Cover</Type></Part>
                <Part name="Who We Are"><Type>Chapter</Type></Part>
                <Part name="The Build"><Type>Chapter</Type></Part>
            </Work>
        );
    }
}

const Room = $($Room);

// Registration is configuration: it happens here, never inside a view.
const Stricter = $($, Room);
$(Stricter, Autobiography)(Strict);

export default function Case3Demo() {
    return (
        <Bench>
            <Legend>one word, one catalogue, two scopes — and two laws</Legend>
            <Written>{'<Type>Autobiography</Type> — written once, judged in two places'}</Written>
            <Pair>
                <Panel>
                    <Legend>as written</Legend>
                    <Room />
                </Panel>
                <Panel>
                    <Legend>{'$(Stricter, Autobiography)(Strict)'}</Legend>
                    <Stricter />
                </Panel>
            </Pair>
        </Bench>
    );
}

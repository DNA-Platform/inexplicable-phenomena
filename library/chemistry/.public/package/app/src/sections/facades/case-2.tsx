import React, { ReactNode } from 'react';
import { $, $Chemical } from '@/index';
import { Stage, Cell, Written } from './case.styled';
import { $Card, Card$ } from './case-1';

// THE DECLARATION IS THE WHOLE DIFFERENCE.
//
// Two classes with the same members and the same drawing. One says `face =
// Card`; the other does not. Nothing else separates them, and nothing outside
// them was configured either way.

class $Bare extends $Chemical {
    hue = 150; title = 'Bare'; kind = 'Bare'; glyph = 'B'; fill = 0.5;
    get figures(): [string, string][] { return [['declares', 'nothing']]; }

    override view(): ReactNode {
        return <strong>{this.glyph}</strong>;
    }
}

class $Worn extends $Bare {
    facade = Card$;
    override hue = 265; override title = 'Worn'; override kind = 'Worn'; override glyph = 'W';
    override get figures(): [string, string][] { return [['declares', 'facade = Card']]; }
}

const Bare = $($Bare);
const Worn = $($Worn);

class $Pair extends $Chemical {
    override view(): ReactNode {
        return (
            <Stage>
                <Cell>
                    <Written>class $Bare extends $Chemical {'{ }'}</Written>
                    <Bare />
                </Cell>
                <Cell>
                    <Written>class $Worn extends $Bare {'{ facade = Card }'}</Written>
                    <Worn />
                </Cell>
            </Stage>
        );
    }
}
const Pair = $($Pair);

export default function FacesCaseTwo() {
    return <Pair />;
}

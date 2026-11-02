import React from 'react';
import { $, $Chemical, $check, look } from '@/index';
import {
    Frame, Toolbar, StepButton, Breadcrumb, Crumb, CrumbSep, Stage,
    Tile, Symbol, Number, Name, Cell, CellCorner, CellSymbol, CellName, CellMass,
} from './faces';

// An element, drawn at three grades of detail. This case is about DEPTH rather
// than about a menu: the looks run from the full periodic cell down to a bare
// symbol, and one control walks them. The counterpart to One Color, whose
// looks are alternatives rather than altitudes.
//
// It used to be three classes and a walk up their ancestry. It is one class
// and a series now, and every drawing below is the drawing it always was.

// $PeriodicCell — the substance, and the three ways it is shown. `view` is the
// full group-colored cell as it sits in the table; `$view` keeps the number,
// symbol and name; `$$view` is the bare symbol tile in the group color.
export type $CellViews = 'PeriodicCell' | 'NamedElement' | 'Element';

class $PeriodicCell extends $Chemical {
    $look: $CellViews | number = 'PeriodicCell';

    symbol = 'Au';
    number = 79;
    name = 'Gold';
    mass = 196.97;
    group = 11;                 // coinage metals — warm gold
    tint = 'hsl(45, 64%, 52%)'; // the group color, carried through every grade

    @look('PeriodicCell') view() {
        return (
            <Cell $tint={this.tint}>
                <CellCorner>{this.number}</CellCorner>
                <CellSymbol>{this.symbol}</CellSymbol>
                <CellName>{this.name}</CellName>
                <CellMass>{this.mass}</CellMass>
            </Cell>
        );
    }

    @look('NamedElement') $view() {
        return (
            <Tile $tint={this.tint}>
                <Number>{this.number}</Number>
                <Symbol>{this.symbol}</Symbol>
                <Name>{this.name}</Name>
            </Tile>
        );
    }

    @look('Element') $$view() {
        return <Tile $tint={this.tint}><Symbol>{this.symbol}</Symbol></Tile>;
    }
}

// An inspector holding ONE live $PeriodicCell, bonded as a child — which is why
// writing the cell's $look in a handler repaints the WHOLE panel: the scope's
// finalize walks the composition tree upward and re-reacts every ancestor.
// ▲ steps toward the barest grade, ▼ toward the fullest; the breadcrumb reads
// $look, and the ends grey out at the bounds of the series.
class $Inspector extends $Chemical {
    cell!: $PeriodicCell;
    $Inspector(cell: $PeriodicCell) { this.cell = $check(cell, $PeriodicCell); }

    trail: $CellViews[] = ['PeriodicCell', 'NamedElement', 'Element'];

    at = 0;

    protected step(by: number) {
        this.at += by;
    }

    view() {
        const trail = this.trail;
        const at = this.at;
        const Cell = $(this.cell);
        return (
            <Frame>
                <Toolbar>
                    <StepButton
                        title="step toward the barest grade"
                        disabled={at >= trail.length - 1}
                        onClick={() => { this.step(1); }}
                    >▲</StepButton>
                    <StepButton
                        title="step toward the fullest grade"
                        disabled={at <= 0}
                        onClick={() => { this.step(-1); }}
                    >▼</StepButton>
                    <Breadcrumb>
                        {trail.map((level, i) => (
                            <React.Fragment key={level}>
                                {i > 0 && <CrumbSep>▸</CrumbSep>}
                                <Crumb $active={i === at}>{level}</Crumb>
                            </React.Fragment>
                        ))}
                    </Breadcrumb>
                </Toolbar>
                <Stage><Cell look={trail[at]} /></Stage>
            </Frame>
        );
    }
}

const Inspector = $($Inspector);
const PeriodicCell = $($PeriodicCell);

export default function LookPerspectivesDemo() {
    return <Inspector><PeriodicCell /></Inspector>;
}

import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    Frame, Toolbar, StepButton, Breadcrumb, Crumb, CrumbSep, Stage,
    Tile, Symbol, Number, Name, Cell, CellCorner, CellSymbol, CellName, CellMass,
} from './faces';

// An element, deepened by inheritance. Each subclass adds ONE tier to the view
// and nothing else — the group color and the data flow down `this` untouched.
// There is no reveal and no menu here: `look('up'|'down')` walks ONE live
// instance up and down its OWN ancestry, rendering it through each tier's view.
// The vertical counterpart to One Color's horizontal lens-menu.

// $Element — the substance: its data, and the barest way to show it (a symbol
// tile in the element's group color). "The cell exhaled" — calm and centered.
class $Element extends $Chemical {
    symbol = 'Au';
    number = 79;
    name = 'Gold';
    mass = 196.97;
    group = 11;                 // coinage metals — warm gold
    tint = 'hsl(45, 64%, 52%)'; // the group color, carried through every tier

    view() {
        return <Tile $tint={this.tint}><Symbol>{this.symbol}</Symbol></Tile>;
    }
}

// $NamedElement — the same substance, named: the symbol grows a number and a
// label beneath it. Still the group color; still centered.
class $NamedElement extends $Element {
    view() {
        return (
            <Tile $tint={this.tint}>
                <Number>{this.number}</Number>
                <Symbol>{this.symbol}</Symbol>
                <Name>{this.name}</Name>
            </Tile>
        );
    }
}

// $PeriodicCell — the full group-colored cell as it sits in the table: atomic
// number, symbol, name, atomic mass, group corner. The most specific view.
class $PeriodicCell extends $NamedElement {
    view() {
        return (
            <Cell $tint={this.tint}>
                <CellCorner>{this.number}</CellCorner>
                <CellSymbol>{this.symbol}</CellSymbol>
                <CellName>{this.name}</CellName>
                <CellMass>{this.mass}</CellMass>
            </Cell>
        );
    }
}

// An inspector holding ONE live $PeriodicCell, bonded as a child so the walk
// repaints the whole panel live. ▲ looks toward the base view (revert), ▼
// toward the specific; the breadcrumb reads the cursor's altitude via viewLevel,
// and the ends grey out via look('up?'/'down?'). No reveal, no menu — pure ancestry.
class $Inspector extends $Chemical {
    cell!: $PeriodicCell;
    $Inspector(cell: $PeriodicCell) { this.cell = $check(cell, $PeriodicCell); }

    private trail = ['$PeriodicCell', '$NamedElement', '$Element'];

    view() {
        const here = this.cell.viewLevel;   // reactive read → the panel repaints on look()
        return (
            <Frame>
                <Toolbar>
                    <StepButton
                        title="revert toward the base view"
                        disabled={!this.cell.look('up?')}
                        onClick={() => { this.cell.look('up'); }}
                    >▲</StepButton>
                    <StepButton
                        title="specialize toward the cell"
                        disabled={!this.cell.look('down?')}
                        onClick={() => { this.cell.look('down'); }}
                    >▼</StepButton>
                    <Breadcrumb>
                        {this.trail.map((level, i) => (
                            <React.Fragment key={level}>
                                {i > 0 && <CrumbSep>▸</CrumbSep>}
                                <Crumb $active={level === here}>{level.replace('$', '')}</Crumb>
                            </React.Fragment>
                        ))}
                    </Breadcrumb>
                </Toolbar>
                <Stage>{React.createElement($(this.cell) as React.FC)}</Stage>
            </Frame>
        );
    }
}

const Inspector = $($Inspector);
const PeriodicCell = $($PeriodicCell);

export default function LookPerspectivesDemo() {
    return <Inspector><PeriodicCell /></Inspector>;
}

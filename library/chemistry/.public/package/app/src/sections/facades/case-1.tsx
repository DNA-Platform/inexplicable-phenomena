import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { $, $Chemical } from '@/index';
import {
    Frame, Trees, Tree, Node, Wears, Right, Stage, Empty,
    PreviewRow, PreviewTile, PreviewScale, PreviewName,
    Card, Tile, Button, Pressed, Pressing, Hint, Blowup, Blown,
    Glyph, Title, Kind, Figures, Key, Value, Track, Fill,
} from './case.styled';

// ONE INTERFACE, TWO FAMILY TREES.
//
// Single inheritance gives a class ONE parent, and drawing usually takes it.
// Here it does not: each tree spends its parent slot on what the thing IS, and
// says `facade = Card` once at its root. Every descendant inherits the field, so
// every one of them is drawn as a card — without either tree extending, knowing
// or importing the other, and without $Card knowing that elements or planets
// exist at all.
//
// What the card asks for is a small surface — title, kind, glyph, figures, fill,
// hue — and the HIERARCHY is what fills it: each level adds its own rows through
// `super.figures`, so the deeper the class, the more the card has to say.

export type $CardLooks = 'card' | 'tile' | 'button';

export class $Card extends $Chemical {
    $of: any = undefined;
    get of(): any { return this.$of; }
    get as(): $CardLooks { return (this.of?.$as as $CardLooks) ?? 'card'; }
    get hue(): number { return this.of?.hue ?? 210; }
    get title(): string { return this.of?.title ?? ''; }
    get kind(): string { return this.of?.kind ?? ''; }
    get glyph(): string { return this.of?.glyph ?? ''; }
    get fill(): number { return Math.max(0, Math.min(1, this.of?.fill ?? 0)); }
    get figures(): [string, string][] { return this.of?.figures ?? []; }

    // Pressed open. The card is not rebuilt for the occasion — the SAME drawing
    // is shown large, which is what makes this a preview of the thing rather than
    // a second thing that resembles it.
    open = false;

    view(): ReactNode {
        if (this.as === 'tile') return this.tile();
        if (this.as === 'button') return this.button();
        return this.card();
    }

    protected card(): ReactNode {
        return (
            <Card $hue={this.hue}>
                <Kind>{this.kind}</Kind>
                <Glyph>{this.glyph}</Glyph>
                <Title>{this.title}</Title>
                <Figures>
                    {this.figures.map(([key, value]) => (
                        <React.Fragment key={key}>
                            <Key>{key}</Key><Value>{value}</Value>
                        </React.Fragment>
                    ))}
                </Figures>
                <Track $hue={this.hue}><Fill $hue={this.hue} $pct={this.fill * 100} /></Track>
            </Card>
        );
    }

    protected tile(): ReactNode {
        return (
            <Tile $hue={this.hue}>
                <Glyph>{this.glyph}</Glyph>
                <Kind>{this.title}</Kind>
            </Tile>
        );
    }

    protected button(): ReactNode {
        return (
            <>
                <Button $hue={this.hue} onClick={() => { this.open = true; }}>
                    <Pressed $hue={this.hue}>{this.glyph}</Pressed>
                    <Pressing>{this.title}</Pressing>
                    <Hint>open</Hint>
                </Button>
                {this.open ? createPortal(
                    // THROUGH A PORTAL, because `position: fixed` is trapped by any
                    // transformed ancestor — and a preview that scales its content
                    // is exactly such an ancestor. Full screen has to mean the
                    // screen.
                    <Blowup data-blowup="" onClick={() => { this.open = false; }}>
                        <Blown data-blown="">{this.card()}</Blown>
                    </Blowup>,
                    document.body,
                ) : null}
            </>
        );
    }
}
export const Card$ = $($Card);

// ── TREE ONE — the elements. One line at the root dresses the whole family. ──

class $Element extends $Chemical {
    facade = Card$;
    hue = 210; symbol = '?'; name = ''; number = 0; mass = 0;
    get kind(): string { return 'Element'; }
    get glyph(): string { return this.symbol; }
    get title(): string { return this.name; }
    get fill(): number { return this.number / 92; }
    get figures(): [string, string][] { return [['number', `${this.number}`], ['mass', `${this.mass}`]]; }
}

class $Metal extends $Element {
    conducts = 20;
    override get kind(): string { return `Metal · ${super.kind}`; }
    override get figures(): [string, string][] {
        return [...super.figures, ['conducts', `${this.conducts} MS/m`]];
    }
}

class $Alkali extends $Metal {
    reacts = 3;
    override get kind(): string { return `Alkali · ${super.kind}`; }
    override get figures(): [string, string][] {
        return [...super.figures, ['reacts', '●'.repeat(this.reacts)]];
    }
}

class $Noble extends $Element {
    override get kind(): string { return `Noble · ${super.kind}`; }

    override get figures(): [string, string][] {
        return [...super.figures, ['shell', 'closed']];
    }
}

class $Sodium extends $Alkali {
    override hue = 38; override symbol = 'Na'; override name = 'Sodium'; override number = 11; override mass = 22.99;
    override conducts = 21; override reacts = 4;
}

class $Potassium extends $Alkali {
    override hue = 288; override symbol = 'K'; override name = 'Potassium'; override number = 19; override mass = 39.1;
    override conducts = 14; override reacts = 5;
}

class $Neon extends $Noble {
    override hue = 192; override symbol = 'Ne'; override name = 'Neon'; override number = 10; override mass = 20.18;
}

class $Argon extends $Noble {
    override hue = 318; override symbol = 'Ar'; override name = 'Argon'; override number = 18; override mass = 39.95;
}

// ── TREE TWO — the bodies. No ancestor in common with the elements. ──────────

class $Body extends $Chemical {
    facade = Card$;
    hue = 210; name = ''; radius = 0;
    get kind(): string { return 'Body'; }
    get glyph(): string { return this.name.slice(0, 2); }
    get title(): string { return this.name; }
    get fill(): number { return Math.min(1, this.radius / 71000); }
    get figures(): [string, string][] { return [['radius', `${this.radius} km`]]; }
}

class $Planet extends $Body {
    moons = 0; day = 24;
    override get kind(): string { return `Planet · ${super.kind}`; }
    override get figures(): [string, string][] {
        return [...super.figures, ['moons', `${this.moons}`], ['day', `${this.day} h`]];
    }
}

class $Giant extends $Planet {
    bands = 0;
    override get kind(): string { return `Giant · ${super.kind}`; }
    override get figures(): [string, string][] {
        return [...super.figures, ['bands', `${this.bands}`]];
    }
}

class $Rocky extends $Planet {
    override get kind(): string { return `Rocky · ${super.kind}`; }

    override get figures(): [string, string][] {
        return [...super.figures, ['surface', 'solid']];
    }
}

class $Jupiter extends $Giant {
    override hue = 26; override name = 'Jupiter'; override radius = 69911;
    override moons = 95; override day = 10; override bands = 12;
}

class $Saturn extends $Giant {
    override hue = 46; override name = 'Saturn'; override radius = 58232;
    override moons = 146; override day = 11; override bands = 9;
}

class $Mars extends $Rocky {
    override hue = 12; override name = 'Mars'; override radius = 3390;
    override moons = 2; override day = 25;
}

const Sodium = $($Sodium), Potassium = $($Potassium), Neon = $($Neon), Argon = $($Argon);
const Jupiter = $($Jupiter), Saturn = $($Saturn), Mars = $($Mars);

type $Row = { name: string; depth: number; hue: number; wears?: boolean; specimens: any[] };

const elements: $Row[] = [
    { name: '$Element', depth: 0, hue: 205, wears: true, specimens: [Sodium, Potassium, Neon, Argon] },
    { name: '$Metal', depth: 1, hue: 205, specimens: [Sodium, Potassium] },
    { name: '$Alkali', depth: 2, hue: 38, specimens: [Sodium, Potassium] },
    { name: '$Noble', depth: 1, hue: 192, specimens: [Neon, Argon] },
];

const bodies: $Row[] = [
    { name: '$Body', depth: 0, hue: 205, wears: true, specimens: [Jupiter, Saturn, Mars] },
    { name: '$Planet', depth: 1, hue: 205, specimens: [Jupiter, Saturn, Mars] },
    { name: '$Giant', depth: 2, hue: 26, specimens: [Jupiter, Saturn] },
    { name: '$Rocky', depth: 2, hue: 12, specimens: [Mars] },
];

// ── THE BROWSER. Trees on the left, one interface drawing everything on the
// right. Nothing here reaches into the framework: it renders the specimens, and
// each of them dresses itself.

const looks: $CardLooks[] = ['card', 'tile', 'button'];

// A PREVIEW IS ONLY A PREVIEW IF IT CAN BE READ, and all three of these are
// compact things now, so one box holds them all — each shown at the size it
// survives being shrunk to.
const shown: Record<$CardLooks, number> = { card: 0.36, tile: 0.82, button: 0.82 };

class $Browser extends $Chemical {
    at = '$Element';
    as: $CardLooks = 'card';

    protected get row(): $Row {
        return [...elements, ...bodies].find(one => one.name === this.at) ?? elements[0];
    }

    protected tree(rows: $Row[]): ReactNode {
        return (
            <Tree>
                {rows.map(row => (
                    <Node key={row.name} $depth={row.depth} $hue={row.hue} $on={this.at === row.name}
                        onClick={() => { this.at = row.name; }}>
                        {row.name}
                        {row.wears ? <Wears>facade = Card</Wears> : null}
                    </Node>
                ))}
            </Tree>
        );
    }

    view(): ReactNode {
        const row = this.row;
        return (
            <Frame>
                <Trees>
                    {this.tree(elements)}
                    {this.tree(bodies)}
                </Trees>
                <Right>
                    <PreviewRow>
                        {looks.map(name => {
                            const First = row.specimens[0];
                            return (
                                <PreviewTile key={name} $on={this.as === name} role="button" tabIndex={0}
                                    onClick={() => { this.as = name; }}>
                                    <PreviewScale $scale={shown[name]}>
                                        {First ? <First as={name} /> : null}
                                    </PreviewScale>
                                    <PreviewName>{name}</PreviewName>
                                </PreviewTile>
                            );
                        })}
                    </PreviewRow>
                    <Stage>
                        {row.specimens.length === 0
                            ? <Empty>nothing at this node</Empty>
                            : row.specimens.map((Made, at) => <Made key={at} as={this.as} />)}
                    </Stage>
                </Right>
            </Frame>
        );
    }
}
const Browser = $($Browser);

export default function FacesCaseOne() {
    return <Browser />;
}

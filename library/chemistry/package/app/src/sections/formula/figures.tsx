import React from 'react';
import { $, $Chemical, $Formula, look, cache } from '@/index';
import {
    Frame, Dials, Dial, Slide, Switch, Body,
    PreviewRow, PreviewTile, PreviewScale, PreviewName, Stage, Said,
} from './figures.styled';

// One tag. Six worlds. The word inside chooses the class; `look` chooses which
// of that class's drawings you get. Both are tokens handed in from outside.
//
// THE DIALS ARE RAW. `hue` and `shape` arrive as numbers and the base says
// nothing about what they mean. Each class owns a BAND of the wheel and spreads
// its parts inside it, so the six sit in six families and the dial carries all
// of them together; weave reads its band as a triad and pulse as a duotone, and
// both let `shape` move the colour rather than the geometry.

export class $Figure extends $Formula {
    $hue = 208;
    $shape = 46;

    protected get values(): number[] {
        const k = this.$shape / 100;
        return Array.from({ length: 9 }, (_, at) => {
            const t = at / 8;
            return 0.16 + 0.84 * Math.abs(Math.sin(Math.PI * (t * (0.55 + k * 2.1) + k * 0.7)));
        });
    }

    protected get shift(): number { return 0; }

    protected get span(): number { return 26; }

    protected get base(): number { return (this.$hue + this.shift + 720) % 360; }

    protected tint(at: number, light = 56, alpha = 1): string {
        return `hsl(${(this.base + (at / 9) * this.span) % 360} ${58 + (at % 3) * 9}% ${light}% / ${alpha})`;
    }

    protected get ink(): string { return `hsl(${this.base} 46% 34%)`; }

    protected plate(inner: React.ReactNode): React.ReactNode {
        return <svg viewBox="0 0 160 110" width="100%" role="img">{inner}</svg>;
    }
}

// ── stars ── a blue band, plotted like a chart rather than a sky.
export class $Constellation extends $Figure {
    constructor() { super(); this[cache]('stars'); }

    private get stars() {
        const k = this.$shape / 100;
        return Array.from({ length: 28 }, (_, at) => {
            const a = at * 2.39996;
            const v = this.values[at % 9];
            const w = this.values[(at * 4 + 3) % 9];
            return {
                x: 8 + (at / 27) * 144 + Math.sin(a * 1.7) * 5.5,
                y: 55 + Math.sin(a + k * 5.5) * 31 * (0.4 + v * 0.6) + Math.cos(a * 0.61 - k * 3.2) * 15,
                v: w,
                at,
            };
        });
    }

    @look('field') $view() {
        const stars = this.stars;
        const edges: [number, number][] = [];
        for (let a = 0; a < stars.length; a++) {
            for (let b = a + 1; b < stars.length; b++) {
                const d = Math.hypot(stars[a].x - stars[b].x, stars[a].y - stars[b].y);
                if (d < 27) edges.push([a, b]);
            }
        }
        return this.plate(<>
            {[14, 32, 50, 68, 86].map(y => <line key={`g${y}`} x1={7} y1={y} x2={153} y2={y} stroke={this.ink} strokeWidth={0.2} opacity={0.18} />)}
            {Array.from({ length: 14 }, (_, at) => <line key={`t${at}`} x1={7 + at * 11.2} y1={102} x2={7 + at * 11.2} y2={105} stroke={this.ink} strokeWidth={0.35} opacity={0.4} />)}
            <line x1={7} y1={105} x2={153} y2={105} stroke={this.ink} strokeWidth={0.4} opacity={0.45} />
            {edges.map(([a, b], at) => (
                <line key={`e${at}`} x1={stars[a].x} y1={stars[a].y} x2={stars[b].x} y2={stars[b].y}
                    stroke={this.tint(at % 9, 54, 0.5)} strokeWidth={0.35} />
            ))}
            {stars.map(n => (
                <circle key={n.at} cx={n.x} cy={n.y} r={0.9 + n.v * 2.6} fill={this.tint(n.at % 9, 44)} />
            ))}
        </>);
    }

    @look('reading') view() {
        const stars = this.stars;
        return this.plate(<>
            <line x1={6} y1={96} x2={154} y2={96} stroke={this.ink} strokeWidth={0.8} opacity={0.5} />
            {stars.map((s, at) => (
                <g key={at}>
                    <line x1={s.x} y1={96} x2={s.x} y2={s.y} stroke={this.tint(at, 60, 0.5)} strokeWidth={0.6} />
                    <circle cx={s.x} cy={s.y} r={1.2 + s.v * 3.4} fill={this.tint(at, 50)} />
                    <circle cx={s.x} cy={96} r={0.9} fill={this.ink} opacity={0.6} />
                </g>
            ))}
        </>);
    }
}

// ── neuron ── Hindmarsh–Rose, the minimal BURSTER: the fast spike-generating
// pair, plus a slow adaptation current that loads up, silences the cell and
// releases it.
//     dx/dt = y - x³ + 3x² - z + I     the fast voltage
//     dy/dt = 1 - 5x² - y              the fast recovery
//     dz/dt = r(4(x + 1.6) - z)        the slow current, r = 0.0055
// `shape` is the injected current I, and it walks the cell through the whole
// physiology: quiescent, then bursts of two, three, four spikes, then tonic.
export class $Neuron extends $Figure {
    constructor() { super(); this[cache]('neuron'); }

    protected override get shift() { return 175; }

    protected override get span() { return 72; }

    private get current(): number { return 1.35 + (this.$shape / 100) * 2.55; }

    private step(x: number, y: number, z: number): [number, number, number] {
        return [
            y - x * x * x + 3 * x * x - z + this.current,
            1 - 5 * x * x - y,
            0.0055 * (4 * (x + 1.6) - z),
        ];
    }

    private at(x: number, y: number): [number, number] {
        return [80 + x * 36, 55 - (y + 5.4) * 6.9];
    }

    private of(sx: number, sy: number): [number, number] {
        return [(sx - 80) / 36, (55 - sy) / 6.9 - 5.4];
    }

    @look('reading') view() {
        let x = -1.4;
        let y = -8;
        let z = 2.4;
        const trace: string[] = [];
        for (let i = 0; i < 26000; i++) {
            const [dx, dy, dz] = this.step(x, y, z);
            x += dx * 0.035;
            y += dy * 0.035;
            z += dz * 0.035;
            if (i > 6000 && i % 10 === 0) {
                trace.push(`${(((i - 6000) / 10) * 0.08).toFixed(1)},${(58 - (x + 0.6) * 20).toFixed(1)}`);
            }
        }
        return this.plate(<>
            {[22, 58, 94].map(at => <line key={at} x1={0} y1={at} x2={160} y2={at} stroke={this.ink} strokeWidth={0.22} opacity={0.2} />)}
            <path d={`M${trace.join(' L')} L160,110 L0,110 Z`} fill={this.tint(2, 62, 0.14)} />
            <path d={`M${trace.join(' L')}`} fill="none" stroke={this.tint(2, 44)} strokeWidth={0.9}
                strokeLinejoin="round" strokeLinecap="round" />
        </>);
    }

    // THE SLOW CURRENT IS HELD, NOT SIMULATED. Adaptation enters the fast
    // equation as `- z + I`, so a z taken from the run subtracts exactly what
    // the dial adds and the plane never changes — measured, and the two ends of
    // the slider were identical. Held at a level, the dial is the drive alone
    // and the plane crosses its own bifurcation.
    private get slow(): number { return 3.05; }

    @look('field') $view() {
        const z = this.slow;
        const darts: React.ReactNode[] = [];
        for (let row = 0; row < 24; row++) {
            for (let col = 0; col < 36; col++) {
                const seedX = 2.6 + col * 4.42;
                const seedY = 2.6 + row * 4.55;
                const [x, y] = this.of(seedX, seedY);
                const [dx, dy] = this.step(x, y, z);
                const [ux, uy] = [dx * 36, -dy * 6.9];
                const speed = Math.hypot(ux, uy) || 1;
                const a = Math.atan2(uy, ux);
                const quicken = Math.min(1, speed / 60);
                const long = 0.85 + quicken * 1.55;
                const wide = 0.42 + quicken * 0.62;
                // THREE HOLLOW CHEVRONS TO AN ARROW, marching along the flow and
                // stepping through the wheel as they go: the hue is the heading,
                // and the step along the arrow is the third dimension of it.
                const heading = (a + Math.PI) / (Math.PI * 2);
                for (let k = 0; k < 3; k++) {
                    const along = (k - 1) * long * 1.15;
                    const grow = 0.66 + k * 0.24;
                    const px = seedX + Math.cos(a) * along;
                    const py = seedY + Math.sin(a) * along;
                    const tip = [px + Math.cos(a) * long * grow, py + Math.sin(a) * long * grow];
                    const back = [px - Math.cos(a) * long * grow * 0.5, py - Math.sin(a) * long * grow * 0.5];
                    const wing = (turn: number) => [
                        back[0] - Math.sin(a) * wide * grow * turn,
                        back[1] + Math.cos(a) * wide * grow * turn,
                    ];
                    const [lx, ly] = wing(1);
                    const [rx, ry] = wing(-1);
                    darts.push(
                        <polygon key={`${row}-${col}-${k}`}
                            points={`${tip[0].toFixed(1)},${tip[1].toFixed(1)} ${lx.toFixed(1)},${ly.toFixed(1)} ${rx.toFixed(1)},${ry.toFixed(1)}`}
                            fill="none"
                            stroke={`hsl(${(this.base + heading * 148 + k * 13) % 360} ${26 + quicken * 54}% ${68 - quicken * 28}%)`}
                            strokeWidth={0.28 + quicken * 0.2} strokeLinejoin="round" />,
                    );
                }
            }
        }
        return this.plate(<>{darts}</>);
    }
}

// ── rings ── a crimson band, two families of circles interfering: shape sets
// their spacing, so the moire reorganises completely as the dial moves.
export class $Rings extends $Figure {
    constructor() { super(); this[cache]('rings'); }

    protected override get shift() { return 140; }

    private point(at: number, radius: number): [number, number] {
        const a = (at / 9) * Math.PI * 2 - Math.PI / 2;
        return [80 + Math.cos(a) * radius, 55 + Math.sin(a) * radius];
    }

    @look('field') $view() {
        const step = 2.4 + this.$shape / 30;
        const count = Math.ceil(120 / step);
        const family = (cx: number, turn: number) => Array.from({ length: count }, (_, at) => {
            const r = (at + 1) * step;
            const crest = Math.pow(Math.cos((at * Math.PI) / 2.6), 2);
            return <circle key={`${cx}-${at}`} cx={cx} cy={55} r={r} fill="none"
                stroke={this.tint((at + turn) % 9, 40 + crest * 22)}
                strokeWidth={0.35 + crest * 1.5} opacity={(0.18 + crest * 0.72) * Math.max(0.2, 1 - r / 130)} />;
        });
        return this.plate(
            <g style={{ mixBlendMode: 'multiply' }}>
                <g>{family(48, 0)}</g>
                <g>{family(112, 4)}</g>
            </g>,
        );
    }

    @look('reading') view() {
        const ring = this.values.map((v, at) => this.point(at, 10 + v * 42));
        return this.plate(<>
            {[16, 30, 44].map(r => <circle key={r} cx={80} cy={55} r={r} fill="none" stroke={this.ink} strokeWidth={0.4} opacity={0.28} />)}
            {ring.map(([x, y], at) => <line key={at} x1={80} y1={55} x2={x} y2={y} stroke={this.ink} strokeWidth={0.4} opacity={0.35} />)}
            <polygon points={ring.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')}
                fill={this.tint(3, 56, 0.32)} stroke={this.tint(3, 46)} strokeWidth={1.4} />
            {ring.map(([x, y], at) => <circle key={at} cx={x} cy={y} r={2} fill={this.tint(at, 48)} />)}
        </>);
    }
}

// ── pulse ── a teal band read as a DUOTONE, and `shape` moves its lightness.
export class $Pulse extends $Figure {
    constructor() { super(); this[cache]('pulse'); }

    protected override get shift() { return 320; }

    protected override tint(at: number, light = 56, alpha = 1): string {
        const t = (Math.abs(at) % 9) / 8;
        return `hsl(${(this.base + t * 34) % 360} ${48 + t * 26}% ${light * 0.5 + 26}% / ${alpha})`;
    }

    @look('field') $view() {
        const k = this.$shape / 100;
        const rows = 9;
        return this.plate(<>
            {Array.from({ length: rows }, (_, at) => {
                const baseY = 20 + at * 10.4;
                const crest = Array.from({ length: 41 }, (_, i) => {
                    const x = i * 4;
                    const amp = 30 * this.values[(i + at * 3) % 9] * (0.3 + k);
                    const bump = Math.exp(-Math.pow((x - 34 - at * 11) / 24, 2));
                    const ripple = Math.abs(Math.sin(x / 19 + at * 0.9 + k * 3.4));
                    return `${i ? 'L' : 'M'}${x},${(baseY - bump * amp - ripple * amp * 0.32).toFixed(1)}`;
                }).join(' ');
                return (
                    <g key={at}>
                        <path d={`${crest} L160,${baseY + 1} L0,${baseY + 1} Z`} fill={this.tint(at, 90 - at * 4)} />
                        <path d={crest} fill="none" stroke={this.tint(at, 34)} strokeWidth={0.65} />
                    </g>
                );
            })}
        </>);
    }

    @look('reading') view() {
        return this.plate(<>
            {this.values.map((v, at) => (
                <rect key={at} x={at * 17.6 + 3} y={98 - v * 84} width={3 + v * 9} height={v * 84}
                    rx={1.6} fill={this.tint(at, 40 + v * 26)} />
            ))}
        </>);
    }
}

// ── weave ── a violet band read as a TRIAD, with `shape` on the saturation.
export class $Weave extends $Figure {
    constructor() { super(); this[cache]('weave'); }

    protected override get shift() { return 75; }

    protected override tint(at: number, light = 56, alpha = 1): string {
        return `hsl(${(this.base + (Math.round(at) % 3) * 120) % 360} 48% ${light}% / ${alpha})`;
    }

    @look('reading') view() {
        const v = this.values;
        return this.plate(<>
            {v.map((val, col) => Array.from({ length: 6 }, (_, row) => (
                <rect key={`${col}-${row}`} x={col * 17.6 + 1} y={row * 18 + 1} width={15.6} height={16}
                    rx={2.4} fill={this.tint(col + row, 50, 0.16 + Math.abs(Math.sin(val * 3 + row)) * 0.8)} />
            )))}
        </>);
    }

    // A SETT, woven rather than layered: the widths repeat as a real tartan's
    // do, and the crossings multiply, so warp over weft darkens the way cloth
    // does instead of merely stacking two translucent rectangles.
    @look('field') $view() {
        const sett = [11, 2.5, 6, 2.5, 15, 2.5, 6, 2.5];
        const scale = 0.72 + this.$shape / 190;
        const stripes: { at: number; at0: number; w: number }[] = [];
        for (let x = 0, at = 0; x < 176; at++) {
            const w = sett[at % sett.length] * scale;
            stripes.push({ at, at0: x, w });
            x += w;
        }
        const wide = (w: number) => w > 9 * scale;
        const bar = (st: { at: number; at0: number; w: number }, across: boolean) => (
            <rect key={`${across ? 'h' : 'v'}${st.at}`}
                x={across ? 0 : st.at0} y={across ? st.at0 * 0.7 : 0}
                width={across ? 160 : st.w} height={across ? st.w * 0.7 : 110}
                fill={this.tint(st.at, wide(st.w) ? 58 : 78)}
                style={across ? { mixBlendMode: 'multiply' } : undefined} />
        );
        return this.plate(<>
            {stripes.map(st => bar(st, false))}
            {stripes.filter(st => st.at0 * 0.7 < 110).map(st => bar(st, true))}
        </>);
    }
}

// ── orbit ── a green band.
export class $Orbit extends $Figure {
    constructor() { super(); this[cache]('orbit'); }

    protected override get shift() { return 250; }

    // NINE BODIES, NINE HUES. The band is the widest of the six, so the planets
    // march across it rather than sharing one green.
    protected override get span() { return 96; }

    @look('field') $view() {
        return this.plate(<>
            {this.values.map((v, at) => {
                const r = 8 + at * 5.6;
                const a = v * Math.PI * 2;
                return (
                    <g key={at}>
                        <circle cx={80} cy={55} r={r} fill="none" stroke={this.tint(at, 68, 0.5)} strokeWidth={0.5} />
                        <circle cx={80 + Math.cos(a) * r} cy={55 + Math.sin(a) * r} r={1.6 + v * 3}
                            fill={this.tint(at, 40 + (at % 3) * 8)} />
                    </g>
                );
            })}
            <circle cx={80} cy={55} r={5.5} fill={this.ink} />
        </>);
    }

    @look('reading') view() {
        const mean = this.values.reduce((a, b) => a + b, 0) / this.values.length;
        const sweep = mean * Math.PI * 1.5;
        const start = Math.PI * 0.75;
        const arc = (from: number, to: number, r: number) => {
            const [x1, y1] = [80 + Math.cos(from) * r, 55 + Math.sin(from) * r];
            const [x2, y2] = [80 + Math.cos(to) * r, 55 + Math.sin(to) * r];
            return `M${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${to - from > Math.PI ? 1 : 0} 1 ${x2.toFixed(1)},${y2.toFixed(1)}`;
        };
        return this.plate(<>
            <path d={arc(start, start + Math.PI * 1.5, 40)} fill="none" stroke={this.ink} strokeWidth={9} opacity={0.14} strokeLinecap="round" />
            <path d={arc(start, start + sweep, 40)} fill="none" stroke={this.tint(4, 48)} strokeWidth={9} strokeLinecap="round" />
            <text x={80} y={60} textAnchor="middle" fontSize={20} fill={this.ink} fontFamily="monospace">
                {Math.round(mean * 100)}
            </text>
        </>);
    }
}

// The component is named for what the page shows, so the source and the screen
// read the same line. The class keeps its own name.
const Fig = $($Figure) as any;
$($Constellation); $($Neuron); $($Rings); $($Pulse); $($Weave); $($Orbit);

class $Studio extends $Chemical {
    hue = 208;
    shape = 46;
    at: 'reading' | 'field' = 'reading';
    showing = 'stars';

    looks: ('reading' | 'field')[] = ['reading', 'field'];

    words = ['stars', 'neuron', 'rings', 'pulse', 'weave', 'orbit'];

    view() {
        return (
            <Frame>
                <Dials>
                    <Dial>hue
                        <Slide type="range" min={0} max={359} value={this.hue}
                            onChange={e => { this.hue = Number(e.target.value); }} />
                    </Dial>
                    <Dial>shape
                        <Slide type="range" min={0} max={100} value={this.shape}
                            onChange={e => { this.shape = Number(e.target.value); }} />
                    </Dial>
                    <Dial>look
                        {this.looks.map(name => (
                            <Switch key={name} $on={this.at === name} onClick={() => { this.at = name; }}>{name}</Switch>
                        ))}
                    </Dial>
                </Dials>
                <Said>{`<Fig hue={${this.hue}} shape={${this.shape}} look="${this.at}">${this.showing}</Fig>`}</Said>
                <Body>
                    <Stage>
                        <Fig hue={this.hue} shape={this.shape} look={this.at}>{this.showing}</Fig>
                    </Stage>
                    <PreviewRow>
                    {this.words.map(word => (
                        <PreviewTile key={word} $active={this.showing === word} onClick={() => { this.showing = word; }}>
                            <PreviewScale>
                                <Fig hue={this.hue} shape={this.shape} look={this.at}>{word}</Fig>
                            </PreviewScale>
                            <PreviewName>{`<Fig>${word}</Fig>`}</PreviewName>
                        </PreviewTile>
                    ))}
                    </PreviewRow>
                </Body>
            </Frame>
        );
    }
}

const Studio = $($Studio);

export default function FiguresDemo() {
    return <Studio />;
}

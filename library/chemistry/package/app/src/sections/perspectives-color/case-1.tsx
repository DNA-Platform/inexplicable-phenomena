import React from 'react';
import { $, $Chemical, $check, Perspective } from '@/index';
import {
    Frame, PreviewRow, PreviewTile, PreviewScale, PreviewName, Stage,
    HueRow, HueLabel, HueInput,
    SwatchBox, SwatchTile, SwatchValue, BigReadout, ReadoutChip,
    Channels, Channel, ChannelLabel, ChannelTrack, ChannelFill, ChannelValue,
} from './faces';

// $Color — properties (h/s/l), protected utilities, a protected template method,
// and a default view, all IN the class. The lenses below override only `view`,
// using these same `this` helpers — which is the point of the pattern.
class $Color extends $Chemical {
    h = 28; s = 80; l = 56;

    protected get css() { return `hsl(${Math.round(this.h)}, ${this.s}%, ${this.l}%)`; }
    protected get rgb(): [number, number, number] {
        const s = this.s / 100, l = this.l / 100;
        const k = (n: number) => (n + this.h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
        return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
    }
    protected get hex() { return '#' + this.rgb.map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase(); }

    // a protected template the channel lenses share
    protected channels(rows: [string, number, number, string][]) {
        return (
            <Channels>
                {rows.map(([label, value, max, color]) => (
                    <Channel key={label}>
                        <ChannelLabel>{label}</ChannelLabel>
                        <ChannelTrack><ChannelFill $pct={(value / max) * 100} $color={color} /></ChannelTrack>
                        <ChannelValue>{Math.round(value)}</ChannelValue>
                    </Channel>
                ))}
            </Channels>
        );
    }

    view() {
        return <SwatchBox><SwatchTile $color={this.css} /><SwatchValue>{this.css}</SwatchValue></SwatchBox>;
    }
}

class Swatch extends $Color {            // overrides nothing → the swatch transfers; the default
    constructor() { super(); if (new.target === Swatch) this.reveal(new Perspective('swatch', true)); }
}
class Hex extends $Color {
    constructor() { super(); if (new.target === Hex) this.reveal(new Perspective('hex')); }
    view() { return <BigReadout><ReadoutChip $color={this.css} />{this.hex}</BigReadout>; }
}
class Rgb extends $Color {
    constructor() { super(); if (new.target === Rgb) this.reveal(new Perspective('rgb')); }
    view() {
        const [r, g, b] = this.rgb;
        return this.channels([['R', r, 255, 'hsl(0,72%,52%)'], ['G', g, 255, 'hsl(140,70%,42%)'], ['B', b, 255, 'hsl(220,75%,55%)']]);
    }
}
class Hsl extends $Color {
    constructor() { super(); if (new.target === Hsl) this.reveal(new Perspective('hsl')); }
    view() { return this.channels([['H', this.h, 360, this.css], ['S', this.s, 100, this.css], ['L', this.l, 100, this.css]]); }
}

new Swatch();
new Hex();
new Rgb();
new Hsl();

// A palette: one LIVE $Color (bonded as a child), a hue slider, and a menu of its
// lenses. Each lens is already bound to the color, so it renders that one object
// its own way; dragging hue mutates the color and every lens re-expresses live.
class $Palette extends $Chemical {
    color!: $Color;
    showing = 'swatch';
    $Palette(color: $Color) { this.color = $check(color, $Color); }

    view() {
        const lenses = this.color.perspectives;
        const active = lenses.find(p => p.name === this.showing)!;
        return (
            <Frame>
                <HueRow>
                    <HueLabel>hue {Math.round(this.color.h)}°</HueLabel>
                    <HueInput type="range" min={0} max={360} value={this.color.h}
                        onChange={e => { this.color.h = Number(e.target.value); }} />
                </HueRow>
                <PreviewRow>
                    {lenses.map(p => (
                        <PreviewTile key={p.name} $active={this.showing === p.name} onClick={() => { this.showing = p.name; }}>
                            <PreviewScale>{p.render()}</PreviewScale>
                            <PreviewName>{p.name}</PreviewName>
                        </PreviewTile>
                    ))}
                </PreviewRow>
                <Stage>{active.render()}</Stage>
            </Frame>
        );
    }
}

const Palette = $($Palette);
const Color = $($Color);

export default function ColorPerspectivesDemo() {
    return <Palette><Color /></Palette>;
}

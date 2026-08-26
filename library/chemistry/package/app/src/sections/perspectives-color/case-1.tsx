import React from 'react';
import { $, $Chemical, $check, look } from '@/index';
import {
    Frame, PreviewRow, PreviewTile, PreviewScale, PreviewName, Stage,
    HueRow, HueLabel, HueInput,
    SwatchBox, SwatchTile, SwatchValue, BigReadout, ReadoutChip,
    Channels, Channel, ChannelLabel, ChannelTrack, ChannelFill, ChannelValue,
} from './faces';

// $Color — properties (h/s/l), protected utilities, a protected template method,
// and a SERIES OF LOOKS, all in the one class. Each look draws the same state a
// different way using these same `this` helpers — which is the point of the
// pattern. `view` is the swatch, `$view` the hex, `$$view` the channels.
// THE NAMES ARE A TYPE. The class declares what its looks are called and
// retypes $look to it, so a container asking for a look that does not exist is
// a compile error rather than a throw at render. Nothing about this lives in
// the framework — $Particle keeps `number | string`, and each consumer narrows.
export type $ColorViews = 'swatch' | 'hex' | 'rgb' | 'hsl';

class $Color extends $Chemical {
    h = 28; s = 80; l = 56;

    $look: $ColorViews | number = 'swatch';

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

    @look('swatch') view() {
        return <SwatchBox><SwatchTile $color={this.css} /><SwatchValue>{this.css}</SwatchValue></SwatchBox>;
    }

    @look('hex') $view() {
        return <BigReadout><ReadoutChip $color={this.css} />{this.hex}</BigReadout>;
    }

    @look('rgb') $$view() {
        const [r, g, b] = this.rgb;
        return this.channels([['R', r, 255, 'hsl(0,72%,52%)'], ['G', g, 255, 'hsl(140,70%,42%)'], ['B', b, 255, 'hsl(220,75%,55%)']]);
    }

    @look('hsl') $$$view() {
        return this.channels([['H', this.h, 360, this.css], ['S', this.s, 100, this.css], ['L', this.l, 100, this.css]]);
    }
}

// A palette: one LIVE $Color (bonded as a child), a hue slider, and a menu of
// its looks. Every tile is THE SAME OBJECT asked for a different look — nothing
// here reaches into the framework; it just hands `look` the name it wants — so
// dragging hue mutates one color and all four tiles re-express live.
class $Palette extends $Chemical {
    color!: $Color;

    showing: $ColorViews = 'swatch';

    looks: $ColorViews[] = ['swatch', 'hex', 'rgb', 'hsl'];

    $Palette(color: $Color) { this.color = $check(color, $Color); }

    view() {
        const Color = $(this.color);
        return (
            <Frame>
                <HueRow>
                    <HueLabel>hue {Math.round(this.color.h)}°</HueLabel>
                    <HueInput type="range" min={0} max={360} value={this.color.h}
                        onChange={e => { this.color.h = Number(e.target.value); }} />
                </HueRow>
                <PreviewRow>
                    {this.looks.map(name => (
                        <PreviewTile key={name} $active={this.showing === name} onClick={() => { this.showing = name; }}>
                            <PreviewScale><Color look={name} /></PreviewScale>
                            <PreviewName>{name}</PreviewName>
                        </PreviewTile>
                    ))}
                </PreviewRow>
                <Stage><Color look={this.showing} /></Stage>
            </Frame>
        );
    }
}

const Palette = $($Palette);
const Color = $($Color);

export default function ColorPerspectivesDemo() {
    return <Palette><Color /></Palette>;
}

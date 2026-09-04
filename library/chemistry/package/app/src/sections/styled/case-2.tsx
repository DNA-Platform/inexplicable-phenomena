import React from 'react';
import { $, $Chemical, children, styled } from '@/index';
import { ActionButton } from '../V-1/case.styled';

// Chemistry wants things reactive, so a plain name is the ordinary spelling.
//   background   reactive — the chemical restyles itself
//   $color       a prop   — reactive, and given from outside
//   _borderLeft  inert    — the rare case: baked into the stylesheet
class $Swatch extends $Chemical {
    selector = styled.div;
    margin = '0 0 10px';
    padding = '18px';
    borderRadius = '6px';
    fontFamily = 'Georgia, serif';
    background = '#eaecf0';
    $color = '#202122';
    _borderLeft = '10px solid #3366cc';

    warm() {
        this.background = this.background === '#eaecf0' ? '#fdf3d8' : '#eaecf0';
    }

    ink() {
        this.$color = this.$color === '#202122' ? '#b32424' : '#202122';
    }

    edge() {
        this._borderLeft = '10px solid #14866d';
    }

    view() {
        return <div>{this[children]}</div>;
    }
}

const Swatch = $($Swatch);

class $Bench extends $Chemical {
    swatch = new $Swatch();

    view() {
        const Held = $(this.swatch);

        return (
            <div data-demo="two">
                <Held>background · $color · _borderLeft</Held>
                <ActionButton onClick={() => this.swatch.warm()}>background</ActionButton>
                <ActionButton onClick={() => this.swatch.ink()}>$color</ActionButton>
                <ActionButton onClick={() => this.swatch.edge()}>_borderLeft</ActionButton>
                <Swatch color="#14866d">given $color from outside</Swatch>
            </div>
        );
    }
}

const Bench = $($Bench);

export default function Case2Demo() {
    return <Bench />;
}

import React from 'react';
import { $, $Chemical, $Theme, children, styled, theme } from '@/index';
import { ActionButton } from '../V-1/case.styled';

// A theme is a chemical that provides itself: its fields are the values, what
// it holds is drawn in them, and a field written on it repaints the styled
// beneath — a styled chemical reading this[theme] and a raw styled component
// reading props.theme alike, because the provider is styled-components' own.
class $Palette extends $Theme {
    paper = '#f8f9fa';
    ink = '#202122';
    rule = '#a2a9b1';
    get ruled() { return `1px solid ${this.rule}`; }
}

class $Card extends $Chemical {
    selector = styled.article;
    get background() { return this[theme].paper; }
    get color() { return this[theme].ink; }
    get border() { return this[theme].ruled; }
    padding = '10px 14px';
    marginBottom = '8px';
    borderRadius = '6px';

    view() {
        return <article>{this[children]}</article>;
    }
}

const Card = $($Card);

// Not a chemical at all — styled-components as anyone writes it, beneath the
// same theme.
const Plain = styled.p`
    margin: 0 0 8px;
    padding: 10px 14px;
    background: ${(p: any) => p.theme.paper};
    color: ${(p: any) => p.theme.ink};
    border: 1px dashed ${(p: any) => p.theme.rule};
`;

// The desk holds the palette and writes it; nothing is re-registered and
// nothing is swapped — the values change, and what read them follows.
class $Desk extends $Chemical {
    palette = new $Palette();
    night = false;

    view() {
        const Palette = $(this.palette);

        return (
            <div data-demo="six">
                <Palette>
                    <Card>a styled chemical reading this[theme]</Card>
                    <Plain>a raw styled component reading props.theme</Plain>
                </Palette>
                <ActionButton onClick={() => this.toggle()}>write the theme</ActionButton>
            </div>
        );
    }

    toggle() {
        this.night = !this.night;
        this.palette.paper = this.night ? '#202122' : '#f8f9fa';
        this.palette.ink = this.night ? '#f8f9fa' : '#202122';
        this.palette.rule = this.night ? '#72777d' : '#a2a9b1';
    }
}

const Desk = $($Desk);

export default function Case6Demo() {
    return <Desk />;
}

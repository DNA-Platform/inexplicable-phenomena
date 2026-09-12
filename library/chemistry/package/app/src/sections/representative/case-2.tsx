import React from 'react';
import { $, $Chemical, $check } from '@/index';
import * as themes from './theme';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';
import {
    Frame, TravelRow, TravelLabel, TravelPick, Sameness, HouseRegistered,
} from './faces';
import styled from 'styled-components';

// ─── The framework ───────────────────────────────────────────────────────────
// $Leaf paints with whatever theme stands in its scope:
//
//     const theme = $(themes.Theme).$;
//
// Read left to right — resolve in this scope, then the MODEL the answer wears.
// That is how a value-bearing abstraction travels through a container whose
// currency is components. The leaf is written once and never subclassed, and
// it is never told which theme it is in.

const Sheet = styled.div<{ $paper: string; $ink: string; $rule: string }>`
    display: flex; flex-direction: column; gap: 10px;
    padding: 16px 18px; border-radius: 10px;
    background: ${p => p.$paper}; color: ${p => p.$ink};
    border: 1px solid ${p => p.$rule};
    transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
`;
const Heading = styled.div<{ $accent: string }>`
    font-family: ${p => p.theme.font.mono}; font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase; color: ${p => p.$accent};
`;
const Line = styled.div`font-family: ${p => p.theme.font.sans}; font-size: 13px; line-height: 1.55;`;

class $Leaf extends $Chemical {
    $words? = '';

    view() {
        const theme = $(themes.Theme).$ as themes.$Theme;
        return (
            <Sheet $paper={theme.paper} $ink={theme.ink} $rule={theme.rule}>
                <Heading $accent={theme.accent}>{theme.name}</Heading>
                <Line>{this.$words}</Line>
            </Sheet>
        );
    }
}

class $Bound extends $Chemical {
    leaves: $Leaf[] = [];
    $Bound(...leaves: $Leaf[]) { this.leaves = leaves.map(l => $check(l, $Leaf)); }
    view() {
        return (
            <div style={{ display: 'grid', gap: 10 }}>
                {this.leaves.map((leaf, i) => { const Held = $(leaf); return <Held key={i} />; })}
            </div>
        );
    }
}

const Leaf = $($Leaf);
const Bound = $($Bound);

// ─── The application's own scope ─────────────────────────────────────────────
// One scope, derived once, at module load. Nothing is registered on it yet —
// so it starts as the plain theme, which is what an unregistered ask answers.

const Reading = $($, Bound);

// ─── The showcase ────────────────────────────────────────────────────────────

class $Study extends $Chemical {
    chosen = 'plain';
    switched = false;
    silent = false;
    silentTried = false;

    // Re-registering from a HANDLER is legal — a handler runs after the paint,
    // so it is configuration rather than a scope changing mid-frame. And since
    // 2026-09-12 a registration REDRAWS what it reaches: the scope reacts what it
    // has mounted, and the leaves re-ask. This writes the registration and moves
    // reactive state too; the button beside it writes only the registration.
    choose(name: string, theme: any) {
        $(Reading, themes.Theme)(theme);
        this.chosen = name;
        this.switched = true;
    }

    // Only the registration, nothing reactive of its own — and the reading
    // repaints anyway, because a registration on a scope redraws that scope.
    silently(theme: any) {
        $(Reading, themes.Theme)(theme);
    }

    nudge() {
        this.silent = !this.silent;
    }

    view() {
        const proven = this.switched;
        const state = proven ? 'pass' : 'pending';
        return (
            <Frame>
                <TravelRow>
                    <TravelLabel>the theme registered on this reading</TravelLabel>
                    {[['plain', themes.Theme], ['dawn', themes.Dawn], ['dusk', themes.Dusk], ['sea', themes.Sea]].map(
                        ([name, theme]) => (
                            <TravelPick key={name as string} $active={this.chosen === name}
                                onClick={() => this.choose(name as string, theme)}>
                                {name as string}
                            </TravelPick>
                        ))}
                </TravelRow>

                <Reading>
                    <Leaf words="A theme is a chemical here, registered like any other part." />
                    <Leaf words="No leaf is told which theme it is in; it asks, and the scope answers." />
                </Reading>

                <HouseRegistered>{`$(Reading, Theme)(${this.chosen === 'plain' ? 'Theme' : this.chosen[0].toUpperCase() + this.chosen.slice(1)})`}</HouseRegistered>

                <TravelRow>
                    <TravelLabel>and the honest part</TravelLabel>
                    <TravelPick onClick={() => this.silently(themes.Dawn)}>register dawn, change nothing else</TravelPick>
                    <TravelPick onClick={() => this.nudge()}>now repaint</TravelPick>
                </TravelRow>

                <Sameness>
                    Re-registering from a handler is <b>legal</b> — a handler runs after the paint.
                    And <b>a registration redraws what it reaches</b>: press <b>register dawn</b> and the
                    leaves turn to dawn with nothing else written, because the reading was registered on
                    and the reading is what repaints. <b>now repaint</b> is here to show it changes nothing
                    further — the registration already did the work.
                </Sameness>

                <VerdictSection>
                    <VerdictRow $state={state}>
                        <VerdictDot $state={state} />
                        {proven
                            ? '✓ a theme is a chemical, registered live from a handler — the leaves repainted without being edited, subclassed, or passed anything'
                            : '○ pick a theme; the leaves are never told which one they are in'}
                    </VerdictRow>
                </VerdictSection>
            </Frame>
        );
    }
}

const Study = $($Study);

export default function ThemeRegistrationDemo() {
    return <Study />;
}

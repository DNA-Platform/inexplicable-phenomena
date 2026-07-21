import React from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const drift = keyframes`
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.12; }
    25% { transform: translate(30px, -20px) scale(1.1); opacity: 0.18; }
    50% { transform: translate(-10px, 15px) scale(0.95); opacity: 0.1; }
    75% { transform: translate(20px, 10px) scale(1.05); opacity: 0.16; }
`;

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const strokeIn = keyframes`
    from { -webkit-text-stroke-color: transparent; }
    to { -webkit-text-stroke-color: rgba(100, 210, 210, 0.35); }
`;

const opalWave = keyframes`
    0%   { color: #C8F4FB; }
    12%  { color: #B8EEE8; }
    24%  { color: #C1F5E8; }
    36%  { color: #D4EEF8; }
    48%  { color: #E2D7FD; }
    60%  { color: #F2D4F0; }
    72%  { color: #FEEFC9; }
    84%  { color: #D0F0F0; }
    100% { color: #C8F4FB; }
`;

const GlobalStyle = createGlobalStyle`
    body {
        background: #0c1b1f;
        color: #e8e4df;
    }
`;

const Page = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    @media (max-width: 768px) {
        justify-content: flex-start;
        padding-top: 28vh;
        padding-left: 5vw;
        padding-right: 5vw;
    }
`;

const Orb = styled.div<{ $x: number; $y: number; $size: number; $hue: number; $delay: number }>`
    position: absolute;
    width: ${p => p.$size}px;
    height: ${p => p.$size}px;
    left: ${p => p.$x}%;
    top: ${p => p.$y}%;
    border-radius: 50%;
    background: radial-gradient(
        circle at 30% 30%,
        hsla(${p => p.$hue}, 60%, 65%, 0.2),
        hsla(${p => p.$hue}, 50%, 40%, 0.05) 60%,
        transparent 70%
    );
    filter: blur(${p => p.$size * 0.3}px);
    animation: ${drift} ${p => 12 + p.$delay * 3}s ease-in-out infinite;
    animation-delay: ${p => -p.$delay * 2}s;
    pointer-events: none;
`;

const Title = styled.h1`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 300;
    letter-spacing: 0.08em;
    text-align: center;
    color: #e8e4df;
    paint-order: stroke fill;
    -webkit-text-stroke: 3px transparent;
    animation: ${fadeIn} 2s ease-out both, ${strokeIn} 1.5s ease-out 2.5s both;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        font-size: 10.5vw;
        max-width: 90vw;
    }
`;

const SubtitleWrap = styled.p`
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(1.53rem, 3.19vw, 2.55rem);
    font-weight: 400;
    font-style: italic;
    letter-spacing: 0.18em;
    text-transform: lowercase;
    margin-top: 28px;
    display: flex;
    justify-content: center;
    animation: ${fadeIn} 2s ease-out 0.6s both;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        font-size: 5.5vw;
        margin-top: 3vw;
    }
`;

const OpalLetter = styled.span<{ $i: number; $rev: boolean }>`
    display: inline-block;
    animation: ${opalWave} 6.25s ease-in-out infinite;
    animation-delay: ${p => (p.$rev ? (10 - p.$i) : p.$i) * 0.19}s;
    animation-direction: ${p => p.$rev ? 'reverse' : 'normal'};
    color: #C8F4FB;
    text-shadow:
        0 0 1px currentColor,
        0 0 3px currentColor;
`;

const Rule = styled.div`
    width: clamp(80px, 12vw, 160px);
    height: 1px;
    background: linear-gradient(
        90deg,
        transparent,
        hsla(180, 30%, 60%, 0.35),
        transparent
    );
    margin-top: 20px;
    animation: ${fadeIn} 2s ease-out 1.2s both;
    position: relative;
    z-index: 1;

    @media (max-width: 768px) {
        width: 18vw;
        margin-top: 2.5vw;
    }
`;

const orbs = [
    { x: 20, y: 25, size: 300, hue: 250, delay: 0 },
    { x: 70, y: 60, size: 250, hue: 30, delay: 1.5 },
    { x: 45, y: 40, size: 200, hue: 340, delay: 3 },
    { x: 15, y: 70, size: 180, hue: 200, delay: 4.5 },
    { x: 80, y: 20, size: 220, hue: 160, delay: 2 },
];

const letters = 'coming soon'.split('');

class $Teaser extends $Chemical {
    reversed = false;
    _started = false;

    _scheduleFlip() {
        const delay = 3000 + Math.random() * 4000;
        setTimeout(() => {
            this.reversed = !this.reversed;
            this._scheduleFlip();
        }, delay);
    }

    view() {
        if (!this._started) {
            this._started = true;
            this._scheduleFlip();
        }
        return (
            <Page>
                <GlobalStyle />
                {orbs.map((o, i) => (
                    <Orb key={i} $x={o.x} $y={o.y} $size={o.size} $hue={o.hue} $delay={o.delay} />
                ))}
                <Title>Inexplicable Phenomena</Title>
                <SubtitleWrap aria-label="coming soon">
                    {letters.map((ch, i) => (
                        <OpalLetter key={i} $i={i} $rev={this.reversed} aria-hidden>
                            {ch === ' ' ? ' ' : ch}
                        </OpalLetter>
                    ))}
                </SubtitleWrap>
                <Rule />
            </Page>
        );
    }
}

const Teaser = $($Teaser);

export function App() {
    return <Teaser />;
}

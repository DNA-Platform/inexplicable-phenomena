import styled, { keyframes } from 'styled-components';

const serif = 'Georgia, "Iowan Old Style", "Times New Roman", serif';
const mono = 'ui-monospace, Menlo, Consolas, monospace';

const ink = '#241f1a';
const faded = 'rgba(36, 31, 26, 0.56)';
const rust = '#8c3b1e';
const paper = '#f6f1e6';

const rise = keyframes`
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const Manuscript = styled.div`
    min-height: 100vh;
    background:
        radial-gradient(1400px 900px at 22% -10%, #fffdf7 0%, rgba(255, 253, 247, 0) 60%),
        linear-gradient(180deg, ${paper} 0%, #f1ead9 100%);
    color: ${ink};
    padding: 0 0 16vh;
`;

export const Masthead = styled.header`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 20px;
    padding: 26px clamp(20px, 6vw, 84px) 20px;
    border-bottom: 1px solid rgba(36, 31, 26, 0.14);
    position: sticky;
    top: 0;
    z-index: 5;
    background: rgba(246, 241, 230, 0.92);
    backdrop-filter: blur(6px);
`;

export const Standing = styled.span`
    font-family: ${serif};
    font-size: 15px;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: color 200ms ease;

    &:hover { color: ${rust}; }
`;

export const Imprint = styled.span`
    font-family: ${mono};
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${faded};
`;

export const ImprintMark = styled.span`
    cursor: pointer;
    transition: color 200ms ease;

    &:hover { color: ${rust}; }
`;

export const Spread = styled.article`
    display: grid;
    grid-template-columns: minmax(0, 34rem) minmax(0, 15rem);
    gap: clamp(20px, 4vw, 56px);
    max-width: 60rem;
    margin: 0 auto;
    padding: 8vh clamp(20px, 6vw, 40px) 0;

    @media (max-width: 900px) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

export const Body = styled.div`
    min-width: 0;
`;

export const Margin = styled.aside`
    position: sticky;
    top: 22vh;
    align-self: start;
    border-left: 1px solid rgba(36, 31, 26, 0.16);
    padding-left: 18px;

    @media (max-width: 900px) {
        position: static;
        border-left: 0;
        border-top: 1px solid rgba(36, 31, 26, 0.16);
        padding: 18px 0 0;
        margin-top: 6vh;
    }
`;

export const MarginName = styled.div`
    font-family: ${mono};
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${faded};
    margin-bottom: 12px;
`;

export const Quote = styled.blockquote<{ $lit?: boolean }>`
    margin: 0 0 16px;
    font-family: ${serif};
    font-size: 13.5px;
    line-height: 1.7;
    color: ${(p) => (p.$lit ? ink : faded)};
    border-left: 2px solid ${(p) => (p.$lit ? rust : 'transparent')};
    padding-left: 10px;
    cursor: pointer;
    transition: color 240ms ease, border-color 240ms ease;

    &:hover { color: ${ink}; }
`;

export const QuoteWho = styled.cite`
    display: block;
    margin-top: 5px;
    font-family: ${mono};
    font-size: 10px;
    font-style: normal;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${faded};
`;

export const Heading = styled.h2`
    margin: 0 0 6px;
    font-family: ${serif};
    font-weight: 400;
    font-size: clamp(1.7rem, 3.6vw, 2.5rem);
    line-height: 1.15;
    letter-spacing: -0.01em;
`;

export const Folio = styled.div`
    font-family: ${mono};
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${faded};
    margin-bottom: 26px;
`;

export const Prose = styled.div`
    font-family: ${serif};
    font-size: 17px;
    line-height: 1.78;
    white-space: pre-line;
    animation: ${rise} 460ms ease-out both;

    .section { margin: 0 0 1.2em; }
    figure, div, pre { white-space: normal; }

    & > .section:first-child::first-letter {
        float: left;
        font-size: 3.4em;
        line-height: 0.82;
        padding: 0.06em 0.1em 0 0;
        font-weight: 400;
        color: ${rust};
    }
`;

export const Marked = styled.mark`
    background: linear-gradient(180deg, transparent 62%, rgba(140, 59, 30, 0.18) 62%);
    color: inherit;
    cursor: pointer;
    transition: background 240ms ease;

    &:hover { background: linear-gradient(180deg, transparent 52%, rgba(140, 59, 30, 0.3) 52%); }
`;

export const Plate = styled.figure`
    display: block;
    margin: 2.6em 0;
    padding: 20px 22px 18px;
    background: rgba(255, 253, 247, 0.8);
    border: 1px solid rgba(36, 31, 26, 0.16);
    animation: ${rise} 600ms ease-out both;
`;

export const PlateCaption = styled.figcaption`
    font-family: ${mono};
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${faded};
    margin-bottom: 14px;
`;

export const Rule = styled.hr`
    border: 0;
    border-top: 1px solid rgba(36, 31, 26, 0.2);
    margin: 0;
`;

export const Loop = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
`;

export const LoopBook = styled.span<{ $home?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: ${serif};
    font-size: 13px;
    padding: 6px 11px;
    border: 1px solid ${(p) => (p.$home ? rust : 'rgba(36, 31, 26, 0.24)')};
    color: ${(p) => (p.$home ? rust : ink)};
    background: ${(p) => (p.$home ? 'rgba(140, 59, 30, 0.06)' : 'transparent')};
`;

export const LoopArrow = styled.span`
    color: ${faded};
    font-size: 12px;
`;

export const LoopSelf = styled.span`
    color: ${rust};
    font-size: 14px;
`;

export const Slip = styled.div`
    background: #fffdf7;
    border: 1px solid rgba(36, 31, 26, 0.2);
    box-shadow: 2px 3px 0 rgba(36, 31, 26, 0.07);
    padding: 14px 16px;
    max-width: 26rem;
    transform: rotate(-0.4deg);
    transition: transform 220ms ease, box-shadow 220ms ease;

    &:hover {
        transform: rotate(0deg) translateY(-2px);
        box-shadow: 3px 6px 0 rgba(36, 31, 26, 0.09);
    }
`;

export const SlipName = styled.div`
    font-family: ${serif};
    font-size: 15px;
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid rgba(36, 31, 26, 0.14);
`;

export const SlipBody = styled.div`
    display: grid;
    grid-template-columns: 6.5rem minmax(0, 1fr);
    gap: 10px;
    font-family: ${mono};
    font-size: 11.5px;
    line-height: 1.6;
    padding: 2px 0;

    em {
        font-style: normal;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: ${faded};
    }

    span { word-break: break-word; }
`;

export const Listing = styled.div`
    background: #fffdf7;
    border-left: 2px solid ${rust};

    pre {
        margin: 0;
        padding: 12px 14px;
        overflow-x: auto;
        font-family: ${mono};
        font-size: 11.5px;
        line-height: 1.65;
        color: #33291f;
    }
`;

export const ListingName = styled.div`
    font-family: ${mono};
    font-size: 10px;
    letter-spacing: 0.12em;
    color: ${faded};
    padding: 9px 14px 0;
`;

export const Turn = styled.nav`
    display: flex;
    justify-content: space-between;
    gap: 16px;
    max-width: 60rem;
    margin: 10vh auto 0;
    padding: 22px clamp(20px, 6vw, 40px) 0;
    border-top: 1px solid rgba(36, 31, 26, 0.14);
`;

export const Leaf = styled.button<{ $back?: boolean }>`
    background: none;
    border: 0;
    padding: 0;
    text-align: ${(p) => (p.$back ? 'left' : 'right')};
    font-family: ${serif};
    font-size: 14px;
    color: ${faded};
    cursor: pointer;
    transition: color 200ms ease;

    &:hover { color: ${rust}; }
    &:disabled { opacity: 0.25; cursor: default; }
`;

export const Contents = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
`;

export const Entry = styled.li<{ $at?: boolean }>`
    font-family: ${serif};
    font-size: 13.5px;
    line-height: 1.5;
    padding: 5px 0;
    color: ${(p) => (p.$at ? rust : faded)};
    cursor: pointer;
    transition: color 200ms ease;

    &:hover { color: ${ink}; }
`;

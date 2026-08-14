import styled, { keyframes } from 'styled-components';

const mono = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';
const text = '"Inter", "Helvetica Neue", Arial, sans-serif';

const ground = '#0f1620';
const panel = '#141d29';
const rule = 'rgba(126, 168, 190, 0.18)';
const ink = '#d7e3ec';
const faded = 'rgba(215, 227, 236, 0.52)';
const cyan = '#5fd4c4';

const settle = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const Sheet = styled.div`
    min-height: 100vh;
    background:
        linear-gradient(${rule} 1px, transparent 1px) 0 0 / 100% 32px,
        linear-gradient(90deg, ${rule} 1px, transparent 1px) 0 0 / 32px 100%,
        radial-gradient(1200px 800px at 80% -10%, #18242f 0%, rgba(24, 36, 47, 0) 60%),
        ${ground};
    color: ${ink};
    font-family: ${text};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 24px 96px;
`;

export const Header = styled.header`
    width: min(760px, 100%);
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    padding: 28px 0 14px;
    border-bottom: 1px solid ${rule};
    flex-wrap: wrap;
`;

export const Running = styled.button`
    font-family: ${mono};
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${faded};
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;

    &:hover {
        color: ${cyan};
    }
`;

export const Stamp = styled.span`
    font-family: ${mono};
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${faded};
`;

export const Back = styled.button`
    font-family: ${mono};
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${faded};
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;

    &:hover {
        color: ${cyan};
    }
`;

export const Plate = styled.article`
    width: min(760px, 100%);
    margin-top: 34px;
    padding: 40px 44px;
    background: ${panel};
    border: 1px solid ${rule};
    border-radius: 2px;
    animation: ${settle} 420ms ease-out both;

    h1, h2, h3 {
        font-family: ${text};
        font-weight: 500;
        letter-spacing: -0.01em;
        margin: 0 0 22px;
    }

    p {
        line-height: 1.72;
        margin: 0 0 18px;
        color: ${ink};
    }

    @media (max-width: 640px) {
        padding: 28px 22px;
    }
`;

export const Diagram = styled.figure`
    margin: 30px 0;
    padding: 26px 26px 20px;
    background: rgba(9, 14, 20, 0.55);
    border: 1px solid ${rule};
    border-radius: 2px;
`;

export const Legend = styled.figcaption`
    margin-top: 20px;
    padding-top: 14px;
    border-top: 1px solid ${rule};
    font-size: 0.84rem;
    line-height: 1.6;
    color: ${faded};
`;

export const Tree = styled.div`
    font-family: ${mono};
    font-size: 0.82rem;
    line-height: 1.9;
`;

export const Branch = styled.div<{ $depth: number; $role: string }>`
    padding-left: ${p => p.$depth * 26}px;
    color: ${p => p.$role === 'chapter' ? ink : p.$role === 'subject' ? cyan : faded};
    white-space: pre;

    &::before {
        content: '${p => p.$depth ? '└ ' : ''}';
        color: ${rule};
    }
`;

export const Role = styled.span`
    margin-left: 14px;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(95, 212, 196, 0.62);
`;

export const Pair = styled.div`
    font-family: ${mono};
    font-size: 0.8rem;
    line-height: 2;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0 18px;
    align-items: baseline;
`;

export const Way = styled.span`
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(95, 212, 196, 0.62);
    white-space: nowrap;
`;

export const Claim = styled.span`
    color: ${ink};
`;

export const Verdict = styled.div<{ $holds: boolean }>`
    margin-top: 18px;
    padding-top: 14px;
    border-top: 1px dashed ${rule};
    font-family: ${mono};
    font-size: 0.78rem;
    color: ${p => p.$holds ? cyan : '#e0796b'};
`;

export const Controls = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    font-family: ${mono};
    font-size: 0.82rem;
`;

export const Field = styled.input`
    font-family: ${mono};
    font-size: 0.86rem;
    color: ${ink};
    background: rgba(9, 14, 20, 0.6);
    border: 1px solid ${rule};
    border-radius: 2px;
    padding: 9px 12px;
    min-width: 240px;
    flex: 1 1 240px;

    &:focus {
        outline: none;
        border-color: ${cyan};
    }
`;

export const Toggle = styled.button<{ $on: boolean }>`
    font-family: ${mono};
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${p => p.$on ? ground : faded};
    background: ${p => p.$on ? cyan : 'transparent'};
    border: 1px solid ${p => p.$on ? cyan : rule};
    border-radius: 2px;
    padding: 8px 14px;
    cursor: pointer;
`;

export const Answer = styled.div`
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px dashed ${rule};
    font-family: ${mono};
    font-size: 0.86rem;
    color: ${cyan};
`;

export const Because = styled.div`
    margin-top: 6px;
    font-family: ${text};
    font-size: 0.84rem;
    line-height: 1.6;
    color: ${faded};
`;

export const Flow = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
`;

export const Step = styled.li<{ $owed: boolean }>`
    display: grid;
    grid-template-columns: 130px 1fr auto;
    gap: 4px 18px;
    align-items: baseline;
    padding: 12px 14px;
    border-left: 2px solid ${p => p.$owed ? '#e0a56b' : cyan};
    background: rgba(9, 14, 20, 0.4);

    @media (max-width: 620px) {
        grid-template-columns: 1fr;
    }
`;

export const StepName = styled.span`
    font-family: ${mono};
    font-size: 0.74rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${cyan};
`;

export const StepFlow = styled.span`
    font-family: ${mono};
    font-size: 0.82rem;
    color: ${ink};
`;

export const StepWhere = styled.span`
    font-family: ${text};
    font-size: 0.76rem;
    color: ${faded};
    white-space: nowrap;
`;

export const StepOwed = styled.span`
    grid-column: 2 / -1;
    font-family: ${text};
    font-size: 0.78rem;
    color: #e0a56b;
`;

export const Seams = styled.ol`
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 12px;
`;

export const Seam = styled.li<{ $ready: boolean }>`
    padding: 13px 15px;
    border: 1px solid ${rule};
    border-left: 2px solid ${p => p.$ready ? cyan : '#e0a56b'};
    background: rgba(9, 14, 20, 0.4);
    display: grid;
    gap: 5px;
`;

export const SeamHand = styled.span`
    font-family: ${mono};
    font-size: 0.8rem;
    color: ${ink};
`;

export const SeamAgreement = styled.span`
    font-family: ${text};
    font-size: 0.82rem;
    line-height: 1.55;
    color: ${faded};
`;

export const SeamFixture = styled.span`
    font-family: ${mono};
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    color: ${p => p.color ?? 'rgba(95, 212, 196, 0.72)'};
`;

export const Listing = styled.figure`
    margin: 30px 0;
    border: 1px solid ${rule};
    border-radius: 2px;
    overflow: hidden;
`;

export const ListingName = styled.figcaption`
    font-family: ${mono};
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${faded};
    padding: 10px 18px;
    background: rgba(9, 14, 20, 0.7);
    border-bottom: 1px solid ${rule};
`;

export const Source = styled.pre`
    margin: 0;
    padding: 18px;
    font-family: ${mono};
    font-size: 0.76rem;
    line-height: 1.7;
    color: ${ink};
    background: rgba(9, 14, 20, 0.45);
    overflow-x: auto;
`;

export const Turn = styled.nav`
    width: min(760px, 100%);
    margin-top: 26px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
`;

export const Leaf = styled.button<{ $back?: boolean }>`
    font-family: ${mono};
    font-size: 0.76rem;
    letter-spacing: 0.08em;
    color: ${p => p.disabled ? 'transparent' : faded};
    background: none;
    border: 0;
    padding: 6px 0;
    cursor: ${p => p.disabled ? 'default' : 'pointer'};
    text-align: ${p => p.$back ? 'left' : 'right'};

    &:hover {
        color: ${p => p.disabled ? 'transparent' : cyan};
    }
`;

import styled from 'styled-components';

export const DayBackdrop = styled.div`
    min-height: 100vh;
    background: radial-gradient(1100px 650px at 50% -8%, #213528 0%, #16261b 48%, #0e1a12 100%);
    color: #d9e3d6;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 56px 20px 96px;
`;

export const DayBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 30px;
`;

export const DayChip = styled.button<{ $active?: boolean }>`
    padding: 7px 15px;
    border-radius: 999px;
    border: 1px solid ${(p) => (p.$active ? 'rgba(127, 212, 165, 0.6)' : 'rgba(157, 184, 164, 0.3)')};
    background: ${(p) => (p.$active ? 'rgba(127, 212, 165, 0.12)' : 'rgba(20, 30, 23, 0.65)')};
    color: ${(p) => (p.$active ? '#a8e0bc' : '#9db8a4')};
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 12px;
    letter-spacing: 0.05em;
    cursor: pointer;
    text-decoration: none;
    transition: color 120ms, border-color 120ms, background 120ms;

    &:hover {
        color: #d9e3d6;
        border-color: rgba(157, 184, 164, 0.7);
    }
`;

export const DayRule = styled.span`
    width: 1px;
    height: 20px;
    background: rgba(157, 184, 164, 0.3);
    margin: 0 6px;
`;

export const ShelfBoard = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 20px;
    padding: 30px 64px 0;
    border-bottom: 20px solid #8a6238;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 16px 26px -14px rgba(8, 20, 13, 0.55);
    margin-top: 72px;
`;

export const Spine = styled.div<{ $ink: string; $tall: number }>`
    writing-mode: vertical-rl;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${(p) => p.$tall}px;
    min-width: 96px;
    padding: 30px 12px;
    background: ${(p) => p.$ink};
    color: #f6efdd;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 23px;
    letter-spacing: 0.04em;
    border-radius: 3px 3px 0 0;
    box-shadow: inset 2px 0 0 rgba(255, 255, 255, 0.14), inset -3px 0 6px rgba(0, 0, 0, 0.28);
    cursor: pointer;
    transition: transform 140ms;

    &:hover {
        transform: translateY(-10px);
    }
`;

export const CoverFace = styled.div<{ $ink: string }>`
    width: 380px;
    min-height: 540px;
    margin: 30px auto 0;
    background: #f1f5ee;
    color: #22352a;
    border: 1px solid #b7c8b9;
    border-top: 12px solid ${(p) => p.$ink};
    border-radius: 4px;
    box-shadow: 0 18px 40px -18px rgba(8, 20, 13, 0.55);
    padding: 72px 40px 44px;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: Georgia, 'Times New Roman', serif;
    cursor: pointer;
    transition: transform 140ms, box-shadow 140ms;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 26px 52px -20px rgba(8, 20, 13, 0.6);
    }
`;

export const CoverInvitation = styled.div`
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    color: #1f5c40;
    margin-top: 22px;
`;

export const CoverTitle = styled.div`
    font-size: 30px;
    line-height: 1.2;
`;

export const CoverSubtitle = styled.div`
    font-style: italic;
    opacity: 0.72;
    margin-top: 14px;
    font-size: 16px;
`;

export const CoverRule = styled.div`
    width: 64px;
    height: 1px;
    background: #8aa78f;
    margin: 26px auto;
`;

export const CoverBlurb = styled.div`
    font-size: 13.5px;
    opacity: 0.68;
    line-height: 1.6;
    margin-top: auto;
`;

export const Page = styled.div`
    position: relative;
    background: #f1f5ee;
    color: #1d251f;
    border: 1px solid #b7c8b9;
    border-left: 6px double #b7c8b9;
    border-radius: 3px 10px 10px 3px;
    box-shadow: -8px 0 0 -3px #e2eadf, -14px 0 0 -6px #d3dfd2, 0 24px 48px -20px rgba(8, 20, 13, 0.55);
    width: min(640px, 94vw);
    min-height: 780px;
    margin: 10px auto 46px;
    padding: 46px 58px 40px;
    font-family: Georgia, 'Times New Roman', serif;
    line-height: 1.7;
    display: flex;
    flex-direction: column;

    .book-link {
        color: #1f5c40;
        text-decoration: underline;
        text-decoration-style: dotted;
        text-underline-offset: 3px;
        cursor: pointer;
    }

    sup.note-mark {
        font-size: 0.68em;
        color: #1f5c40;
        margin-left: 1px;
        font-family: ui-monospace, Menlo, Consolas, monospace;
    }

    .lit {
        animation: lit-fade 2.2s ease-out;
    }

    @keyframes lit-fade {
        0% { background: rgba(78, 125, 91, 0.32); }
        100% { background: transparent; }
    }
`;

export const Quote = styled.blockquote`
    margin: 14px 6px 14px 10px;
    padding: 2px 0 2px 16px;
    border-left: 2px solid #4e7d5b;
    font-style: italic;
    color: #33443a;
    font-size: 15px;
`;

export const FootNotes = styled.div`
    margin-top: 26px;
    padding-top: 10px;
    border-top: 1px solid #b7c8b9;
    font-size: 12.5px;
    color: #465548;
    line-height: 1.55;

    .foot-note {
        margin: 5px 0;
    }

    .note-index {
        font-family: ui-monospace, Menlo, Consolas, monospace;
        color: #1f5c40;
        margin-right: 7px;
        font-size: 11px;
    }
`;

export const ModelMeta = styled.div`
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11px;
    color: #7d977f;
    margin: 2px 0 14px;
`;

export const ModelSection = styled.div`
    border-left: 1px solid #c2d2c3;
    padding-left: 14px;
    margin: 14px 0;
`;

export const ModelAddress = styled.span`
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 10.5px;
    color: #4e7d5b;
    letter-spacing: 0.06em;

    &.dim {
        color: #a3b7a5;
        flex-shrink: 0;
    }
`;

export const ModelHead = styled.div`
    font-weight: 600;
    font-size: 14.5px;
    margin: 2px 0 6px;
`;

export const ModelPara = styled.div`
    display: flex;
    gap: 10px;
    align-items: baseline;
    font-size: 13px;
    margin: 6px 0;
    white-space: pre-line;
`;

export const DogEar = styled.button`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 42px;
    height: 42px;
    padding: 0;
    border: none;
    cursor: pointer;
    background: linear-gradient(315deg, #ccd8c7 0%, #dfe8da 46%, rgba(0, 0, 0, 0.06) 49%, transparent 50%);
    border-radius: 0 0 9px 0;
    filter: drop-shadow(-2px -2px 3px rgba(8, 20, 13, 0.2));
    transition: width 140ms ease, height 140ms ease;

    &:hover {
        width: 58px;
        height: 58px;
    }
`;

export const Ribbon = styled.button<{ $ink: string }>`
    position: absolute;
    top: -5px;
    right: 44px;
    width: 25px;
    height: 76px;
    padding: 0;
    border: none;
    cursor: pointer;
    background: linear-gradient(175deg, ${(p) => p.$ink} 0%, ${(p) => p.$ink} 62%, rgba(0, 0, 0, 0.22) 100%), ${(p) => p.$ink};
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%);
    box-shadow: 0 4px 9px rgba(8, 20, 13, 0.35);
    opacity: 0.92;
    transition: height 140ms ease, opacity 140ms ease;

    &:hover {
        height: 90px;
        opacity: 1;
    }
`;

export const Spread = styled.div`
    display: grid;
    grid-template-columns: 340px minmax(0, 1fr);
    width: min(1060px, 100%);
    min-height: 640px;
    margin: 4px auto 44px;
    background: #f1f5ee;
    color: #1d251f;
    border: 1px solid #b7c8b9;
    border-radius: 6px;
    box-shadow: 0 26px 54px -22px rgba(8, 20, 13, 0.55);
    font-family: Georgia, 'Times New Roman', serif;
    line-height: 1.65;
    overflow: hidden;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const LeftPage = styled.div`
    padding: 38px 30px 44px 40px;
    background: linear-gradient(to left, #f3ecda 0%, #faf6ea 7%, #f1f5ee 100%);
    border-right: 1px solid #c2d2c3;
    box-shadow: inset -14px 0 22px -18px rgba(8, 20, 13, 0.45);
`;

export const RightPage = styled.div`
    padding: 38px 48px 44px 44px;
    background: linear-gradient(to right, #f3ecda 0%, #faf6ea 6%, #f1f5ee 100%);
    display: flex;
    flex-direction: column;
`;

export const LeftCoverMark = styled.div<{ $ink: string }>`
    border-top: 8px solid ${(p) => p.$ink};
    padding-top: 16px;
    margin-bottom: 22px;

    .book-title {
        font-size: 21px;
        line-height: 1.25;
    }

    .book-subtitle {
        font-style: italic;
        opacity: 0.7;
        font-size: 13.5px;
        margin-top: 5px;
    }
`;

export const ContentsEntry = styled.div<{ $open?: boolean }>`
    padding: 9px 12px 9px 10px;
    margin: 2px -10px;
    border-radius: 4px;
    cursor: pointer;
    background: ${(p) => (p.$open ? 'rgba(31, 92, 64, 0.08)' : 'transparent')};
    border-left: 3px solid ${(p) => (p.$open ? '#1f5c40' : 'transparent')};
    transition: background 120ms;

    &:hover {
        background: rgba(31, 92, 64, 0.06);
    }

    .entry-heading {
        font-size: 15px;
    }

    .entry-line {
        font-size: 12px;
        opacity: 0.62;
        margin-top: 2px;
    }
`;

export const PageBody = styled.div`
    flex: 1;
`;

export const PageTurns = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 34px;
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11.5px;
    letter-spacing: 0.06em;
`;

export const PageTurn = styled.button`
    border: none;
    background: none;
    color: #1f5c40;
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    cursor: pointer;
    padding: 6px 2px;

    &:disabled {
        color: #b9ab8b;
        cursor: default;
    }

    &:hover:not(:disabled) {
        text-decoration: underline;
    }
`;

export const Folio = styled.div`
    color: #7d977f;
`;

export const SectionHead = styled.h3`
    font-size: 16.5px;
    font-weight: 600;
    margin: 24px 0 2px;
`;

export const SectionSub = styled.div`
    font-style: italic;
    opacity: 0.68;
    font-size: 13.5px;
    margin-bottom: 6px;
`;

export const TocPage = styled.div`
    max-width: 460px;
    margin: 26px auto 0;
`;

export const TocLine = styled.div`
    display: flex;
    align-items: baseline;
    gap: 10px;
    font-size: 16px;
    cursor: pointer;

    &:hover .toc-title {
        color: #1f5c40;
    }

    .toc-leader {
        flex: 1;
        border-bottom: 1px dotted #8aa78f;
        transform: translateY(-4px);
    }

    .toc-folio {
        font-family: ui-monospace, Menlo, Consolas, monospace;
        font-size: 12px;
        color: #7d977f;
    }
`;

export const TocTag = styled.div`
    font-style: italic;
    font-size: 12.5px;
    opacity: 0.62;
    margin: 2px 0 12px 2px;
`;

export const CodeDrawer = styled.div`
    width: min(1060px, 100%);
    margin: -14px auto 46px;
    background: #faf6ea;
    border: 1px solid #b7c8b9;
    border-radius: 6px;
    box-shadow: 0 18px 40px -22px rgba(8, 20, 13, 0.5);
    overflow: hidden;
`;

export const CodeTabs = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    padding: 10px 14px 0;
    border-bottom: 1px solid #c2d2c3;
`;

export const CodeTab = styled.button<{ $active?: boolean }>`
    border: 1px solid ${(p) => (p.$active ? '#b7c8b9' : 'transparent')};
    border-bottom: none;
    border-radius: 6px 6px 0 0;
    background: ${(p) => (p.$active ? '#f1f5ee' : 'transparent')};
    color: ${(p) => (p.$active ? '#1f5c40' : '#9db8a4')};
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11.5px;
    letter-spacing: 0.03em;
    padding: 7px 12px;
    cursor: pointer;
`;

export const CodeBlock = styled.div`
    padding: 16px 20px 20px;
    overflow-x: auto;
    font-size: 12.5px;
    line-height: 1.55;

    pre {
        margin: 0;
        font-family: ui-monospace, Menlo, Consolas, monospace;
        background: transparent !important;
    }

    .line-number {
        display: inline-block;
        width: 2.2em;
        opacity: 0.4;
        user-select: none;
    }
`;

export const RunningHead = styled.div`
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #6f8b77;
    text-align: center;
    margin-bottom: 34px;

    &::after {
        content: '';
        display: block;
        width: 52px;
        height: 1px;
        background: #8aa78f;
        margin: 12px auto 0;
    }
`;

export const ChapterNumber = styled.div`
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    color: #7d977f;
    margin-bottom: 3px;
`;

export const ChapterTitle = styled.h2`
    font-size: 23px;
    font-weight: 600;
    margin: 0 0 2px;
`;

export const ChapterSubtitle = styled.div`
    font-style: italic;
    opacity: 0.7;
    margin-bottom: 8px;
`;

export const Prose = styled.p<{ $drop?: boolean }>`
    margin: 12px 0;

    ${(p) => p.$drop && `
        &::first-letter {
            font-size: 3.05em;
            float: left;
            line-height: 0.82;
            padding: 4px 8px 0 0;
            color: #1f5c40;
        }
    `}
`;

export const RevealedSummary = styled.p`
    background: #e2ecdf;
    border-left: 3px solid #4e7d5b;
    padding: 10px 14px;
    font-size: 14.5px;
`;

export const ContentsList = styled.ol`
    margin-top: 12px;
    padding-left: 6px;
    list-style: none;

    li {
        margin: 9px 0;
    }
`;

export const EntryIndex = styled.span`
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11px;
    color: #7d977f;
    margin-right: 9px;
`;

export const EntryTagline = styled.span`
    font-size: 13px;
    opacity: 0.66;
`;

export const EntrySummary = styled.div`
    font-size: 13px;
    opacity: 0.82;
    margin: 3px 0 0 2px;
`;

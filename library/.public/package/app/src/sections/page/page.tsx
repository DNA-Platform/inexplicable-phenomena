import styled from 'styled-components';

export const Backdrop = styled.div`
    min-height: 100vh;
    background: radial-gradient(1200px 700px at 50% -10%, #232a4d 0%, #171c33 45%, #0f1326 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 64px 20px 96px;
`;

export const ControlBar = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 26px;
`;

export const ControlChip = styled.button<{ $active?: boolean }>`
    padding: 7px 15px;
    border-radius: 999px;
    border: 1px solid ${(p) => (p.$active ? 'rgba(255, 210, 122, 0.75)' : 'rgba(124, 138, 200, 0.35)')};
    background: ${(p) => (p.$active ? 'rgba(255, 210, 122, 0.12)' : 'rgba(15, 19, 38, 0.72)')};
    color: ${(p) => (p.$active ? '#ffd27a' : '#aab4e8')};
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 12px;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: color 120ms, border-color 120ms, background 120ms;

    &:hover {
        color: #e6eaff;
        border-color: rgba(170, 180, 232, 0.7);
    }
`;

export const ControlRule = styled.span`
    width: 1px;
    height: 20px;
    background: rgba(124, 138, 200, 0.3);
    margin: 0 6px;
`;

export const Stage = styled.div<{ $editing?: boolean }>`
    display: grid;
    grid-template-columns: ${(p) => (p.$editing ? 'minmax(0, 420px) minmax(0, 1fr)' : 'minmax(0, 1fr)')};
    gap: 20px;
    width: min(1280px, 100%);
    align-items: start;
    justify-items: center;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`;

export const SheetPane = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    min-width: 0;
`;

export const SourcePane = styled.textarea`
    width: 100%;
    min-height: 70vh;
    resize: vertical;
    background: #12162a;
    color: #cdd5f5;
    border: 1px solid #2c3358;
    border-radius: 10px;
    padding: 16px;
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 12.5px;
    line-height: 1.6;

    &:focus {
        outline: none;
        border-color: #3d4680;
    }
`;

export const Masthead = styled.header`
    text-align: center;
    margin-bottom: 44px;
`;

export const Kicker = styled.div`
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 10.5px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #9a9178;

    &::after {
        content: '';
        display: block;
        width: 56px;
        height: 1px;
        background: #d6cfb9;
        margin: 16px auto 0;
    }
`;

const serif = `Georgia, 'Iowan Old Style', 'Times New Roman', serif`;

export const BookSkin = styled.article`
    width: min(780px, 100%);
    background: #fbf9f3;
    border-radius: 6px;
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08), 0 34px 90px -24px rgba(0, 0, 0, 0.65);
    padding: 68px 76px 56px;
    font-family: ${serif};
    color: #29251d;

    @media (max-width: 720px) {
        padding: 40px 26px 36px;
    }

    .markdown h1 {
        font-family: ${serif};
        font-size: 40px;
        line-height: 1.15;
        font-weight: 700;
        letter-spacing: -0.015em;
        text-align: center;
        margin: 0 0 30px;
        color: #1f1b14;
    }

    .markdown h2,
    .markdown h3,
    .markdown h4 {
        font-family: ${serif};
        font-size: 22px;
        font-weight: 700;
        margin: 34px 0 12px;
        color: #241f17;
    }

    .markdown p {
        font-size: 17.5px;
        line-height: 1.78;
        margin: 0 0 18px;
        text-align: justify;
        hyphens: auto;
    }

    .markdown > p:first-of-type::first-letter {
        float: left;
        font-size: 58px;
        line-height: 0.85;
        padding: 6px 10px 0 0;
        color: #6d6146;
    }

    .markdown b {
        color: #14100a;
    }

    .markdown i {
        color: #3c352a;
    }

    .markdown code {
        font-family: ui-monospace, Menlo, Consolas, monospace;
        font-size: 0.86em;
        background: #f0ebdd;
        border: 1px solid #e2dbc6;
        border-radius: 4px;
        padding: 1px 5px;
    }

    .markdown a {
        color: #705f38;
        text-decoration: underline;
        text-underline-offset: 2px;
    }

    .markdown hr {
        border: none;
        margin: 36px auto;
        width: 72px;
        height: 1px;
        background: #cfc7ae;
    }

    .markdown .display-math {
        margin: 28px 0 30px;
        text-align: center;
        font-size: 1.12em;
        overflow-x: auto;
    }

    footer {
        border-top-color: #e4ddc9;
        color: #9a9178;
    }

    footer b {
        color: #5e553d;
    }
`;

export const GithubSkin = styled.article`
    width: min(780px, 100%);
    background: #ffffff;
    border: 1px solid #d1d9e0;
    border-radius: 8px;
    box-shadow: 0 34px 90px -24px rgba(0, 0, 0, 0.55);
    padding: 68px 76px 56px;
    font-family: -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
    color: #1f2328;

    @media (max-width: 720px) {
        padding: 40px 26px 36px;
    }

    header div {
        color: #59636e;
    }

    header div::after {
        background: #d1d9e0;
    }

    .markdown h1 {
        font-size: 2em;
        font-weight: 600;
        line-height: 1.25;
        margin: 0 0 20px;
        padding-bottom: 0.35em;
        border-bottom: 1px solid #d1d9e0;
    }

    .markdown h2,
    .markdown h3,
    .markdown h4 {
        font-weight: 600;
        margin: 28px 0 16px;
        padding-bottom: 0.3em;
        border-bottom: 1px solid #d1d9e0;
    }

    .markdown p {
        font-size: 16px;
        line-height: 1.65;
        margin: 0 0 18px;
    }

    .markdown code {
        font-family: ui-monospace, 'SFMono-Regular', Consolas, monospace;
        font-size: 85%;
        background: #f6f8fa;
        border-radius: 6px;
        padding: 0.2em 0.4em;
    }

    .markdown a {
        color: #0969da;
        text-decoration: none;
    }

    .markdown a:hover {
        text-decoration: underline;
    }

    .markdown hr {
        border: none;
        height: 0.25em;
        background: #d1d9e0;
        margin: 32px 0;
    }

    .markdown .display-math {
        margin: 26px 0;
        text-align: center;
        overflow-x: auto;
    }

    footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top-color: #d1d9e0;
        color: #59636e;
        text-transform: none;
        letter-spacing: 0.02em;
    }

    footer b {
        color: #1f2328;
    }
`;

export const NightSkin = styled.article`
    width: min(760px, 100%);
    background: linear-gradient(168deg, #191f3a 0%, #12162a 100%);
    border: 1px solid #2c3358;
    border-radius: 14px;
    box-shadow: 0 34px 90px -24px rgba(0, 0, 0, 0.8);
    padding: 56px 64px 44px;
    font-family: ${serif};
    color: #c9d0f2;

    @media (max-width: 720px) {
        padding: 36px 24px;
    }

    .markdown h1 {
        font-family: ${serif};
        font-size: 38px;
        line-height: 1.15;
        font-weight: 700;
        letter-spacing: -0.01em;
        text-align: center;
        margin: 0 0 30px;
        color: #f2ecd9;
    }

    .markdown h2,
    .markdown h3,
    .markdown h4 {
        font-family: ${serif};
        font-size: 21px;
        margin: 32px 0 12px;
        color: #e8e2cc;
    }

    .markdown p {
        font-size: 17px;
        line-height: 1.82;
        margin: 0 0 18px;
        text-align: justify;
        hyphens: auto;
    }

    .markdown > p:first-of-type::first-letter {
        float: left;
        font-size: 56px;
        line-height: 0.85;
        padding: 6px 10px 0 0;
        color: #ffd27a;
    }

    .markdown b {
        color: #ffd27a;
    }

    .markdown i {
        color: #9fd0ff;
    }

    .markdown code {
        font-family: ui-monospace, Menlo, Consolas, monospace;
        font-size: 0.86em;
        background: #1e2440;
        border: 1px solid #32396a;
        border-radius: 4px;
        padding: 1px 5px;
        color: #cdd5f5;
    }

    .markdown a {
        color: #7cf0c8;
        text-decoration: underline;
        text-underline-offset: 2px;
    }

    .markdown hr {
        border: none;
        margin: 36px auto;
        width: 72px;
        height: 1px;
        background: #3a4272;
    }

    .markdown .display-math {
        margin: 28px 0 30px;
        text-align: center;
        font-size: 1.12em;
        overflow-x: auto;
        color: #e8ebff;
    }

    .markdown .katex {
        color: #e8ebff;
    }

    footer {
        border-top-color: #2a3055;
        color: #7a86b8;
    }

    footer b {
        color: #ffd27a;
    }
`;

export const ReadingsBar = styled.footer`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px 26px;
    margin-top: 46px;
    padding-top: 18px;
    border-top: 1px solid;
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const Chip = styled.span`
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
`;

export const ChipValue = styled.b`
    font-size: 12.5px;
    letter-spacing: 0.02em;
    text-transform: none;
    max-width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const AnatomySkin = styled.article`
    width: min(880px, 100%);
    background: linear-gradient(168deg, #141a33 0%, #10142a 100%);
    border: 1px solid #2c3358;
    border-radius: 14px;
    box-shadow: 0 34px 90px -24px rgba(0, 0, 0, 0.8);
    padding: 40px 44px 32px;
    font-family: ui-monospace, Menlo, Consolas, monospace;
    color: #aab4e8;

    @media (max-width: 720px) {
        padding: 26px 18px;
    }

    footer {
        border-top-color: #2a3055;
        color: #7a86b8;
    }

    footer b {
        color: #ffd27a;
    }
`;

export const AnatomyHead = styled.div`
    font-size: 10.5px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: #7a86b8;
    text-align: center;
    margin-bottom: 28px;

    &::after {
        content: '';
        display: block;
        width: 56px;
        height: 1px;
        background: #3a4272;
        margin: 16px auto 0;
    }
`;

export const AnatomyRow = styled.div`
    display: grid;
    grid-template-columns: 52px minmax(0, 1fr) auto;
    gap: 14px;
    align-items: baseline;
    padding: 9px 6px;
    border-bottom: 1px solid rgba(44, 51, 88, 0.55);
    font-size: 12.5px;

    &:last-of-type {
        border-bottom: none;
    }
`;

export const AnatomyTag = styled.span<{ $kind?: string }>`
    justify-self: start;
    padding: 2px 9px;
    border-radius: 6px;
    font-size: 11px;
    letter-spacing: 0.05em;
    color: ${(p) => (p.$kind === 'p' ? '#ffd27a' : p.$kind === 'math' ? '#9fd0ff' : p.$kind === 'h' ? '#f2ecd9' : '#5b6493')};
    background: ${(p) => (p.$kind === 'p' ? 'rgba(255, 210, 122, 0.09)' : p.$kind === 'math' ? 'rgba(159, 208, 255, 0.09)' : 'rgba(124, 138, 200, 0.08)')};
    border: 1px solid ${(p) => (p.$kind === 'p' ? 'rgba(255, 210, 122, 0.35)' : p.$kind === 'math' ? 'rgba(159, 208, 255, 0.35)' : 'rgba(124, 138, 200, 0.3)')};
`;

export const AnatomyPreview = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #cdd5f5;
`;

export const AnatomyStats = styled.span`
    color: #7a86b8;
    font-size: 11.5px;
    white-space: nowrap;
`;

export const ClassesDrawer = styled.div`
    width: min(1080px, 100%);
    margin-top: 26px;
    background: #12162a;
    border: 1px solid #2c3358;
    border-radius: 12px;
    overflow: hidden;
`;

export const ClassTabs = styled.div`
    display: flex;
    gap: 2px;
    padding: 10px 12px 0;
    border-bottom: 1px solid #2c3358;
`;

export const ClassTab = styled.button<{ $active?: boolean }>`
    padding: 8px 16px;
    border: none;
    border-radius: 8px 8px 0 0;
    background: ${(p) => (p.$active ? '#1e2440' : 'transparent')};
    color: ${(p) => (p.$active ? '#ffd27a' : '#7a86b8')};
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 12px;
    cursor: pointer;
`;

export const ClassCode = styled.div`
    padding: 14px 18px;
    overflow-x: auto;
    max-height: 420px;
    overflow-y: auto;

    pre {
        margin: 0;
        font-family: ui-monospace, Menlo, Consolas, monospace;
        font-size: 12.5px;
        line-height: 1.6;
        tab-size: 4;
    }

    .line-number {
        display: inline-block;
        width: 30px;
        text-align: right;
        padding-right: 12px;
        color: #585b70;
        user-select: none;
    }
`;

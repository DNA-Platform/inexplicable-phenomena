import React, { useState } from 'react';
import styled from 'styled-components';
import { Highlight, themes } from 'prism-react-renderer';
import latexSource from '../latex.tsx?raw';
import sentenceSource from '../../../markdown/sentence.tsx?raw';
import sectionSource from '../../../markdown/section.tsx?raw';
import sheetSource from '../sheet.tsx?raw';

// The page shows its own source the way it shows everything else: as a specimen
// under glass. Same shared machinery Doug means by "displayed like manifold and
// algebra" — a raw import of the real file, a name→source registry, prism with
// per-line numbers, dollar-name tabs — but a different idiom on purpose.
//
// The manifold flips a DOG-EAR to read the model on the leaf's back: a codex
// gesture, light on paper. The page is not a codex, it is an inspector — a
// drawer that opens BENEATH the sheet, dark and instrument-like, the sibling of
// the anatomy x-ray. Keep the two apart deliberately.
//
// The sharp point lands at the port: it passes in the mini framework's OWN
// classes — the code-block kind among them — so the drawer shows the source of
// the very kind that renders code. The code block displaying the code that
// implements code blocks. Until the port, this stands on the page's classes.
export const pageSources: Record<string, string> = {
    '$Latex': latexSource,
    '$MarkdownSentence': sentenceSource,
    '$MarkdownSection': sectionSource,
    '$Sheet': sheetSource,
};

const Drawer = styled.div`
    width: min(1080px, 100%);
    margin-top: 26px;
    background: #12162a;
    border: 1px solid #2c3358;
    border-radius: 12px;
    overflow: hidden;
`;

const Tabs = styled.div`
    display: flex;
    gap: 2px;
    padding: 10px 12px 0;
    border-bottom: 1px solid #2c3358;
`;

// A tab does not shout that it can be clicked — no button border, no
// pointer-underline, no hover-pop. It reads as a label; gold says which one you
// are reading, and the code appearing is the response. The affordance is
// discovered, not announced (solutions/03 — the law filed in my name).
const Tab = styled.button<{ $active?: boolean }>`
    padding: 8px 16px;
    border: none;
    border-radius: 8px 8px 0 0;
    background: ${(p) => (p.$active ? '#1e2440' : 'transparent')};
    color: ${(p) => (p.$active ? '#ffd27a' : '#7a86b8')};
    font-family: ui-monospace, Menlo, Consolas, monospace;
    font-size: 12px;
    cursor: pointer;
`;

const Code = styled.div`
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

export interface SourceDrawerProps {
    // The registry the port supplies; defaults to the page's current classes so
    // the drawer renders on its own before the mini framework exists.
    sources?: Record<string, string>;
}

export function SourceDrawer({ sources = pageSources }: SourceDrawerProps): React.ReactElement {
    const names = Object.keys(sources);
    const [tab, setTab] = useState<string>(names[0] ?? '');
    const code = sources[tab] ?? '';
    return (
        <Drawer>
            <Tabs>
                {names.map((name) => (
                    <Tab key={name} $active={tab === name} onClick={() => setTab(name)}>
                        {name}
                    </Tab>
                ))}
            </Tabs>
            <Code>
                <Highlight code={code.trim()} language="tsx" theme={themes.nightOwl}>
                    {({ tokens, getLineProps, getTokenProps }) => (
                        <pre>
                            {tokens.map((line, i) => (
                                <div key={i} {...getLineProps({ line })}>
                                    <span className="line-number">{i + 1}</span>
                                    {line.map((token, j) => (
                                        <span key={j} {...getTokenProps({ token })} />
                                    ))}
                                </div>
                            ))}
                        </pre>
                    )}
                </Highlight>
            </Code>
        </Drawer>
    );
}

import React, { ReactNode, useState, useCallback } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import {
    CaseFrame, CaseHeader, CaseId, CaseSubject,
    DemoFrame, Criteria, Pass, Fail,
} from './case-card.styled';
import styled from 'styled-components';

const FileLabel = styled.div`
    font-family: ${(p: any) => p.theme.font.mono};
    font-size: 10px;
    color: #585B70;
    letter-spacing: 0.06em;
    padding-bottom: 8px;
    text-transform: uppercase;
`;

const CodePanel = styled.div`
    background: #1E1E2E;
    padding: 12px 18px 14px;
    overflow-x: auto;
    border-top: 1px solid ${(p) => p.theme.color.rule};

    pre {
        margin: 0;
        font-family: ${(p) => p.theme.font.mono};
        font-size: 12.5px;
        line-height: 1.6;
        tab-size: 4;
    }

    .line-number {
        display: inline-block;
        width: 28px;
        text-align: right;
        padding-right: 12px;
        color: #585B70;
        user-select: none;
    }
`;

const CodeToggle = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    width: 100%;
    padding: 8px 0 0;
    margin-top: 12px;
    border: none;
    border-top: 1px solid ${(p) => p.theme.color.rule};
    background: transparent;
    cursor: pointer;
    font-family: ${(p) => p.theme.font.mono};
    font-size: 11px;
    font-weight: 600;
    color: ${(p) => p.theme.color.muted};
    transition: color 100ms;

    &:hover {
        color: ${(p) => p.theme.color.themeText};
    }
`;

function trimSource(raw: string): string {
    const lines = raw.split('\n');
    const kept: string[] = [];
    let inBlock = false;
    let depth = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (/^\s*import\s/.test(line)) continue;

        if (/^\s*class\s+\$/.test(line) || /^\s*export\s+default\s+function/.test(line)) {
            inBlock = true;
        }

        if (inBlock) {
            kept.push(line);
            for (const ch of line) {
                if (ch === '{') depth++;
                if (ch === '}') depth--;
            }
            if (depth === 0) inBlock = false;
            continue;
        }

        if (/^\s*const\s+\w+\s*=\s*\$\(/.test(line)) {
            kept.push(line);
            continue;
        }

        if (line.trim() && kept.length > 0) {
            kept.push(line);
        }
    }

    const result = kept.join('\n').trim();
    return result || raw;
}

type CaseShellProps = {
    caseId: string;
    subject: string;
    demo: ReactNode;
    pass: string;
    fail: string;
    source: string;
};

export function CaseShell({ caseId, subject, demo, pass, fail, source }: CaseShellProps) {
    const [showCode, setShowCode] = useState(false);
    const toggleCode = useCallback(() => setShowCode(v => !v), []);
    const anchor = caseId.replace(/\s*\/\s*/g, '-').replace(/\./g, '-');

    return (
        <CaseFrame id={anchor}>
            <CaseHeader>
                <CaseId>{caseId}</CaseId>
                <CaseSubject>{subject}</CaseSubject>
            </CaseHeader>
            <DemoFrame>{demo}</DemoFrame>
            <Criteria>
                <Pass>Pass if {pass}</Pass>
                <Fail>Fail if {fail}</Fail>
            </Criteria>
            <CodeToggle onClick={toggleCode}>
                {showCode ? '▾' : '▸'} {'</>'} {showCode ? 'hide source' : 'view source'}
            </CodeToggle>
            {showCode && source && (
                <CodePanel>
                    <FileLabel>source</FileLabel>
                    <Highlight code={trimSource(source).trim()} language="tsx" theme={themes.nightOwl}>
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
                </CodePanel>
            )}
        </CaseFrame>
    );
}

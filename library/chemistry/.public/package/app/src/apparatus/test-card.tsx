import React, { ReactNode } from 'react';
import { $, $Chemical } from '@/index';
import { Highlight, themes } from 'prism-react-renderer';
import {
    TestCard as Card, TestTitle, CodePanel, LivePanel,
    VerdictPanel, VerdictRow, VerdictDot, VerdictLabel, VerdictValue,
    TestRef,
} from './test-card.styled';

export type Verdict = {
    label: string;
    pass: boolean;
    pending?: boolean;
    expected?: string;
    got?: string;
};

export class $TestCard extends $Chemical {
    $title?: string;
    $source?: string;
    $demo?: ReactNode;
    $verdicts?: Verdict[];
    $ref?: string;

    get cardState(): 'pass' | 'fail' | 'pending' {
        const vs = this.$verdicts;
        if (!vs || vs.length === 0) return 'pending';
        if (vs.some(v => v.pending)) return 'pending';
        if (vs.some(v => !v.pass)) return 'fail';
        return 'pass';
    }

    view(): ReactNode {
        const state = this.cardState;
        return (
            <Card $state={state}>
                <TestTitle>{this.$title}</TestTitle>
                <CodePanel>
                    {this.$source && (
                        <Highlight code={this.$source.trim()} language="tsx" theme={themes.nightOwl}>
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
                    )}
                </CodePanel>
                <LivePanel>
                    {this.$demo}
                </LivePanel>
                {this.$verdicts && this.$verdicts.length > 0 && (
                    <VerdictPanel>
                        {this.$verdicts.map((v, i) => {
                            const s = v.pending ? 'pending' : (v.pass ? 'pass' : 'fail');
                            return (
                                <VerdictRow key={i} $state={s}>
                                    <VerdictDot $state={s} />
                                    <VerdictLabel>{v.label}</VerdictLabel>
                                    {v.expected != null && (
                                        <VerdictValue>
                                            expected {v.expected}{v.got != null ? `, got ${v.got}` : ''}
                                        </VerdictValue>
                                    )}
                                </VerdictRow>
                            );
                        })}
                        {this.$ref && (
                            <TestRef>backed by {this.$ref}</TestRef>
                        )}
                    </VerdictPanel>
                )}
            </Card>
        );
    }
}

export const TestCard = $($TestCard);

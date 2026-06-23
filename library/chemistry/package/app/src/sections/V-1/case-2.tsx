import React from 'react';
import { $, $Chemical } from '@/index';
import { TextInput } from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';
import styled from 'styled-components';

const GreetingFrame = styled.div`
    padding: 16px 18px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
`;

const Greeting = styled.div`
    font-family: ${(p) => p.theme.font.heading};
    font-size: ${(p) => p.theme.type.h3};
    color: ${(p) => p.theme.color.ink};
    margin-bottom: 12px;
    min-height: 32px;
`;

class $GreetingDemo extends $Chemical {
    name = '';
    setName(value: string) { this.name = value; }
    view() {
        const hasName = this.name.length > 0;
        return (
            <>
                <GreetingFrame>
                    <Greeting>
                        {hasName ? `Hello, ${this.name}!` : 'Type your name below...'}
                    </Greeting>
                    <TextInput
                        value={this.name}
                        onChange={(e) => this.setName(e.currentTarget.value)}
                        placeholder="Your name"
                    />
                </GreetingFrame>
                <VerdictSection>
                    <VerdictRow $state={hasName ? 'pass' : 'pending'}>
                        <VerdictDot $state={hasName ? 'pass' : 'pending'} />
                        {hasName
                            ? `✓ greeting updates live as you type`
                            : '○ type a name to see the greeting change'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const GreetingDemo = $($GreetingDemo);

export default function Case2Demo() {
    return <GreetingDemo />;
}

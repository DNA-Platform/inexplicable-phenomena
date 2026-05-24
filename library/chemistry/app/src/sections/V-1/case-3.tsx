import React from 'react';
import { $, $Chemical } from '@/index';
import { FaqCard, FaqQuestion, FaqAnswer } from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

const faqData = [
    { q: 'What is a $Chemical?', a: 'A reactive class whose $-prefixed properties trigger re-renders on write.' },
    { q: 'Why the $ prefix?', a: 'It separates intrinsic identity from extrinsic context — a membrane between the object and the framework.' },
    { q: 'Do I need setState?', a: 'No. Assign directly to this.$prop and the view updates automatically.' },
];

class $FAQ extends $Chemical {
    open: Set<number> = new Set();

    toggle(index: number) {
        if (this.open.has(index)) this.open.delete(index);
        else this.open.add(index);
    }

    view() {
        const anyOpen = this.open.size > 0;
        return (
            <>
                <FaqCard>
                    {faqData.map((item, i) => (
                        <React.Fragment key={i}>
                            <FaqQuestion
                                $open={this.open.has(i)}
                                onClick={() => this.toggle(i)}
                            >
                                {item.q}
                            </FaqQuestion>
                            {this.open.has(i) && (
                                <FaqAnswer>{item.a}</FaqAnswer>
                            )}
                        </React.Fragment>
                    ))}
                </FaqCard>
                <VerdictSection>
                    <VerdictRow $state={anyOpen ? 'pass' : 'pending'}>
                        <VerdictDot $state={anyOpen ? 'pass' : 'pending'} />
                        {anyOpen
                            ? `✓ ${this.open.size} question${this.open.size > 1 ? 's' : ''} expanded`
                            : '○ click a question to expand it'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const FAQ = $($FAQ);

export default function Case3Demo() {
    return <FAQ />;
}

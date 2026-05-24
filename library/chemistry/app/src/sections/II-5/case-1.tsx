import React from 'react';
import { $Particle } from '@/index';
import { isParticle } from '@/symbolic';
import { Caption, RenderBox, AssertionLine, Verdict } from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $Error extends $Particle {
    constructor(error: Error) {
        super(error);
    }
    view() {
        const e = this as unknown as Error;
        return <span>{e.name}: {e.message}</span>;
    }
}

export default function Case1Demo() {
    const carrier: any = new $Error(new Error('something went wrong'));
    const isP = isParticle(carrier);
    const state = isP ? 'pass' : 'fail';
    return (
        <div>
            <Caption>
                Carrier created via <code>new $Error(new Error("something went wrong"))</code>:
            </Caption>
            <RenderBox>{carrier.view()}</RenderBox>
            <AssertionLine>
                isParticle(carrier) → <Verdict $pass={isP}>{String(isP)}</Verdict>
                {'  ·  '}
                carrier.toString() → <code>{String(carrier.toString()).slice(0, 32)}</code>
            </AssertionLine>
            <VerdictSection>
                <VerdictRow $state={state}>
                    <VerdictDot $state={state} />
                    {isP
                        ? '✓ isParticle(carrier) = true'
                        : '✗ isParticle(carrier) = false'}
                </VerdictRow>
            </VerdictSection>
        </div>
    );
}

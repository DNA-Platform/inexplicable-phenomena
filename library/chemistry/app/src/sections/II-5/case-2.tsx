import React from 'react';
import { $Particle } from '@/index';
import { isParticle } from '@/symbolic';
import { CaptionSpaced, AssertionGrid, Verdict } from './case.styled';
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

export default function Case2Demo() {
    const original = new Error('boom');
    const carrier: any = new $Error(original);
    const isStillError = carrier instanceof Error;
    const isP = isParticle(carrier);
    const instanceofState = isStillError ? 'pass' : 'fail';
    const particleState = isP ? 'pass' : 'fail';
    return (
        <div>
            <CaptionSpaced>
                Original error particularized; both checks asserted live below:
            </CaptionSpaced>
            <AssertionGrid>
                <span>carrier instanceof Error</span>
                <Verdict $pass={isStillError}>→ {String(isStillError)}</Verdict>
                <span>isParticle(carrier)</span>
                <Verdict $pass={isP}>→ {String(isP)}</Verdict>
                <span>carrier.message</span>
                <strong>→ "{(carrier as Error).message}"</strong>
            </AssertionGrid>
            <VerdictSection>
                <VerdictRow $state={instanceofState}>
                    <VerdictDot $state={instanceofState} />
                    {isStillError
                        ? '✓ instanceof Error = true'
                        : '✗ instanceof Error = false'}
                </VerdictRow>
                <VerdictRow $state={particleState}>
                    <VerdictDot $state={particleState} />
                    {isP
                        ? '✓ isParticle = true'
                        : '✗ isParticle = false'}
                </VerdictRow>
            </VerdictSection>
        </div>
    );
}

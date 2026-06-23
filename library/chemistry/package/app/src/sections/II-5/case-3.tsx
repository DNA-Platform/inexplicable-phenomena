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

export default function Case3Demo() {
    const original = new Error('untouched');
    const beforeProto = Object.getPrototypeOf(original);
    new $Error(original);
    const afterProto = Object.getPrototypeOf(original);
    const sameProto = beforeProto === afterProto;
    const isStillJustError = original instanceof Error && !isParticle(original);
    const isOriginalParticle = isParticle(original);
    const protoState = sameProto ? 'pass' : 'fail';
    const originalState = !isOriginalParticle ? 'pass' : 'fail';
    return (
        <div>
            <CaptionSpaced>
                Original is unchanged after particularizing; checks below:
            </CaptionSpaced>
            <AssertionGrid>
                <span>prototype identity preserved</span>
                <Verdict $pass={sameProto}>→ {String(sameProto)}</Verdict>
                <span>original instanceof Error</span>
                <Verdict $pass={isStillJustError}>→ {String(original instanceof Error)}</Verdict>
                <span>isParticle(original)</span>
                <Verdict $pass={!isOriginalParticle}>→ {String(isOriginalParticle)}</Verdict>
            </AssertionGrid>
            <VerdictSection>
                <VerdictRow $state={protoState}>
                    <VerdictDot $state={protoState} />
                    {sameProto
                        ? '✓ prototype preserved'
                        : '✗ prototype changed'}
                </VerdictRow>
                <VerdictRow $state={originalState}>
                    <VerdictDot $state={originalState} />
                    {!isOriginalParticle
                        ? '✓ original is not a particle'
                        : '✗ original became a particle'}
                </VerdictRow>
            </VerdictSection>
        </div>
    );
}

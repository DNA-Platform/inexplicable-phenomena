import React from 'react';
import { $Particle } from '@/index';
import { isParticle } from '@/symbolic';
import { CaptionSpaced, AssertionGrid, Verdict } from './case.styled';

export default function Case4Demo() {
    class $Foo extends $Particle {}
    const a = new $Foo();
    const b: any = new $Particle(a as any);
    const isSame = b === a;
    const isP = isParticle(a);
    return (
        <div>
            <CaptionSpaced>
                A particle is created. <code>new $Particle(a)</code> attempts to particularize
                it. Per § II.5, particularizing an existing particle returns the same instance
                rather than creating a wrapper.
            </CaptionSpaced>
            <AssertionGrid>
                <span>b === a</span>
                <Verdict $pass={isSame}>→ {String(isSame)}</Verdict>
                <span>isParticle(a)</span>
                <Verdict $pass={isP}>→ {String(isP)}</Verdict>
                <span>a.toString().slice(0, 30)</span>
                <strong>→ "{a.toString().slice(0, 30)}"</strong>
            </AssertionGrid>
        </div>
    );
}

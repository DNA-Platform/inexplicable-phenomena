import React, { useState } from 'react';
import { $Particle, $Chemical } from '@/index';
import { isParticle } from '@/symbolic';
import {
    CaseFrame, CaseHeader, CaseId, CaseSubject,
    Expected, DemoFrame, Criteria, Pass, Fail,
    SourceToggle, SourceBlock,
} from '../apparatus/case-card.styled';

// $Error — particularizes a real Error so the carrier behaves as a particle
// while preserving instanceof Error. The same specimen used in tests/.
class $Error extends $Particle {
    constructor(error: Error) {
        super(error);
    }
    view() {
        const e = this as unknown as Error;
        return <span>{e.name}: {e.message}</span>;
    }
}

// ---------------------------------------------------------------------------
// CASE 1 — particularized carrier renders an Error as a particle
// ---------------------------------------------------------------------------
function Case1Demo() {
    const carrier: any = new $Error(new Error('something went wrong'));
    return (
        <div>
            <p style={{ marginBottom: '8px', fontSize: '13px', color: '#5C6068' }}>
                Carrier created via <code>new $Error(new Error("something went wrong"))</code>:
            </p>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', padding: '8px 12px', background: '#fff', border: '1px solid #E5E5E2', borderRadius: '3px' }}>
                {carrier.view()}
            </div>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8E9197', fontFamily: 'monospace' }}>
                isParticle(carrier) → <strong style={{ color: isParticle(carrier) ? '#10b89b' : '#e53935' }}>{String(isParticle(carrier))}</strong>
                {'  ·  '}
                carrier.toString() → <code>{String(carrier.toString()).slice(0, 32)}</code>
            </p>
        </div>
    );
}

// ---------------------------------------------------------------------------
// CASE 2 — `instanceof Error` survives particularization
// ---------------------------------------------------------------------------
function Case2Demo() {
    const original = new Error('boom');
    const carrier: any = new $Error(original);
    const isStillError = carrier instanceof Error;
    return (
        <div>
            <p style={{ marginBottom: '10px', fontSize: '13px', color: '#5C6068' }}>
                Original error particularized; both checks asserted live below:
            </p>
            <div style={{ fontFamily: 'monospace', fontSize: '13px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 14px', padding: '12px', background: '#fff', border: '1px solid #E5E5E2', borderRadius: '3px' }}>
                <span>carrier instanceof Error</span>
                <strong style={{ color: isStillError ? '#10b89b' : '#e53935' }}>→ {String(isStillError)}</strong>
                <span>isParticle(carrier)</span>
                <strong style={{ color: isParticle(carrier) ? '#10b89b' : '#e53935' }}>→ {String(isParticle(carrier))}</strong>
                <span>carrier.message</span>
                <strong>→ "{(carrier as Error).message}"</strong>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// CASE 3 — original error's prototype chain is left untouched
// ---------------------------------------------------------------------------
function Case3Demo() {
    const original = new Error('untouched');
    const beforeProto = Object.getPrototypeOf(original);
    new $Error(original);  // particularize; carrier discarded
    const afterProto = Object.getPrototypeOf(original);
    const sameProto = beforeProto === afterProto;
    const isStillJustError = original instanceof Error && !isParticle(original);
    return (
        <div style={{ fontFamily: 'monospace', fontSize: '13px' }}>
            <p style={{ marginBottom: '10px', fontFamily: 'system-ui', fontSize: '13px', color: '#5C6068' }}>
                Original is unchanged after particularizing; checks below:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 14px', padding: '12px', background: '#fff', border: '1px solid #E5E5E2', borderRadius: '3px' }}>
                <span>prototype identity preserved</span>
                <strong style={{ color: sameProto ? '#10b89b' : '#e53935' }}>→ {String(sameProto)}</strong>
                <span>original instanceof Error</span>
                <strong style={{ color: isStillJustError ? '#10b89b' : '#e53935' }}>→ {String(original instanceof Error)}</strong>
                <span>isParticle(original)</span>
                <strong style={{ color: !isParticle(original) ? '#10b89b' : '#e53935' }}>→ {String(isParticle(original))}</strong>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// CASE 4 — particularizing an existing particle is a no-op
// ---------------------------------------------------------------------------
function Case4Demo() {
    class $Foo extends $Particle {}
    const a = new $Foo();
    const b: any = new $Particle(a as any);
    const isSame = b === a;
    return (
        <div>
            <p style={{ marginBottom: '10px', fontSize: '13px', color: '#5C6068' }}>
                A particle is created. <code>new $Particle(a)</code> attempts to particularize
                it. Per § II.5, particularizing an existing particle returns the same instance
                rather than creating a wrapper.
            </p>
            <div style={{ fontFamily: 'monospace', fontSize: '13px', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 14px', padding: '12px', background: '#fff', border: '1px solid #E5E5E2', borderRadius: '3px' }}>
                <span>b === a</span>
                <strong style={{ color: isSame ? '#10b89b' : '#e53935' }}>→ {String(isSame)}</strong>
                <span>isParticle(a)</span>
                <strong style={{ color: isParticle(a) ? '#10b89b' : '#e53935' }}>→ {String(isParticle(a))}</strong>
                <span>a.toString().slice(0, 30)</span>
                <strong>→ "{a.toString().slice(0, 30)}"</strong>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Source code strings for each Case (sprint-30 will switch these to Vite ?raw
// imports once A-2 lands; for now they're the canonical shape inline so the
// Lab is fully functional immediately).
// ---------------------------------------------------------------------------
const case1Source = `// Particularize a real Error as a $Particle carrier.
class $Error extends $Particle {
    constructor(error: Error) { super(error); }
    view() { const e = this as unknown as Error;
             return <span>{e.name}: {e.message}</span>; }
}

const carrier = new $Error(new Error('something went wrong'));
// carrier.view() renders. isParticle(carrier) === true.`;

const case2Source = `const original = new Error('boom');
const carrier  = new $Error(original);

carrier instanceof Error  // → true   (Error.prototype reachable via chain)
isParticle(carrier)       // → true   ($particleMarker$ stamped on carrier)
carrier.message           // → "boom" (own data on original is reachable)`;

const case3Source = `const original = new Error('untouched');
const before   = Object.getPrototypeOf(original);

new $Error(original);     // particularize; carrier discarded

const after    = Object.getPrototypeOf(original);

before === after                           // → true   (untouched)
original instanceof Error                  // → true
isParticle(original)                       // → false  (original is not the carrier)`;

const case4Source = `class $Foo extends $Particle {}
const a = new $Foo();

const b = new $Particle(a);   // particularize an existing particle

b === a                       // → true   (no-op: returned the input)
isParticle(a)                 // → true`;

// ---------------------------------------------------------------------------
// CaseShell — composes the chrome around each Case demo.
// ---------------------------------------------------------------------------
function CaseShell({
    id, subject, expected, pass, fail, source, children,
}: {
    id: string;
    subject: string;
    expected: React.ReactNode;
    pass: string;
    fail: string;
    source: string;
    children: React.ReactNode;
}) {
    const [showSource, setShowSource] = useState(false);
    return (
        <CaseFrame>
            <CaseHeader>
                <CaseId>{id}</CaseId>
                <CaseSubject>{subject}</CaseSubject>
                <SourceToggle onClick={() => setShowSource(s => !s)}>
                    {showSource ? '✕ source' : '{ } source'}
                </SourceToggle>
            </CaseHeader>
            <Expected>
                <strong>Expected.</strong>
                {expected}
            </Expected>
            <DemoFrame>{children}</DemoFrame>
            <Criteria>
                <Pass>Pass if {pass}</Pass>
                <Fail>Fail if {fail}</Fail>
            </Criteria>
            {showSource && <SourceBlock>{source}</SourceBlock>}
        </CaseFrame>
    );
}

// Exported assembly — mounted by section-page.tsx for § II.5.
export function ParticularizationCases() {
    return (
        <>
            <CaseShell
                id="II.5 / 1"
                subject="A particularized Error renders as a particle"
                expected="An $Error instance constructed from a real Error renders the error's name and message via view(). isParticle(carrier) reports true. The carrier carries its own $Chemistry symbol."
                pass='the demo shows "Error: something went wrong" and isParticle reports true'
                fail="the demo shows nothing, throws, or isParticle reports false"
                source={case1Source}
            >
                <Case1Demo />
            </CaseShell>

            <CaseShell
                id="II.5 / 2"
                subject="instanceof Error survives particularization"
                expected="The carrier returned by new $Error(realError) still passes the instanceof Error check, even though it's also a particle. Both worlds simultaneously."
                pass="instanceof Error and isParticle both report true"
                fail="instanceof Error reports false, or carrier.message is undefined"
                source={case2Source}
            >
                <Case2Demo />
            </CaseShell>

            <CaseShell
                id="II.5 / 3"
                subject="The original Error is left untouched"
                expected="Particularizing an Error must not modify the original. Its prototype chain, instanceof relationships, and isParticle status remain exactly as before construction."
                pass="prototype identity preserved AND original is still just an Error (not a particle)"
                fail="the original's prototype changed, or the original now reports isParticle"
                source={case3Source}
            >
                <Case3Demo />
            </CaseShell>

            <CaseShell
                id="II.5 / 4"
                subject="Particularizing an existing particle is a no-op"
                expected="When new $Particle(x) is called and x is already a particle, the framework returns x unchanged rather than wrapping it. The constructor's return semantics flow this back as the new operator's result."
                pass="b === a (the second construction returned the input unchanged)"
                fail="b !== a (a wrapper was created where none was needed)"
                source={case4Source}
            >
                <Case4Demo />
            </CaseShell>
        </>
    );
}

// Per-section metadata — used by section-page.tsx to swap in the cases when
// § II.5 is the active section.
export const sectionData = {
    id: 'II.5',
    cases: 4,
    Component: ParticularizationCases,
};

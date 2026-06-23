import React from 'react';
import { $, $Chemical } from '@/index';
import {
    StressFrame, CountDisplay, TargetLabel, RunButton, MatchBadge,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// Stress test: multiple reactive properties updated from separate callbacks
// in rapid succession. Each "wave" fires N setTimeout(0) callbacks, each
// updating a different property. The view must settle with all properties
// reflecting their final values — proving the reactivity system coalesces
// correctly under concurrent async pressure.

class $AsyncStress extends $Chemical {
    alpha = 0;
    beta = 0;
    gamma = 0;
    waves = 0;
    settled = false;

    fireWave() {
        this.settled = false;
        this.waves++;
        const target = this.waves * 10;
        setTimeout(() => { this.alpha = target; }, 0);
        setTimeout(() => { this.beta = target; }, 0);
        setTimeout(() => { this.gamma = target; }, 0);
        setTimeout(() => {
            this.settled = this.alpha === target
                && this.beta === target
                && this.gamma === target;
        }, 50);
    }

    get total() { return this.alpha + this.beta + this.gamma; }
    get expected() { return this.waves * 30; }

    view() {
        const match = this.settled && this.total === this.expected;
        const tested = this.waves > 0;
        return (
            <>
                <StressFrame>
                    <CountDisplay>{this.alpha} / {this.beta} / {this.gamma}</CountDisplay>
                    <TargetLabel>
                        total: {this.total} — expected: {this.expected} — waves: {this.waves}
                    </TargetLabel>
                    <MatchBadge $match={match}>
                        {match
                            ? `settled correctly after ${this.waves} wave${this.waves !== 1 ? 's' : ''}`
                            : this.settled
                                ? `mismatch: ${this.total} !== ${this.expected}`
                                : tested ? 'settling...' : 'idle'}
                    </MatchBadge>
                    <RunButton type="button" onClick={this.fireWave}>
                        Fire wave
                    </RunButton>
                </StressFrame>
                <VerdictSection>
                    <VerdictRow $state={match ? 'pass' : tested ? (this.settled ? 'fail' : 'pending') : 'pending'}>
                        <VerdictDot $state={match ? 'pass' : tested ? (this.settled ? 'fail' : 'pending') : 'pending'} />
                        {match
                            ? `✓ all three properties settled correctly across ${this.waves} async wave${this.waves !== 1 ? 's' : ''}`
                            : tested
                                ? this.settled
                                    ? `✗ total ${this.total} !== expected ${this.expected}`
                                    : '○ waiting for async callbacks to settle...'
                                : '○ click Fire wave to send 3 async property updates'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const AsyncStress = $($AsyncStress);

export default function Case1Demo() {
    return <AsyncStress />;
}

import React from 'react';
import { $, $Chemical } from '@/index';
import {
    AsyncCard, AsyncLabel, StatusDisplay, ButtonRow, ActionButton, ResetButton,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $AsyncDemo extends $Chemical {
    status = 'idle';

    delayedSet() {
        this.status = 'delayed ✓';
    }

    handleResolve(val: string) {
        this.status = val + ' ✓';
    }

    startTimeout() {
        setTimeout(this.delayedSet, 1500);
    }

    startPromise() {
        Promise.resolve('fetched').then(this.handleResolve);
    }

    reset() {
        this.status = 'idle';
    }

    view() {
        const active = this.status !== 'idle';
        return (
            <>
                <AsyncCard>
                    <AsyncLabel>$AsyncDemo</AsyncLabel>
                    <StatusDisplay $active={active}>
                        {this.status}
                    </StatusDisplay>
                    <ButtonRow>
                        <ActionButton onClick={this.startTimeout}>
                            Delayed update
                        </ActionButton>
                        <ActionButton onClick={this.startPromise}>
                            Promise resolve
                        </ActionButton>
                        <ResetButton onClick={this.reset}>
                            Reset
                        </ResetButton>
                    </ButtonRow>
                </AsyncCard>
                <VerdictSection>
                    <VerdictRow $state={active ? 'pass' : 'pending'}>
                        <VerdictDot $state={active ? 'pass' : 'pending'} />
                        {active
                            ? `✓ async callback fired — status is "${this.status}"`
                            : '○ click a button — method binding must survive setTimeout / Promise.then'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const AsyncDemo = $($AsyncDemo);

export default function Case1Demo() {
    return <AsyncDemo />;
}

import React from 'react';
import { $, $Chemical } from '@/index';
import {
    PropertyFrame, PropertyLabel, PropertyValue, ActionButton,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $NumberDemo extends $Chemical {
    count = 0;
    inc() { this.count++; }
    dec() { this.count--; }
    reset() { this.count = 0; }
    view() {
        const tested = this.count !== 0;
        return (
            <>
                <PropertyFrame>
                    <PropertyLabel>$count</PropertyLabel>
                    <PropertyValue>{this.count}</PropertyValue>
                    <ActionButton onClick={this.inc}>+</ActionButton>
                    <ActionButton onClick={this.dec}>−</ActionButton>
                    <ActionButton onClick={this.reset}>reset</ActionButton>
                </PropertyFrame>
                <VerdictSection>
                    <VerdictRow $state={tested ? 'pass' : 'pending'}>
                        <VerdictDot $state={tested ? 'pass' : 'pending'} />
                        {tested ? `✓ $count responds to inc/dec/reset — count=${this.count}` : '○ click + to verify'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const NumberDemo = $($NumberDemo);

export default function Case1Demo() {
    return <NumberDemo />;
}

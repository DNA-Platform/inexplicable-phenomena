import React from 'react';
import { $, $Chemical } from '@/index';
import { DerivativesRow, DerivativeCard, MountLabel } from './case.styled';
import { CounterValue, CounterButton } from '../II-1/case.styled';

class $Shared extends $Chemical {
    $count = 0;
    increment() { this.$count++; }
    view() {
        return (
            <DerivativeCard>
                <MountLabel>mount</MountLabel>
                <CounterValue>{this.$count}</CounterValue>
                <CounterButton onClick={this.increment}>+</CounterButton>
            </DerivativeCard>
        );
    }
}

const Shared = $($Shared);

export default function Case1Demo() {
    return (
        <DerivativesRow>
            <Shared />
            <Shared />
            <Shared />
        </DerivativesRow>
    );
}

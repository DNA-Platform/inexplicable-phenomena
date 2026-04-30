import React from 'react';
import { $, $Chemical } from '@/index';
import {
    CounterFrame, CounterValue, CounterButton, CounterLabel, TwoCounters,
} from './case.styled';

class $IndependentCounter extends $Chemical {
    $count = 0;
    increment() { this.$count++; }
    view() {
        return (
            <CounterFrame>
                <CounterLabel>$count</CounterLabel>
                <CounterValue>{this.$count}</CounterValue>
                <CounterButton onClick={this.increment}>+</CounterButton>
            </CounterFrame>
        );
    }
}

const IndependentCounter = $($IndependentCounter);

export default function Case2Demo() {
    return (
        <TwoCounters>
            <IndependentCounter />
            <IndependentCounter />
        </TwoCounters>
    );
}

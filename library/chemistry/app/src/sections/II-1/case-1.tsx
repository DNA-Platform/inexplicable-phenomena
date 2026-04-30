import React from 'react';
import { $, $Chemical } from '@/index';
import {
    CounterFrame, CounterValue, CounterButton, CounterLabel,
} from './case.styled';

class $Counter extends $Chemical {
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

const Counter = $($Counter);

export default function Case1Demo() {
    return <Counter />;
}

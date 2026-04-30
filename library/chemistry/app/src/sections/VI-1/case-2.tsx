import React from 'react';
import { $, $Chemical } from '@/index';
import { DerivativesRow, DerivativeCard, MountLabel } from './case.styled';
import { CounterValue, CounterButton } from '../II-1/case.styled';
import { ActionButton } from '../V-1/case.styled';

class $HeldCounter extends $Chemical {
    $count = 0;
    increment() { this.$count++; }
    view() {
        return (
            <DerivativeCard>
                <MountLabel>derivative</MountLabel>
                <CounterValue>{this.$count}</CounterValue>
                <CounterButton onClick={this.increment}>+</CounterButton>
            </DerivativeCard>
        );
    }
}

class $Host extends $Chemical {
    counter = new $HeldCounter();
    writeFromOutside() { this.counter.$count += 10; }
    view() {
        const Counter = $(this.counter);
        return (
            <div>
                <DerivativesRow>
                    <Counter />
                    <Counter />
                </DerivativesRow>
                <div style={{ marginTop: '10px' }}>
                    <ActionButton onClick={this.writeFromOutside}>
                        write counter.$count += 10 from host
                    </ActionButton>
                </div>
            </div>
        );
    }
}

const Host = $($Host);

export default function Case2Demo() {
    return <Host />;
}

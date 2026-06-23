import React from 'react';
import { $, $Chemical } from '@/index';
import {
    ToggleFrame, ToggleRow, ToggleLabel, ToggleSwitch,
    ChildFrame, ChildLabel, ChildCount, ChildButton, Placeholder,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $Child extends $Chemical {
    count = 0;
    inc() { this.count++; }
    view() {
        return (
            <ChildFrame>
                <ChildLabel>$Child</ChildLabel>
                <ChildCount>{this.count}</ChildCount>
                <ChildButton onClick={this.inc}>+</ChildButton>
            </ChildFrame>
        );
    }
}

const Child = $($Child);

class $Toggler extends $Chemical {
    showChild = false;
    cycles = 0;

    toggle() {
        if (this.showChild) this.cycles++;
        this.showChild = !this.showChild;
    }

    view() {
        const remounted = this.cycles > 0 && this.showChild;
        return (
            <>
                <ToggleFrame>
                    <ToggleRow>
                        <ToggleLabel>$showChild</ToggleLabel>
                        <ToggleSwitch $on={this.showChild} onClick={this.toggle}>
                            {this.showChild ? 'ON' : 'OFF'}
                        </ToggleSwitch>
                    </ToggleRow>
                    {this.showChild
                        ? <Child />
                        : <Placeholder>child unmounted</Placeholder>
                    }
                </ToggleFrame>
                <VerdictSection>
                    <VerdictRow $state={this.showChild ? 'pass' : 'pending'}>
                        <VerdictDot $state={this.showChild ? 'pass' : 'pending'} />
                        {this.showChild
                            ? '✓ child mounts when toggled on — $Child appears'
                            : '○ toggle ON to mount the child'}
                    </VerdictRow>
                    <VerdictRow $state={remounted ? 'pass' : 'pending'}>
                        <VerdictDot $state={remounted ? 'pass' : 'pending'} />
                        {remounted
                            ? `✓ remounted after ${this.cycles} cycle${this.cycles !== 1 ? 's' : ''} — template derivative gets fresh state (count should be 0)`
                            : '○ increment counter, toggle OFF then ON — counter resets because $($Child) creates a fresh derivative each mount'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Toggler = $($Toggler);

export default function Case1Demo() {
    return <Toggler />;
}

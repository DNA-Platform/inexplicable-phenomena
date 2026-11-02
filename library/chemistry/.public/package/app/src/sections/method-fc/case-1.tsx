import React from 'react';
import { $, $Chemical } from '@/index';
import {
    FcCard, FcLabel, CountDisplay, FcButton, FcNote,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// A plain React function component — no $Chemistry, no hooks.
// Receives a bound method as onClick and a label as props.
function PlainButton(props: { onClick: () => void; label: string }) {
    return (
        <FcButton onClick={props.onClick}>
            {props.label}
        </FcButton>
    );
}

class $Parent extends $Chemical {
    count = 0;

    increment() {
        this.count++;
    }

    view() {
        const clicked = this.count > 0;
        return (
            <>
                <FcCard>
                    <FcLabel>$Parent</FcLabel>
                    <CountDisplay>{this.count}</CountDisplay>
                    <PlainButton onClick={this.increment} label="Click me" />
                    <FcNote>
                        PlainButton is a React FC receiving this.increment as a prop
                    </FcNote>
                </FcCard>
                <VerdictSection>
                    <VerdictRow $state={clicked ? 'pass' : 'pending'}>
                        <VerdictDot $state={clicked ? 'pass' : 'pending'} />
                        {clicked
                            ? `✓ method binding works through FC prop — count = ${this.count}`
                            : '○ click the button — this.increment passed through a React FC as onClick'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Parent = $($Parent);

export default function Case1Demo() {
    return <Parent />;
}

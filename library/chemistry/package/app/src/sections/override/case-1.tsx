import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    ButtonRow, BaseButton, DangerBtn, IconBtn,
    ClickCount, ButtonCard, ButtonLabel,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// ─── Base class: $Button ─────────────────────────────────────────────────────
// Defines the interface: $label, $count, increment(). Subclasses override
// view() to change appearance — but the inherited method works unchanged.

class $Button extends $Chemical {
    $label = 'Click';
    count = 0;

    increment() { this.count++; }

    view() {
        return (
            <ButtonCard>
                <ButtonLabel>$Button</ButtonLabel>
                <BaseButton onClick={this.increment}>
                    {this.$label} <ClickCount>{this.count}</ClickCount>
                </BaseButton>
            </ButtonCard>
        );
    }
}

// ─── Subclass: $DangerButton ─────────────────────────────────────────────────
// Same interface, red theme. increment() is inherited — no rebinding needed.

class $DangerButton extends $Button {
    view() {
        return (
            <ButtonCard>
                <ButtonLabel>$DangerButton</ButtonLabel>
                <DangerBtn onClick={this.increment}>
                    {this.$label} <ClickCount>{this.count}</ClickCount>
                </DangerBtn>
            </ButtonCard>
        );
    }
}

// ─── Subclass: $IconButton ───────────────────────────────────────────────────
// Adds an emoji icon before the label. increment() is inherited.

class $IconButton extends $Button {
    $icon = '⚡';

    view() {
        return (
            <ButtonCard>
                <ButtonLabel>$IconButton</ButtonLabel>
                <IconBtn onClick={this.increment}>
                    {this.$icon} {this.$label} <ClickCount>{this.count}</ClickCount>
                </IconBtn>
            </ButtonCard>
        );
    }
}

// ─── $ButtonShowcase ─────────────────────────────────────────────────────────
// Bond constructor accepts $Button[] — all three subclasses satisfy the check.
// The parent renders them without knowing which type. Each increments its own
// count independently because this.increment is inherited and 'this' resolves
// to the correct instance. Same interface, different rendering.

class $ButtonShowcase extends $Chemical {
    buttons: $Button[] = [];

    $ButtonShowcase(...buttons: $Button[]) {
        this.buttons = buttons.map(b => $check(b, $Button));
    }

    view() {
        const anyClicked = this.buttons.some(b => b.count > 0);
        const state = anyClicked ? 'pass' : 'pending';
        return (
            <>
                <ButtonRow>
                    {this.buttons.map((btn, i) => {
                        const B = $(btn);
                        return <B key={i} />;
                    })}
                </ButtonRow>
                <VerdictSection>
                    <VerdictRow $state={state}>
                        <VerdictDot $state={state} />
                        {anyClicked
                            ? '✓ inherited increment() works on all subclasses — each view is different'
                            : '○ click any button to verify inherited methods work across overrides'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Button = $($Button);
const DangerButton = $($DangerButton);
const IconButton = $($IconButton);
const ButtonShowcase = $($ButtonShowcase);

export default function Case1Demo() {
    return (
        <ButtonShowcase>
            <Button label="Save" />
            <DangerButton label="Delete" />
            <IconButton label="Boost" icon="🚀" />
        </ButtonShowcase>
    );
}

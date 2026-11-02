import React from 'react';
import { $, $Chemical, $check } from '@/index';
import type { $Html } from '@/index';
import styled from 'styled-components';
import { DemoFrame, ControlRow, ToggleButton, Label } from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

const ToastSlot = styled.div`
    .toast-success {
        padding: 12px 16px;
        border-left: 4px solid ${(p) => p.theme.color.ok};
        background: ${(p) => p.theme.color.okBg};
        color: ${(p) => p.theme.color.ok};
        border-radius: 0 4px 4px 0;
        font-family: ${(p) => p.theme.font.sans};
        font-size: ${(p) => p.theme.type.caption};
        font-weight: 600;
        transition: all 0.15s ease;
    }
    .toast-error {
        padding: 12px 16px;
        border-left: 4px solid ${(p) => p.theme.color.fail};
        background: ${(p) => p.theme.color.failBg};
        color: ${(p) => p.theme.color.fail};
        border-radius: 0 4px 4px 0;
        font-family: ${(p) => p.theme.font.sans};
        font-size: ${(p) => p.theme.type.caption};
        font-weight: 600;
        transition: all 0.15s ease;
    }
`;

class $Notification extends $Chemical {
    toast!: $Html<'div'>;
    _toggled = false;

    $Notification(toast: $Html<'div'>) {
        this.toast = $check(toast, 'div');
    }

    escalate() {
        const isSuccess = this.toast.$className === 'toast-success';
        this.toast.$className = isSuccess ? 'toast-error' : 'toast-success';
        this._toggled = true;
    }

    view() {
        const Toast = $(this.toast);
        const isSuccess = this.toast.$className === 'toast-success';
        const message = isSuccess ? '✓ Changes saved successfully' : '✗ Connection failed — retrying';
        const state = this._toggled ? 'pass' : 'pending';

        return (
            <>
                <DemoFrame>
                    <ToastSlot>
                        <Toast>{message}</Toast>
                    </ToastSlot>
                    <ControlRow>
                        <Label>severity</Label>
                        <ToggleButton $on={isSuccess} onClick={this.escalate}>
                            {isSuccess ? 'success' : 'error'}
                        </ToggleButton>
                    </ControlRow>
                </DemoFrame>
                <VerdictSection>
                    <VerdictRow $state={state}>
                        <VerdictDot $state={state} />
                        {this._toggled
                            ? `✓ style changed — ${this.toast.$className === 'toast-error' ? 'error' : 'success'}`
                            : '○ toggle severity to verify'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Notification = $($Notification);

export default function Case1Demo() {
    return (
        <Notification>
            <div className="toast-success">✓ Changes saved successfully</div>
        </Notification>
    );
}

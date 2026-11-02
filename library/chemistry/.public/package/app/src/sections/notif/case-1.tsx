import React from 'react';
import { $, $Chemical } from '@/index';
import {
    NotifFrame, ButtonRow, TriggerButton,
    ToastStack, Toast, ToastText, DismissButton,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

type ToastItem = { id: number; text: string; type: 'info' | 'success' | 'error' };

class $NotificationCenter extends $Chemical {
    toasts: ToastItem[] = [];
    nextId = 1;
    created = 0;

    addToast(text: string, type: ToastItem['type']) {
        const id = this.nextId++;
        this.toasts.push({ id, text, type });
        this.created++;
        setTimeout(() => this.dismiss(id), 3000);
    }

    dismiss(id: number) {
        const idx = this.toasts.findIndex(t => t.id === id);
        if (idx !== -1) this.toasts.splice(idx, 1);
    }

    view() {
        const tested = this.created > 0;
        return (
            <>
                <NotifFrame>
                    <ButtonRow>
                        <TriggerButton $variant="info" onClick={() => this.addToast('Something happened', 'info')}>
                            Info
                        </TriggerButton>
                        <TriggerButton $variant="success" onClick={() => this.addToast('Operation succeeded', 'success')}>
                            Success
                        </TriggerButton>
                        <TriggerButton $variant="error" onClick={() => this.addToast('Something went wrong', 'error')}>
                            Error
                        </TriggerButton>
                    </ButtonRow>
                    <ToastStack>
                        {this.toasts.map(toast => (
                            <Toast key={toast.id} $type={toast.type}>
                                <ToastText>{toast.text}</ToastText>
                                <DismissButton onClick={() => this.dismiss(toast.id)}>
                                    &times;
                                </DismissButton>
                            </Toast>
                        ))}
                    </ToastStack>
                </NotifFrame>
                <VerdictSection>
                    <VerdictRow $state={tested ? 'pass' : 'pending'}>
                        <VerdictDot $state={tested ? 'pass' : 'pending'} />
                        {tested
                            ? `✓ ${this.created} toast${this.created > 1 ? 's' : ''} created — auto-dismiss via setTimeout, manual dismiss via splice`
                            : '○ click a button to fire a toast'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const NotificationCenter = $($NotificationCenter);

export default function Case1Demo() {
    return <NotificationCenter />;
}

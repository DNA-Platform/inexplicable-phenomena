import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    ParentFrame, ParentLabel, WidgetFrame, WidgetLabel,
    WidgetButton, WidgetCount, ErrorBox,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// ErrorBoundary — catches render errors so the app doesn't crash.
class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { error: Error | null }
> {
    state: { error: Error | null } = { error: null };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorBox>
                    {this.state.error.name}: {this.state.error.message}
                    {'\n\n'}
                    {this.state.error.stack}
                </ErrorBox>
            );
        }
        return this.props.children;
    }
}

// A widget chemical — has its own label and a click counter.
class $Widget extends $Chemical {
    $label = 'Prop-passed widget';
    clicks = 0;

    click() { this.clicks++; }

    view() {
        return (
            <WidgetFrame>
                <WidgetLabel>{this.$label}</WidgetLabel>
                <WidgetButton onClick={this.click}>Click me</WidgetButton>
                <WidgetCount>{this.clicks}</WidgetCount>
            </WidgetFrame>
        );
    }
}

// The parent receives a widget through its bond constructor and renders it.
class $Parent extends $Chemical {
    widget!: $Widget;

    $Parent(widget: $Widget) {
        this.widget = $check(widget, $Widget);
    }

    view() {
        const W = $(this.widget);
        const survived = !!this.widget;
        const clicked = this.widget.clicks > 0;
        return (
            <>
                <ParentFrame>
                    <ParentLabel>$Parent receives $Widget via bond constructor</ParentLabel>
                    <W />
                </ParentFrame>
                <VerdictSection>
                    <VerdictRow $state={survived ? 'pass' : 'fail'}>
                        <VerdictDot $state={survived ? 'pass' : 'fail'} />
                        {survived
                            ? '✓ chemical survived bond constructor transfer'
                            : '✗ widget did not survive bond constructor transfer'}
                    </VerdictRow>
                    <VerdictRow $state={clicked ? 'pass' : 'pending'}>
                        <VerdictDot $state={clicked ? 'pass' : 'pending'} />
                        {clicked
                            ? `✓ widget interaction works — ${this.widget.clicks} click${this.widget.clicks === 1 ? '' : 's'}`
                            : '○ click the widget button to verify interaction'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Widget = $($Widget);
const Parent = $($Parent);

export default function Case1Demo() {
    return (
        <ErrorBoundary>
            <Parent>
                <Widget />
            </Parent>
        </ErrorBoundary>
    );
}

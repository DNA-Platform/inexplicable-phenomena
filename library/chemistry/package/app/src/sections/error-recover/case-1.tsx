import React from 'react';
import { $, $Chemical } from '@/index';
import {
    RecoverFrame, RecoverLabel, NormalView, ErrorView,
    ToggleRow, ToggleLabel, ToggleButton, ResetButton,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// ErrorBoundary with reset support — catches view() throws and allows recovery.
class ErrorBoundary extends React.Component<
    { children: React.ReactNode; onError?: () => void },
    { error: Error | null }
> {
    state: { error: Error | null } = { error: null };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    reset() {
        this.setState({ error: null });
    }

    render() {
        if (this.state.error) {
            return (
                <RecoverFrame>
                    <RecoverLabel>ErrorBoundary caught:</RecoverLabel>
                    <ErrorView>
                        {this.state.error.name}: {this.state.error.message}
                    </ErrorView>
                </RecoverFrame>
            );
        }
        return this.props.children;
    }
}

class $Fragile extends $Chemical {
    $shouldThrow = false;
    hasRecovered = false;

    view() {
        if (this.$shouldThrow) {
            throw new Error('$Fragile.view() intentional throw');
        }

        return (
            <RecoverFrame>
                <RecoverLabel>$Fragile</RecoverLabel>
                <NormalView>
                    view() rendered normally
                </NormalView>
                <ToggleRow>
                    <ToggleLabel>$shouldThrow = {String(this.$shouldThrow)}</ToggleLabel>
                </ToggleRow>
            </RecoverFrame>
        );
    }
}

const Fragile = $($Fragile);

// Orchestrator — controls $shouldThrow and renders <Fragile /> conditionally.
class $Orchestrator extends $Chemical {
    shouldThrow = false;
    hasRecovered = false;
    boundaryRef = React.createRef<ErrorBoundary>();

    triggerError() {
        this.shouldThrow = true;
    }

    resetAll() {
        this.shouldThrow = false;
        this.hasRecovered = true;
        this.boundaryRef.current?.reset();
    }

    view() {
        const normalWorks = !this.shouldThrow;
        const recovered = this.hasRecovered;
        return (
            <>
                <ErrorBoundary ref={this.boundaryRef}>
                    <Fragile shouldThrow={this.shouldThrow} />
                </ErrorBoundary>
                <ToggleRow>
                    {!this.shouldThrow && (
                        <ToggleButton $danger onClick={this.triggerError}>
                            Throw
                        </ToggleButton>
                    )}
                    {this.shouldThrow && (
                        <ResetButton onClick={this.resetAll}>
                            Reset &mdash; clear error and recover
                        </ResetButton>
                    )}
                </ToggleRow>
                <VerdictSection>
                    <VerdictRow $state={normalWorks ? 'pass' : 'pending'}>
                        <VerdictDot $state={normalWorks ? 'pass' : 'pending'} />
                        {normalWorks
                            ? '✓ normal render works'
                            : '○ error thrown — click Reset to recover'}
                    </VerdictRow>
                    <VerdictRow $state={recovered ? 'pass' : 'pending'}>
                        <VerdictDot $state={recovered ? 'pass' : 'pending'} />
                        {recovered
                            ? '✓ error caught and recovered — $Fragile survived the throw'
                            : '○ click Throw then Reset to test recovery'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Orchestrator = $($Orchestrator);

export default function Case1Demo() {
    return <Orchestrator />;
}

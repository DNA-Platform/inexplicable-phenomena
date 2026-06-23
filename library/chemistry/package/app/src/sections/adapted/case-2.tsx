import React from 'react';
import { $, $Chemical, $check } from '@/index';
import type { $Function } from '@/index';
import styled from 'styled-components';
import { DemoFrame, ControlRow, ToggleButton, Label } from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

const MetricRow = styled.div`
    display: flex;
    align-items: baseline;
    gap: 4px;
    padding: 16px 20px;
    background: ${(p) => p.theme.color.paperRecessed};
    border-radius: 6px;
`;

const MetricValue = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 28px;
    font-weight: 700;
    color: ${(p) => p.theme.color.ink};
    letter-spacing: -0.02em;
`;

const MetricUnit = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
    margin-right: 8px;
`;

const TrendArrow = styled.span<{ $trend: 'up' | 'down' }>`
    font-size: 18px;
    font-weight: 700;
    color: ${(p) => p.$trend === 'up' ? p.theme.color.fail : p.theme.color.ok};
`;

function Metric({ value, unit, trend }: { value: string; unit: string; trend: 'up' | 'down' }) {
    return (
        <MetricRow>
            <MetricValue>{value}</MetricValue>
            <MetricUnit>{unit}</MetricUnit>
            <TrendArrow $trend={trend}>{trend === 'up' ? '↑' : '↓'}</TrendArrow>
        </MetricRow>
    );
}

class $LatencyMonitor extends $Chemical {
    metric!: $Function<typeof Metric>;
    _toggled = false;

    $LatencyMonitor(metric: $Function<typeof Metric>) {
        this.metric = $check(metric, Metric);
    }

    toggle() {
        const isNormal = this.metric.$trend === 'down';
        this.metric.$value = isNormal ? '1,247' : '42';
        this.metric.$trend = isNormal ? 'up' : 'down';
        this._toggled = true;
    }

    view() {
        const Metric = $(this.metric);
        const isNormal = this.metric.$trend === 'down';
        const state = this._toggled ? 'pass' : 'pending';

        return (
            <>
                <DemoFrame>
                    <Metric />
                    <ControlRow>
                        <Label>latency</Label>
                        <ToggleButton $on={isNormal} onClick={this.toggle}>
                            {isNormal ? 'normal' : 'elevated'}
                        </ToggleButton>
                    </ControlRow>
                </DemoFrame>
                <VerdictSection>
                    <VerdictRow $state={state}>
                        <VerdictDot $state={state} />
                        {this._toggled
                            ? `✓ metric updated — ${this.metric.$value} ms ${this.metric.$trend === 'up' ? '↑' : '↓'}`
                            : '○ toggle latency to verify'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const LatencyMonitor = $($LatencyMonitor);

export default function Case2Demo() {
    return (
        <LatencyMonitor>
            <Metric value="42" unit="ms" trend="down" />
        </LatencyMonitor>
    );
}

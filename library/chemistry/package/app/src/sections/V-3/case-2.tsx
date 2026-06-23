import React from 'react';
import { $, $Chemical } from '@/index';
import {
    DashboardRow, MetricFrame, MetricLabel, MetricValue, RefreshButton,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $MetricCard extends $Chemical {
    $label = 'Metric';
    value = 0;
    refreshed = false;
    flashing = false;

    refresh() {
        this.value = Math.floor(Math.random() * 1000);
        this.refreshed = true;
        this.flashing = true;
        setTimeout(() => { this.flashing = false; }, 400);
    }

    view() {
        const tested = this.refreshed;
        return (
            <>
                <MetricFrame>
                    <MetricLabel>{this.$label}</MetricLabel>
                    <MetricValue $flash={this.flashing}>{this.value}</MetricValue>
                    <RefreshButton onClick={this.refresh}>Refresh</RefreshButton>
                </MetricFrame>
                <VerdictSection>
                    <VerdictRow $state={tested ? 'pass' : 'pending'}>
                        <VerdictDot $state={tested ? 'pass' : 'pending'} />
                        {tested
                            ? `✓ ${this.$label} refreshed to ${this.value}`
                            : '○ click Refresh to generate a value'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const MetricCard = $($MetricCard);

export default function Case2Demo() {
    return (
        <DashboardRow>
            <MetricCard label="Revenue" />
            <MetricCard label="Users" />
        </DashboardRow>
    );
}

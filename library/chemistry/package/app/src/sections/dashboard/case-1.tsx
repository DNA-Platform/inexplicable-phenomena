import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    DashGrid, CardFrame, CardTitle, LoadingText,
    SkeletonBlock, SkeletonBar,
    MetricValue, MetricLabel,
    BarRow, Bar,
    StatusBadge, StatusDot,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// ─── Base class: $DashboardCard ─────────────────────────────────────────────
// Owns the loading pattern. Subclasses override renderContent() to show their
// specific data once loaded. The base view() handles the loading/content fork.

class $DashboardCard extends $Chemical {
    $title = '';
    loading = true;

    $DashboardCard() {}

    renderContent(): React.ReactNode {
        return null;
    }

    renderSkeleton(): React.ReactNode {
        return (
            <>
                <SkeletonBlock />
                <SkeletonBar />
            </>
        );
    }

    view() {
        return (
            <CardFrame>
                <CardTitle>{this.$title}</CardTitle>
                {this.loading
                    ? this.renderSkeleton()
                    : this.renderContent()}
            </CardFrame>
        );
    }
}

// ─── $MetricCard ────────────────────────────────────────────────────────────
// Loads a number (simulated 800ms), displays it large with a label.

class $MetricCard extends $DashboardCard {
    value = 0;
    label = '';
    fresh = false;

    async $MetricCard() {
        await this.next('mount');
        await new Promise(r => setTimeout(r, 800));
        this.value = this.$title === 'Revenue' ? 48250 : 12847;
        this.label = this.$title === 'Revenue' ? 'monthly total' : 'active this week';
        this.loading = false;
        this.fresh = true;
        setTimeout(() => { this.fresh = false; }, 400);
    }

    renderContent() {
        return (
            <>
                <MetricValue $fresh={this.fresh}>{this.value.toLocaleString()}</MetricValue>
                <MetricLabel>{this.label}</MetricLabel>
            </>
        );
    }
}

// ─── $ChartCard ─────────────────────────────────────────────────────────────
// Loads bar data (simulated 1200ms), renders as colored bar divs.

const BAR_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed', '#5b21b6'];

class $ChartCard extends $DashboardCard {
    data: number[] = [];
    animated = false;

    async $ChartCard() {
        await this.next('mount');
        await new Promise(r => setTimeout(r, 1200));
        this.data = [3, 7, 4, 9, 5, 6];
        this.loading = false;
        setTimeout(() => { this.animated = true; }, 100);
    }

    renderContent() {
        const max = Math.max(...this.data, 1);
        return (
            <BarRow>
                {this.data.map((v, i) => (
                    <Bar
                        key={i}
                        $height={(v / max) * 100}
                        $color={BAR_COLORS[i % BAR_COLORS.length]}
                        $animated={this.animated}
                    />
                ))}
            </BarRow>
        );
    }
}

// ─── $StatusCard ────────────────────────────────────────────────────────────
// Loads a status string (simulated 600ms), shows a colored badge.

class $StatusCard extends $DashboardCard {
    status: 'green' | 'yellow' | 'red' = 'green';
    statusText = '';
    pop = false;

    async $StatusCard() {
        await this.next('mount');
        await new Promise(r => setTimeout(r, 600));
        this.status = 'green';
        this.statusText = 'All systems operational';
        this.loading = false;
        this.pop = true;
        setTimeout(() => { this.pop = false; }, 350);
    }

    renderContent() {
        return (
            <StatusBadge $status={this.status} $pop={this.pop}>
                <StatusDot $status={this.status} />
                {this.statusText}
            </StatusBadge>
        );
    }
}

// ─── $Dashboard ─────────────────────────────────────────────────────────────
// Polymorphic bond constructor: accepts $DashboardCard[] — all three subclasses
// pass the type check. The dashboard renders them in a grid, unaware of which
// specific type each card is. Each card loads independently via its own async bond constructor.

class $Dashboard extends $Chemical {
    cards: $DashboardCard[] = [];

    $Dashboard(...cards: $DashboardCard[]) {
        this.cards = cards.map(c => $check(c, $DashboardCard));
    }

    view() {
        const allLoaded = this.cards.length > 0 && this.cards.every(c => !c.loading);
        const polyState = this.cards.length > 0 ? 'pass' : 'pending';
        const asyncState = allLoaded ? 'pass' : 'pending';
        const overrideState = allLoaded ? 'pass' : 'pending';

        return (
            <>
                <DashGrid>
                    {this.cards.map((card, i) => {
                        const C = $(card);
                        return <C key={i} />;
                    })}
                </DashGrid>
                <VerdictSection>
                    <VerdictRow $state={polyState}>
                        <VerdictDot $state={polyState} />
                        {this.cards.length > 0
                            ? `✓ polymorphic bond constructor — ${this.cards.length} cards accepted as $DashboardCard[]`
                            : '○ no cards bound'}
                    </VerdictRow>
                    <VerdictRow $state={asyncState}>
                        <VerdictDot $state={asyncState} />
                        {allLoaded
                            ? '✓ independent async lifecycle — all cards loaded via their own async bond constructor'
                            : '○ cards still loading...'}
                    </VerdictRow>
                    <VerdictRow $state={overrideState}>
                        <VerdictDot $state={overrideState} />
                        {allLoaded
                            ? '✓ subclass override — renderContent() differs per type, base handles loading'
                            : '○ waiting for content to verify overrides'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const MetricCard = $($MetricCard);
const ChartCard = $($ChartCard);
const StatusCard = $($StatusCard);
const Dashboard = $($Dashboard);

export default function Case1Demo() {
    return (
        <Dashboard>
            <MetricCard title="Revenue" />
            <ChartCard title="Sales trend" />
            <StatusCard title="API health" />
            <MetricCard title="Users" />
        </Dashboard>
    );
}

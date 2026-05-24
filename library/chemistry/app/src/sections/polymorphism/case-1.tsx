import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    DashboardGrid, CardFrame, CardTitle,
    MetricValue, TrendArrow,
    BarRow, Bar,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// ─── Base class: $Card ───────────────────────────────────────────────────────
// A polymorphic base with a $title and a default view. Subclasses override
// view() to render specialized content — the parent never inspects which type.

class $Card extends $Chemical {
    $title?: string;
    view() {
        return (
            <CardFrame>
                <CardTitle>{this.$title}</CardTitle>
            </CardFrame>
        );
    }
}

// ─── Subclass: $MetricCard ───────────────────────────────────────────────────
// Adds a numeric value and trend. Overrides view() to show a KPI layout.

class $MetricCard extends $Card {
    $value = 0;
    $trend = 0;

    view() {
        const up = this.$trend >= 0;
        return (
            <CardFrame>
                <CardTitle>{this.$title}</CardTitle>
                <MetricValue>{this.$value.toLocaleString()}</MetricValue>
                <TrendArrow $up={up}>
                    {up ? '▲' : '▼'} {Math.abs(this.$trend)}%
                </TrendArrow>
            </CardFrame>
        );
    }
}

// ─── Subclass: $ChartCard ────────────────────────────────────────────────────
// Adds a data array. Overrides view() to render a bar visualization.

class $ChartCard extends $Card {
    $data: number[] = [];

    view() {
        const max = Math.max(...this.$data, 1);
        return (
            <CardFrame>
                <CardTitle>{this.$title}</CardTitle>
                <BarRow>
                    {this.$data.map((v, i) => (
                        <Bar key={i} $height={(v / max) * 100} />
                    ))}
                </BarRow>
            </CardFrame>
        );
    }
}

// ─── $Dashboard ──────────────────────────────────────────────────────────────
// Bond constructor accepts $Card[] — BOTH subclasses pass the type check
// because $MetricCard and $ChartCard extend $Card. The dashboard doesn't
// know or care which specific type it received. That's polymorphism.

class $Dashboard extends $Chemical {
    cards: $Card[] = [];

    $Dashboard(...cards: $Card[]) {
        this.cards = cards.map(c => $check(c, $Card));
    }

    view() {
        const hasCards = this.cards.length > 0;
        const state = hasCards ? 'pass' : 'pending';
        return (
            <>
                <DashboardGrid>
                    {this.cards.map((card, i) => {
                        const C = $(card);
                        return <C key={i} />;
                    })}
                </DashboardGrid>
                <VerdictSection>
                    <VerdictRow $state={state}>
                        <VerdictDot $state={state} />
                        {hasCards
                            ? `✓ ${this.cards.length} cards rendered — MetricCard and ChartCard both pass $check(c, $Card)`
                            : '○ no cards bound'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const MetricCard = $($MetricCard);
const ChartCard = $($ChartCard);
const Dashboard = $($Dashboard);

export default function Case1Demo() {
    return (
        <Dashboard>
            <MetricCard title="Revenue" value={1234} trend={12} />
            <ChartCard title="Sales" data={[3, 5, 2, 8, 4]} />
            <MetricCard title="Users" value={567} trend={-3} />
        </Dashboard>
    );
}

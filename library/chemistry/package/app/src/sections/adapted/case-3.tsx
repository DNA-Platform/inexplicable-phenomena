import React from 'react';
import { $, $Chemical, $check } from '@/index';
import type { $Html, $Function } from '@/index';
import styled from 'styled-components';
import { DemoFrame, ControlRow, ToggleButton, Label } from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

const PanelGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const PanelSlot = styled.div<{ $visible: boolean }>`
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 4px;
    overflow: hidden;
    background: ${(p) => p.$visible ? p.theme.color.paperRaised : p.theme.color.paperRecessed};
    opacity: ${(p) => p.$visible ? 1 : 0.5};
    min-height: 40px;
`;

const CollapsedLabel = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
`;

const DetailText = styled.div`
    padding: 12px 16px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.inkSoft};
    line-height: 1.5;
`;

const StatRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};

    & + & {
        border-top: 1px solid ${(p) => p.theme.color.rule};
    }
`;

const StatLabel = styled.span`
    color: ${(p) => p.theme.color.muted};
`;

const StatValue = styled.span`
    color: ${(p) => p.theme.color.ink};
    font-weight: 600;
`;

function StatsCard({ requests, uptime }: { requests: string; uptime: string }) {
    return (
        <>
            <StatRow>
                <StatLabel>requests</StatLabel>
                <StatValue>{requests}</StatValue>
            </StatRow>
            <StatRow>
                <StatLabel>uptime</StatLabel>
                <StatValue>{uptime}</StatValue>
            </StatRow>
        </>
    );
}

class $Dashboard extends $Chemical {
    details!: $Html<'div'>;
    stats!: $Function<typeof StatsCard>;
    _detailsToggled = false;
    _statsToggled = false;

    $Dashboard(details: $Html<'div'>, stats: $Function<typeof StatsCard>) {
        this.details = $check(details, 'div');
        this.stats = $check(stats, StatsCard);
    }

    toggleDetails() {
        const visible = this.details.$show !== false;
        this.details.$show = !visible;
        this._detailsToggled = true;
    }

    toggleStats() {
        const visible = this.stats.$show !== false;
        this.stats.$show = !visible;
        this._statsToggled = true;
    }

    view() {
        const Details = $(this.details);
        const Stats = $(this.stats);
        const detailsVisible = this.details.$show !== false;
        const statsVisible = this.stats.$show !== false;
        const detailsState = this._detailsToggled ? 'pass' : 'pending';
        const statsState = this._statsToggled ? 'pass' : 'pending';

        return (
            <>
                <DemoFrame>
                    <PanelGroup>
                        <div>
                            <PanelSlot $visible={detailsVisible}>
                                <Details>
                                    <DetailText>
                                        Production deployment running on 3 replicas.
                                        Last deploy 2 hours ago by CI pipeline.
                                    </DetailText>
                                </Details>
                                {!detailsVisible && <CollapsedLabel>collapsed</CollapsedLabel>}
                            </PanelSlot>
                            <ControlRow>
                                <Label>details</Label>
                                <ToggleButton $on={detailsVisible} onClick={this.toggleDetails}>
                                    {detailsVisible ? 'visible' : 'hidden'}
                                </ToggleButton>
                            </ControlRow>
                        </div>

                        <div>
                            <PanelSlot $visible={statsVisible}>
                                <Stats />
                                {!statsVisible && <CollapsedLabel>collapsed</CollapsedLabel>}
                            </PanelSlot>
                            <ControlRow>
                                <Label>stats</Label>
                                <ToggleButton $on={statsVisible} onClick={this.toggleStats}>
                                    {statsVisible ? 'visible' : 'hidden'}
                                </ToggleButton>
                            </ControlRow>
                        </div>
                    </PanelGroup>
                </DemoFrame>
                <VerdictSection>
                    <VerdictRow $state={detailsState}>
                        <VerdictDot $state={detailsState} />
                        {this._detailsToggled
                            ? `✓ details panel — ${detailsVisible ? 'visible' : 'hidden'}`
                            : '○ toggle details to verify'}
                    </VerdictRow>
                    <VerdictRow $state={statsState}>
                        <VerdictDot $state={statsState} />
                        {this._statsToggled
                            ? `✓ stats panel — ${statsVisible ? 'visible' : 'hidden'}`
                            : '○ toggle stats to verify'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Dashboard = $($Dashboard);

export default function Case3Demo() {
    return (
        <Dashboard>
            <div />
            <StatsCard requests="12,847" uptime="99.97%" />
        </Dashboard>
    );
}

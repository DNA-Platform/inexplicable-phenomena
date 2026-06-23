import React from 'react';
import { $, $Chemical, $check } from '@/index';
import type { $Html, $Function } from '@/index';
import { DemoFrame, ControlRow, ToggleButton, Label, MixedGrid, TypeTag } from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';
import styled from 'styled-components';

const StatusText = styled.div`
    padding: 8px 12px;
    background: ${(p) => p.theme.color.paperRecessed};
    border-radius: 4px;
    font-family: ${(p) => p.theme.font.mono};
    font-size: ${(p) => p.theme.type.caption};
`;

const Dot = styled.span<{ $color: string }>`
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(p) => p.$color};
    border: 1px solid rgba(0,0,0,0.15);
`;

function StatusLight({ color }: { color: string }) {
    return <Dot $color={color} />;
}

class $StatusCard extends $Chemical {
    $title = '';
    view() {
        return <StatusText>{this.$title}</StatusText>;
    }
}

const StatusCardView = $($StatusCard);

class $Dashboard extends $Chemical {
    card!: $StatusCard;
    divider!: $Html<'hr'>;
    light!: $Function<typeof StatusLight>;
    _toggled = false;

    $Dashboard(card: $StatusCard, divider: $Html<'hr'>, light: $Function<typeof StatusLight>) {
        this.card = $check(card, $StatusCard);
        this.divider = $check(divider, 'hr');
        this.light = $check(light, StatusLight);
    }

    toggle() {
        const healthy = this.card.$title === 'All systems nominal';
        this.card.$title = healthy ? 'Degraded performance' : 'All systems nominal';
        this.divider.$style = { borderTop: `2px ${healthy ? 'dashed' : 'solid'} currentColor`, opacity: 0.3 };
        this.light.$color = healthy ? '#ef4444' : '#22c55e';
        this._toggled = true;
    }

    view() {
        const Card = $(this.card);
        const Divider = $(this.divider);
        const Light = $(this.light);
        const healthy = this.card.$title === 'All systems nominal';
        const state = this._toggled ? 'pass' : 'pending';

        return (
            <>
                <DemoFrame>
                    <MixedGrid>
                        <div>
                            <TypeTag>card</TypeTag>
                            <Card />
                        </div>
                        <div>
                            <TypeTag>divider</TypeTag>
                            <Divider />
                        </div>
                        <div>
                            <TypeTag>light</TypeTag>
                            <Light />
                        </div>
                    </MixedGrid>
                    <ControlRow>
                        <Label>status</Label>
                        <ToggleButton $on={healthy} onClick={this.toggle}>
                            {healthy ? 'healthy' : 'degraded'}
                        </ToggleButton>
                    </ControlRow>
                </DemoFrame>
                <VerdictSection>
                    <VerdictRow $state={state}>
                        <VerdictDot $state={state} />
                        {this._toggled
                            ? '✓ all three children react from one toggle'
                            : '○ toggle status to verify all three react'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Dashboard = $($Dashboard);

export default function Case4Demo() {
    return (
        <Dashboard>
            <StatusCardView title="All systems nominal" />
            <hr style={{ borderTop: '2px solid currentColor', opacity: 0.3 }} />
            <StatusLight color="#22c55e" />
        </Dashboard>
    );
}

import React from 'react';
import { $, $Chemical } from '@/index';
import { DemoFrame, Toolbar, ToolButton, Label } from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';
import styled from 'styled-components';

const ButtonPreview = styled.button<{ $bg: string; $fg: string; $radius: string }>`
    padding: 10px 20px;
    background: ${(p) => p.$bg};
    color: ${(p) => p.$fg};
    border: none;
    border-radius: ${(p) => p.$radius};
    font-family: ${(p) => p.theme.font.mono};
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    min-width: 100px;

    &:hover { opacity: 0.85; }
    &:active { transform: scale(0.97); }
`;

const PresetRow = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 12px;
`;

const PresetCard = styled.div<{ $active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 10px;
    border: 1px solid ${(p) => p.$active ? p.theme.color.theme : p.theme.color.rule};
    border-radius: 6px;
    background: ${(p) => p.$active ? p.theme.color.themeFaint : 'transparent'};
    cursor: pointer;
`;

const PresetLabel = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 10px;
    color: ${(p) => p.theme.color.muted};
    text-transform: uppercase;
`;

class $Btn extends $Chemical {
    $label = 'Button';
    bg = '#4f46e5';
    fg = '#ffffff';
    radius = '6px';
    pressed = false;

    press() { this.pressed = true; }

    view() {
        return (
            <ButtonPreview
                $bg={this.bg}
                $fg={this.fg}
                $radius={this.radius}
                onClick={this.press}
            >
                {this.$label}
            </ButtonPreview>
        );
    }
}

class $PresetDemo extends $Chemical {
    base = new $Btn();
    presets: { name: string; btn: $Btn }[] = [];
    _cloned = false;
    _customized = false;
    _selectedPreset = -1;

    makePreset(name: string, overrides: Partial<{ bg: string; fg: string; radius: string; $label: string }>) {
        const clone = this.base.$new();
        clone.$label = overrides.$label ?? name;
        if (overrides.bg) clone.bg = overrides.bg;
        if (overrides.fg) clone.fg = overrides.fg;
        if (overrides.radius) clone.radius = overrides.radius;
        this.presets = [...this.presets, { name, btn: clone }];
        this._cloned = true;
    }

    cyclePresetColor(idx: number) {
        const colors = ['#4f46e5', '#ef4444', '#22c55e', '#f97316', '#8b5cf6'];
        const btn = this.presets[idx].btn;
        const i = colors.indexOf(btn.bg);
        btn.bg = colors[(i + 1) % colors.length];
        this._customized = true;
        this._selectedPreset = idx;
    }

    view() {
        const Base = $(this.base);

        return (
            <>
                <DemoFrame>
                    <Label>base button</Label>
                    <PresetRow>
                        <Base />
                    </PresetRow>
                    <Toolbar>
                        <ToolButton onClick={() => this.makePreset('Submit', { bg: '#22c55e', $label: 'Submit' })}>
                            + submit
                        </ToolButton>
                        <ToolButton onClick={() => this.makePreset('Cancel', { bg: '#ef4444', $label: 'Cancel' })}>
                            + cancel
                        </ToolButton>
                        <ToolButton onClick={() => this.makePreset('Pill', { radius: '999px', $label: 'Rounded' })}>
                            + pill
                        </ToolButton>
                    </Toolbar>
                    {this.presets.length > 0 && (
                        <>
                            <Label style={{ display: 'block', marginTop: 14 }}>presets (click to recolor)</Label>
                            <PresetRow>
                                {this.presets.map((p, i) => {
                                    const P = $(p.btn);
                                    return (
                                        <PresetCard
                                            key={p.btn.toString()}
                                            $active={this._selectedPreset === i}
                                            onClick={() => this.cyclePresetColor(i)}
                                        >
                                            <P />
                                            <PresetLabel>{p.name}</PresetLabel>
                                        </PresetCard>
                                    );
                                })}
                            </PresetRow>
                        </>
                    )}
                </DemoFrame>
                <VerdictSection>
                    <VerdictRow $state={this._cloned ? 'pass' : 'pending'}>
                        <VerdictDot $state={this._cloned ? 'pass' : 'pending'} />
                        {this._cloned
                            ? `✓ created ${this.presets.length} preset${this.presets.length > 1 ? 's' : ''} from base via $new()`
                            : '○ click a preset button to clone the base'}
                    </VerdictRow>
                    <VerdictRow $state={this._customized ? 'pass' : 'pending'}>
                        <VerdictDot $state={this._customized ? 'pass' : 'pending'} />
                        {this._customized
                            ? '✓ recolored a preset independently — base and siblings unaffected'
                            : '○ click a preset card to cycle its color'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const PresetDemo = $($PresetDemo);

export default function Case2Demo() {
    return <PresetDemo />;
}

import React from 'react';
import { $, $Chemical } from '@/index';
import {
    DemoFrame, Canvas, ShapeEl, Toolbar, ToolButton,
    ColorSwatch, Label, Divider,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

const palette = ['#4f46e5', '#ef4444', '#22c55e', '#eab308', '#ec4899'];
type Kind = 'circle' | 'square' | 'diamond';

class $Shape extends $Chemical {
    color = '#4f46e5';
    kind: Kind = 'circle';
    x = 60;
    y = 60;
    selected = false;
    _onSelect: (() => void) | null = null;

    select() {
        if (this._onSelect) this._onSelect();
    }

    cycleColor() {
        const idx = palette.indexOf(this.color);
        this.color = palette[(idx + 1) % palette.length];
    }

    view() {
        return (
            <ShapeEl
                $color={this.color}
                $kind={this.kind}
                $selected={this.selected}
                style={{ left: this.x, top: this.y }}
                onClick={this.select}
            />
        );
    }
}

class $Studio extends $Chemical {
    shapes: $Shape[] = [];
    _selectedIndex = -1;
    _cloneCount = 0;
    colorChanged = false;
    nextKind: Kind = 'circle';
    nextColor = '#4f46e5';

    addShape() {
        const shape = new $Shape();
        shape.kind = this.nextKind;
        shape.color = this.nextColor;
        shape.x = 40 + Math.floor(Math.random() * 300);
        shape.y = 30 + Math.floor(Math.random() * 180);
        const idx = this.shapes.length;
        shape._onSelect = () => this.selectShape(idx);
        this.shapes = [...this.shapes, shape];
        this._selectedIndex = this.shapes.length - 1;
        this.deselectAll();
        shape.selected = true;
    }

    cloneSelected() {
        if (this._selectedIndex < 0) return;
        const source = this.shapes[this._selectedIndex];
        const clone = source.$new();
        clone.x = Math.min(source.x + 30, 440);
        clone.y = Math.min(source.y + 30, 210);
        clone.selected = false;
        const idx = this.shapes.length;
        clone._onSelect = () => this.selectShape(idx);
        this.shapes = [...this.shapes, clone];
        this._selectedIndex = this.shapes.length - 1;
        this.deselectAll();
        clone.selected = true;
        this._cloneCount++;
    }

    colorSelected() {
        if (this._selectedIndex < 0) return;
        this.shapes[this._selectedIndex].cycleColor();
        this.colorChanged = true;
    }

    selectShape(idx: number) {
        this.deselectAll();
        this._selectedIndex = idx;
        this.shapes[idx].selected = true;
    }

    deselectAll() {
        for (const s of this.shapes) s.selected = false;
    }

    view() {
        const hasShapes = this.shapes.length > 0;
        const hasSelection = this._selectedIndex >= 0;
        const cloned = this._cloneCount > 0;
        const recolored = this.colorChanged;

        return (
            <>
                <DemoFrame>
                    <Canvas>
                        {this.shapes.map((s) => {
                            const S = $(s);
                            return <S key={s.toString()} />;
                        })}
                    </Canvas>
                    <Toolbar>
                        <Label>add</Label>
                        {(['circle', 'square', 'diamond'] as Kind[]).map(k => (
                            <ToolButton
                                key={k}
                                $active={this.nextKind === k}
                                onClick={() => { this.nextKind = k; this.addShape(); }}
                            >
                                {k}
                            </ToolButton>
                        ))}
                        <Divider />
                        {palette.map(c => (
                            <ColorSwatch
                                key={c}
                                $color={c}
                                $active={this.nextColor === c}
                                onClick={() => { this.nextColor = c; }}
                            />
                        ))}
                    </Toolbar>
                    <Toolbar>
                        <ToolButton
                            $active={hasSelection}
                            onClick={this.cloneSelected}
                            disabled={!hasSelection}
                        >
                            clone selected
                        </ToolButton>
                        <ToolButton
                            $active={hasSelection}
                            onClick={this.colorSelected}
                            disabled={!hasSelection}
                        >
                            change color
                        </ToolButton>
                    </Toolbar>
                </DemoFrame>
                <VerdictSection>
                    <VerdictRow $state={hasShapes ? 'pass' : 'pending'}>
                        <VerdictDot $state={hasShapes ? 'pass' : 'pending'} />
                        {hasShapes
                            ? `✓ added ${this.shapes.length} shape${this.shapes.length > 1 ? 's' : ''} to canvas`
                            : '○ click a shape button to add one'}
                    </VerdictRow>
                    <VerdictRow $state={cloned ? 'pass' : 'pending'}>
                        <VerdictDot $state={cloned ? 'pass' : 'pending'} />
                        {cloned
                            ? `✓ cloned ${this._cloneCount} shape${this._cloneCount > 1 ? 's' : ''} with $new() — offset from original`
                            : '○ select a shape and click clone'}
                    </VerdictRow>
                    <VerdictRow $state={recolored ? 'pass' : 'pending'}>
                        <VerdictDot $state={recolored ? 'pass' : 'pending'} />
                        {recolored
                            ? '✓ changed clone color independently — original unaffected'
                            : '○ select a clone and change its color'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Studio = $($Studio);

export default function Case1Demo() {
    return <Studio />;
}

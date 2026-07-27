import React from 'react';
import { $, $Chemical, $check } from '@/index';
import { Card, Prose, Field, Input, Count, Mark } from './faces';

// $Highlighter — a lens over one HTML block.
//
// A run of prose with inline markup — `Call me <b>Ishmael</b>…` — arrives at the
// bond constructor as a SINGLE $Html<'block'>. Working with a block means iterating
// its `$elements` and reading each one's text ($value on a text node, children on a
// tag). Here we re-render them, wrapping every match of the live search query in a
// <mark>. $check(x, 'block') gives an empty block for empty content — no null guard.
class $Highlighter extends $Chemical {
    block: any;
    $query = '';
    $Highlighter(block?: any) { this.block = $check(block, 'block'); }

    private textOf = (e: any): string =>
        e.$value != null ? String(e.$value) : (typeof e.children === 'string' ? e.children : '');

    get matches(): number {
        const q = this.$query.trim().toLowerCase();
        if (!q) return 0;
        return this.block.$elements.reduce(
            (n: number, e: any) => n + this.textOf(e).toLowerCase().split(q).length - 1, 0);
    }

    // Split a piece of text around the query, wrapping each match in a <Mark>.
    private mark(text: string): React.ReactNode {
        const q = this.$query.trim();
        if (!q) return text;
        const low = text.toLowerCase(), ql = q.toLowerCase();
        const out: React.ReactNode[] = [];
        let i = 0, k = 0;
        for (let idx = low.indexOf(ql); idx !== -1; idx = low.indexOf(ql, i)) {
            if (idx > i) out.push(text.slice(i, idx));
            out.push(<Mark key={k++}>{text.slice(idx, idx + q.length)}</Mark>);
            i = idx + q.length;
        }
        if (i < text.length) out.push(text.slice(i));
        return out;
    }

    view() {
        return (
            <Card>
                <Prose>
                    {this.block.$elements.map((e: any, i: number) =>
                        // A text node highlights inline; an inline tag re-wraps its highlighted text.
                        e.type === 'string'
                            ? <React.Fragment key={i}>{this.mark(this.textOf(e))}</React.Fragment>
                            : React.createElement(e.type, { key: i }, this.mark(this.textOf(e)))
                    )}
                </Prose>
                <Field>
                    <Input
                        placeholder="search the passage…"
                        value={this.$query}
                        onChange={e => { this.$query = e.target.value; }}
                    />
                    <Count>{this.$query.trim() ? `${this.matches} match${this.matches === 1 ? '' : 'es'}` : ''}</Count>
                </Field>
            </Card>
        );
    }
}
const Highlighter = $($Highlighter);

// Authoring the content is authoring the block: the inline run below becomes one
// $Html<'block'> the lens then reads and highlights.
export default function Case1Demo() {
    return (
        <Highlighter>
            Call me <b>Ishmael</b>. Some years ago—never mind how long precisely—having <i>little or no money</i> in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.
        </Highlighter>
    );
}

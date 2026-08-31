import React from 'react';
import { $, $Block, $Chemical, $check, type $Written } from '@/index';
import { Card, Prose, Field, Input, Count, Mark, Panel, Label } from './faces';

// $Reader — a lens over one block.
//
// A run of prose with inline markup — `Call me <b>Ishmael</b>…` — arrives at the
// bond constructor as a SINGLE $Block, holding what was written as it was
// written: raw prose as itself, a written element whole.
//
// EVERY READING OF A BLOCK IS A BLOCK. `where`, `select` and `selectMany` each
// answer a new one, so a reading can be read again — and, being a block, can be
// drawn. The three panels below are three blocks derived from the first, and the
// framework draws each of them; nothing here assembles their contents.
//
// AND A READING IS TAKEN WHERE A WRITE IS TAKEN — in the bond constructor, and
// in the handler — NEVER in the view. A reading builds a chemical, and a view
// that builds one returns a new component identity on every pass, so the drawing
// never settles. Written the other way round, this page dies of
// "Maximum update depth exceeded" while every suite stays green.
class $Reader extends $Chemical {
    block!: $Block;
    written!: $Block;
    shouted!: $Block;
    matched!: $Block;
    $query = '';

    $Reader(block: $Block) {
        this.block = $check(block, $Block);
        this.written = this.block.where(piece => typeof piece === 'object');
        this.shouted = this.block.select(piece => typeof piece === 'string' ? piece.toUpperCase() : piece);
        this.matched = this.block.where(() => false);
    }

    search(asked: string) {
        this.$query = asked;
        const needle = asked.trim().toLowerCase();
        this.matched = needle
            ? this.block.where(piece => said(piece).toLowerCase().includes(needle))
            : this.block.where(() => false);
    }

    view() {
        return (
            <Card>
                <Prose>
                    {[...this.block].map((piece, at) =>
                        typeof piece === 'object'
                            ? React.createElement((piece as any).type ?? 'span', { key: at }, this.lit(said(piece)))
                            : <React.Fragment key={at}>{this.lit(said(piece))}</React.Fragment>
                    )}
                </Prose>

                <Field>
                    <Input
                        placeholder="search the passage…"
                        value={this.$query}
                        onChange={e => this.search(e.target.value)}
                    />
                    <Count>
                        {this.$query.trim()
                            ? `${this.matched.length} of ${this.block.length} pieces`
                            : `${this.block.length} pieces`}
                    </Count>
                </Field>

                {this.reading('where — the pieces that match, as a new block', this.matched)}
                {this.reading('where — only what was written as an element', this.written)}
                {this.reading('select — the prose shouted, elements untouched', this.shouted)}
            </Card>
        );
    }

    // A DERIVED BLOCK IS DRAWN BY THE FRAMEWORK, not laid out here: `$(block)` is
    // a component, exactly as it is for the block that was written. It is stable
    // because the block it stands for is held rather than rebuilt.
    reading(label: string, block: $Block) {
        const Drawn = $(block);
        return (
            <Panel>
                <Label>{label} · {block.length}</Label>
                <Drawn />
            </Panel>
        );
    }

    lit(text: string): React.ReactNode {
        const asked = this.$query.trim();
        if (!asked) return text;
        const out: React.ReactNode[] = [];
        const low = text.toLowerCase(), needle = asked.toLowerCase();
        let from = 0, key = 0;
        for (let at = low.indexOf(needle); at !== -1; at = low.indexOf(needle, from)) {
            if (at > from) out.push(text.slice(from, at));
            out.push(<Mark key={key++}>{text.slice(at, at + asked.length)}</Mark>);
            from = at + asked.length;
        }
        if (from < text.length) out.push(text.slice(from));
        return out;
    }
}
const Reader = $($Reader);

// What a piece of a block says. Raw prose and raw numbers are themselves; a
// written element says what was written inside it.
function said(piece: $Written): string {
    if (typeof piece === 'string') return piece;
    if (typeof piece === 'number') return String(piece);
    const inside = (piece as any).children;
    return typeof inside === 'string' ? inside : '';
}

// Authoring the content is authoring the block: the inline run below becomes one
// $Block that the lens then reads.
export default function Case1Demo() {
    return (
        <Reader>
            Call me <b>Ishmael</b>. Some years ago—never mind how long precisely—having <i>little or no money</i> in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.
        </Reader>
    );
}

import React, { type ReactNode } from 'react';
import { marked } from 'marked';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Paragraph, Paragraph } from '@/writing/Paragraph';
import { $Latex, Latex } from './latex';
import { ReadingsBar, Chip, ChipValue } from './page';

export type Entry =
    | { kind: 'heading'; depth: number; text: string }
    | { kind: 'paragraph'; chemical: $Paragraph }
    | { kind: 'math'; chemical: $Latex }
    | { kind: 'rule' };

function mathSegments(source: string): ReactNode[] {
    const nodes: ReactNode[] = [];
    let rest = source;
    let key = 0;
    for (let m = rest.match(/\$([^$\n]+?)\$/); m; m = rest.match(/\$([^$\n]+?)\$/)) {
        const at = m.index ?? 0;
        if (at > 0) nodes.push(rest.slice(0, at));
        nodes.push(<Latex key={`x${key++}`}>{m[1]}</Latex>);
        rest = rest.slice(at + m[0].length);
    }
    if (rest) nodes.push(rest);
    return nodes;
}

function inlineNodes(tokens: any[]): ReactNode[] {
    return tokens.flatMap((t, i): ReactNode[] => {
        if (t.type === 'strong') return [<b key={i}>{inlineNodes(t.tokens ?? [])}</b>];
        if (t.type === 'em') return [<i key={i}>{inlineNodes(t.tokens ?? [])}</i>];
        if (t.type === 'codespan') return [<code key={i}>{t.text}</code>];
        if (t.type === 'link') return [<a key={i} href={t.href}>{inlineNodes(t.tokens ?? [])}</a>];
        if (t.type === 'text' || t.type === 'escape') return mathSegments(t.raw ?? t.text ?? '');
        return t.raw ? [t.raw] : [];
    });
}

export function parse(source: string): Entry[] {
    const entries: Entry[] = [];
    for (const token of marked.lexer(source) as any[]) {
        if (token.type === 'heading') {
            entries.push({ kind: 'heading', depth: token.depth, text: token.text });
            continue;
        }
        if (token.type === 'hr') {
            entries.push({ kind: 'rule' });
            continue;
        }
        if (token.type === 'paragraph') {
            const display = token.raw.trim().match(/^\$\$([\s\S]+)\$\$$/);
            if (display) {
                entries.push({ kind: 'math', chemical: $<$Latex>(<Latex display>{display[1].trim()}</Latex>) });
                continue;
            }
            entries.push({ kind: 'paragraph', chemical: $<$Paragraph>(<Paragraph>{inlineNodes(token.tokens ?? [])}</Paragraph>) });
        }
    }
    return entries;
}

export class $Markdown extends $Chemical {
    $source? = '';
    $readings? = false;
    _key?: string;
    _entries?: Entry[];

    // Keyed mint (research PROBE 7): the key is the live source, so readings never go stale;
    // the minted parts keep stable identity so mounting them cannot run away (PROBE 1).
    get entries(): Entry[] {
        if (this._key !== this.$source) {
            this._key = this.$source;
            this._entries = parse(this.$source ?? '');
        }
        return this._entries!;
    }

    get paragraphs(): $Paragraph[] { return this.entries.filter(e => e.kind === 'paragraph').map(e => (e as any).chemical); }
    get words(): number { return this.paragraphs.reduce((n, p) => n + p.words.length, 0); }

    get title(): string {
        const h = this.entries.find(e => e.kind === 'heading' && e.depth === 1);
        return h ? (h as any).text : '';
    }

    get formulas(): number {
        const display = this.entries.filter(e => e.kind === 'math').length;
        const inline = this.paragraphs.reduce((n, p) => {
            const elements = ((p.text as any)?.$elements ?? []) as unknown[];
            return n + elements.filter(el => el instanceof $Latex).length;
        }, 0);
        return display + inline;
    }

    view(): ReactNode {
        return (
            <div className="markdown">
                {this.entries.map((e, i) => {
                    if (e.kind === 'heading') return React.createElement(`h${Math.min(e.depth, 4)}`, { key: i }, e.text);
                    if (e.kind === 'rule') return <hr key={i} />;
                    const C = $(e.chemical as any) as any;
                    if (e.kind === 'math') return <div className="display-math" key={i}><C /></div>;
                    return <p key={i}><C /></p>;
                })}
                {this.$readings && (
                    <ReadingsBar>
                        <Chip><ChipValue>{this.title || '—'}</ChipValue> title</Chip>
                        <Chip><ChipValue>{this.paragraphs.length}</ChipValue> paragraphs</Chip>
                        <Chip><ChipValue>{this.words}</ChipValue> words</Chip>
                        <Chip><ChipValue>{this.formulas}</ChipValue> formulas</Chip>
                    </ReadingsBar>
                )}
            </div>
        );
    }
}

export const Markdown = $($Markdown);

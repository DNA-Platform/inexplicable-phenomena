import React from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Sentence } from '@/writing/Sentence';
import { $Word, Word } from '@/writing/Word';
import { Punctuation } from '@/writing/Punctuation';
import { type Role } from '@/writing/Writing';

// A sentence written in markdown. It differs from a plain sentence in exactly
// two things — how it divides prose, and what it composes each piece into —
// which is what a NOTATION is: not a level, not a role, but the marks writing
// is authored in.
//
// The law it rests on already shipped: markdown's SYNTAX is mentioned and its
// CONTENT is used. So `**` is a mark standing for itself, exactly as a comma
// is, and `words` passes over it without being told to.

// A word that points. `$Link` ships and is the right thing, but it is a
// $Sentence, and a sentence's parts are words — so a link written inside a
// sentence cannot be one of that sentence's parts without a word-grade form.
// PROXY NAME, flagged: this is a word specialized by carrying a target.
export class $Pointing extends $Word {
    $url? = '';

    get url(): string { return this.$url || this.copy; }

    // The target is neither used nor mentioned — it is a POINTER, and a pointer
    // is not writing. So it never enters the copy, and never becomes a word.
    valid(): boolean { return this.copy !== ''; }
}

export const Pointing = $($Pointing);

// The figure pattern, one level down: a part whose CONTENT IS NOT WRITING.
// Inline mathematics is TeX; an inline code span is source. Neither is prose,
// so neither is a word — the model said so before I did, by refusing `parts()`
// as a word at all: $Word demands letters, and code has parens.
//
// A NAME IS OWED here. $Figure is Doug's, at paragraph level; its word-grade
// sibling has never been named, and this proxy is not a proposal.
export class $Inline extends $Word {
    $content? = '';
    $kind? = 'math';

    get content(): string { return this.$content ?? ''; }
    get kind(): string { return this.$kind ?? 'math'; }
    get role(): Role { return 'mention'; }

    valid(): boolean { return this.content !== ''; }
}

export const Inline = $($Inline);

// Composite tokens are pulled out WHOLE, before anything is split into words —
// a link's target must never reach the word parse, or `https` and `com` are
// counted as prose. Order matters: escape, link, code span, math, then the
// emphasis marks, then words, then everything else.
const token = /\\.|\[[^\]\n]*\]\([^)\s]*\)|`[^`\n]+`|\$[^$\n]+\$|\*\*|__|~~|\*|_|[\p{L}\p{N}']+|[^\p{L}\p{N}'*_`[\]()$\\]+|./gu;

const link = /^\[([^\]\n]*)\]\(([^)\s]*)\)$/;
const code = /^`([^`\n]+)`$/;
const math = /^\$([^$\n]+)\$$/;
const escaped = /^\\(.)$/;
const letters = /[\p{L}\p{N}]/u;

export class $MarkdownSentence extends $Sentence {
    divide(prose: string): string[] {
        return prose.match(token) ?? [];
    }

    compose(piece: string): $Word {
        const asLink = link.exec(piece);
        if (asLink) {
            const pointing: $Pointing = $(<Pointing url={asLink[2]}>{asLink[1]}</Pointing>);
            return pointing;
        }

        const asMath = math.exec(piece);
        if (asMath) return $(<Inline kind="math" content={asMath[1]}>{asMath[1]}</Inline>);

        const asCode = code.exec(piece);
        if (asCode) return $(<Inline kind="code" content={asCode[1]}>{asCode[1]}</Inline>);

        // An escape and the mark it escapes are ONE mentioned part. Splitting
        // them would put a mark in the writing that the author wrote in order
        // to prevent one.
        if (escaped.test(piece)) return $(<Punctuation>{piece}</Punctuation>);

        // Everything else forks the way a plain sentence already forks: letters
        // make a word, and a mark stands for itself. An unpaired asterisk lands
        // here, which is why it needs no special case — pairing is a fact about
        // two marks, never a property of one.
        return letters.test(piece) ? $(<Word>{piece}</Word>) : $(<Punctuation>{piece}</Punctuation>);
    }
}

export const MarkdownSentence = $($MarkdownSentence);

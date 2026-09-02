import React, { type ReactNode } from 'react';
import { $, $Chemical, look } from '@dna-platform/chemistry';
import { $Code } from '@/writing/Code';
import { $Figure } from '@/writing/Figure';

import { $Formula } from '@/writing/Formula';
import { $Snippet } from '@/writing/Snippet';
import { $Link } from '@/reference/Link';
import { Reading, read } from '../../markdown/reading';
import { Parallel } from '../../markdown/parallel';
import { documentSource } from './document';
import {
    BookSkin, GithubSkin, NightSkin, Masthead, Kicker,
    AnatomySkin, AnatomyHead, AnatomyRow, AnatomyTag, AnatomyPreview, AnatomyStats,
    ReadingsBar, Chip, ChipValue,
} from './page';

// The sheet reads the MODEL. There is no second parse here and no `Entry[]`
// union: title, paragraphs, words and formulas are readings, computed fresh,
// and the dresses differ by what their PARTS draw rather than by CSS reaching
// into generic markup.
//
// FIVE LOOKS, ONE OBJECT. `view` is the book, and each further `$` is the next
// look — github, night, the reading, the parallel text. They were five sibling
// subclasses and they are one class now; every drawing is the drawing it was.
// The five names this sheet answers to, as a type — so the page that offers
// them cannot offer one the sheet does not have.
export type $SheetViews = 'book' | 'github' | 'night' | 'reading' | 'compare';

export class $Sheet extends $Chemical {
    $source? = documentSource;

    $look: $SheetViews | number = 'book';

    // What the reader is attending to. It lives HERE because the sheet is the
    // chemical whose view is tracked — and it is handed DOWN to both the prose
    // and the figure that lists it. Neither climbs to find it.
    attending = -1;

    attend(index: number) { this.attending = this.attending === index ? -1 : index; }

    get readings() { return read(this.$source ?? ''); }

    footer(): ReactNode {
        const r = this.readings;
        return (
            <ReadingsBar>
                <Chip><ChipValue>{r.title || '—'}</ChipValue> title</Chip>
                <Chip><ChipValue>{r.paragraphs.length}</ChipValue> paragraphs</Chip>
                <Chip><ChipValue>{r.words.length}</ChipValue> words</Chip>
                <Chip><ChipValue>{r.formulas}</ChipValue> formulas</Chip>
            </ReadingsBar>
        );
    }

    @look('book') view(): ReactNode {
        return (
            <BookSkin data-skin="book">
                <Masthead><Kicker>The Library Lab · A Composition, Typeset</Kicker></Masthead>
                <Reading source={this.$source ?? ''} as="book" at={this.attending} attend={i => this.attend(i)} />
                {this.footer()}
            </BookSkin>
        );
    }

    @look('github') $view(): ReactNode {
        return (
            <GithubSkin data-skin="github">
                <Masthead><Kicker>the-library-lab / README.md</Kicker></Masthead>
                <Reading source={this.$source ?? ''} as="github" at={this.attending} attend={i => this.attend(i)} />
                {this.footer()}
            </GithubSkin>
        );
    }

    @look('night') $$view(): ReactNode {
        return (
            <NightSkin data-skin="night">
                <Masthead><Kicker>The Library Lab · After Dark</Kicker></Masthead>
                <Reading source={this.$source ?? ''} as="night" at={this.attending} attend={i => this.attend(i)} />
                {this.footer()}
            </NightSkin>
        );
    }

    // The reading look — a READING RENDERED rather than a dress: the model's
    // own parts, at their grade, with the marks counted as mentions. It reads
    // `parts()`; it does not parse anything a second time.
    @look('reading') $$$view(): ReactNode {
        const r = this.readings;
        let counted = 0;
        return (
            <AnatomySkin data-skin="reading">
                <AnatomyHead>The Model · What the Page Knows About Itself</AnatomyHead>
                {r.parts.map((section, i) => (
                    <React.Fragment key={i}>
                        {section.parts().map((part, j) => {
                            const fence = part instanceof $Code;
                            const shown = part instanceof $Figure;
                            if (!fence) counted += 1;
                            const marks = part.sentences
                                .flatMap(s => s.parts())
                                .filter(w => w.role === 'mention').length;
                            const points = part.sentences
                                .flatMap(s => s.parts())
                                .filter(w => w instanceof $Link || w instanceof $Formula || w instanceof $Snippet).length;
                            return (
                                <AnatomyRow key={`${i}-${j}`}>
                                    <AnatomyTag $kind={shown ? 'math' : fence ? '' : j === 0 ? 'h' : 'p'}>
                                        {shown ? '∫' : fence ? (part as $Code).language : j === 0 ? 'title' : `¶${counted}`}
                                    </AnatomyTag>
                                    <AnatomyPreview>
                                        {fence ? (part as $Code).source.split('\n')[0] : part.copy}
                                    </AnatomyPreview>
                                    <AnatomyStats>
                                        {fence
                                            ? 'content, not writing'
                                            : `${part.sentences.length} sentences · ${part.words.length} words · ${marks} mentioned${points ? ` · ${points} drawn` : ''}`}
                                    </AnatomyStats>
                                </AnatomyRow>
                            );
                        })}
                    </React.Fragment>
                ))}
                <ReadingsBar>
                    <Chip><ChipValue>{r.paragraphs.length}</ChipValue> paragraphs</Chip>
                    <Chip><ChipValue>{r.words.length}</ChipValue> words</Chip>
                    <Chip><ChipValue>{r.formulas}</ChipValue> formulas</Chip>
                    <Chip><ChipValue>fresh</ChipValue> every reading</Chip>
                </ReadingsBar>
            </AnatomySkin>
        );
    }

    // A parallel text — one text set two ways, the sprint's own claim on one
    // screen.
    @look('compare') $$$$view(): ReactNode {
        return (
            <AnatomySkin data-skin="compare" style={{ width: 'min(1180px, 100%)' }}>
                <Parallel />
            </AnatomySkin>
        );
    }
}

export const Sheet = $($Sheet);

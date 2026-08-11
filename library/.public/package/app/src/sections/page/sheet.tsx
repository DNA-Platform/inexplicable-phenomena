import React, { type ReactNode } from 'react';
import { $, $Chemical, Perspective } from '@dna-platform/chemistry';
import { $Fenced, $Displayed } from '../../markdown/section';
import { $Inline, $Pointing } from '../../markdown/sentence';
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
// and the three dresses differ by what their PARTS draw rather than by CSS
// reaching into generic markup.
export class $Sheet extends $Chemical {
    $source? = documentSource;

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

    view(): ReactNode {
        return (
            <BookSkin data-skin="book">
                <Masthead><Kicker>The Library Lab · A Composition, Typeset</Kicker></Masthead>
                <Reading source={this.$source ?? ''} as="book" at={this.attending} attend={i => this.attend(i)} />
                {this.footer()}
            </BookSkin>
        );
    }
}

class Book extends $Sheet {
    constructor() {
        super();
        if (new.target === Book) this.reveal(new Perspective('book', true));
    }
}

class Github extends $Sheet {
    constructor() {
        super();
        if (new.target === Github) this.reveal(new Perspective('github'));
    }

    view(): ReactNode {
        return (
            <GithubSkin data-skin="github">
                <Masthead><Kicker>the-library-lab / README.md</Kicker></Masthead>
                <Reading source={this.$source ?? ''} as="github" at={this.attending} attend={i => this.attend(i)} />
                {this.footer()}
            </GithubSkin>
        );
    }
}

class Night extends $Sheet {
    constructor() {
        super();
        if (new.target === Night) this.reveal(new Perspective('night'));
    }

    view(): ReactNode {
        return (
            <NightSkin data-skin="night">
                <Masthead><Kicker>The Library Lab · After Dark</Kicker></Masthead>
                <Reading source={this.$source ?? ''} as="night" at={this.attending} attend={i => this.attend(i)} />
                {this.footer()}
            </NightSkin>
        );
    }
}

// The reading lens — a READING RENDERED rather than a dress: the model's own
// parts, at their grade, with the marks counted as mentions. It reads
// `parts()`; it does not parse anything a second time.
class Anatomy extends $Sheet {
    constructor() {
        super();
        if (new.target === Anatomy) this.reveal(new Perspective('reading'));
    }

    view(): ReactNode {
        const r = this.readings;
        let counted = 0;
        return (
            <AnatomySkin data-skin="reading">
                <AnatomyHead>The Model · What the Page Knows About Itself</AnatomyHead>
                {r.parts.map((section, i) => (
                    <React.Fragment key={i}>
                        {section.parts().map((part, j) => {
                            const fence = part instanceof $Fenced;
                            const shown = part instanceof $Displayed;
                            if (!fence) counted += 1;
                            const marks = part.sentences
                                .flatMap(s => s.parts())
                                .filter(w => w.role === 'mention').length;
                            const points = part.sentences
                                .flatMap(s => s.parts())
                                .filter(w => w instanceof $Pointing || w instanceof $Inline).length;
                            return (
                                <AnatomyRow key={`${i}-${j}`}>
                                    <AnatomyTag $kind={shown ? 'math' : fence ? '' : j === 0 ? 'h' : 'p'}>
                                        {shown ? '∫' : fence ? (part as $Fenced).kind : j === 0 ? 'title' : `¶${counted}`}
                                    </AnatomyTag>
                                    <AnatomyPreview>
                                        {fence ? (part as $Fenced).content.split('\n')[0] : part.copy}
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
}

// A parallel text — one text set two ways, the sprint's own claim on one screen.
class Compare extends $Sheet {
    constructor() {
        super();
        if (new.target === Compare) this.reveal(new Perspective('compare'));
    }

    view(): ReactNode {
        return (
            <AnatomySkin data-skin="compare" style={{ width: 'min(1180px, 100%)' }}>
                <Parallel />
            </AnatomySkin>
        );
    }
}

new Book();
new Github();
new Night();
new Anatomy();
new Compare();

export const Sheet = $($Sheet);

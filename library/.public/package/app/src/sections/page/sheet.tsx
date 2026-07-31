import React, { type ReactNode } from 'react';
import { $, $Chemical, Perspective } from '@dna-platform/chemistry';
import { $Paragraph } from '@/writing/Paragraph';
import { Markdown, parse } from './markdown';
import { $Latex } from './latex';
import { documentSource } from './document';
import {
    BookSkin, GithubSkin, NightSkin, Masthead, Kicker,
    AnatomySkin, AnatomyHead, AnatomyRow, AnatomyTag, AnatomyPreview, AnatomyStats,
    ReadingsBar, Chip, ChipValue,
} from './page';

export class $Sheet extends $Chemical {
    $source? = documentSource;

    view(): ReactNode {
        return (
            <BookSkin data-skin="book">
                <Masthead>
                    <Kicker>The Library Lab · A Composition, Typeset</Kicker>
                </Masthead>
                <Markdown source={this.$source} readings />
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
                <Masthead>
                    <Kicker>the-library-lab / README.md</Kicker>
                </Masthead>
                <Markdown source={this.$source} readings />
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
                <Masthead>
                    <Kicker>The Library Lab · After Dark</Kicker>
                </Masthead>
                <Markdown source={this.$source} readings />
            </NightSkin>
        );
    }
}

class Anatomy extends $Sheet {
    constructor() {
        super();
        if (new.target === Anatomy) this.reveal(new Perspective('anatomy'));
    }

    view(): ReactNode {
        const entries = parse(this.$source ?? '');
        const paragraphs = entries.filter(e => e.kind === 'paragraph').map(e => (e as any).chemical as $Paragraph);
        const words = paragraphs.reduce((n, p) => n + p.words.length, 0);
        const displayMath = entries.filter(e => e.kind === 'math').length;
        const inlineMath = paragraphs.reduce((n, p) => {
            const elements = ((p.block as any)?.$elements ?? []) as unknown[];
            return n + elements.filter(el => el instanceof $Latex).length;
        }, 0);
        let paragraph = 0;
        return (
            <AnatomySkin data-skin="anatomy">
                <AnatomyHead>The Model · What the Page Knows About Itself</AnatomyHead>
                {entries.map((e, i) => {
                    if (e.kind === 'heading') {
                        return (
                            <AnatomyRow key={i}>
                                <AnatomyTag $kind="h">h{(e as any).depth}</AnatomyTag>
                                <AnatomyPreview>{(e as any).text}</AnatomyPreview>
                                <AnatomyStats>{(e as any).depth === 1 ? 'the title — parsed, not authored' : 'heading'}</AnatomyStats>
                            </AnatomyRow>
                        );
                    }
                    if (e.kind === 'rule') {
                        return (
                            <AnatomyRow key={i}>
                                <AnatomyTag>hr</AnatomyTag>
                                <AnatomyPreview>———</AnatomyPreview>
                                <AnatomyStats>rule</AnatomyStats>
                            </AnatomyRow>
                        );
                    }
                    if (e.kind === 'math') {
                        return (
                            <AnatomyRow key={i}>
                                <AnatomyTag $kind="math">∫</AnatomyTag>
                                <AnatomyPreview>{(e as any).chemical.copy}</AnatomyPreview>
                                <AnatomyStats>display math</AnatomyStats>
                            </AnatomyRow>
                        );
                    }
                    const p = (e as any).chemical as $Paragraph;
                    paragraph += 1;
                    const math = (((p.block as any)?.$elements ?? []) as unknown[]).filter(el => el instanceof $Latex).length;
                    return (
                        <AnatomyRow key={i}>
                            <AnatomyTag $kind="p">¶{paragraph}</AnatomyTag>
                            <AnatomyPreview>{p.copy}</AnatomyPreview>
                            <AnatomyStats>{p.parts().length} sentences · {p.words.length} words{math ? ` · ${math} math` : ''}</AnatomyStats>
                        </AnatomyRow>
                    );
                })}
                <ReadingsBar>
                    <Chip><ChipValue>{paragraphs.length}</ChipValue> paragraphs</Chip>
                    <Chip><ChipValue>{words}</ChipValue> words</Chip>
                    <Chip><ChipValue>{inlineMath + displayMath}</ChipValue> formulas</Chip>
                    <Chip><ChipValue>fresh</ChipValue> every reading</Chip>
                </ReadingsBar>
            </AnatomySkin>
        );
    }
}

new Book();
new Github();
new Night();
new Anatomy();

export const Sheet = $($Sheet);

import { ReactNode } from 'react';
import { $, $check, selection } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from '@/writing/Writing';
import { $Composition } from '@/writing/Composition';
import { $Format } from '@/writing/Format';
import { $Reference } from '@/writing/Reference';
import { $Section } from '@/writing/Section';
import { $Chapter } from './Chapter';
import { $Cover } from './Cover';
import { $Part } from './Part';
import { $Synopsis } from './Synopsis';

export class $TableOfContents extends $Format {
    specification = new TableOfContentsSpecification();
    style = selection.nav``;
    get contents(): $Reference[] {
        const mentions = (chapter: $Chapter): $Reference[] =>
            [...(chapter.mention === undefined ? [] : [chapter.mention]), ...chapter.text.find($Chapter).flatMap(mentions)];
        return this.book?.text.find($Chapter).flatMap(mentions) ?? [];
    }
    get chapters(): $Chapter[] {
        return this.book?.text.find($Chapter).filter(chapter => !chapter.is($Cover) && !chapter.is($Synopsis) && !chapter.is($TableOfContents)) ?? [];
    }
    get parts(): $Section[] {
        const sections = (composition: $Composition): $Section[] =>
            composition.text.find($Section).flatMap(section => [section, ...sections(section)]);
        const named = new Set(this.chapters.map(chapter => chapter.annotations.expressed($Part)?.name));
        return this.chapter === undefined ? [] : sections(this.chapter).filter(section => named.has(section.canonical?.name));
    }

    partOf(chapter: $Chapter): $Section | undefined {
        return chapter.annotations.expressed($Part)?.section;
    }

    chaptersOf(section: $Section): $Chapter[] {
        return this.chapters.filter(chapter => this.partOf(chapter) === section);
    }

    override defines(writing: $Writing): void {
        super.defines(writing);
        writing.classes.add(this, 'pa-table-of-contents');
        writing.classes.remove(this, 'pd-canonical');
    }

    override erase(writing: $Writing): void {
        super.erase(writing);
        writing.classes.revert(this);
    }
}

export class $Content extends $Reference {
    span = selection.span.attrs({ className: 'pa-content' })``;
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? ''; }
    override get identifier(): string { return binder.reference(html.copy(this.text))?.identifier ?? ''; }

    override note(): ReactNode {
        const Span = this.span;
        return <Span>{this.name}</Span>;
    }
}

export class TableOfContentsSpecification extends AnnotationSpecification {
    @specify('a table of contents is said of a chapter')
    $saidOfAChapter(writing: $Writing): void {
        $check(writing instanceof $Chapter, 'a table of contents is said of a chapter, and this is not one');
    }

    @specify('a table of contents whose book has a part lists every chapter in one')
    $listsEveryChapterInAPart(writing: $Writing): void {
        const chapters = writing.annotations.expressed($TableOfContents)?.chapters ?? [];
        if (!chapters.some(chapter => chapter.is($Part))) return;
        const chapter = chapters.find(chapter => !chapter.is($Part));
        $check(chapter === undefined,
            `a table of contents whose book has a part lists every chapter in one, and "${chapter?.title?.name ?? ''}" is in none`);
    }

    @specify("a chapter in a part is listed under its part's section")
    $listsEachChapterUnderItsPart(writing: $Writing): void {
        const contents = (writing: $Writing): $Content[] =>
            [...writing.annotations.find($Content), ...[...writing.text].flatMap(chemical => chemical instanceof $Writing ? contents(chemical) : [])];
        for (const chapter of writing.annotations.expressed($TableOfContents)?.chapters ?? []) {
            const part = chapter.annotations.expressed($Part);
            if (part?.section === undefined) continue;
            $check(contents(part.section).some(content => content.identifier === chapter.mention?.identifier),
                `a chapter in a part is listed under its part's section, and "${chapter.title?.name ?? ''}" is not under "${part.name}"`);
        }
    }
}

export const TableOfContents = $($TableOfContents);
export const Content = $($Content);

import { ReactNode } from 'react';
import { $, $check, selection } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { $Writing, AnnotationSpecification } from '@/writing/Writing';
import { $Format } from '@/writing/Format';
import { $Reference } from '@/writing/Reference';
import { $Chapter } from './Chapter';

export class $TableOfContents extends $Format {
    specification = new TableOfContentsSpecification();
    style = selection.nav`
        .pa-table-of-contents { margin-block: ${({ theme }) => theme.space}; }
        .pa-table-of-contents .pd-paragraph { margin-block: calc(${({ theme }) => theme.space} / 4); }
    `;
    get contents(): $Reference[] {
        const mentions = (chapter: $Chapter): $Reference[] =>
            [...(chapter.mention === undefined ? [] : [chapter.mention]), ...chapter.text.find($Chapter).flatMap(mentions)];
        return this.book?.text.find($Chapter).flatMap(mentions) ?? [];
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
    span = selection.span.attrs({ className: 'pa-content' })`
        color: ${({ theme }) => theme.link};
    `;
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
}

export const TableOfContents = $($TableOfContents);
export const Content = $($Content);

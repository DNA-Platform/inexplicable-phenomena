import React from 'react';
import { $, $Chemical, $check } from '@/abstraction/chemical';
import { $Cover } from './cover';
import { $TableOfContents } from './table-of-contents';
import { $Chapter } from './chapter';

export class $Book extends $Chemical {
    cover!: $Cover;
    toc!: $TableOfContents;
    chapters: $Chapter[] = [];
    get pageCount() {
        return this.chapters.reduce((sum, ch) => sum + ch.pageCount, 0);
    }
    $Book(cover: $Cover, toc: $TableOfContents, ...chapters: $Chapter[]) {
        this.cover = $check(cover, $Cover);
        this.toc = $check(toc, $TableOfContents);
        this.chapters = chapters.map(c => $check(c, $Chapter));
    }
    view() {
        const Cover = $(this.cover);
        const TableOfContents = $(this.toc);
        return (
            <article className="book">
                <Cover />
                <TableOfContents />
                <$>
                    {this.chapters.map(chapter => {
                        const Chapter = $(chapter);
                        return <Chapter key={String((chapter as any).$cid$ ?? chapter)} />;
                    })}
                </$>
                <footer className="book-footer">
                    {this.chapters.length} chapters, {this.pageCount} pages
                </footer>
            </article>
        );
    }
}

export const Book = $($Book);

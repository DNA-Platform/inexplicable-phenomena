import React from 'react';
import { $Chemical, $check, $ } from '@/chemistry/chemical';
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
        const Cover = this.cover.$Component;
        const TableOfContents = this.toc.$Component;
        return (
            <article className="book">
                <Cover />
                <TableOfContents />
                <$>
                    {this.chapters.map(chapter => <chapter.$Component />)}
                </$>
                <footer className="book-footer">
                    {this.chapters.length} chapters, {this.pageCount} pages
                </footer>
            </article>
        );
    }
}

export const Book = new $Book().Component;

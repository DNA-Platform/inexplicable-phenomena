import React from 'react';
import { $Chemical, $check } from '@/chemistry/chemical';
import { $Chapter } from './chapter';

export class $TableOfContents extends $Chemical {
    chapters: $Chapter[] = [];
    $TableOfContents(...chapters: $Chapter[]) {
        this.chapters = chapters.map(c => $check(c, $Chapter));
    }
    get entries() {
        return this.chapters.map(c => ({
            number: c.$number,
            title: c.$title,
            pages: c.pageCount
        }));
    }
    view() {
        return (
            <nav className="toc">
                <h2>Contents</h2>
                <ol>
                    {this.entries.map((entry, i) => (
                        <li key={i}>
                            <span className="toc-title">{entry.title}</span>
                            <span className="toc-pages">{entry.pages} pages</span>
                        </li>
                    ))}
                </ol>
            </nav>
        );
    }
}

export const TableOfContents = new $TableOfContents().Component;

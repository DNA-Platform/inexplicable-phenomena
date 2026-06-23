import React from 'react';
import { $, $check } from '@/abstraction/chemical';
import { $Page } from './page';
import { $Chapter } from './chapter';
import { $Cover } from './cover';
import { $TableOfContents } from './table-of-contents';
import { $Book } from './book';
import { $Exercise } from './exercise';

export class $TextbookChapter extends $Chapter {
    exercises: $Exercise[] = [];
    $TextbookChapter(...args: ($Page | $Exercise)[]) {
        const pages = args.filter(a => a instanceof $Page) as $Page[];
        const exercises = args.filter(a => a instanceof $Exercise) as $Exercise[];
        super.$Chapter(...pages);
        this.exercises = exercises;
    }
    view() {
        return (
            <section className="chapter textbook-chapter" data-number={this.$number}>
                <h3 onClick={() => this.toggle()}>
                    {this.$number}. {this.$title}
                    <span className="page-count">
                        ({this.pageCount} pages, {this.exercises.length} exercises)
                    </span>
                </h3>
                {this.expanded && <>
                    <$>{this.pages.map((page, i) => {
                        const Page = $(page);
                        return <Page key={i} />;
                    })}</$>
                    <div className="exercises">
                        <$>{this.exercises.map((ex, i) => {
                            const Exercise = $(ex);
                            return <Exercise key={i} />;
                        })}</$>
                    </div>
                </>}
            </section>
        );
    }
}

export class $Textbook extends $Book {
    $Textbook(cover: $Cover, toc: $TableOfContents, ...chapters: $TextbookChapter[]) {
        this.cover = $check(cover, $Cover);
        this.toc = $check(toc, $TableOfContents);
        this.chapters = chapters.map(c => $check(c, $TextbookChapter));
    }
}

export const TextbookChapter = $($TextbookChapter);
export const Textbook = $($Textbook);

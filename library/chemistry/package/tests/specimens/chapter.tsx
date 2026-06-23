import React from 'react';
import { $, $Chemical, $check } from '@/abstraction/chemical';
import { $Page } from './page';

export class $Chapter extends $Chemical {
    $title = 'Untitled';
    $number = 0;
    pages: $Page[] = [];
    expanded = false;
    toggle() { this.expanded = !this.expanded; }
    get pageCount() { return this.pages.length; }
    $Chapter(...pages: $Page[]) {
        this.pages = pages.map(p => $check(p, $Page));
    }
    view() {
        return (
            <section className="chapter" data-number={this.$number}>
                <h3 onClick={() => this.toggle()}>
                    {this.$number}. {this.$title}
                    <span className="page-count">({this.pageCount} pages)</span>
                </h3>
                {this.expanded && <$>{this.pages.map((page, i) => {
                    const Page = $(page);
                    return <Page key={i} />;
                })}</$>}
            </section>
        );
    }
}

export const Chapter = $($Chapter);

import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    BookFrame, BookTitle, ChapterList, ChapterItem, SummaryRow,
} from './case.styled';

class $Chapter extends $Chemical {
    $title?: string;
    view() { return <ChapterItem>{this.$title}</ChapterItem>; }
}

const Chapter = $($Chapter);

class $Book extends $Chemical {
    $title?: string;
    chapters: $Chapter[] = [];

    // Bond constructor — method named after the class. The framework discovers
    // it at runtime and feeds JSX children into its typed parameters.
    $Book(...chapters: $Chapter[]) {
        this.chapters = chapters.map(c => $check(c, $Chapter));
    }

    view() {
        return (
            <BookFrame>
                <BookTitle>{this.$title}</BookTitle>
                <ChapterList>
                    {this.chapters.map((c, i) => {
                        const C = $(c);
                        return <C key={i} />;
                    })}
                </ChapterList>
                <SummaryRow>
                    {this.chapters.length} chapter{this.chapters.length === 1 ? '' : 's'}
                </SummaryRow>
            </BookFrame>
        );
    }
}

const Book = $($Book);

export default function Case1Demo() {
    return (
        <Book title="The Selfish Gene">
            <Chapter title="Why are people?" />
            <Chapter title="The replicators" />
            <Chapter title="Immortal coils" />
            <Chapter title="The gene machine" />
        </Book>
    );
}

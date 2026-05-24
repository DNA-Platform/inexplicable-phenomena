import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    BookCard, BookTitle, ChapterSection, ChapterTitle,
    PageItem, PageTitle, LikeButton, LikeCount,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $Page extends $Chemical {
    $title?: string;
    likes = 0;
    like() { this.likes++; }
    view() {
        const liked = this.likes > 0;
        return (
            <PageItem>
                <PageTitle>{this.$title}</PageTitle>
                <LikeButton $liked={liked} onClick={this.like}>♥</LikeButton>
                <LikeCount>{liked ? this.likes : ''}</LikeCount>
                {liked && <VerdictDot $state="pass" />}
            </PageItem>
        );
    }
}

class $Chapter extends $Chemical {
    $title?: string;
    pages: $Page[] = [];
    $Chapter(...pages: $Page[]) {
        this.pages = pages.map(p => $check(p, $Page));
    }
    get totalLikes() {
        return this.pages.reduce((sum, p) => sum + p.likes, 0);
    }
    view() {
        return (
            <ChapterSection>
                <ChapterTitle>
                    {this.$title}
                    <LikeCount>{this.totalLikes > 0 ? `♥ ${this.totalLikes}` : ''}</LikeCount>
                </ChapterTitle>
                {this.pages.map((page, i) => {
                    const Page = $(page);
                    return <Page key={i} />;
                })}
            </ChapterSection>
        );
    }
}

class $Book extends $Chemical {
    $title?: string;
    chapters: $Chapter[] = [];
    $Book(...chapters: $Chapter[]) {
        this.chapters = chapters.map(c => $check(c, $Chapter));
    }
    get totalLikes() {
        return this.chapters.reduce((sum, c) => sum + c.totalLikes, 0);
    }
    view() {
        const tested = this.totalLikes > 0;
        return (
            <>
                <BookCard>
                    <BookTitle>
                        {this.$title}
                        {this.totalLikes > 0 && <LikeCount> ♥ {this.totalLikes}</LikeCount>}
                    </BookTitle>
                    {this.chapters.map((chapter, i) => {
                        const Chapter = $(chapter);
                        return <Chapter key={i} />;
                    })}
                </BookCard>
                <VerdictSection>
                    <VerdictRow $state={'pass'}>
                        <VerdictDot $state={'pass'} />
                        ✓ 3-level composition renders — {this.chapters.length} chapters, bond ctor wired
                    </VerdictRow>
                    <VerdictRow $state={'pending'}>
                        <VerdictDot $state={'pending'} />
                        ○ click ♥ on pages — each page updates independently
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Page = $($Page);
const Chapter = $($Chapter);
const Book = $($Book);

export default function Case1Demo() {
    return (
        <Book title="The $Chemistry Handbook">
            <Chapter title="Getting started">
                <Page title="Installation" />
                <Page title="Your first chemical" />
            </Chapter>
            <Chapter title="Reactivity">
                <Page title="Reactive properties" />
                <Page title="Collection mutation" />
                <Page title="Cross-chemical writes" />
            </Chapter>
        </Book>
    );
}

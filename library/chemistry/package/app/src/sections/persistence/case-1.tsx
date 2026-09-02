import React, { ReactNode } from 'react';
import { $, $Atom, $Chemical, look } from '@/index';
import {
    Desk, Hint,
    BookFace, Spread, PageHalf, ChapterTitle, TextLine, PageNumber, Ribbon, Tallies, Tally,
    Controls, Btn, QuietBtn,
    Card, CardHead, CardRow, CardValue,
    Spine, SpineFill, SpineTitle,
} from './case.styled';

// ROUTE PERSISTENCE — one reading, three representations. $Reading is a
// persistent atom: every act writes the singleton, the sync repaints every
// face wearing its pid, and a refresh resumes the desk mid-chapter.
export type $ReadingViews = 'book' | 'card' | 'spine';

class $Reading extends $Atom {
    $look: $ReadingViews | number = 'book';

    title = 'Moby-Dick';
    author = 'Herman Melville';
    chapters = ['Loomings', 'The Spouter-Inn', 'The Lee Shore', 'The Quarter-Deck', 'The Whiteness of the Whale', 'Moby Dick'];

    page = 1;
    ribbon = 0;
    notes = 0;

    turn(by: number) { this.page = Math.min(Math.max(this.page + by, 1), this.chapters.length); }
    mark() { this.ribbon = this.ribbon === this.page ? 0 : this.page; }
    note() { this.notes++; }

    @look('book') view() {
        const chapter = this.chapters[this.page - 1];
        return (
            <BookFace data-face="book" data-page={this.page}>
                <Spread>
                    <PageHalf>
                        <ChapterTitle>{this.page}. {chapter}</ChapterTitle>
                        <TextLine $w={92} /><TextLine $w={86} /><TextLine $w={95} /><TextLine $w={64} />
                        <PageNumber>p. {this.page * 2 - 1}</PageNumber>
                    </PageHalf>
                    <PageHalf $right>
                        <TextLine $w={90} /><TextLine $w={96} /><TextLine $w={82} /><TextLine $w={91} /><TextLine $w={44} />
                        <PageNumber>p. {this.page * 2}</PageNumber>
                    </PageHalf>
                    {this.ribbon > 0 && <Ribbon $here={this.ribbon === this.page} />}
                    {this.notes > 0 && (
                        <Tallies>{Array.from({ length: Math.min(this.notes, 12) }, (_, i) => <Tally key={i} />)}</Tallies>
                    )}
                </Spread>
                <Controls>
                    <Btn data-act="turn-back" onClick={() => new $Reading().turn(-1)}>‹ turn back</Btn>
                    <Btn data-act="ribbon" onClick={() => new $Reading().mark()}>place the ribbon</Btn>
                    <Btn data-act="note" onClick={() => new $Reading().note()}>note the margin</Btn>
                    <Btn data-act="turn-forward" onClick={() => new $Reading().turn(1)}>turn forward ›</Btn>
                </Controls>
            </BookFace>
        );
    }

    @look('card') $view() {
        const done = Math.round((this.page / this.chapters.length) * 100);
        return (
            <Card data-face="card" data-page={this.page} data-ribbon={this.ribbon} data-notes={this.notes}>
                <CardHead>{this.title} — {this.author}</CardHead>
                <CardRow><span>chapter</span><CardValue>{this.page}. {this.chapters[this.page - 1]}</CardValue></CardRow>
                <CardRow><span>ribbon</span><CardValue>{this.ribbon > 0 ? `at chapter ${this.ribbon}` : '—'}</CardValue></CardRow>
                <CardRow><span>margin notes</span><CardValue>{this.notes}</CardValue></CardRow>
                <CardRow><span>read</span><CardValue>{done}%</CardValue></CardRow>
            </Card>
        );
    }

    @look('spine') $$view() {
        return (
            <Spine data-face="spine" data-page={this.page}>
                <SpineFill $at={(this.page / this.chapters.length) * 100} />
                <SpineTitle>{this.title}</SpineTitle>
            </Spine>
        );
    }
}

const Reading = $($Reading);

class $ReadingRoom extends $Chemical {
    retire() { new $Reading().persist = false; }

    override view(): ReactNode {
        return (
            <div>
                <Desk>
                    <Reading look="book" />
                    <Reading look="card" />
                    <Reading look="spine" />
                </Desk>
                <Controls style={{ paddingTop: 12 }}>
                    <QuietBtn data-act="return" onClick={() => this.retire()}>return the book — the desk forgets</QuietBtn>
                </Controls>
                <Hint>one reading, three faces · refresh the page — the desk keeps your place</Hint>
            </div>
        );
    }
}

export default $($ReadingRoom);

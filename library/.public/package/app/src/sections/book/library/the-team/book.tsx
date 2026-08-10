import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { type $Chapter } from '@/book/Chapter';
import { $Cover } from '@/book/Cover';
import { $Synopsis } from '@/book/Synopsis';
import { $TableOfContents, TableOfContents } from '@/book/TableOfContents';
import { shelve, theTeam } from './card';
import { TeamCover } from './01-the-cover';
import { TeamSynopsis } from './02-the-synopsis';
import { TheFirstSheet } from './03-the-first-sheet';
import { NightWork } from './04-night-work';
import { TheShelfChapter } from './05-the-shelf';
import { TheDecision } from './06-the-decision';
import { TheAuthorInCode } from './07-the-author-in-code';
import { TheCardInCode } from './08-the-card-in-code';
import {
    Manuscript, Masthead, Standing, Imprint, ImprintMark, Spread, Body, Margin, MarginName,
    Folio, Prose, Turn, Leaf, Contents, Entry, Slip, SlipName, SlipBody,
} from '../../../the-team.styled';

const numeral = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

// The Team is a book, and this is that book viewing itself: the manuscript is
// the book's own view, its contents margin is its own table of contents read
// off the model, and the card in its margin is its card in the catalogue.
export class $TheTeam extends $Book {
    at = 2;
    $travel?: () => void = undefined;

    get readable(): $Chapter[] {
        return this.chapters.filter(c => !(c instanceof $TableOfContents));
    }

    get chapter(): $Chapter {
        return this.readable[Math.min(this.at, this.readable.length - 1)];
    }

    turn(by: number) {
        const next = this.at + by;
        if (next < 0 || next >= this.readable.length) return;
        this.at = next;
    }

    margin(): ReactNode {
        const card = theTeam;
        const listed = this.chapters.filter(c => !(c instanceof $TableOfContents) && !(c instanceof $Cover) && !(c instanceof $Synopsis));
        return (
            <Margin>
                <MarginName>Contents</MarginName>
                <Contents>
                    {listed.map((chapter, i) => {
                        const spot = this.readable.indexOf(chapter);
                        return (
                            <Entry key={i} $at={spot === this.at} onClick={() => { this.at = spot; }}>
                                <span style={{ opacity: 0.55, fontSize: '0.85em', marginRight: 8 }}>{numeral[i + 1]}</span>
                                {chapter.title?.copy ?? ''}
                            </Entry>
                        );
                    })}
                </Contents>
                <MarginName style={{ marginTop: '2.4rem' }}>Its card, in the library catalogue</MarginName>
                <Slip>
                    <SlipName>{card.name}</SlipName>
                    {card.properties().filter(property => property !== 'name' && property !== 'chapters').map(property => (
                        <SlipBody key={property}>
                            <em>{property}</em>
                            <span>{card.written(property)}</span>
                        </SlipBody>
                    ))}
                </Slip>
            </Margin>
        );
    }

    view(): ReactNode {
        const chapter = this.chapter;
        const C = $(chapter) as any;
        const cover = chapter instanceof $Cover;
        const author = this.author;
        const subject = this.subject;

        return (
            <Manuscript>
                <Masthead>
                    <Standing onClick={() => { this.at = 0; }}>{this.title?.copy ?? ''}</Standing>
                    <Imprint>
                        {author ? `${author.name} · ` : ''}
                        {subject ? <ImprintMark data-subject onClick={() => { subject.read(); this.$travel?.(); }}>{subject.card?.title ?? subject.name}</ImprintMark> : null}
                        {subject ? ' · ' : ''}
                        {cover ? 'Cover' : `Chapter ${numeral[this.at - 1] ?? this.at - 1}`}
                    </Imprint>
                </Masthead>
                <Spread>
                    <Body>
                        <Folio>{cover ? (this.title?.copy ?? '') : `${this.at - 1} of ${this.readable.length - 2}`}</Folio>
                        <Prose key={this.at}><C /></Prose>
                        <Turn>
                            <Leaf $back disabled={this.at === 0} onClick={() => this.turn(-1)}>
                                {this.at === 0 ? '' : `← ${this.readable[this.at - 1].title?.copy ?? ''}`}
                            </Leaf>
                            <Leaf disabled={this.at >= this.readable.length - 1} onClick={() => this.turn(1)}>
                                {this.at >= this.readable.length - 1 ? '' : `${this.readable[this.at + 1].title?.copy ?? ''} →`}
                            </Leaf>
                        </Turn>
                    </Body>
                    {this.margin()}
                </Spread>
            </Manuscript>
        );
    }
}

const TheTeam = $($TheTeam);

export const team: $TheTeam = $(
    <TheTeam>
        <TeamCover />
        <TableOfContents />
        <TeamSynopsis />
        <TheFirstSheet />
        <NightWork />
        <TheShelfChapter />
        <TheDecision />
        <TheAuthorInCode />
        <TheCardInCode />
    </TheTeam>
) as $TheTeam;

shelve(team);

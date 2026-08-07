import React, { type ReactNode } from 'react';
import { $, $Chemical } from '@dna-platform/chemistry';
import { $Chapter } from '@/book/Chapter';
import { $Cover } from '@/book/Cover';
import { $TableOfContents } from '@/book/TableOfContents';
import { team } from './book/library/the-team/book';
import { theTeam } from './book/library/the-team/card';
import {
    Manuscript, Masthead, Standing, Imprint, Spread, Body, Margin, MarginName,
    Folio, Prose, Turn, Leaf, Contents, Entry, Slip, SlipName, SlipBody,
} from './the-team.styled';

const numeral = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export class $TheTeamBook extends $Chemical {
    at = 2;
    closed = false;

    get readable(): $Chapter[] {
        return team.chapters.filter(c => !(c instanceof $TableOfContents));
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
        return (
            <Margin>
                <MarginName>Contents</MarginName>
                <Contents>
                    {this.readable.map((chapter, i) => (
                        <Entry key={i} $at={i === this.at} onClick={() => { this.at = i; }}>
                            {chapter.title?.copy ?? ''}
                        </Entry>
                    ))}
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
        const author = team.author;

        return (
            <Manuscript>
                <Masthead>
                    <Standing onClick={() => { this.at = 0; }}>{team.title?.copy ?? ''}</Standing>
                    <Imprint>
                        {author ? `${author.name} · ` : ''}
                        {cover ? 'Cover' : `Chapter ${numeral[this.at - 1] ?? this.at - 1}`}
                    </Imprint>
                </Masthead>
                <Spread>
                    <Body>
                        <Folio>{cover ? 'The Team' : `${this.at - 1} of ${this.readable.length - 2}`}</Folio>
                        <Prose><C /></Prose>
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

const TheTeamBook = $($TheTeamBook);

export function TheTeam() {
    return <TheTeamBook />;
}

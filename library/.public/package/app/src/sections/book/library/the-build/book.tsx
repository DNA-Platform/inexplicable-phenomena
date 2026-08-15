import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Book, Book } from '@/book/Book';
import { type $Chapter } from '@/book/Chapter';
import { $Cover } from '@/book/Cover';
import { $TableOfContents, TableOfContents } from '@/book/TableOfContents';
import { type $LibraryCard } from '../the-team/librarycard';
import { BuildCover } from './01-the-cover';
import { BuildSynopsis } from './02-the-synopsis';
import { AFolderIsABook } from './03-a-folder-is-a-book';
import { TheCanonicalHierarchy } from './04-the-canonical-hierarchy';
import { TheProcess } from './05-the-process';
import { TheDispatch } from './06-the-dispatch';
import { TheDescription } from './07-the-description';
import { TheShowing } from './08-the-showing';
import { Sheet, Header, Running, Stamp, Back, Plate, Turn, Leaf } from '../../../the-build.styled';

export class $TheBuild extends $Book {
    page = 0;

    $travel?: () => void = undefined;

    get readable(): $Chapter[] {
        return this.chapters.filter(c => !(c instanceof $TableOfContents) && !c.parenthetical);
    }

    get chapter(): $Chapter {
        return this.readable[Math.min(this.page, this.readable.length - 1)];
    }

    turn(by: number) {
        const next = this.page + by;
        if (next < 0 || next >= this.readable.length) return;
        this.page = next;
    }

    view(): ReactNode {
        const chapter = this.chapter;
        const C = $(chapter) as any;
        const subject = this.subject;
        const back = (subject?.card as $LibraryCard | undefined)?.title ?? subject?.name ?? '';

        return (
            <Sheet>
                <Header>
                    <Running onClick={() => { this.page = 0; }}>{this.title?.copy ?? ''}</Running>
                    <Stamp>
                        {chapter instanceof $Cover ? 'Cover' : `${this.page} of ${this.readable.length - 1}`}
                    </Stamp>
                    {subject ? (
                        <Back data-subject onClick={() => { subject.read(); this.$travel?.(); }}>
                            {`← ${back}`}
                        </Back>
                    ) : null}
                </Header>
                <Plate key={this.page}><C /></Plate>
                <Turn>
                    <Leaf $back disabled={this.page === 0} onClick={() => this.turn(-1)}>
                        {this.page === 0 ? '' : `← ${this.readable[this.page - 1].title?.copy ?? ''}`}
                    </Leaf>
                    <Leaf disabled={this.page >= this.readable.length - 1} onClick={() => this.turn(1)}>
                        {this.page >= this.readable.length - 1 ? '' : `${this.readable[this.page + 1].title?.copy ?? ''} →`}
                    </Leaf>
                </Turn>
            </Sheet>
        );
    }
}

const TheBuild = $($TheBuild);

export const build: $TheBuild = $(
    <TheBuild>
        <BuildCover />
        <TableOfContents />
        <BuildSynopsis />
        <AFolderIsABook />
        <TheCanonicalHierarchy />
        <TheProcess />
        <TheDispatch />
        <TheDescription />
        <TheShowing />
    </TheBuild>
) as $TheBuild;

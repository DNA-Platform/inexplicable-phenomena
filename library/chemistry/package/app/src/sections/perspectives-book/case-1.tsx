import React from 'react';
import { $, $Chemical, $check, Perspective } from '@/index';
import {
    Frame, PreviewRow, PreviewTile, PreviewScale, PreviewName, Stage,
    CoverCard, CoverTitle, CoverAuthor, SynopsisText,
    ReadingList, ReadingRow, ReadingNum, LinksWrap, LinkEdges, LinkNode,
} from './faces';

// $Book — data, and a default view (the cover), in the class. The lenses below
// override only `view`, each reading the book's own data through `this`.
class $Book extends $Chemical {
    title = 'Moby-Dick';
    author = 'Herman Melville';
    tint = 'hsl(202, 44%, 36%)';
    synopsis =
        'A sailor called Ishmael ships aboard the whaler Pequod, under a captain bent on ' +
        'hunting the white whale that took his leg. The voyage hardens into an obsession, ' +
        'and in the end the sea closes over all of it.';
    chapters = ['Loomings', 'The Spouter-Inn', 'The Lee Shore', 'The Quarter-Deck', 'The Whiteness of the Whale', 'Moby Dick'];
    characters = [
        { name: 'Ishmael', x: 24, y: 24 }, { name: 'Ahab', x: 76, y: 22 },
        { name: 'Queequeg', x: 20, y: 78 }, { name: 'the Whale', x: 78, y: 74 },
        { name: 'Pequod', x: 50, y: 50 },
    ];
    edges: [number, number][] = [[0, 4], [1, 4], [2, 4], [3, 4], [0, 1], [2, 3]];

    view() {
        return <CoverCard $tint={this.tint}><CoverTitle>{this.title}</CoverTitle><CoverAuthor>{this.author}</CoverAuthor></CoverCard>;
    }
}

class Cover extends $Book {              // overrides nothing → the cover transfers; the default
    constructor() { super(); if (new.target === Cover) this.reveal(new Perspective('cover', true)); }
}
class Synopsis extends $Book {
    constructor() { super(); if (new.target === Synopsis) this.reveal(new Perspective('synopsis')); }
    view() { return <SynopsisText>{this.synopsis}</SynopsisText>; }
}
class Reading extends $Book {
    constructor() { super(); if (new.target === Reading) this.reveal(new Perspective('reading')); }
    view() {
        return (
            <ReadingList>
                {this.chapters.map((c, i) => <ReadingRow key={c}><ReadingNum>{i + 1}</ReadingNum><span>{c}</span></ReadingRow>)}
            </ReadingList>
        );
    }
}
class Links extends $Book {
    constructor() { super(); if (new.target === Links) this.reveal(new Perspective('links')); }
    view() {
        return (
            <LinksWrap>
                <LinkEdges>
                    {this.edges.map(([a, b], i) => (
                        <line key={i}
                            x1={`${this.characters[a].x}%`} y1={`${this.characters[a].y}%`}
                            x2={`${this.characters[b].x}%`} y2={`${this.characters[b].y}%`}
                            stroke="rgba(120,140,160,0.5)" strokeWidth={1.5} />
                    ))}
                </LinkEdges>
                {this.characters.map(n => <LinkNode key={n.name} $x={n.x} $y={n.y}>{n.name}</LinkNode>)}
            </LinksWrap>
        );
    }
}

new Cover();
new Synopsis();
new Reading();
new Links();

// A viewer: one LIVE $Book (bonded), and a menu of its lenses — each bound to the
// book, rendering it its own way. Picking one shows it on the stage.
class $Shelf extends $Chemical {
    book!: $Book;
    showing = 'cover';
    $Shelf(book: $Book) { this.book = $check(book, $Book); }

    view() {
        const lenses = this.book.perspectives;
        const active = lenses.find(p => p.name === this.showing)!;
        return (
            <Frame>
                <PreviewRow>
                    {lenses.map(p => (
                        <PreviewTile key={p.name} $active={this.showing === p.name} onClick={() => { this.showing = p.name; }}>
                            <PreviewScale>{p.render()}</PreviewScale>
                            <PreviewName>{p.name}</PreviewName>
                        </PreviewTile>
                    ))}
                </PreviewRow>
                <Stage>{active.render()}</Stage>
            </Frame>
        );
    }
}

const Shelf = $($Shelf);
const Book = $($Book);

export default function BookPerspectivesDemo() {
    return <Shelf><Book /></Shelf>;
}

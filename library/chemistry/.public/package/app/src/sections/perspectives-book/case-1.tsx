import React from 'react';
import { $, $Chemical, $check, look } from '@/index';
import {
    Frame, PreviewRow, PreviewTile, PreviewScale, PreviewName, Stage,
    CoverCard, CoverTitle, CoverAuthor, SynopsisText,
    ReadingList, ReadingRow, ReadingNum, LinksWrap, LinkEdges, LinkNode,
} from './faces';

// $Book — data, and a SERIES OF LOOKS, in the one class. Each look reads the
// book's own data through `this` and draws it a different way: the cover, the
// synopsis, the reading order, the network of who meets whom.
export type $BookViews = 'cover' | 'synopsis' | 'reading' | 'links';

class $Book extends $Chemical {
    $look: $BookViews | number = 'cover';

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

    @look('cover') view() {
        return <CoverCard $tint={this.tint}><CoverTitle>{this.title}</CoverTitle><CoverAuthor>{this.author}</CoverAuthor></CoverCard>;
    }

    @look('synopsis') $view() {
        return <SynopsisText>{this.synopsis}</SynopsisText>;
    }

    @look('reading') $$view() {
        return (
            <ReadingList>
                {this.chapters.map((c, i) => <ReadingRow key={c}><ReadingNum>{i + 1}</ReadingNum><span>{c}</span></ReadingRow>)}
            </ReadingList>
        );
    }

    @look('links') $$$view() {
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

// A viewer: one LIVE $Book (bonded), and a menu of its looks — every tile is
// THAT book asked for a different look, and picking one puts it on the stage.
class $Shelf extends $Chemical {
    book!: $Book;

    showing: $BookViews = 'cover';

    looks: $BookViews[] = ['cover', 'synopsis', 'reading', 'links'];

    $Shelf(book: $Book) { this.book = $check(book, $Book); }

    view() {
        const Book = $(this.book);
        return (
            <Frame>
                <PreviewRow>
                    {this.looks.map(name => (
                        <PreviewTile key={name} $active={this.showing === name} onClick={() => { this.showing = name; }}>
                            <PreviewScale><Book look={name} /></PreviewScale>
                            <PreviewName>{name}</PreviewName>
                        </PreviewTile>
                    ))}
                </PreviewRow>
                <Stage><Book look={this.showing} /></Stage>
            </Frame>
        );
    }
}

const Shelf = $($Shelf);
const Book = $($Book);

export default function BookPerspectivesDemo() {
    return <Shelf><Book /></Shelf>;
}

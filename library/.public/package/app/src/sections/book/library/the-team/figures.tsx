import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Figure } from '@/writing/Figure';
import { $Title } from '@/writing/Title';
import { type $IndexCard } from '@/library/IndexCard';
import {
    Plate, PlateCaption, Slip, SlipName, SlipBody,
    Listing, ListingName, Loop, LoopBook, LoopArrow, LoopSelf, Rule, Heading,
} from '../../../the-team.styled';

export class $Heading extends $Title {
    view(): ReactNode {
        return <Heading>{this.copy}</Heading>;
    }
}

// A figure of this book: its caption is its writing, its content is whatever it
// draws. The caption reads as prose here — a plate in a manuscript is captioned
// and the caption is read.
class $Plated extends $Figure {
    view(): ReactNode {
        return (
            <Plate>
                {this.drawn()}
                <PlateCaption>{this.caption}</PlateCaption>
            </Plate>
        );
    }

    drawn(): ReactNode {
        return <Rule />;
    }
}

// The loop drawn from the model: the books, and which one comes home.
export class $Circuit extends $Plated {
    $books: string[] = [];
    $home = '';

    get books(): string[] { return this.$books; }
    get home(): string { return this.$home; }

    drawn(): ReactNode {
        if (!this.books.length) return null;
        return (
            <Loop>
                {this.books.map(title => (
                    <LoopBook key={title} $home={title === this.home}>
                        {title}
                        {title === this.home ? <LoopSelf>↺</LoopSelf> : <LoopArrow>→</LoopArrow>}
                    </LoopBook>
                ))}
            </Loop>
        );
    }
}

// A card printing its own fields — the card is the content, and what is drawn
// is whatever the card says it carries.
export class $Slipped extends $Plated {
    $card?: $IndexCard = undefined;

    get card(): $IndexCard | undefined { return this.$card; }

    drawn(): ReactNode {
        const card = this.card;
        if (!card) return null;
        return (
            <Slip>
                <SlipName>{card.name}</SlipName>
                {card.properties().filter(property => property !== 'name').map(property => (
                    <SlipBody key={property}>
                        <em>{property}</em>
                        <span>{card.written(property)}</span>
                    </SlipBody>
                ))}
            </Slip>
        );
    }
}

// Source code, shown as itself. A listing has a label rather than a caption —
// its caption is parenthetical, so the chapter's prose is not the code.
export class $Listed extends $Figure {
    $source = '';
    $of = '';

    constructor() {
        super();
        this.parenthetical = true;
    }

    get source(): string { return this.$source; }
    get of(): string { return this.$of; }

    view(): ReactNode {
        return (
            <Listing>
                <ListingName>{this.of || this.caption}</ListingName>
                <pre>{this.source.trim()}</pre>
            </Listing>
        );
    }

    drawn(): ReactNode {
        return this.source ? <pre>{this.source.trim()}</pre> : null;
    }

    valid(): boolean {
        return this.source !== '' || this.caption !== '';
    }
}

export const ChapterHeading = $($Heading);
export const Figure = $($Plated);
export const Circuit = $($Circuit);
export const Slipped = $($Slipped);
export const Listed = $($Listed);

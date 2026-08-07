import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Paragraph } from '@/writing/Paragraph';
import { $IndexCard } from '@/library/IndexCard';
import { Plate, PlateCaption, Slip, SlipName, SlipBody, Listing, ListingName, Loop, LoopBook, LoopArrow, LoopSelf, Rule } from '../../the-team.styled';

export class $Figure extends $Paragraph {
    $name = '';

    constructor() {
        super();
        this.inline = false;
    }

    get name(): string { return this.$name; }

    view(): ReactNode {
        return (
            <Plate>
                <PlateCaption>{this.name}</PlateCaption>
                {this.drawn()}
            </Plate>
        );
    }

    drawn(): ReactNode {
        return <Rule />;
    }
}

export class $TheLoop extends $Figure {
    $books: string[] = [];
    $home = '';

    get books(): string[] { return this.$books; }
    get home(): string { return this.$home; }

    drawn(): ReactNode {
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

export class $TheCard extends $Figure {
    $card?: $IndexCard = undefined;

    get card(): $IndexCard | undefined { return this.$card; }

    drawn(): ReactNode {
        const card = this.card;
        if (!card) return <Rule />;
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

export class $TheCode extends $Figure {
    $source = '';

    get source(): string { return this.$source; }

    drawn(): ReactNode {
        return (
            <Listing>
                <ListingName>{this.name}</ListingName>
                <pre>{this.source.trim()}</pre>
            </Listing>
        );
    }
}

export const Figure = $($Figure);
export const TheLoop = $($TheLoop);
export const TheCard = $($TheCard);
export const TheCode = $($TheCode);

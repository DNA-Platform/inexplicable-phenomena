import React from 'react';
import { $, $Chemical } from '@/index';
import {
    RatingFrame, RatingLabel, StarRow, Star, RatingValue, TwoRatings,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $StarRating extends $Chemical {
    $label = 'Rating';
    rating = 0;

    setRating(value: number) { this.rating = value; }

    view() {
        const rated = this.rating > 0;
        return (
            <>
                <RatingFrame>
                    <RatingLabel>{this.$label}</RatingLabel>
                    <StarRow>
                        {[1, 2, 3, 4, 5].map((n) => (
                            <Star
                                key={n}
                                $filled={n <= this.rating}
                                onClick={() => this.setRating(n)}
                            >
                                {n <= this.rating ? '★' : '☆'}
                            </Star>
                        ))}
                    </StarRow>
                    <RatingValue>{this.rating} / 5</RatingValue>
                </RatingFrame>
                <VerdictSection>
                    <VerdictRow $state={rated ? 'pass' : 'pending'}>
                        <VerdictDot $state={rated ? 'pass' : 'pending'} />
                        {rated
                            ? `✓ ${this.$label} set to ${this.rating} / 5`
                            : '○ click a star to rate'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const StarRating = $($StarRating);

export default function Case2Demo() {
    return (
        <TwoRatings>
            <StarRating label="Quality" />
            <StarRating label="Difficulty" />
        </TwoRatings>
    );
}

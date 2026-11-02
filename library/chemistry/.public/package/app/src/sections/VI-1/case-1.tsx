import React from 'react';
import { $, $Chemical } from '@/index';
import { DerivativesRow, ReactionCard, ReactionEmoji, ReactionCount } from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $Reaction extends $Chemical {
    $emoji = '';
    count = 0;
    justClicked = false;

    react() {
        this.count++;
        this.justClicked = true;
        setTimeout(() => { this.justClicked = false; }, 200);
    }

    view() {
        const clicked = this.count > 0;
        return (
            <ReactionCard onClick={this.react}>
                <ReactionEmoji $pop={this.justClicked}>{this.$emoji}</ReactionEmoji>
                <ReactionCount $active={clicked}>{this.count}</ReactionCount>
                <VerdictSection>
                    <VerdictRow $state={clicked ? 'pass' : 'pending'}>
                        <VerdictDot $state={clicked ? 'pass' : 'pending'} />
                        {clicked ? `✓ ${this.count}` : '○'}
                    </VerdictRow>
                </VerdictSection>
            </ReactionCard>
        );
    }
}

const Reaction = $($Reaction);

export default function Case1Demo() {
    return (
        <DerivativesRow>
            <Reaction emoji="👍" />
            <Reaction emoji="😂" />
            <Reaction emoji="❤️" />
        </DerivativesRow>
    );
}

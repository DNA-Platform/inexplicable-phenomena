import React from 'react';
import { $, $Chemical } from '@/index';
import styled from 'styled-components';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

const DefaultCard = styled.div`
    padding: 18px 22px;
    background: ${(p) => p.theme.color.paperRaised};
    border: 1px solid ${(p) => p.theme.color.rule};
    border-radius: 6px;
    max-width: 380px;
`;

const DefaultTitle = styled.h3`
    margin: 0 0 6px;
    font-family: ${(p) => p.theme.font.heading};
    font-size: ${(p) => p.theme.type.h3};
    color: ${(p) => p.theme.color.ink};
`;

const DefaultBody = styled.p`
    margin: 0 0 14px;
    font-family: ${(p) => p.theme.font.sans};
    font-size: ${(p) => p.theme.type.caption};
    color: ${(p) => p.theme.color.muted};
    line-height: 1.5;
`;

const DefaultLikeRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const DefaultHeart = styled.button<{ $liked: boolean }>`
    border: none;
    background: none;
    font-size: 22px;
    cursor: pointer;
    color: ${(p) => (p.$liked ? p.theme.color.fail : p.theme.color.muted)};
    transition: transform 120ms;
    padding: 2px 4px;

    &:hover {
        transform: scale(1.2);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const DefaultCount = styled.span`
    font-family: ${(p) => p.theme.font.mono};
    font-size: 14px;
    font-weight: 600;
    color: ${(p) => p.theme.color.ink};
    font-variant-numeric: tabular-nums;
`;

class $Post extends $Chemical {
    likes = 0;

    get Card() { return DefaultCard; }
    get Title() { return DefaultTitle; }
    get Body() { return DefaultBody; }

    get Heart() { return DefaultHeart; }
    get LikeRow() { return DefaultLikeRow; }
    get Count() { return DefaultCount; }

    like() { this.likes++; }

    LikeButton() {
        const liked = this.likes > 0;
        const Row = this.LikeRow;
        const Heart = this.Heart;
        const Count = this.Count;
        return (
            <Row>
                <Heart $liked={liked} onClick={this.like}>♥</Heart>
                <Count>{this.likes}</Count>
            </Row>
        );
    }

    view() {
        const Card = this.Card;
        const Title = this.Title;
        const Body = this.Body;
        const LikeButton = this.LikeButton;
        const liked = this.likes > 0;
        return (
            <>
                <Card>
                    <Title>Reactive by Nature</Title>
                    <Body>
                        The LikeButton is a method on this chemical. It reads
                        this.likes directly — no prop threading, no separate class.
                    </Body>
                    <LikeButton />
                </Card>
                <VerdictSection>
                    <VerdictRow $state={liked ? 'pass' : 'pending'}>
                        <VerdictDot $state={liked ? 'pass' : 'pending'} />
                        {liked
                            ? `✓ liked — now ${this.likes}`
                            : '○ click ♥ to like the post'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Post = $($Post);

export default function Case1Demo() {
    return <Post />;
}

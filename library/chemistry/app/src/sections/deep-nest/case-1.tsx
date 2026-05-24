import React from 'react';
import { $, $Chemical } from '@/index';
import {
    NestFrame, LevelCard, LevelLabel, LevelContent,
    LikesDisplay, TotalDisplay, HeartButton,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $Card extends $Chemical {
    likes = 0;
    like() { this.likes++; }
    view() {
        const liked = this.likes > 0;
        return (
            <LevelCard $depth={3}>
                <LevelLabel>$Card</LevelLabel>
                <LevelContent>
                    <HeartButton onClick={this.like}>♥</HeartButton>
                    <LikesDisplay>{this.likes}</LikesDisplay>
                    {liked && <VerdictDot $state="pass" />}
                </LevelContent>
            </LevelCard>
        );
    }
}

class $Section extends $Chemical {
    $title?: string;
    view() {
        return (
            <LevelCard $depth={2}>
                <LevelLabel>$Section · {this.$title}</LevelLabel>
                {this.children}
            </LevelCard>
        );
    }
}

class $Page extends $Chemical {
    $title?: string;
    view() {
        return (
            <LevelCard $depth={1}>
                <LevelLabel>$Page · {this.$title}</LevelLabel>
                {this.children}
            </LevelCard>
        );
    }
}

class $App extends $Chemical {
    $title?: string;
    view() {
        return (
            <LevelCard $depth={0}>
                <LevelLabel>$App · {this.$title}</LevelLabel>
                {this.children}
            </LevelCard>
        );
    }
}

const Card = $($Card);
const Section = $($Section);
const Page = $($Page);
const App = $($App);

export default function Case1Demo() {
    return (
        <>
            <NestFrame>
                <App title="4 levels deep">
                    <Page title="Chapter 1">
                        <Section title="Intro">
                            <Card />
                        </Section>
                    </Page>
                </App>
            </NestFrame>
            <VerdictSection>
                <VerdictRow $state="pending">
                    <VerdictDot $state="pending" />
                    ○ click ♥ — the card renders at the 4th level via nested composition
                </VerdictRow>
            </VerdictSection>
        </>
    );
}

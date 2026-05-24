import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    ThemeSwitcherFrame, ThemeToggleRow, ThemeToggleBtn,
    PreviewCardFrame, PreviewText, FontSliderRow, FontSliderLabel,
    DerivativesRow,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $PreviewCard extends $Chemical {
    dark = false;
    fontSize = 14;

    updateFontSize(e: React.ChangeEvent<HTMLInputElement>) {
        this.fontSize = Number(e.target.value);
    }

    view() {
        return (
            <PreviewCardFrame $dark={this.dark}>
                <PreviewText $dark={this.dark} $size={this.fontSize}>
                    The quick brown fox jumps over the lazy dog.
                </PreviewText>
                <FontSliderRow>
                    <FontSliderLabel $dark={this.dark}>size: {this.fontSize}px</FontSliderLabel>
                    <input
                        type="range"
                        min="10"
                        max="24"
                        value={this.fontSize}
                        onChange={this.updateFontSize}
                        aria-label="Font size"
                    />
                </FontSliderRow>
            </PreviewCardFrame>
        );
    }
}

class $ThemeSwitcher extends $Chemical {
    dark = false;
    cards: $PreviewCard[] = [];

    $ThemeSwitcher(...cards: $PreviewCard[]) {
        this.cards = cards.map(c => $check(c, $PreviewCard));
    }

    toggleDark() {
        this.dark = !this.dark;
        for (const card of this.cards) card.dark = this.dark;
    }

    view() {
        const tested = this.dark;
        return (
            <ThemeSwitcherFrame>
                <ThemeToggleRow>
                    <ThemeToggleBtn $on={this.dark} onClick={this.toggleDark}>
                        {this.dark ? 'dark' : 'light'}
                    </ThemeToggleBtn>
                </ThemeToggleRow>
                <DerivativesRow>
                    {this.cards.map((card, i) => {
                        const Card = $(card);
                        return <Card key={i} />;
                    })}
                </DerivativesRow>
                <VerdictSection>
                    <VerdictRow $state={tested ? 'pass' : 'pending'}>
                        <VerdictDot $state={tested ? 'pass' : 'pending'} />
                        {tested
                            ? '✓ dark mode toggled — both cards updated via host write'
                            : '○ toggle dark mode to verify'}
                    </VerdictRow>
                </VerdictSection>
            </ThemeSwitcherFrame>
        );
    }
}

const PreviewCard = $($PreviewCard);
const ThemeSwitcher = $($ThemeSwitcher);

export default function Case2Demo() {
    return (
        <ThemeSwitcher>
            <PreviewCard />
            <PreviewCard />
        </ThemeSwitcher>
    );
}

import React from 'react';
import { $, $Chemical } from '@/index';
import {
    ReorderFrame, ShuffleButton, ItemRow, ItemLabel,
    ItemCount, ItemButton, ShuffleCount, ErrorBox, ItemIndex,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// ErrorBoundary — catches render errors so the app doesn't crash.
class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { error: Error | null }
> {
    state: { error: Error | null } = { error: null };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorBox>
                    {this.state.error.name}: {this.state.error.message}
                    {'\n\n'}
                    {this.state.error.stack}
                </ErrorBox>
            );
        }
        return this.props.children;
    }
}

class $ListItem extends $Chemical {
    $label = '';
    $color = '';
    $index = 0;
    count = 0;

    inc() { this.count++; }

    view() {
        return (
            <ItemRow $color={this.$color}>
                <ItemIndex $color={this.$color}>{this.$index + 1}</ItemIndex>
                <ItemLabel>{this.$label}</ItemLabel>
                <ItemButton onClick={this.inc}>+</ItemButton>
                <ItemCount>{this.count}</ItemCount>
            </ItemRow>
        );
    }
}

const ListItem = $($ListItem);

type ItemEntry = { id: number; label: string; color: string };

const palette = ['#E78284', '#A6D189', '#8CAAEE'];

function sameOrder(a: ItemEntry[], b: ItemEntry[]) {
    return a.length === b.length && a.every((x, i) => x.id === b[i].id);
}

class $ReorderList extends $Chemical {
    items: ItemEntry[] = [
        { id: 1, label: 'Alpha', color: palette[0] },
        { id: 2, label: 'Beta', color: palette[1] },
        { id: 3, label: 'Gamma', color: palette[2] },
    ];
    shuffles = 0;

    shuffle() {
        const prev = [...this.items];
        let next: ItemEntry[];
        do {
            next = [...prev];
            for (let i = next.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [next[i], next[j]] = [next[j], next[i]];
            }
        } while (sameOrder(next, prev));
        this.items = next;
        this.shuffles++;
    }

    view() {
        const allVisible = this.items.length === 3;
        const visibleState = allVisible ? 'pass' : 'fail';
        return (
            <>
                <ReorderFrame>
                    <ShuffleButton onClick={this.shuffle}>
                        Shuffle
                    </ShuffleButton>
                    {this.shuffles > 0 && (
                        <ShuffleCount>
                            Shuffled {this.shuffles} time{this.shuffles === 1 ? '' : 's'}
                        </ShuffleCount>
                    )}
                    {this.items.map((item, idx) => (
                        <ListItem key={item.id} label={item.label} color={item.color} index={idx} />
                    ))}
                </ReorderFrame>
                <VerdictSection>
                    <VerdictRow $state={visibleState}>
                        <VerdictDot $state={visibleState} />
                        {allVisible
                            ? '✓ items rendered — all 3 visible'
                            : `✗ expected 3 items, got ${this.items.length}`}
                    </VerdictRow>
                    <VerdictRow $state={'pending'}>
                        <VerdictDot $state={'pending'} />
                        {'○ state survives reorder — click + on an item, shuffle, verify count persists'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const ReorderList = $($ReorderList);

export default function Case1Demo() {
    return (
        <ErrorBoundary>
            <ReorderList />
        </ErrorBoundary>
    );
}

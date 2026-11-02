import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    ListPair, ListFrame, ListTitle,
    ItemRow, CheckBox, ItemText,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// ─── Base class: $ListItem ───────────────────────────────────────────────────
// Simple text row. This is the original — it works as-is.

class $ListItem extends $Chemical {
    $text?: string;

    view() {
        return (
            <ItemRow>
                <ItemText>{this.$text}</ItemText>
            </ItemRow>
        );
    }
}

// ─── Evolved subclass: $CheckableItem ────────────────────────────────────────
// Adds a $checked toggle WITHOUT changing $List. The parent still receives
// $ListItem[] — CheckableItem passes the type check because it extends ListItem.
// This is the pitch: evolve children by subclassing, not by adding props.

class $CheckableItem extends $ListItem {
    checked = false;

    toggle() { this.checked = !this.checked; }

    view() {
        return (
            <ItemRow>
                <CheckBox $checked={this.checked} onClick={this.toggle}>
                    {this.checked ? '✓' : ''}
                </CheckBox>
                <ItemText $struck={this.checked}>{this.$text}</ItemText>
            </ItemRow>
        );
    }
}

// ─── $List ───────────────────────────────────────────────────────────────────
// Bond constructor accepts $ListItem[]. The SAME component renders both plain
// ListItems and CheckableItems — the parent code never changed. The child
// evolved via subclassing.

class $List extends $Chemical {
    $title?: string;
    items: $ListItem[] = [];

    $List(...items: $ListItem[]) {
        this.items = items.map(item => $check(item, $ListItem));
    }

    view() {
        return (
            <ListFrame>
                {this.$title && <ListTitle>{this.$title}</ListTitle>}
                {this.items.map((item, i) => {
                    const I = $(item);
                    return <I key={i} />;
                })}
            </ListFrame>
        );
    }
}

// ─── $EvolveDemoRoot ─────────────────────────────────────────────────────────
// Renders two Lists side by side. The $List code is identical in both. The
// difference is which subclass of $ListItem the children are.

class $EvolveDemoRoot extends $Chemical {
    anyToggled = false;

    markToggled() { this.anyToggled = true; }

    view() {
        const state = this.anyToggled ? 'pass' : 'pending';
        return (
            <>
                <ListPair>
                    <PlainList />
                    <CheckableList onToggle={this.markToggled} />
                </ListPair>
                <VerdictSection>
                    <VerdictRow $state={state}>
                        <VerdictDot $state={state} />
                        {this.anyToggled
                            ? '✓ CheckableItem toggled — same $List, evolved child'
                            : '○ toggle a checkable item to prove evolution without parent changes'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

// ─── Wrappers ────────────────────────────────────────────────────────────────

const ListItem = $($ListItem);
const CheckableItem = $($CheckableItem);
const List = $($List);

function PlainList() {
    return (
        <List title="Plain $ListItem">
            <ListItem text="Buy groceries" />
            <ListItem text="Walk the dog" />
            <ListItem text="Read a book" />
        </List>
    );
}

// The checkable list uses a small React wrapper that notifies the parent
// chemical when any item is toggled (via onClick bubbling).
function CheckableList({ onToggle }: { onToggle: () => void }) {
    return (
        <div onClick={onToggle}>
            <List title="Evolved $CheckableItem">
                <CheckableItem text="Buy groceries" />
                <CheckableItem text="Walk the dog" />
                <CheckableItem text="Read a book" />
            </List>
        </div>
    );
}

const EvolveDemoRoot = $($EvolveDemoRoot);

export default function Case1Demo() {
    return <EvolveDemoRoot />;
}

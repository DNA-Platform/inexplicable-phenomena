import React from 'react';
import { $, $Chemical } from '@/index';
import {
    CollectionFrame, CollectionRow, CollectionLabel, CollectionDisplay,
    Pill, Action, SizeBadge,
} from './case.styled';

class $SetDemo extends $Chemical {
    $tags: Set<string> = new Set();
    addUnique() {
        // Set.add() — in-place mutation. Same set, new element.
        const next = `tag-${Math.floor(Math.random() * 1000)}`;
        this.$tags.add(next);
    }
    addDuplicate() {
        // Adding an already-present member is a no-op for Set semantics —
        // size stays the same, but the reactive system still fires a write.
        this.$tags.add('shared');
    }
    clear() {
        this.$tags.clear();
    }
    view() {
        const items = Array.from(this.$tags);
        return (
            <CollectionFrame>
                <CollectionRow>
                    <CollectionLabel>$tags.add</CollectionLabel>
                    <CollectionDisplay>
                        {items.length === 0
                            ? <span style={{ opacity: 0.5 }}>empty</span>
                            : items.map(t => <Pill key={t}>{t}</Pill>)}
                    </CollectionDisplay>
                    <SizeBadge>size={this.$tags.size}</SizeBadge>
                </CollectionRow>
                <CollectionRow>
                    <CollectionLabel></CollectionLabel>
                    <Action onClick={this.addUnique}>.add(unique)</Action>
                    <Action onClick={this.addDuplicate}>.add('shared')</Action>
                    <Action onClick={this.clear}>.clear()</Action>
                </CollectionRow>
            </CollectionFrame>
        );
    }
}

const SetDemo = $($SetDemo);

export default function Case3Demo() {
    return <SetDemo />;
}

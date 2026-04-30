import React from 'react';
import { $, $Chemical } from '@/index';
import {
    CollectionFrame, CollectionRow, CollectionLabel, CollectionDisplay,
    Pill, Action, SizeBadge,
} from './case.styled';

class $MapDemo extends $Chemical {
    $tags: Map<string, number> = new Map();
    addTag() {
        // Map.set() — in-place mutation. The Map reference does not change.
        const key = `k${this.$tags.size + 1}`;
        this.$tags.set(key, this.$tags.size + 1);
    }
    deleteFirst() {
        const first = this.$tags.keys().next().value;
        if (first) this.$tags.delete(first);
    }
    clear() {
        this.$tags.clear();
    }
    view() {
        const entries = Array.from(this.$tags.entries());
        return (
            <CollectionFrame>
                <CollectionRow>
                    <CollectionLabel>$tags.set</CollectionLabel>
                    <CollectionDisplay>
                        {entries.length === 0
                            ? <span style={{ opacity: 0.5 }}>empty</span>
                            : entries.map(([k, v]) => <Pill key={k}>{k}={v}</Pill>)}
                    </CollectionDisplay>
                    <SizeBadge>size={this.$tags.size}</SizeBadge>
                </CollectionRow>
                <CollectionRow>
                    <CollectionLabel></CollectionLabel>
                    <Action onClick={this.addTag}>.set()</Action>
                    <Action onClick={this.deleteFirst}>.delete()</Action>
                    <Action onClick={this.clear}>.clear()</Action>
                </CollectionRow>
            </CollectionFrame>
        );
    }
}

const MapDemo = $($MapDemo);

export default function Case2Demo() {
    return <MapDemo />;
}

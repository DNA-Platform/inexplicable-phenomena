import React from 'react';
import { $, $Chemical } from '@/index';
import {
    CollectionFrame, CollectionRow, CollectionLabel, CollectionDisplay,
    Pill, Action, SizeBadge,
} from './case.styled';

class $ArrayDemo extends $Chemical {
    $items: string[] = [];
    push() {
        // In-place mutation — the $items reference does not change.
        this.$items.push(`item-${this.$items.length + 1}`);
    }
    pop() {
        if (this.$items.length > 0) this.$items.pop();
    }
    clear() {
        this.$items.length = 0;
    }
    view() {
        return (
            <CollectionFrame>
                <CollectionRow>
                    <CollectionLabel>$items.push</CollectionLabel>
                    <CollectionDisplay>
                        {this.$items.length === 0
                            ? <span style={{ opacity: 0.5 }}>empty</span>
                            : this.$items.map((it, i) => <Pill key={i}>{it}</Pill>)}
                    </CollectionDisplay>
                    <SizeBadge>length={this.$items.length}</SizeBadge>
                </CollectionRow>
                <CollectionRow>
                    <CollectionLabel></CollectionLabel>
                    <Action onClick={this.push}>.push()</Action>
                    <Action onClick={this.pop}>.pop()</Action>
                    <Action onClick={this.clear}>clear</Action>
                </CollectionRow>
            </CollectionFrame>
        );
    }
}

const ArrayDemo = $($ArrayDemo);

export default function Case1Demo() {
    return <ArrayDemo />;
}

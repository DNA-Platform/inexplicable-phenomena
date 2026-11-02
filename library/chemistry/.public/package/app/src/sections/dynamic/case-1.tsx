import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    ListFrame, AddButton, ItemRow, ItemLabel,
    ItemCount, ItemButton, EmptyLabel,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $DynItem extends $Chemical {
    $label = 'Item';
    count = 0;

    inc() { this.count++; }

    view() {
        return (
            <ItemRow>
                <ItemLabel>{this.$label}</ItemLabel>
                <ItemButton onClick={this.inc}>+</ItemButton>
                <ItemCount>{this.count}</ItemCount>
            </ItemRow>
        );
    }
}

class $DynamicList extends $Chemical {
    items: $DynItem[] = [];

    $DynamicList(...items: $DynItem[]) {
        this.items = items.map(item => $check(item, $DynItem));
    }

    addItem() {
        const item = new $DynItem();
        item.$label = `Item ${this.items.length + 1}`;
        this.items = [...this.items, item];
    }

    view() {
        const hasMore = this.items.length > 2;
        const anyClicked = this.items.some(i => i.count > 0);
        return (
            <>
                <ListFrame>
                    <AddButton onClick={this.addItem}>Add item</AddButton>
                    {this.items.length === 0 && <EmptyLabel>No items yet</EmptyLabel>}
                    {this.items.map((item, i) => {
                        const Item = $(item);
                        return <Item key={i} />;
                    })}
                </ListFrame>
                <VerdictSection>
                    <VerdictRow $state={hasMore ? 'pass' : 'pending'}>
                        <VerdictDot $state={hasMore ? 'pass' : 'pending'} />
                        {hasMore
                            ? `✓ dynamically created ${this.items.length - 2} item${this.items.length - 2 === 1 ? '' : 's'} at runtime`
                            : '○ click Add item to create a runtime chemical'}
                    </VerdictRow>
                    <VerdictRow $state={anyClicked ? 'pass' : 'pending'}>
                        <VerdictDot $state={anyClicked ? 'pass' : 'pending'} />
                        {anyClicked
                            ? `✓ items have independent state — counts: ${this.items.map(i => i.count).join(', ')}`
                            : '○ click + on different items to verify independent state'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const DynItem = $($DynItem);
const DynamicList = $($DynamicList);

export default function Case1Demo() {
    return (
        <DynamicList>
            <DynItem label="Item 1" />
            <DynItem label="Item 2" />
        </DynamicList>
    );
}

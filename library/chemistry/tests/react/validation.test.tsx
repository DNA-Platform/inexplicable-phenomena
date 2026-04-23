import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { $Chemical, $check } from '@/chemistry/chemical';

class $Label extends $Chemical {
    $text? = 'label';
    view() { return <span>{this.$text}</span>; }
}

class $Item extends $Chemical {
    $name? = 'item';
    view() { return <div>{this.$name}</div>; }
}

class $Container extends $Chemical {
    label!: $Label;
    items: $Item[] = [];
    $Container(label: $Label, ...items: $Item[]) {
        this.label = $check(label, $Label);
        this.items = items.map(i => $check(i, $Item));
    }
    view() { return <div>{this.label?.$text}: {this.items.length} items</div>; }
}

const Label = new $Label().Component;
const Item = new $Item().Component;
const Container = new $Container().Component;

describe('Binding constructor validation', () => {
    it('accepts correct typed children', () => {
        const { container } = render(
            <Container>
                <Label text="My List" />
                <Item name="First" />
                <Item name="Second" />
            </Container>
        );
        expect(container.textContent).toContain('My List');
        expect(container.textContent).toContain('2 items');
    });

    it('$check returns the value for correct types', () => {
        const label = new $Label();
        const result = $check(label, $Label);
        expect(result).toBe(label);
    });

    it('$check accepts correct type', () => {
        const label = new $Label();
        expect(() => $check(label, $Label)).not.toThrow();
    });

    it('$check accepts subclass', () => {
        class $FancyLabel extends $Label {
            $color? = 'red';
        }
        const fancy = new $FancyLabel();
        expect(() => $check(fancy, $Label)).not.toThrow();
    });
});

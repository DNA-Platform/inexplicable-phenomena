import React from 'react';
import { $, $Chemical } from '@/index';
import {
    PropertyFrame, PropertyLabel, TextValue, TextInput,
} from './case.styled';

class $TextDemo extends $Chemical {
    $text = 'hello';
    setText(value: string) { this.$text = value; }
    view() {
        return (
            <PropertyFrame>
                <PropertyLabel>$text</PropertyLabel>
                <TextValue>{this.$text}</TextValue>
                <TextInput
                    value={this.$text}
                    onChange={(e) => this.setText(e.currentTarget.value)}
                    placeholder="type to update $text"
                />
            </PropertyFrame>
        );
    }
}

const TextDemo = $($TextDemo);

export default function Case2Demo() {
    return <TextDemo />;
}

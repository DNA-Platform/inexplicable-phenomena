import React from 'react';
import { $, $Chemical } from '@/index';
import {
    PropertyFrame, PropertyLabel, PropertyValue, ActionButton,
} from './case.styled';

class $NumberDemo extends $Chemical {
    $count = 0;
    inc() { this.$count++; }
    dec() { this.$count--; }
    reset() { this.$count = 0; }
    view() {
        return (
            <PropertyFrame>
                <PropertyLabel>$count</PropertyLabel>
                <PropertyValue>{this.$count}</PropertyValue>
                <ActionButton onClick={this.inc}>+</ActionButton>
                <ActionButton onClick={this.dec}>−</ActionButton>
                <ActionButton onClick={this.reset}>reset</ActionButton>
            </PropertyFrame>
        );
    }
}

const NumberDemo = $($NumberDemo);

export default function Case1Demo() {
    return <NumberDemo />;
}

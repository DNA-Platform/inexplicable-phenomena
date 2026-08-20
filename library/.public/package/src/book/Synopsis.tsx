import React, { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Theme } from '../writing/Theme';
import { $Chapter } from './Chapter';
import { $Book } from './Book';
import { $IndexCard } from '../library/IndexCard';

export class $Synopsis extends $Chapter {
    $parenthetical? = false;

    $for?: $IndexCard<$Book> = undefined;

    get card(): $IndexCard<$Book> | undefined { return this.$for; }

    override emit(contents: ReactNode, theme: $Theme): ReactNode {
        return <section style={{ borderLeft: `2px solid ${theme.rule}`, paddingLeft: '1rem' }}>{contents}</section>;
    }

    read(): $Book {
        return this.$for ? this.$for.read() : super.read();
    }
}

export const Synopsis = $($Synopsis);

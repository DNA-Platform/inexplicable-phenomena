import { ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Annotation } from './Annotation';

export class $Type<T extends $Writing = $Writing<any>> extends $Annotation<T> {
    instance?: $Writing = undefined;
    get source(): $Writing<any> { return this.instance ?? this; }
    override get formula(): boolean { return true; }
    override get copy(): string { return this.instance ? this.instance.copy : super.copy; }

    bind(writing: $Writing): this {
        this.instance = writing;
        return this;
    }

    override view(): ReactNode {
        if (!this.instance) return null;
        const Instance = $(this.instance);
        return <Instance />;
    }
}

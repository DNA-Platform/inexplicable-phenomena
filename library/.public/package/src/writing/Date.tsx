import { ElementType, ReactNode } from 'react';
import { $, $check, $Chemical } from '@dna-platform/chemistry';
import { binder } from '@/utilities/Binder';
import { html } from '@/utilities/Html';
import { specify } from '@/utilities/Specification';
import { CompositionSpecification } from './Composition';
import { $Word } from './Word';

export class $Date extends $Word {
    specification = new DateSpecification();
    protected _time!: ElementType;
    get name(): string { return binder.reference(html.copy(this.text))?.name ?? html.copy(this.text).trim(); }
    get date(): string | undefined { return binder.reference(html.copy(this.text))?.identifier; }

    $Date(...chemicals: $Chemical[]) {
        this.$Writing(...chemicals);
        this._time = (props: { children?: ReactNode }) => <time dateTime={this.date} {...props} />;
        this.containers.replace(this, 'span', this._time);
    }

    override write(): ReactNode { return this.name; }

    protected override $Define(): void {
        super.$Define();
        this.classes.add(this, 'pd-date');
    }
}

export class DateSpecification extends CompositionSpecification {
    @specify('a date names a day the machine can read')
    $namesADay(date: $Date): void {
        $check(date.date === undefined || !Number.isNaN(globalThis.Date.parse(date.date)),
            'a date names a day the machine can read, and this one names none');
    }
}

export const Date = $($Date);

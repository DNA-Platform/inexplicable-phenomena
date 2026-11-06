import { ElementType } from 'react';
import { $, $Chemical, inert } from '@dna-platform/chemistry';
import { $Writing } from '@/writing/Writing';
import { $Annotation } from './Annotation';

export class $Parenthetical extends $Annotation {
    @inert() protected _element?: ElementType;
    protected _unwritten!: ElementType;

    $Parenthetical(...chemicals: $Chemical[]) {
        this.$Annotation(...chemicals);
        this._unwritten = ({ id, className }: { id?: string; className?: string }) => {
            const Element = this._element ?? 'span';
            return (
                <Element
                    id={id}
                    className={className}
                    hidden
                />
            );
        };
    }

    override defines(writing: $Writing): void {
        writing.classes.add(this, 'pa-parenthetical');
        const element = writing.containers.at(0);
        if (element === undefined || element === this._unwritten) return;
        this._element = element;
        writing.containers.replace(this, element, this._unwritten);
    }

    override erase(writing: $Writing): void {
        writing.classes.revert(this);
        writing.containers.revert(this);
    }
}

export const Parenthetical = $($Parenthetical);

import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Link as RouterLink } from 'react-router-dom';
import { type $Reference } from '../reference/Reference';
import { $Path } from '../reference/Path';
import { $Sentence } from '../writing/Sentence';

export class $Link extends $Sentence implements $Reference<string> {
    $url?: string;

    get url(): string {
        return this.$url ?? this.copy;
    }

    read(): string {
        return this.url;
    }

    equals(ref: $Reference<string>): boolean {
        return this.read() === ref.read();
    }

    then<U>(next: $Reference<U>): $Reference<U> {
        return new $Path<string, U>(this, next);
    }

    protected anchor(surface: ReactNode): ReactNode {
        return <RouterLink to={this.url}>{surface}</RouterLink>;
    }

    frame(): ReactNode {
        return this.anchor(super.frame());
    }

    valid(): boolean {
        return super.valid() && this.url !== '';
    }
}

export const Link = $($Link);

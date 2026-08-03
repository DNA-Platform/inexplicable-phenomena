import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Link as RouterLink } from 'react-router-dom';
import { $Sentence } from '../writing/Sentence';

export class $Link extends $Sentence {
    $url?: string;

    get url(): string {
        return this.$url ?? this.copy;
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

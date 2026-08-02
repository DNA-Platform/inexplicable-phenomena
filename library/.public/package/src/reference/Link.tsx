import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Link as RouterLink } from 'react-router-dom';
import { $Sentence } from '../writing/Sentence';

export class $Link extends $Sentence {
    $for?: string;

    get for(): string {
        return this.$for ?? this.copy;
    }

    protected anchor(surface: ReactNode): ReactNode {
        return <RouterLink to={this.$for ?? ''}>{surface}</RouterLink>;
    }

    frame(): ReactNode {
        return this.anchor(super.frame());
    }
}

export const Link = $($Link);

import { ReactNode } from 'react';
import { $, $valid } from '@dna-platform/chemistry';
import { Link as RouterLink } from 'react-router-dom';
import { $Word } from '../writing/Word';

export class $Link extends $Word {
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
        return $valid(this.copy !== '', 'a link is a word that points, and this one has nothing to show');
    }
}

export const Link = $($Link);

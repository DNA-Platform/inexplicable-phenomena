import { type ReactNode } from 'react';
import { $ } from '@dna-platform/chemistry';
import { Link as RouterLink } from 'react-router-dom';
import { $Reference } from './Reference';
import { $Referent } from './Referent';

export class $Link<T extends $Referent = $Referent> extends $Reference<T> {
    protected anchor(surface: ReactNode): ReactNode {
        return <RouterLink to={this.$for ?? ''}>{surface}</RouterLink>;
    }
}

export const Link = $($Link);

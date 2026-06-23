import React, { ReactNode } from 'react';
import { $Particle } from '@/abstraction/particle';
import type { I } from '@/implementation/types';

// $Error — particle that wraps a real Error. Constructor forwards the error
// to $Particle for particularization, so the resulting carrier exposes both
// $Error's particle surface AND the original error's data via prototype chain.
export class $Error extends $Particle {
    constructor(error: Error) {
        super(error);
    }

    view(): ReactNode {
        const e = this as unknown as Error;
        return <pre className="error">{e.name}: {e.message}</pre>;
    }

    // Static factory: takes any Error and returns the particularized carrier
    // typed as the intersection of both interfaces. Component devs reading
    // `.message` see Error's API; reading `.view()` or `.next('mount')` see
    // $Error/$Particle's API.
    static view(error: Error): I<$Error> & I<Error> {
        return new $Error(error) as unknown as I<$Error> & I<Error>;
    }
}

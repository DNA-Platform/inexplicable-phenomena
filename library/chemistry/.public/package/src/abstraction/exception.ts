import type { ReactNode } from 'react';
import { $Particle } from './particle';
import { renderPanel, $exceptions } from '../implementation/dev';

export class $Exception extends $Particle {
    error: Error;

    constructor(error: Error) {
        super();
        this.error = error;
    }

    view(): ReactNode {
        return renderPanel('Bond Constructor Failed', this.error.message);
    }
}

$exceptions.render = (error: Error) => new $Exception(error);

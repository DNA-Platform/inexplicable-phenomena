// async-effect.tsx — await this.next() for lifecycle phases
//
// Demonstrates: next() with string phases, linear async code,
// state mutation after mount, view reflecting async state.
//
// $Timer starts counting after mount. The async method reads
// like sequential code: wait for mount, then start the interval.
// No useEffect. No dependency arrays. Just await.

import React from 'react';
import { $Chemical } from '@dna-platform/chemistry';

export class $Timer extends $Chemical {
    seconds = 0;
    $running = true;
    async effect() {
        await this.next('mount');
        while (this.$running) {
            await new Promise(r => setTimeout(r, 1000));
            this.seconds++;
        }
    }
    view() {
        return <span className="timer">{this.seconds}s</span>;
    }
}

export const Timer = new $Timer().Component;

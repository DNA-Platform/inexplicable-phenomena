import { bench, describe } from 'vitest';
import { $Chemical } from '@/abstraction/chemical';
import { $molecule$ } from '@/implementation/symbols';

// The atomic alert sits in the ONE setter every reactive write commits
// through, so its cost on a NON-atomic chemical is the number that matters:
// a raw backing-field read and a branch, nothing allocated. Run: npm run bench

class $Plain extends $Chemical {
    count = 0;
}

const one = new $Plain();
(one as any)[$molecule$].reactivate();

class $Hot extends $Chemical {
    count = 0;
}

const hot = new $Hot();
(hot as any)[$molecule$].reactivate();
(hot as any)._atomic = true;
(hot as any).$aid = 'bench';

describe('the atomic alert on the write path', () => {
    bench('non-atomic chemical: 10,000 reactive writes (the branch answers no)', () => {
        for (let i = 0; i < 10000; i++) (one as any).count = i;
    });

    bench('atomic chemical: 10,000 reactive writes (alert + debounced flush)', () => {
        for (let i = 0; i < 10000; i++) (hot as any).count = i;
    });
});

import { describe, it, expect } from 'vitest';
import { $Chemical, $Reaction } from '@/chemistry/chemical';
import { $reaction$, $cid$ } from '@/symbols';

describe('$Reaction', () => {
    it('should be created with a chemical', () => {
        const chemical = new $Chemical();
        const reaction = chemical[$reaction$];
        expect(reaction).toBeInstanceOf($Reaction);
        expect(reaction.chemical).toBe(chemical);
    });

    it('should be its own system by default', () => {
        const chemical = new $Chemical();
        const reaction = chemical[$reaction$];
        expect(reaction.system).toBe(reaction);
    });

    it('should register chemical in static map', () => {
        const chemical = new $Chemical();
        const found = $Reaction.find(chemical[$cid$]);
        expect(found).toBe(chemical);
    });

    it('should clean up on destroy', () => {
        const chemical = new $Chemical();
        const cid = chemical[$cid$];
        chemical[$reaction$].destroy();
        expect($Reaction.find(cid)).toBeUndefined();
    });
});

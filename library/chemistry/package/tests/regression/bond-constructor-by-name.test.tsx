import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { $, $Block, $Chemical, look } from '@/index';

// A CLASS NAMES ITS BOND CONSTRUCTOR AFTER ITSELF, AND THE RUNTIME NAME CAN LIE.
//
// A build renames a class binding when it has to — a decorator on any member
// makes esbuild wrap the class and emit `_$Writing` — while the method keeps
// the name it was written with. Resolving the bond constructor through the
// RUNTIME class name missed, so the chemical got no bond constructor, stopped
// grouping its own prose into a block, and the text was then discarded without
// a word. Nothing went red: it drew nothing and said nothing.
//
// The rename is the build's business and not reproducible here, so the fault is
// reproduced directly: a class whose runtime name is not the name its bond
// constructor was written with.

class $Renamed extends $Chemical {
    held?: $Block;

    $Renamed(block: $Block) { this.held = block; }

    view(): ReactNode { return <span>{this.held ? 'held' : 'nothing'}</span>; }
}
Object.defineProperty($Renamed, 'name', { value: '_$Renamed', configurable: true });
const Renamed = $($Renamed);

class $Decorated extends $Chemical {
    held?: $Block;

    $Decorated(block: $Block) { this.held = block; }

    view(): ReactNode { return <span>{this.held ? 'held' : 'nothing'}</span>; }

    @look('back')
    $view(): ReactNode { return 'back'; }
}
const Decorated = $($Decorated);

describe('a bond constructor is found by the name it was WRITTEN with', () => {
    it('a class whose runtime name a build has renamed still finds its bond constructor', () => {
        expect($Renamed.name).toBe('_$Renamed');
        expect(Object.getOwnPropertyNames($Renamed.prototype)).toContain('$Renamed');
        // The lookup that used to be made, shown missing rather than described:
        // resolving through the runtime class name asks for a member nothing declares.
        expect(($Renamed.prototype as unknown as Record<string, unknown>)['_$Renamed']).toBeUndefined();
        const one = $(<Renamed>hi</Renamed>) as $Renamed;
        expect(one.held).toBeDefined();
    });

    it('and its inline text is gathered into that block rather than discarded', () => {
        const one = $(<Renamed>hi</Renamed>) as $Renamed;
        expect(one.held!.elements).toEqual(['hi']);
    });

    it('and a decorated chemical is handed its block just the same', () => {
        const one = $(<Decorated>hi</Decorated>) as $Decorated;
        expect(one.held).toBeDefined();
        expect(one.held!.elements).toEqual(['hi']);
    });
});

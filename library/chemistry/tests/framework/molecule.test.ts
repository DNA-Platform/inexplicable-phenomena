import { describe, it, expect } from 'vitest';
import { $Chemical, $Molecule, $Bond, $Reflection } from '@/chemistry/chemical';
import { $molecule$, $cid$, $type$ } from '@/symbols';

describe('$Reflection', () => {
    it('should identify $-prefixed lowercase properties as special', () => {
        expect($Reflection.isSpecial('$name')).toBe(true);
        expect($Reflection.isSpecial('$color')).toBe(true);
    });

    it('should not identify $-prefixed uppercase as special', () => {
        expect($Reflection.isSpecial('$Parent')).toBe(false);
        expect($Reflection.isSpecial('$Component')).toBe(false);
    });

    it('should not identify $$ or $_ as special', () => {
        expect($Reflection.isSpecial('$$internal')).toBe(false);
        expect($Reflection.isSpecial('$_private')).toBe(false);
    });

    it('should identify _ prefixed properties as non-reactive', () => {
        expect($Reflection.isReactive('_private')).toBe(false);
        expect($Reflection.isReactive('constructor')).toBe(false);
    });

    it('should identify regular properties as reactive', () => {
        expect($Reflection.isReactive('count')).toBe(true);
        expect($Reflection.isReactive('items')).toBe(true);
    });
});

describe('$Molecule', () => {
    it('should be created with a chemical', () => {
        const chemical = new $Chemical();
        const molecule = chemical[$molecule$];
        expect(molecule).toBeInstanceOf($Molecule);
        expect(molecule.chemical).toBe(chemical);
    });

    it('should start non-reactive', () => {
        const chemical = new $Chemical();
        expect(chemical[$molecule$].reactive).toBe(false);
    });

    it('should become reactive after reactivate()', () => {
        const chemical = new $Chemical();
        chemical[$molecule$].reactivate();
        expect(chemical[$molecule$].reactive).toBe(true);
    });

    it('should create bonds for $-prefixed properties on subclass', () => {
        class $Test extends $Chemical {
            $title = 'hello';
            $count = 0;
        }
        const test = new $Test();
        test[$molecule$].reactivate();
        expect(test[$molecule$].bonds.has('$title')).toBe(true);
        expect(test[$molecule$].bonds.has('$count')).toBe(true);
    });

    it('should not create bonds for _ prefixed properties', () => {
        class $Test extends $Chemical {
            $title = 'hello';
            _internal = 42;
        }
        const test = new $Test();
        test[$molecule$].reactivate();
        expect(test[$molecule$].bonds.has('$title')).toBe(true);
        expect(test[$molecule$].bonds.has('_internal')).toBe(false);
    });

    it('should create bonds for regular reactive properties', () => {
        class $Test extends $Chemical {
            count = 0;
            label = 'test';
        }
        const test = new $Test();
        test[$molecule$].reactivate();
        expect(test[$molecule$].bonds.has('count')).toBe(true);
        expect(test[$molecule$].bonds.has('label')).toBe(true);
    });

    it('should be destroyable', () => {
        class $Test extends $Chemical {
            $title = 'hello';
        }
        const test = new $Test();
        test[$molecule$].reactivate();
        expect(test[$molecule$].destroyed).toBe(false);
        test[$molecule$].destroy();
        expect(test[$molecule$].destroyed).toBe(true);
    });
});

describe('$Bond', () => {
    it('should identify fields vs methods', () => {
        class $Test extends $Chemical {
            $title = 'hello';
            doSomething() { return 42; }
        }
        const test = new $Test();
        test[$molecule$].reactivate();
        const titleBond = test[$molecule$].bonds.get('$title');
        const methodBond = test[$molecule$].bonds.get('doSomething');
        expect(titleBond).toBeDefined();
        expect(methodBond).toBeDefined();
        expect(titleBond!.isField).toBe(true);
        expect(titleBond!.isMethod).toBe(false);
        expect(titleBond!.isProp).toBe(true);
        expect(methodBond!.isMethod).toBe(true);
        expect(methodBond!.isField).toBe(false);
    });

    it('should identify getter properties', () => {
        class $Test extends $Chemical {
            _value = 42;
            get computed() { return this._value * 2; }
        }
        const test = new $Test();
        test[$molecule$].reactivate();
        const bond = test[$molecule$].bonds.get('computed');
        expect(bond).toBeDefined();
        expect(bond!.isProperty).toBe(true);
        expect(bond!.isReadable).toBe(true);
    });
});

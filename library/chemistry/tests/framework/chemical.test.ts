import { describe, it, expect } from 'vitest';
import { $Chemical } from '@/chemistry/chemical';
import { $Particle } from '@/chemistry/particle';
import {
    $cid$, $symbol$, $type$, $molecule$, $reaction$, $orchestrator$,
    $template$, $isTemplate$, $isBound$, $component$, $children$,
    $parent$, $$parent$$, $catalyst$, $isCatalyst$, $destroyed$,
    $$template$$
} from '@/symbols';

describe('$Chemical', () => {
    it('should extend $Particle', () => {
        const chemical = new $Chemical();
        expect(chemical).toBeInstanceOf($Particle);
        expect(chemical).toBeInstanceOf($Chemical);
    });

    it('should have a unique cid and symbol', () => {
        const c1 = new $Chemical();
        const c2 = new $Chemical();
        expect(c1[$cid$]).not.toBe(c2[$cid$]);
        expect(c1[$symbol$]).not.toBe(c2[$symbol$]);
        expect(c1[$symbol$]).toMatch(/^\$Chemistry\.\$Chemical\[\d+\]$/);
    });

    it('should establish template singleton', () => {
        const template = $Chemical[$$template$$];
        expect(template).toBeInstanceOf($Chemical);
        const c1 = new $Chemical();
        expect($Chemical[$$template$$]).toBe(template);
        expect(template[$isTemplate$]).toBe(true);
        expect(c1[$isTemplate$]).toBe(false);
    });

    it('should create molecule, reaction, and orchestrator', () => {
        const chemical = new $Chemical();
        expect(chemical[$molecule$]).toBeDefined();
        expect(chemical[$reaction$]).toBeDefined();
        expect(chemical[$orchestrator$]).toBeDefined();
    });

    it('should be its own parent and catalyst by default', () => {
        const chemical = new $Chemical();
        expect(chemical[$$parent$$]).toBe(chemical);
        expect(chemical[$catalyst$]).toBe(chemical);
        expect(chemical[$isCatalyst$]).toBe(true);
    });

    it('should render children by default', () => {
        const chemical = new $Chemical();
        expect(chemical.view()).toBeUndefined();
        (chemical as any)[$children$] = 'hello';
        expect(chemical.view()).toBe('hello');
    });

    it('should have lifecycle methods', () => {
        const chemical = new $Chemical();
        expect(typeof chemical.mount).toBe('function');
        expect(typeof chemical.render).toBe('function');
        expect(typeof chemical.layout).toBe('function');
        expect(typeof chemical.effect).toBe('function');
        expect(typeof chemical.unmount).toBe('function');
    });

    it('should have a Component getter', () => {
        class $TestChemical extends $Chemical {
            $title = 'Test';
            view() { return this.$title; }
        }
        const template = new $TestChemical();
        expect(template.Component).toBeDefined();
        expect(typeof template.Component).toBe('function');
    });
});

describe('$Chemical subclass', () => {
    class $Greeting extends $Chemical {
        $name = 'World';
        view() { return `Hello ${this.$name}!`; }
    }

    it('should establish its own template', () => {
        const g = new $Greeting();
        expect(($Greeting as any)[$$template$$]).toBeInstanceOf($Greeting);
        expect(($Greeting as any)[$$template$$][$isTemplate$]).toBe(true);
    });

    it('should have its own type', () => {
        const g = new $Greeting();
        expect(g[$type$]).toBe($Greeting);
    });

    it('should have $-prefixed props', () => {
        const g = new $Greeting();
        expect(g.$name).toBe('World');
    });

    it('should render its view', () => {
        const g = new $Greeting();
        expect(g.view()).toBe('Hello World!');
    });
});

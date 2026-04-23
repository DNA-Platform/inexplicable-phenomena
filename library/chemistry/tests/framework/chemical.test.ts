import { describe, it, expect } from 'vitest';
import { $Chemical } from '@/chemistry/chemical';

describe('$Chemical — subclasses define reactive state as fields', () => {
    class $Greeting extends $Chemical {
        $name = 'World';
        view() { return `Hello ${this.$name}!`; }
    }

    it('reads a $-prefixed field as a property', () => {
        const g = new $Greeting();
        expect(g.$name).toBe('World');
    });

    it('view() returns the computed output from state', () => {
        const g = new $Greeting();
        expect(g.view()).toBe('Hello World!');
    });
});

describe('$Chemical — subclasses can override view() to read any state', () => {
    it('view() runs with this bound to the chemical instance', () => {
        class $Countdown extends $Chemical {
            $from = 3;
            $to = 1;
            view() { return `${this.$from}...${this.$to}`; }
        }
        const c = new $Countdown();
        expect(c.view()).toBe('3...1');
    });
});

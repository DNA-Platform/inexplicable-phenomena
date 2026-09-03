import { describe, it, expect } from 'vitest';
import { $, $check, cache } from '@dna-platform/chemistry';
import { Specification } from '@/utilities/Specification';
import { $Writing, $Type, TypedSpecification, Type } from '@/writing/Writing';
import { $Letter, $TypeOfLetter } from '@/writing/Letter';
import { reflection } from '@/utilities/Reflection';
import { built, drawn, letter, specificationOf } from './written';

const one = () => drawn('a', <Type>Letter</Type>).writing;

class $Two extends Specification<$Writing> {
    $first(writing: $Writing): void { }
    $second(writing: $Writing): void { }
}

class $Three extends $Two {
    $third(writing: $Writing): void { }
}

class $Silenced extends $Two {
    override $second(writing: $Writing): boolean { return false; }
}

class $Louder extends $Two {
    override $second(writing: $Writing): void {
        $check(writing.copy === 'never', 'the second rule was replaced and it refuses');
    }
}

class $Failing extends Specification<$Writing> {
    $one(writing: $Writing): void { $check(false, 'the first reason'); }
    $two(writing: $Writing): void { $check(false, 'the second reason'); }
    $three(writing: $Writing): void { }
}

class $Counting extends TypedSpecification<$Writing> {
    $mine(writing: $Writing): void { }
}

class $Decorated extends Specification<$Writing> {
    constructor(within: Specification<$Writing>) {
        super();
        this.parent = within;
    }

    $added(writing: $Writing): void { }
}

describe('a specification is a list of rules, and running it says which ran', () => {
    it('runs every $-prefixed method and names them back', () => {
        expect(new $Two().check(one())).toEqual(['$first', '$second']);
    });

    it('and a base class’s rules come first, because it is the parent class', () => {
        expect(new $Counting().check(one()).slice(-1)).toEqual(['$mine']);
        expect(new $Counting().check(one()).length).toBe(8);
    });
});

describe('a rule is added by SUBCLASSING, and nothing is repealed', () => {
    it('a subclass keeps every rule its parent declared and adds its own', () => {
        expect(new $Three().check(one())).toEqual(['$first', '$second', '$third']);
    });

    it('and a rule is OVERRIDDEN by name, never duplicated', () => {
        const ran = new $Louder().check.bind(new $Louder());
        expect(() => ran(one())).toThrow(/the second rule was replaced/);
        expect(new $Three().check(one()).filter(name => name === '$second').length).toBe(1);
    });
});

describe('a rule is DISABLED by returning false', () => {
    it('it does not run and it is absent from what came back', () => {
        expect(new $Silenced().check(one())).toEqual(['$first']);
    });

    it('and the rules it sits beside are untouched', () => {
        expect(new $Silenced().check(one())).toContain('$first');
    });
});

describe('a specification is DECORATED by holding another as its parent', () => {
    it('the held one runs first, and the decorator adds to it', () => {
        expect(new $Decorated(new $Two()).check(one()))
            .toEqual(['$first', '$second', '$added']);
    });

    it('and decoration needs no inheritance between the two', () => {
        expect(new $Decorated(new $Two()) instanceof $Two).toBe(false);
    });
});

describe('every failure is collected, and one raise carries them all', () => {
    it('does not stop at the first', () => {
        expect(() => new $Failing().check(one())).toThrow(/the first reason/);
        expect(() => new $Failing().check(one())).toThrow(/the second reason/);
    });
});

describe('the levels state their rules the same way', () => {
    it('a letter type runs the writing rules and its own', () => {
        expect(() => built<$Letter>(letter('a')).specify()).not.toThrow();
    });

    it('and a letter that is not one grapheme says so', () => {
        expect(() => drawn('hi', <Type>Letter</Type>).writing.specify()).toThrow(/one grapheme/);
    });
});

describe('standing is free, and specify is where the law speaks', () => {
    it('writing that cannot satisfy its type still stands, and specify refuses it', () => {
        const { writing } = drawn('U+0041', <Type>Letter</Type>);
        expect(reflection.stands(writing, 'Letter')).toBe(true);
        expect(() => writing.specify()).toThrow(/one grapheme/);
    });

    it('and writing that can satisfies clean', () => {
        const { writing } = drawn('a', <Type>Letter</Type>);
        expect(writing.copy).toBe('a');
        expect(() => writing.specify()).not.toThrow();
    });
});

describe('there is ONE specification, and it is the type’s', () => {
    it('a rule inherited from the base runs EXACTLY once', () => {
        let ran = 0;

        class $Counted extends TypedSpecification<$Writing> {
            override $hasType(writing: $Writing): void {
                ran++;
                super.$hasType(writing);
            }
        }

        class $TypeOfCounted extends $Type {
            resolve = false;
            constructor() { super(); this[cache]('Counted'); }
            protected override specification: Specification<$Writing> = new $Counted();
        }

        $($TypeOfCounted);
        const writing = drawn('a', <Type>Counted</Type>).writing;
        const before = ran;
        writing.specify();
        expect(ran - before).toBe(1);
    });

    it('and a level names each of its rules once', () => {
        const names = specificationOf(new $TypeOfLetter()).rules().map((pair: [string, unknown]) => pair[0]);
        expect(names).toEqual(['$hasBlock', '$mustHaveText', '$hasType', '$typedOnce', '$hasWriting', '$terminates', '$oneKind', '$oneCharacter']);
        expect(new Set(names).size).toBe(names.length);
    });
});

describe('the TYPE specifies, and a writing asks its type', () => {
    it('a level asks the type it carries, and gets that type’s rules', () => {
        const type = built<$Letter>(letter('a')).type as $Type;
        expect(specificationOf(type).check(built<$Letter>(letter('a')))).toEqual([
            'a piece of writing has a block',
            'a piece of writing has characters',
            'a piece of writing has a type',
            'a piece of writing is typed once',
            'a piece of writing has something written in it',
            'a piece of writing descends from a chain that terminates',
            'a piece of writing is one kind of writing',
            'a letter is one grapheme'
        ]);
    });

    it('writing told what it is asks the same type', () => {
        const writing = drawn('a', <Type>Letter</Type>).writing;
        expect(specificationOf(writing.type).check(writing)).toEqual([
            'a piece of writing has a block',
            'a piece of writing has characters',
            'a piece of writing has a type',
            'a piece of writing is typed once',
            'a piece of writing has something written in it',
            'a piece of writing descends from a chain that terminates',
            'a piece of writing is one kind of writing',
            'a letter is one grapheme'
        ]);
    });

    it('and writing carrying no type has no law to run, and specify is vacuous', () => {
        expect(() => drawn('a').writing.specify()).not.toThrow();
    });
});

describe('a rule is LABELLED by @specify, and the label is what comes back', () => {
    it('the run names the rules in the words the library uses', () => {
        expect(new TypedSpecification<$Writing>().check(one()))
            .toEqual([
                'a piece of writing has a block',
                'a piece of writing has characters',
                'a piece of writing has a type',
                'a piece of writing is typed once',
                'a piece of writing has something written in it',
                'a piece of writing descends from a chain that terminates',
                'a piece of writing is one kind of writing'
            ]);
    });

    it('and an unlabelled rule falls back to its method name', () => {
        expect(new $Two().check(one())).toEqual(['$first', '$second']);
    });
});

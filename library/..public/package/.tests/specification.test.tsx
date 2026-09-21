import { describe, it, expect } from 'vitest';
import { $check } from '@dna-platform/chemistry';
import { Specification, specify } from '@dna-platform/public';

type Room = { seats: number; door: boolean };

class RoomSpecification extends Specification<Room> {
    @specify('a room has a door')
    $hasDoor(room: Room): void {
        $check(room.door, 'a room has a door, and this one has none');
    }

    @specify('a room seats someone')
    $seatsSomeone(room: Room): void {
        $check(room.seats > 0, 'a room seats someone, and this one seats nobody');
    }
}

class HallSpecification extends RoomSpecification {
    override $hasDoor(): boolean {
        return false;
    }

    @specify('a hall seats a crowd')
    $seatsCrowd(room: Room): void {
        $check(room.seats >= 100, 'a hall seats a crowd, and this one seats fewer');
    }
}

describe('a specification is a detached set of named rules', () => {
    it('collects every $-rule up the prototype chain, base first, and the decorator names each', () => {
        const rules = new HallSpecification().rules();
        expect(rules.map(([name]) => name)).toEqual(['$hasDoor', '$seatsSomeone', '$seatsCrowd']);
        expect(rules.map(([, rule]) => rule.description)).toEqual([undefined, 'a room seats someone', 'a hall seats a crowd']);
    });

    it('check answers the failures, in the words the rules threw, and none when the thing is up to code', () => {
        const specification = new RoomSpecification();
        expect(specification.check({ seats: 4, door: true })).toEqual([]);
        expect(specification.check({ seats: 0, door: false })).toEqual([
            'a room has a door, and this one has none',
            'a room seats someone, and this one seats nobody',
        ]);
    });

    it('a subclass replaces a rule by naming it again, waives it by returning false, and adds its own', () => {
        const specification = new HallSpecification();
        expect(specification.check({ seats: 120, door: false })).toEqual([]);
        expect(specification.check({ seats: 12, door: false })).toEqual(['a hall seats a crowd, and this one seats fewer']);
    });
});

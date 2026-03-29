import { describe, it, expect } from 'vitest';
import React from 'react';
import { $Particle } from '@/chemistry/particle';
import {
    $cid$, $symbol$, $type$, $template$, $isTemplate$, $children$, $apply$, $bond$, $$template$$
} from "@/symbols";

describe('$Particle', () => {
    it('should establish template singleton correctly', () => {
        // The template already exists from module export
        const template = $Particle[$$template$$];
        expect(template).toBeInstanceOf($Particle);

        const p1 = new $Particle();
        const p2 = new $Particle();

        // Template should remain the same
        expect($Particle[$$template$$]).toBe(template);

        // Only the class template is the template
        expect(template[$isTemplate$]).toBe(true);
        expect(p1[$isTemplate$]).toBe(false);
        expect(p2[$isTemplate$]).toBe(false);

        // Each instance's $template points to itself (for now)
        expect(p1[$template$]).toBe(p1);
        expect(p2[$template$]).toBe(p2);
    });

    it('should have unique symbols for different instances', () => {
        const p1 = new $Particle();
        const p2 = new $Particle();

        expect(p1[$symbol$]).toBeDefined();
        expect(p2[$symbol$]).toBeDefined();
        expect(p1[$symbol$]).not.toBe(p2[$symbol$]);
    });

    it('should store constructor as type', () => {
        const particle = new $Particle();
        expect(particle[$type$]).toBe($Particle);
    });
});

// Tests below are disabled pending the use() refactor stabilizing.
// The old view-wrapping interface ($view.$this, $view.$view, frame()) was
// replaced by use() in the most recent commit. These tests need rewriting
// once the new interface is settled.
//
// Removed test sections:
//   - "should carry instance and implementation on view function" — old $view property interface
//   - "$Particle View Swapping" — swapping via $view.$this/$view.$view
//   - "$Particle Props Application" — invokes $apply$ through old $View cast
//   - "$Particle Frame Method" — frame() was removed from $Particle
//   - "$Particle Module Export" — export changed from view function to instance
//   - "$Particle View Cross-swapping" — relies on old view wrapper properties

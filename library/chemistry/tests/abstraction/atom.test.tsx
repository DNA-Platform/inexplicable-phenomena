import { describe, it, expect } from 'vitest';
import { render, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { $Atom } from '@/abstraction/atom';

describe('$Atom — singleton chemical', () => {
    it('constructor always returns the same instance', () => {
        class $A extends $Atom {}
        const a = new $A();
        const b = new $A();
        expect(a).toBe(b);
    });
});

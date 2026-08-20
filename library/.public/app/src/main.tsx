import React from 'react';
import { createRoot } from 'react-dom/client';
import { Library } from './app';
import { dress } from './dressing';

// Configuration before anything renders — the framework establishes a scope
// before it calls a bond constructor and before it calls a view, so a
// registration arriving inside either is an error.
dress();

createRoot(document.getElementById('root')!).render(<Library />);

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { $Lab } from './apparatus/lab';
import { globalStyles } from './styles/tokens';
import { theme } from './styles/theme';

// Inject the global stylesheet once. Visual tokens, page reset, base
// typography. Everything below this line is $Chemistry.
const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);

// $Lab is the root chemical. It owns $activeSection, $cases, and $router; it
// composes the header, sidebar, content panel, and code panel. The whole
// apparatus is one chemical tree from this point down.
// First $Lab construction becomes the class template — discarded. The held
// instance below is therefore NOT the template, so its `.Component` getter
// uses the $lift path: derivatives register with the held instance's
// $derivatives$ set, and reactive writes fan out through that registry. The
// $createComponent path used by templates does not register derivatives,
// which is why we deliberately route around it.
new $Lab();
const labInstance = new $Lab();
(window as any).$lab = labInstance;
const Lab = labInstance.Component;

const root = document.getElementById('root');
if (!root) throw new Error('No #root element found');
createRoot(root).render(
    <ThemeProvider theme={theme}>
        <Lab />
    </ThemeProvider>
);

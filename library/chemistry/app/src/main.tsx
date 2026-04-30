import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Lab } from './apparatus/lab';
import { globalStyles } from './styles/tokens';
import { theme } from './styles/theme';

const style = document.createElement('style');
style.textContent = globalStyles;
document.head.appendChild(style);

const router = createBrowserRouter([
    { path: '/:section?', Component: Lab },
]);

const root = document.getElementById('root');
if (!root) throw new Error('No #root element found');
createRoot(root).render(
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
    </ThemeProvider>
);

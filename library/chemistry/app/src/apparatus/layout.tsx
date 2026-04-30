import React, { ReactNode } from 'react';
import { ThreePane, ContentMain } from './layout.styled';

export function ThreePaneLayout({ children }: { children: ReactNode }) {
    return <ThreePane>{children}</ThreePane>;
}

export function ContentArea({ children }: { children: ReactNode }) {
    return <ContentMain>{children}</ContentMain>;
}

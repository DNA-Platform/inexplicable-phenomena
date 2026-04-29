import React, { ReactNode } from 'react';
import { $Chemical } from '@/index';
import { tokens, fonts, sizes } from '../styles/tokens';

// $CodePanel — right-hand sticky panel for source display. Sprint 29 ships
// the chrome only; sprint 30 adds Vite `?raw` source loading and prism-react-
// renderer highlighting.
export class $CodePanel extends $Chemical {
    view(): ReactNode {
        // Hidden in sprint 29 (no source content yet). Sprint 30 mounts this
        // when a case is selected.
        return null;
    }
}

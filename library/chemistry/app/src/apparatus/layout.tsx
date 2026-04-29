import React, { ReactNode } from 'react';
import { $Chemical } from '@/index';
import { tokens, sizes } from '../styles/tokens';

// $Layout — abstract base for layouts. Concrete layouts override view().
// Currently the Lab uses only $ThreePaneLayout; future content shapes
// (e.g. a wide single-pane error gallery) might subclass.
export class $Layout extends $Chemical {
    view(): ReactNode {
        return this.children;
    }
}

// $ThreePaneLayout — the standard Lab layout: sidebar | content | code panel.
// Bond ctor takes three children in fixed order; a small grammar but the
// catalogue's prose register favors clarity over flexibility here.
export class $ThreePaneLayout extends $Layout {
    view(): ReactNode {
        return (
            <div style={{
                display: 'flex',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden',
                background: tokens.paper,
            }}>
                {this.children}
            </div>
        );
    }
}

// $ContentArea — middle pane. Scrolls independently of sidebar and code panel.
export class $ContentArea extends $Chemical {
    view(): ReactNode {
        return (
            <main style={{
                flex: 1,
                overflowY: 'auto',
                background: tokens.paper,
                display: 'flex',
                justifyContent: 'flex-start',
            }}>
                {this.children}
            </main>
        );
    }
}

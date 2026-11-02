import React from 'react';
import { CaseShell } from '../apparatus/case-shell';

import Case1Demo from './notif/case-1';
import case1Source from './notif/case-1.tsx?raw';

export function NotificationCases() {
    return (
        <CaseShell
            caseId="notif / 1"
            subject="Notification toasts — push, auto-dismiss, manual dismiss"
            pass="click a button, toast appears and auto-dismisses after 3s"
            fail="toast doesn't appear, or dismiss fails to remove it"
            source={case1Source}
            demo={<Case1Demo />}
        />
    );
}

export const sectionData = {
    id: 'notif',
    cases: 1,
    Component: NotificationCases,
};

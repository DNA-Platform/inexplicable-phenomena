import React from 'react';
import { $, $Chemical } from '@/index';
import {
    FlagsPanel, FlagRow, FlagName, FlagSwitch, FlagTrack, FlagThumb,
    FlagPreview, FlagBadge, FlagPreviewLabel,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

const FLAG_NAMES = ['dark-mode', 'notifications', 'analytics'] as const;

class $FeatureFlags extends $Chemical {
    flags: Set<string> = new Set();

    toggle(name: string) {
        if (this.flags.has(name)) {
            this.flags.delete(name);
        } else {
            this.flags.add(name);
        }
    }

    view() {
        const anyEnabled = this.flags.size > 0;
        const dark = this.flags.has('dark-mode');
        const notifs = this.flags.has('notifications');
        const analytics = this.flags.has('analytics');
        return (
            <>
                <FlagsPanel>
                    {FLAG_NAMES.map((name) => {
                        const on = this.flags.has(name);
                        return (
                            <FlagRow key={name}>
                                <FlagName>{name}</FlagName>
                                <FlagSwitch onClick={() => this.toggle(name)}>
                                    <FlagTrack $on={on}>
                                        <FlagThumb $on={on} />
                                    </FlagTrack>
                                </FlagSwitch>
                            </FlagRow>
                        );
                    })}
                </FlagsPanel>
                <FlagPreview $dark={dark}>
                    {!anyEnabled && <FlagPreviewLabel>enable flags to see their effects</FlagPreviewLabel>}
                    {dark && <FlagPreviewLabel>dark mode active</FlagPreviewLabel>}
                    {notifs && <FlagBadge>🔔 Notifications enabled</FlagBadge>}
                    {analytics && <FlagBadge>📊 Tracking active</FlagBadge>}
                </FlagPreview>
                <VerdictSection>
                    <VerdictRow $state={anyEnabled ? 'pass' : 'pending'}>
                        <VerdictDot $state={anyEnabled ? 'pass' : 'pending'} />
                        {anyEnabled
                            ? `✓ ${this.flags.size} flag${this.flags.size > 1 ? 's' : ''} enabled — Set.add in place`
                            : '○ toggle a flag to verify'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const FeatureFlags = $($FeatureFlags);

export default function Case3Demo() {
    return <FeatureFlags />;
}

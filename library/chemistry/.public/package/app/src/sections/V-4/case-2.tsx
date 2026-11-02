import React from 'react';
import { $, $Chemical } from '@/index';
import {
    SettingsPanel, SettingsRow, SettingsKey, SettingsValue,
    SettingsDeleteBtn, SettingsInputRow, SettingsField, SettingsSetBtn,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $SettingsEditor extends $Chemical {
    config: Map<string, string> = new Map();
    key = '';
    value = '';

    updateKey(e: React.ChangeEvent<HTMLInputElement>) {
        this.key = e.target.value;
    }

    updateValue(e: React.ChangeEvent<HTMLInputElement>) {
        this.value = e.target.value;
    }

    set() {
        const k = this.key.trim();
        const v = this.value.trim();
        if (k) {
            this.config.set(k, v);
            this.key = '';
            this.value = '';
        }
    }

    remove(key: string) {
        this.config.delete(key);
    }

    view() {
        const entries = Array.from(this.config.entries());
        const hasConfig = this.config.size > 0;
        return (
            <>
                <SettingsPanel>
                    <SettingsInputRow>
                        <SettingsField
                            placeholder="key"
                            value={this.key}
                            onChange={this.updateKey}
                        />
                        <SettingsField
                            placeholder="value"
                            value={this.value}
                            onChange={this.updateValue}
                        />
                        <SettingsSetBtn onClick={this.set}>Set</SettingsSetBtn>
                    </SettingsInputRow>
                    {entries.map(([k, v]) => (
                        <SettingsRow key={k}>
                            <SettingsKey>{k}</SettingsKey>
                            <SettingsValue>{v}</SettingsValue>
                            <SettingsDeleteBtn onClick={() => this.remove(k)}>&times;</SettingsDeleteBtn>
                        </SettingsRow>
                    ))}
                </SettingsPanel>
                <VerdictSection>
                    <VerdictRow $state={hasConfig ? 'pass' : 'pending'}>
                        <VerdictDot $state={hasConfig ? 'pass' : 'pending'} />
                        {hasConfig
                            ? `✓ ${this.config.size} key${this.config.size > 1 ? 's' : ''} in config — Map.set in place`
                            : '○ add a key-value pair'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const SettingsEditor = $($SettingsEditor);

export default function Case2Demo() {
    return <SettingsEditor />;
}

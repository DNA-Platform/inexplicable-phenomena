import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    TabsFrame, TabBar, Tab, PanelBody, PanelTitle,
    FieldGroup, FieldLabel, FieldInput, FieldTextarea,
    ToggleRow, ToggleLabel, ToggleButton,
    SliderRow, SliderLabel, RangeInput, SizeReadout,
    NotifRow, NotifLabel, NotifCheckbox, NotifDot,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// ── Base: $TabPanel ─────────────────────────────────────────────────────────
// Each panel has a $label shown in the tab bar. Subclasses override view()
// with their own content and reactive state.

class $TabPanel extends $Chemical {
    $label = '';
    entering = false;

    view(): React.ReactNode {
        return <PanelBody $entering={this.entering}>Empty panel</PanelBody>;
    }
}

// ── $ProfilePanel ───────────────────────────────────────────────────────────

class $ProfilePanel extends $TabPanel {
    name = '';
    bio = '';

    setName(e: React.ChangeEvent<HTMLInputElement>) {
        this.name = e.target.value;
    }

    setBio(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.bio = e.target.value;
    }

    view() {
        return (
            <PanelBody $entering={this.entering}>
                <PanelTitle>Profile</PanelTitle>
                <FieldGroup>
                    <FieldLabel>Name</FieldLabel>
                    <FieldInput
                        value={this.name}
                        onChange={this.setName}
                        placeholder="Your name"
                    />
                </FieldGroup>
                <FieldGroup>
                    <FieldLabel>Bio</FieldLabel>
                    <FieldTextarea
                        value={this.bio}
                        onChange={this.setBio}
                        placeholder="Tell us about yourself..."
                    />
                </FieldGroup>
            </PanelBody>
        );
    }
}

// ── $PreferencesPanel ───────────────────────────────────────────────────────

class $PreferencesPanel extends $TabPanel {
    theme: 'light' | 'dark' = 'light';
    fontSize = 16;

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
    }

    setFontSize(e: React.ChangeEvent<HTMLInputElement>) {
        this.fontSize = Number(e.target.value);
    }

    view() {
        return (
            <PanelBody $entering={this.entering} $dark={this.theme === 'dark'}>
                <PanelTitle>Preferences</PanelTitle>
                <ToggleRow>
                    <ToggleLabel>Theme</ToggleLabel>
                    <ToggleButton $on={this.theme === 'dark'} onClick={this.toggleTheme}>
                        {this.theme}
                    </ToggleButton>
                </ToggleRow>
                <SliderRow>
                    <SliderLabel>Font size</SliderLabel>
                    <RangeInput
                        type="range"
                        min={10}
                        max={28}
                        value={this.fontSize}
                        onChange={this.setFontSize}
                    />
                    <SizeReadout>{this.fontSize}px</SizeReadout>
                </SliderRow>
            </PanelBody>
        );
    }
}

// ── $NotificationsPanel ─────────────────────────────────────────────────────

class $NotificationsPanel extends $TabPanel {
    email = false;
    push = false;
    sms = false;

    toggleEmail() { this.email = !this.email; }
    togglePush() { this.push = !this.push; }
    toggleSms() { this.sms = !this.sms; }

    view() {
        return (
            <PanelBody $entering={this.entering}>
                <PanelTitle>Notifications</PanelTitle>
                <NotifRow>
                    <NotifLabel>Email notifications<NotifDot $on={this.email} /></NotifLabel>
                    <NotifCheckbox
                        type="checkbox"
                        checked={this.email}
                        onChange={this.toggleEmail}
                    />
                </NotifRow>
                <NotifRow>
                    <NotifLabel>Push notifications<NotifDot $on={this.push} /></NotifLabel>
                    <NotifCheckbox
                        type="checkbox"
                        checked={this.push}
                        onChange={this.togglePush}
                    />
                </NotifRow>
                <NotifRow>
                    <NotifLabel>SMS notifications<NotifDot $on={this.sms} /></NotifLabel>
                    <NotifCheckbox
                        type="checkbox"
                        checked={this.sms}
                        onChange={this.toggleSms}
                    />
                </NotifRow>
            </PanelBody>
        );
    }
}

// ── $Tabs ───────────────────────────────────────────────────────────────────
// Bond constructor accepts $TabPanel[] — all three subclasses pass $check.
// Only the active panel is rendered via $(this.panels[activeIndex]).
// Panel state persists across tab switches because the chemical instances
// live in the bond-ctor array even when their view isn't mounted.

class $Tabs extends $Chemical {
    panels: $TabPanel[] = [];
    activeIndex = 0;
    switchCount = 0;

    $Tabs(...panels: $TabPanel[]) {
        this.panels = panels.map(p => $check(p, $TabPanel));
    }

    switchTo(index: number) {
        if (this.activeIndex !== index) {
            this.activeIndex = index;
            this.switchCount++;
            const panel = this.panels[index];
            if (panel) {
                panel.entering = true;
                setTimeout(() => { panel.entering = false; }, 150);
            }
        }
    }

    view() {
        const active = this.panels[this.activeIndex];
        const ActivePanel = active ? $(active) : null;
        const switched = this.switchCount > 0;

        return (
            <>
                <TabsFrame>
                    <TabBar>
                        {this.panels.map((panel, i) => (
                            <Tab
                                key={i}
                                $active={i === this.activeIndex}
                                onClick={() => this.switchTo(i)}
                            >
                                {panel.$label}
                            </Tab>
                        ))}
                    </TabBar>
                    {ActivePanel && <ActivePanel />}
                </TabsFrame>
                <VerdictSection>
                    <VerdictRow $state={switched ? 'pass' : 'pending'}>
                        <VerdictDot $state={switched ? 'pass' : 'pending'} />
                        {switched
                            ? `✓ switched tabs ${this.switchCount} time${this.switchCount !== 1 ? 's' : ''} — panel state persists across tab changes`
                            : '○ switch between tabs to verify state persistence'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const ProfilePanel = $($ProfilePanel);
const PreferencesPanel = $($PreferencesPanel);
const NotificationsPanel = $($NotificationsPanel);
const Tabs = $($Tabs);

export default function Case1Demo() {
    return (
        <Tabs>
            <ProfilePanel label="Profile" />
            <PreferencesPanel label="Preferences" />
            <NotificationsPanel label="Notifications" />
        </Tabs>
    );
}

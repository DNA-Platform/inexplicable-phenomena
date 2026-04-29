import React, { ReactNode } from 'react';
import { $Chemical } from '@/index';
import { defaultSectionId } from '../data/catalogue';
import { $Router } from './router';
import { $Header } from './header';
import { $Sidebar } from './sidebar';
import { $SectionPage } from './section-page';
import { $CodePanel } from './code-panel';
import { $ThreePaneLayout, $ContentArea } from './layout';
import type { $Case } from './case';

// $Lab — the root chemical. Owns:
//   $activeSection — which catalogue section is being viewed
//   $cases         — registry of every Case across the apparatus
//   $router        — the URL ↔ activeSection translator (a child chemical)
//
// All the apparatus's reactive state lives here. The router writes
// $activeSection from URL events; the sidebar reads it for highlighting; the
// content panel reads it to switch which $SectionPage is rendered.
export class $Lab extends $Chemical {
    $activeSection = defaultSectionId;
    $cases: Map<string, $Case> = new Map();
    $router!: $Router;

    constructor() {
        super();
        // Construct the router immediately so it's available before the view
        // mounts. The router writes $activeSection during attach based on
        // the current URL.
        this.$router = new $Router();
        this.$router.attach(this);
    }

    view(): ReactNode {
        // Read $activeSection so this view depends on it. Without the read,
        // the framework's post-render diff returns the cached output and
        // children never re-evaluate. The data-section attribute is the
        // marker that makes the rendered tree structurally differ when the
        // active section changes.
        const section = this.$activeSection;
        return (
            <div data-section={section} style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
            }}>
                <Header lab={this} />
                <ThreePaneLayout>
                    <Sidebar lab={this} />
                    <ContentArea>
                        <SectionPage lab={this} />
                    </ContentArea>
                    <CodePanel />
                </ThreePaneLayout>
            </div>
        );
    }
}

const Header = new $Header().Component;
const ThreePaneLayout = new $ThreePaneLayout().Component;
const ContentArea = new $ContentArea().Component;
const Sidebar = new $Sidebar().Component;
const SectionPage = new $SectionPage().Component;
const CodePanel = new $CodePanel().Component;

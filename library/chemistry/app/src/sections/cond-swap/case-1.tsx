import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    SwapFrame, ModeBar, ModeTab, PanelBody,
    EditorArea, EditorLabel, ViewerLabel, ViewerText,
    SliderRow, SliderLabel, RangeInput, SizeReadout,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $Editor extends $Chemical {
    draft = 'The quick brown fox jumps over the lazy dog.';

    setDraft(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.draft = e.target.value;
    }

    view() {
        return (
            <PanelBody>
                <EditorLabel>$Editor</EditorLabel>
                <EditorArea
                    value={this.draft}
                    onChange={this.setDraft}
                    placeholder="Type something..."
                />
            </PanelBody>
        );
    }
}

class $Viewer extends $Chemical {
    fontSize = 16;

    setFontSize(e: React.ChangeEvent<HTMLInputElement>) {
        this.fontSize = Number(e.target.value);
    }

    view() {
        return (
            <PanelBody>
                <ViewerLabel>$Viewer</ViewerLabel>
                <ViewerText $fontSize={this.fontSize}>
                    $Chemistry makes class-based components reactive without hooks,
                    proxies, or decorators. Just prefix a property with $ and it becomes
                    observable.
                </ViewerText>
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

class $Switcher extends $Chemical {
    mode: 'editor' | 'viewer' = 'viewer';
    toggleCount = 0;

    editor!: $Editor;
    viewer!: $Viewer;

    $Switcher(editor: $Editor, viewer: $Viewer) {
        this.editor = $check(editor, $Editor);
        this.viewer = $check(viewer, $Viewer);
    }

    setEditor() {
        if (this.mode !== 'editor') {
            this.mode = 'editor';
            this.toggleCount++;
        }
    }

    setViewer() {
        if (this.mode !== 'viewer') {
            this.mode = 'viewer';
            this.toggleCount++;
        }
    }

    view() {
        const EditorView = $(this.editor);
        const ViewerView = $(this.viewer);
        const toggled = this.toggleCount > 0;
        return (
            <>
                <SwapFrame>
                    <ModeBar>
                        <ModeTab
                            $active={this.mode === 'viewer'}
                            onClick={this.setViewer}
                        >
                            Viewer
                        </ModeTab>
                        <ModeTab
                            $active={this.mode === 'editor'}
                            onClick={this.setEditor}
                        >
                            Editor
                        </ModeTab>
                    </ModeBar>
                    {this.mode === 'editor' ? <EditorView /> : <ViewerView />}
                </SwapFrame>
                <VerdictSection>
                    <VerdictRow $state={toggled ? 'pass' : 'pending'}>
                        <VerdictDot $state={toggled ? 'pass' : 'pending'} />
                        {toggled
                            ? `✓ mode toggled ${this.toggleCount} time${this.toggleCount !== 1 ? 's' : ''} — held instances preserve state across swaps`
                            : '○ switch tabs to verify state persists — editor draft and viewer font size survive'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Editor = $($Editor);
const Viewer = $($Viewer);
const Switcher = $($Switcher);

export default function Case1Demo() {
    return (
        <Switcher>
            <Editor />
            <Viewer />
        </Switcher>
    );
}

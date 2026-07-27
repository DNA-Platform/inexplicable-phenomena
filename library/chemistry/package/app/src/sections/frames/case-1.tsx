import React from 'react';
import { $, $Chemical } from '@/index';
import {
    Gallery, PictureCard, FrameLabel,
    Scene, Sun, Hills, Caption,
    OrnateFrame, PolaroidFrame, MattedFrame,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// $Picture — the CONTENT. view() is one little scene: a gradient sky, a sun,
// a hill line, and a caption you can click to "like". Every frame below is a
// SUBCLASS that overrides frame() to wrap THIS view differently. view() never
// changes — only the frame around it does. (frame() calls super.frame(), which
// is the active view, so the picture stays live inside any frame.)
class $Picture extends $Chemical {
    $title = '';
    liked = false;
    toggle() { this.liked = !this.liked; }
    view() {
        return (
            <Scene onClick={this.toggle}>
                <Sun />
                <Hills />
                <Caption>{this.$title} {this.liked ? '♥' : '♡'}</Caption>
            </Scene>
        );
    }
}

// No override → the default frame, a transparent pass-through: just the picture.
class $Bare extends $Picture {}

// Each of these overrides frame() to hang the SAME picture in a different frame.
class $Ornate extends $Picture {
    frame() { return <OrnateFrame>{super.frame()}</OrnateFrame>; }
}

class $Polaroid extends $Picture {
    frame() {
        return (
            <PolaroidFrame>
                {super.frame()}
                <div className="pol-caption">{this.$title}</div>
            </PolaroidFrame>
        );
    }
}

class $Matted extends $Picture {
    frame() { return <MattedFrame><div className="mat">{super.frame()}</div></MattedFrame>; }
}

const Bare = $($Bare);
const Ornate = $($Ornate);
const Polaroid = $($Polaroid);
const Matted = $($Matted);

export default function Case1Demo() {
    return (
        <>
            <Gallery>
                <PictureCard>
                    <Bare title="Sunset" />
                    <FrameLabel>default frame — transparent</FrameLabel>
                </PictureCard>
                <PictureCard>
                    <Ornate title="Sunset" />
                    <FrameLabel>frame() → ornate</FrameLabel>
                </PictureCard>
                <PictureCard>
                    <Polaroid title="Sunset" />
                    <FrameLabel>frame() → polaroid</FrameLabel>
                </PictureCard>
                <PictureCard>
                    <Matted title="Sunset" />
                    <FrameLabel>frame() → matted</FrameLabel>
                </PictureCard>
            </Gallery>
            <VerdictSection>
                <VerdictRow $state="pass">
                    <VerdictDot $state="pass" />
                    ✓ one view(), four frame() overrides — the same picture, four different frames
                </VerdictRow>
                <VerdictRow $state="pending">
                    <VerdictDot $state="pending" />
                    ○ click any picture — the framed content stays live (♡ → ♥)
                </VerdictRow>
            </VerdictSection>
        </>
    );
}

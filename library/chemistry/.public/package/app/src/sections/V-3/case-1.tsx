import React from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    VolumeFrame, SliderBox, SliderLabel, RangeInput, LevelReadout,
    SpeakerBox, SpeakerIcon, SpeakerLabel,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $Speaker extends $Chemical {
    $level = 0;
    view() {
        const icon = this.$level === 0 ? '🔇' : this.$level < 34 ? '🔈' : this.$level < 67 ? '🔉' : '🔊';
        return (
            <SpeakerBox>
                <SpeakerLabel>$Speaker</SpeakerLabel>
                <SpeakerIcon>{icon}</SpeakerIcon>
                <LevelReadout>{this.$level}%</LevelReadout>
            </SpeakerBox>
        );
    }
}

class $VolumeSlider extends $Chemical {
    volume = 0;
    speakers: $Speaker[] = [];

    $VolumeSlider(...speakers: $Speaker[]) {
        this.speakers = speakers.map(s => $check(s, $Speaker));
    }

    setVolume(e: React.ChangeEvent<HTMLInputElement>) {
        this.volume = Number(e.target.value);
        for (const s of this.speakers) s.$level = this.volume;
    }

    view() {
        const tested = this.volume > 0;
        return (
            <>
                <VolumeFrame>
                    <SliderBox>
                        <SliderLabel>$VolumeSlider</SliderLabel>
                        <RangeInput
                            type="range"
                            min={0}
                            max={100}
                            value={this.volume}
                            onChange={this.setVolume}
                        />
                        <LevelReadout>Volume: {this.volume}%</LevelReadout>
                    </SliderBox>
                    {this.speakers.map((s, i) => {
                        const S = $(s);
                        return <S key={i} />;
                    })}
                </VolumeFrame>
                <VerdictSection>
                    <VerdictRow $state={tested ? 'pass' : 'pending'}>
                        <VerdictDot $state={tested ? 'pass' : 'pending'} />
                        {tested
                            ? `✓ slider → ${this.speakers.length} speakers at ${this.volume}%`
                            : '○ drag the slider to set volume'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const Speaker = $($Speaker);
const VolumeSlider = $($VolumeSlider);

export default function Case1Demo() {
    return (
        <VolumeSlider>
            <Speaker />
            <Speaker />
        </VolumeSlider>
    );
}

import React from 'react';
import { $, $Chemical } from '@/index';
import {
    PickerFrame, SliderRow, SliderLabel, HueSlider,
    HueValue, SwatchBox, SwatchLabel, ErrorBox,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

// ErrorBoundary — catches render errors so the app doesn't crash.
class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { error: Error | null }
> {
    state: { error: Error | null } = { error: null };

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <ErrorBox>
                    {this.state.error.name}: {this.state.error.message}
                    {'\n\n'}
                    {this.state.error.stack}
                </ErrorBox>
            );
        }
        return this.props.children;
    }
}

class $Swatch extends $Chemical {
    $color = 'hsl(0, 70%, 60%)';

    view() {
        return (
            <>
                <SwatchBox $color={this.$color} />
                <SwatchLabel>{this.$color}</SwatchLabel>
            </>
        );
    }
}

const Swatch = $($Swatch);

class $ColorPicker extends $Chemical {
    hue = 0;

    setHue(e: React.ChangeEvent<HTMLInputElement>) {
        this.hue = Number(e.target.value);
    }

    view() {
        const hsl = `hsl(${this.hue}, 70%, 60%)`;
        const moved = this.hue > 0;
        return (
            <>
                <PickerFrame>
                    <SliderRow>
                        <SliderLabel>$hue</SliderLabel>
                        <HueSlider
                            type="range"
                            min={0}
                            max={360}
                            value={this.hue}
                            onChange={this.setHue}
                        />
                        <HueValue>{this.hue}</HueValue>
                    </SliderRow>
                    <Swatch color={hsl} />
                </PickerFrame>
                <VerdictSection>
                    <VerdictRow $state={moved ? 'pass' : 'pending'}>
                        <VerdictDot $state={moved ? 'pass' : 'pending'} />
                        {moved
                            ? `✓ swatch reflects prop change — hue=${this.hue}`
                            : '○ drag the slider to change the hue'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

const ColorPicker = $($ColorPicker);

export default function Case1Demo() {
    return (
        <ErrorBoundary>
            <ColorPicker />
        </ErrorBoundary>
    );
}

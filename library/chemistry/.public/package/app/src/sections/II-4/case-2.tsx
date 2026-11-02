import React from 'react';
import { $, $Chemical } from '@/index';
import {
    PomodoroFrame, PomodoroDisplay, PomodoroLabel,
    PomodoroBtn, PomodoroBtnRow, PomodoroBreakBtn,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

class $Pomodoro extends $Chemical {
    seconds = 25 * 60;
    running = false;
    _interval?: ReturnType<typeof setInterval>;

    start() {
        if (this._interval) return;
        this.running = true;
        this._interval = setInterval(() => {
            if (this.seconds <= 0) {
                this.stop();
                return;
            }
            this.seconds--;
        }, 1000);
    }

    stop() {
        if (this._interval) { clearInterval(this._interval); this._interval = undefined; }
        this.running = false;
    }

    reset() {
        this.stop();
        this.seconds = 25 * 60;
    }

    setBreak() {
        this.stop();
        this.seconds = 5 * 60;
    }

    view() {
        const mins = Math.floor(this.seconds / 60);
        const secs = this.seconds % 60;
        const display = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        const tested = this.seconds < 25 * 60;
        return (
            <PomodoroFrame>
                <PomodoroLabel>{this.running ? 'running' : 'paused'}</PomodoroLabel>
                <PomodoroDisplay>{display}</PomodoroDisplay>
                <PomodoroBtnRow>
                    <PomodoroBtn onClick={() => this.running ? this.stop() : this.start()}>
                        {this.running ? 'stop' : 'start'}
                    </PomodoroBtn>
                    <PomodoroBtn onClick={this.reset}>reset</PomodoroBtn>
                    <PomodoroBreakBtn onClick={this.setBreak}>break (5:00)</PomodoroBreakBtn>
                </PomodoroBtnRow>
                <VerdictSection>
                    <VerdictRow $state={tested ? 'pass' : 'pending'}>
                        <VerdictDot $state={tested ? 'pass' : 'pending'} />
                        {tested
                            ? `✓ timer started — ${display} remaining`
                            : '○ click start to verify'}
                    </VerdictRow>
                </VerdictSection>
            </PomodoroFrame>
        );
    }
}

const Pomodoro = $($Pomodoro);

export default function Case2Demo() {
    return <Pomodoro />;
}

import React from 'react';
import { $, $Chemical } from '@/index';
import { TimerFrame, TimerValue, PhaseTag } from './case.styled';
import { ActionButton } from '../V-1/case.styled';

class $Timer extends $Chemical {
    $seconds = 0;
    $running = false;
    _interval?: ReturnType<typeof setInterval>;

    async effect() {
        await this.next('mount');
        this.start();
    }

    start() {
        if (this._interval) return;
        this.$running = true;
        this._interval = setInterval(() => { this.$seconds++; }, 1000);
    }

    stop() {
        if (this._interval) { clearInterval(this._interval); this._interval = undefined; }
        this.$running = false;
    }

    reset() {
        this.stop();
        this.$seconds = 0;
    }

    view() {
        return (
            <TimerFrame>
                <PhaseTag>{this.$running ? 'running' : 'stopped'}</PhaseTag>
                <TimerValue>{this.$seconds}s</TimerValue>
                <ActionButton onClick={() => this.$running ? this.stop() : this.start()}>
                    {this.$running ? 'stop' : 'start'}
                </ActionButton>
                <ActionButton onClick={this.reset}>reset</ActionButton>
            </TimerFrame>
        );
    }
}

const Timer = $($Timer);

export default function Case2Demo() {
    return <Timer />;
}

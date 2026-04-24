import React from 'react';
import { $Chemical } from '@/abstraction/chemical';

export class $Exercise extends $Chemical {
    $question = '';
    $answer = '';
    revealed = false;
    reveal() { this.revealed = !this.revealed; }
    view() {
        return (
            <div className="exercise">
                <p className="question">{this.$question}</p>
                {this.revealed && <p className="answer">{this.$answer}</p>}
                <button onClick={() => this.reveal()}>
                    {this.revealed ? 'Hide' : 'Reveal'}
                </button>
            </div>
        );
    }
}

export const Exercise = new $Exercise().Component;

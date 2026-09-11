import React from 'react';
import { $, $Chemical, children, styled } from '@/index';
import { ActionButton } from '../V-1/case.styled';

// An animation is declared the way everything else is: its stops are levels a
// selector opens, its declarations are members, and its name is the author's.
// Two selectors opening `@keyframes landed {` open it once, so the stops meet
// in one block. The selector is written into the name here because the Lab's
// babel path cannot yet decorate a class field; `@select` says the same thing.
class $Landed extends $Chemical {
    selector = styled.section;
    margin = '0 0 10px';
    padding = '12px 16px';
    borderRadius = '6px';
    border = '1px solid #a2a9b1';
    color = '#202122';
    background = 'transparent';
    ['@keyframes landed { from {: background'] = '#ffe97a';
    ['@keyframes landed { to {: background'] = 'transparent';
    _animation = 'landed 2.5s ease-out';

    view() {
        return <section>{this[children]}</section>;
    }
}

const Landed = $($Landed);

// A subclass restates one stop and the other survives: a named block is whole
// wherever it stands, the way a restated prefix moves its whole group. The name
// is the page's, as any CSS name is — so the subclass stands IN for its base
// rather than beside it, which is how a theme replaces a theme.
class $Alarmed extends $Landed {
    override ['@keyframes landed { from {: background'] = '#ffb3b3';
}

const Alarmed = $($Alarmed);

// A new key is a new element, and a new element runs its animation again.
class $Stage extends $Chemical {
    played = 0;
    restated = false;

    replay() {
        this.played++;
    }

    restate() {
        this.restated = !this.restated;
        this.played++;
    }

    view() {
        const Tile = this.restated ? Alarmed : Landed;

        return (
            <div data-demo="five">
                <Tile key={`tile-${this.played}`}>
                    {this.restated
                        ? 'Alarmed: restates only the first stop, from red; the second stop is inherited whole'
                        : 'Landed: fades in from yellow, the two stops in one block'}
                </Tile>
                <ActionButton onClick={this.replay}>replay</ActionButton>
                <ActionButton onClick={this.restate}>restate a stop</ActionButton>
            </div>
        );
    }
}

const Stage = $($Stage);

export default function Case5Demo() {
    return <Stage />;
}

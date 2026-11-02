import React, { useState } from 'react';
import { $, $Chemical, $check } from '@/index';
import {
    BoardFrame, LaneFrame, LaneHeader, LaneName, LaneCount,
    CardFrame, CardTitle, CardMeta, CardActions, SmallButton,
    AddCardButton, ControlBar, Stat,
} from './case.styled';
import { VerdictSection, VerdictRow, VerdictDot } from '../../apparatus/verdict.styled';

let nextTaskId = 1;

class $Task extends $Chemical {
    $title = '';
    $priority: 'low' | 'med' | 'high' = 'low';
    $onMoveLeft: (() => void) | null = null;
    $onMoveRight: (() => void) | null = null;
    $onRemove: (() => void) | null = null;
    formRan = false;
    formCount = 0;
    createdAt = '';

    $form() {
        this.formRan = true;
        this.formCount++;
        this.createdAt = new Date().toLocaleTimeString();
    }

    view() {
        const colors = { low: '#94a3b8', med: '#f59e0b', high: '#ef4444' };
        return (
            <CardFrame>
                <CardTitle>{this.$title}</CardTitle>
                <CardMeta>
                    <span style={{ color: colors[this.$priority] }}>
                        {this.$priority}
                    </span>
                    {this.createdAt && ` · ${this.createdAt}`}
                    {this.formRan && ` · formed(${this.formCount}x)`}
                </CardMeta>
                <CardActions>
                    {this.$onMoveLeft && <SmallButton onClick={this.$onMoveLeft}>←</SmallButton>}
                    {this.$onMoveRight && <SmallButton onClick={this.$onMoveRight}>→</SmallButton>}
                    {this.$onRemove && <SmallButton onClick={this.$onRemove}>×</SmallButton>}
                </CardActions>
            </CardFrame>
        );
    }
}

// ─── $Lane — a column that receives $Task children ──────────────────────────

class $Lane extends $Chemical {
    $name = '';
    $color = '#6366f1';
    tasks: $Task[] = [];
    bondCtorRuns = 0;

    $Lane(...tasks: $Task[]) {
        this.tasks = tasks;
        this.bondCtorRuns++;
    }

    view() {
        return (
            <LaneFrame>
                <LaneHeader $color={this.$color}>
                    <LaneName>{this.$name}</LaneName>
                    <LaneCount>{this.tasks.length} · ctor:{this.bondCtorRuns}</LaneCount>
                </LaneHeader>
                {this.tasks.map((task, i) => {
                    const T = $(task);
                    return <T key={`task-${i}`} />;
                })}
            </LaneFrame>
        );
    }
}

// ─── $Board — the top-level kanban, receives $Lane children ─────────────────

class $Board extends $Chemical {
    lanes: $Lane[] = [];
    bondCtorRuns = 0;
    distributions: string[] = [];

    $Board(...lanes: $Lane[]) {
        this.lanes = lanes.map(l => $check(l, $Lane));
        this.bondCtorRuns++;
        const dist = lanes.map(l => l.tasks.length).join('-');
        if (this.distributions.length === 0 || this.distributions[this.distributions.length - 1] !== dist) {
            this.distributions.push(dist);
        }
    }

    view() {
        const totalTasks = this.lanes.reduce((s, l) => s + l.tasks.length, 0);
        const typeCheck = this.lanes.length > 0 ? 'pass' : 'pending';
        const dynamicBond = this.bondCtorRuns > 1 ? 'pass' : 'pending';
        const moved = this.distributions.length > 1 ? 'pass' : 'pending';
        const taskCheck = totalTasks > 0 ? 'pass' : 'pending';

        return (
            <>
                <BoardFrame>
                    {this.lanes.map((lane, i) => {
                        const L = $(lane);
                        return <L key={`lane-${i}`} />;
                    })}
                </BoardFrame>
                <Stat style={{ padding: '4px 16px', display: 'block' }}>
                    Board ctor: {this.bondCtorRuns}x
                    {' · '}Lanes: {this.lanes.map(l => `${l.$name}(${l.tasks.length})`).join(', ')}
                    {' · '}Tasks: {totalTasks}
                    {' · '}Distributions: [{this.distributions.join(' → ')}]
                </Stat>
                <VerdictSection>
                    <VerdictRow $state={typeCheck}>
                        <VerdictDot $state={typeCheck} />
                        {this.lanes.length > 0
                            ? `✓ $check — ${this.lanes.length} lanes typed as $Lane`
                            : '○ no lanes'}
                    </VerdictRow>
                    <VerdictRow $state={dynamicBond}>
                        <VerdictDot $state={dynamicBond} />
                        {this.bondCtorRuns > 1
                            ? `✓ bond ctor re-ran ${this.bondCtorRuns}x — children are dynamic`
                            : '○ add/move a task to trigger re-render'}
                    </VerdictRow>
                    <VerdictRow $state={moved}>
                        <VerdictDot $state={moved} />
                        {this.distributions.length > 1
                            ? `✓ task distribution changed — [${this.distributions.join(' → ')}]`
                            : '○ move a task between lanes to change distribution'}
                    </VerdictRow>
                    <VerdictRow $state={taskCheck}>
                        <VerdictDot $state={taskCheck} />
                        {totalTasks > 0
                            ? `✓ ${totalTasks} tasks rendered across ${this.lanes.length} lanes — each card shows $form count`
                            : '○ no tasks'}
                    </VerdictRow>
                </VerdictSection>
            </>
        );
    }
}

// ─── Harness — React state drives dynamic children ──────────────────────────

type TaskData = { id: number; title: string; priority: 'low' | 'med' | 'high'; lane: number };

const initialTasks: TaskData[] = [
    { id: nextTaskId++, title: 'Design API schema', priority: 'high', lane: 0 },
    { id: nextTaskId++, title: 'Write unit tests', priority: 'med', lane: 0 },
    { id: nextTaskId++, title: 'Set up CI pipeline', priority: 'low', lane: 1 },
];

const lanes = [
    { name: 'To Do', color: '#6366f1' },
    { name: 'In Progress', color: '#f59e0b' },
    { name: 'Done', color: '#22c55e' },
];

const Task = $($Task);
const Lane = $($Lane);
const Board = $($Board);

export default function Case1Demo() {
    const [tasks, setTasks] = useState<TaskData[]>(initialTasks);

    const addTask = () => {
        const id = nextTaskId++;
        const priorities: ('low' | 'med' | 'high')[] = ['low', 'med', 'high'];
        setTasks(prev => [...prev, {
            id,
            title: `Task #${id}`,
            priority: priorities[id % 3],
            lane: 0,
        }]);
    };

    const moveRight = (taskId: number) => {
        setTasks(prev => prev.map(t =>
            t.id === taskId && t.lane < 2 ? { ...t, lane: t.lane + 1 } : t
        ));
    };

    const moveLeft = (taskId: number) => {
        setTasks(prev => prev.map(t =>
            t.id === taskId && t.lane > 0 ? { ...t, lane: t.lane - 1 } : t
        ));
    };

    const removeTask = (taskId: number) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
    };

    return (
        <div>
            <ControlBar>
                <SmallButton onClick={addTask}>+ Add Task</SmallButton>
                <Stat>{tasks.length} tasks across {lanes.length} lanes</Stat>
            </ControlBar>
            <Board>
                {lanes.map((cfg, laneIdx) => (
                    <Lane key={cfg.name} name={cfg.name} color={cfg.color}>
                        {tasks.filter(t => t.lane === laneIdx).map(t => (
                            <Task
                                key={t.id}
                                title={t.title}
                                priority={t.priority}
                                onMoveLeft={laneIdx > 0 ? () => moveLeft(t.id) : null}
                                onMoveRight={laneIdx < 2 ? () => moveRight(t.id) : null}
                                onRemove={() => removeTask(t.id)}
                            />
                        ))}
                    </Lane>
                ))}
            </Board>
        </div>
    );
}

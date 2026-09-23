export class Binder {
    reference(copy: string): { text: string; identifier: string } | undefined {
        const held = /^\[([^\]]*)\]\(([^)]*)\)$/u.exec(copy.trim());
        if (held === null) return undefined;
        return { text: held[1].trim(), identifier: held[2].trim() };
    }
}

export const binder = new Binder();

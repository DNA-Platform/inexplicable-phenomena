export class Binder {
    reference(copy: string): { text: string; identifier: string } | undefined {
        const match = /^\[([^\]]*)\]\(([^)]*)\)$/u.exec(copy.trim());
        if (match === null) return undefined;
        return { text: match[1].trim(), identifier: match[2].trim() };
    }
}

export const binder = new Binder();

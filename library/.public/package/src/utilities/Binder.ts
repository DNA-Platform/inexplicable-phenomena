export class Binder {
    reference(copy: string): { name: string; identifier: string } | undefined {
        const match = /^\[([^\]]*)\]\(([^)]*)\)$/u.exec(copy.trim());
        if (match === null) return undefined;
        return { name: match[1].trim(), identifier: match[2].trim() };
    }
}

export const binder = new Binder();

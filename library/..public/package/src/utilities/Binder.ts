export class Binder {
    reference(copy: string): { text: string; identifier: string } | undefined {
        const said = /^\[([^\]]*)\]\(([^)]*)\)$/u.exec(copy.trim());
        if (said === null) return undefined;
        return { text: said[1].trim(), identifier: said[2].trim() };
    }
}

export const binder = new Binder();
